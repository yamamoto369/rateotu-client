import React from 'react';
import { Steps, Button, Icon, Table, InputNumber, Result, notification } from 'antd';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { removeItemFromCart, updateCartItemQuantity, resetCart } from 'redux/cart/actions';
import OrderInvoice from 'components/RateotuComponents/OrderInvoice';
import OrderAPIClient from 'api/clients/orders';
import { formatCurrency } from 'utils/common';
import { history } from 'index';
import { renderItemTypeTag } from 'utils/ui';
import styles from './style.module.scss';

const { Step } = Steps;

const mapStateToProps = ({ cart, table }) => ({
  cartItems: cart.cartItems,
  cartTotal: cart.cartTotal,
  table: table.tableId,
});

const mapDispatchToProps = {
  dispatchRemoveItemFromCart: removeItemFromCart,
  dispatchUpdateCartItemQuantity: updateCartItemQuantity,
  dispatchResetCart: resetCart,
};

@connect(mapStateToProps, mapDispatchToProps)
class CartCheckout extends React.Component {
  state = {
    currentStep: 0,
  };

  createNewOrder = () => {
    const { cartTotal, cartItems, table, dispatchResetCart } = this.props;
    const requestBody = {
      total: cartTotal,
      order_items: cartItems,
      table,
    };

    OrderAPIClient.createOrder(requestBody)
      .then((response) => {
        if (response.status === 201) {
          this.next();
          dispatchResetCart();
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          // If multiple serializer errors, makes no sense to show them all
          console.log('errors', error.response.data);
          notification.error({
            message: 'Error Occured',
            description: 'Ooops, something went wrong on the server',
            duration: 10,
          });
        }
      });
  };

  next() {
    let { currentStep } = this.state;
    currentStep += 1;
    this.setState({
      currentStep,
    });
  }

  prev() {
    let { currentStep } = this.state;
    currentStep -= 1;
    this.setState({
      currentStep,
    });
  }

  render() {
    const { currentStep } = this.state;
    const { cartItems, cartTotal } = this.props;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (value) => (
          <a className="utils__link--underlined text-truncate" href="#">
            {value}
          </a>
        ),
        width: '30%',
      },
      {
        title: 'Category',
        dataIndex: 'category.name',
        sorter: (a, b) => a.category.name.length - b.category.name.length,
        render: (value) => renderItemTypeTag(value),
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        render: (value, item) => (
          <InputNumber
            defaultValue={value}
            size="small"
            min={1}
            onChange={(v) => this.props.dispatchUpdateCartItemQuantity(item, v)}
          />
        ),
      },
      {
        title: 'Price',
        dataIndex: 'price',
        render: (value) => `£ ${value}`,
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
        title: 'Actions',
        dataIndex: '',
        render: (item) => (
          <Button
            icon="delete"
            size="small"
            type="danger"
            onClick={() => this.props.dispatchRemoveItemFromCart(item)}
          >
            Remove
          </Button>
        ),
      },
    ];

    const steps = [
      {
        title: 'Cart',
        icon: <Icon type="shopping-cart" style={{ fontSize: 40 }} />,
        content: (
          <div>
            <Table
              className="utils__scrollTable"
              scroll={{ x: '100%' }}
              dataSource={cartItems}
              columns={columns}
              pagination={false}
              rowKey={(row) => row.id}
            />
            <div className="text-right clearfix mt-4">
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
        ),
      },
      {
        title: 'Confirmation',
        icon: <Icon type="credit-card" style={{ fontSize: 40 }} />,
        content: (
          <div>
            <OrderInvoice />
          </div>
        ),
      },
      {
        title: 'Done',
        icon: <Icon type="smile-o" style={{ fontSize: 40 }} />,
        content: (
          <Result
            status="success"
            //  Dummy order numb
            title="Order number: 2017182818828182881!"
            subTitle="Please wait while our staff, people of Jatravartid,
                      from the planet called Viltvodle VI prepare your order!"
            extra={[
              <Button type="primary" key="console" onClick={() => history.push('/menus')}>
                Go back to menu
              </Button>,
            ]}
          />
        ),
      },
    ];

    return (
      <div>
        <Helmet title="Cart" />
        <div className="card">
          <div className="card-body">
            <div className="cart">
              <Steps current={currentStep}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} icon={item.icon} />
                ))}
              </Steps>
              <div className={styles.stepsContent}>{steps[currentStep].content}</div>
              {currentStep !== 2 && (
                <div className={`${styles.stepsAction} text-center`}>
                  {currentStep > 0 && (
                    <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
                      Previous
                    </Button>
                  )}
                  {currentStep === 1 ? (
                    <Button
                      className="mr-2"
                      type="primary"
                      onClick={this.createNewOrder}
                      disabled={cartItems.length === 0}
                    >
                      <Icon type="dollar" /> Pay
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => this.next()}
                      disabled={cartItems.length === 0}
                    >
                      Next
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartCheckout;
