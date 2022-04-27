import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import restaurantMobileLogo from 'assets/images/logo-mobile.png';
import { formatCurrency } from 'utils/common';
import styles from './style.module.scss';

const mapStateToProps = ({ cart, accounts }) => ({
  cartItems: cart.cartItems,
  cartTotal: cart.cartTotal,
  user: accounts.user,
});

@connect(mapStateToProps)
class OrderInvoice extends React.Component {
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (value) => (
          <a className="utils__link--underlined text-truncate" href="#">
            {value}
          </a>
        ),
      },
      {
        title: 'Image',
        dataIndex: 'imageUrl',
        render: (value) => (
          <a href="#" className={styles.thumbnail}>
            <img src={value} alt="" />
          </a>
        ),
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        render: (value) => `£ ${value}`,
      },
    ];

    const { cartItems, cartTotal, user } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-black mb-3">
              <br />
              <img className="mr-2" src={restaurantMobileLogo} height="50" alt="Amazon" />
            </h4>
          </div>
          <div className="col-md-6 text-right">
            <h4 className="text-black mb-3">
              <strong>Invoice Info</strong>
            </h4>
            <p>
              <a className="font-size-20" href="#">
                W32567-2352-4756
              </a>
              <br />
              <span className="font-size-20">
                User: <strong>{user.username}</strong>
              </span>
            </p>
            <span>
              Invoice Date: <strong>{moment().format('DD-MM-YYYY HH:mm:ss')} </strong>
            </span>
            <br />
            <br />
          </div>
        </div>
        <Table
          className="utils__scrollTable"
          scroll={{ x: '100%' }}
          columns={columns}
          dataSource={cartItems}
          pagination={false}
          rowKey={(row) => row.id}
        />
        <div className="text-right clearfix mt-5">
          <div className="pull-right">
            <p>
              <strong>
                £ Grand Total: <span>{formatCurrency(cartTotal)}</span>
              </strong>
            </p>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default OrderInvoice;
