import React from 'react';
import { connect } from 'react-redux';
import { Card, List, Popconfirm, message, notification } from 'antd';
import TableAPIClient from 'api/clients/tables';
import camelcaseKeys from 'camelcase-keys';
import Loader from 'components/LayoutComponents/Loader';
import styles from './style.module.scss';

const mapStateToProps = (state) => {
  return {
    user: state.accounts.user,
  };
};

@connect(mapStateToProps)
class RestaurantTableList extends React.Component {
  state = {
    tables: [],
    isLoading: true,
    hasSelectedSeat: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { user } = this.props;

    TableAPIClient.getTables().then((response) => {
      const tables = camelcaseKeys(response.data, { deep: true });
      this.setState({
        isLoading: false,
        tables,
        hasSelectedSeat: JSON.stringify(tables).indexOf(`${user.username}`) > -1,
      });
    });
  };

  handlePopConfirm = (tableId, seatId, isOccupied, tableNumber) => {
    const { hasSelectedSeat } = this.state;
    const { dispatch } = this.props;
    const pathParams = { table_id: tableId, id: seatId };
    const requestBody = { is_occupied: !isOccupied };
    message.info('Clicked on Yes.');

    TableAPIClient.switchTableSeat(pathParams, requestBody)
      .then((response) => {
        if (response.status === 200) {
          this.fetchData();

          if (hasSelectedSeat) {
            dispatch({
              type: 'table/RESET_STATE',
            });
          } else {
            message.success('Success!');
            dispatch({
              type: 'table/SET_STATE',
              payload: {
                tableId,
                seatId,
                tableNumber,
              },
            });
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log('errors', error.response.data);
          notification.error({
            message: 'Error Occured',
            description: 'Ooops, something went wrong on the server',
            duration: 10,
          });
        }
      });
  };

  render() {
    const { isLoading, tables, hasSelectedSeat } = this.state;
    const { user } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <div className={styles.cardList}>
        <List
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={tables}
          renderItem={(table) => (
            <List.Item key={table.id}>
              <Card
                className={`mb-4 ${styles.card}`}
                bodyStyle={{ padding: '10px' }}
                actions={[
                  <span>
                    Table: <strong>{table.tableNumber}</strong>
                  </span>,
                ]}
                hoverable
              >
                {table.seats.map((seat) => (
                  <Popconfirm
                    placement="topRight"
                    title={seat.isOccupied ? 'Leave?' : 'Sit here?'}
                    onConfirm={() =>
                      this.handlePopConfirm(
                        seat.table.id,
                        seat.id,
                        seat.isOccupied,
                        seat.table.tableNumber,
                      )
                    }
                    okText="Yes"
                    cancelText="No"
                    key={seat.id}
                    disabled={
                      (!hasSelectedSeat && seat.isOccupied) ||
                      (hasSelectedSeat &&
                        !(seat.customer && seat.customer.username === user.username))
                    }
                  >
                    <Card.Grid
                      className={`${styles.cardGrid} ${
                        seat.isOccupied ? styles.seatOccupied : styles.seatFree
                      }`}
                      hoverable
                    >
                      {seat.isOccupied && seat.customer ? seat.customer.username : 'Free'}
                    </Card.Grid>
                  </Popconfirm>
                ))}
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default RestaurantTableList;
