import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Badge } from 'antd';
import { history } from 'index';

@connect(({ cart: { cartCount } }) => ({ cartCount }))
class CartMenu extends React.Component {
  handleClick = () => {
    history.push('/cart');
  };

  render() {
    const { cartCount } = this.props;
    return (
      <Badge count={cartCount} onClick={this.handleClick}>
        <Avatar shape="circle" icon="shopping-cart" />
      </Badge>
    );
  }
}

export default CartMenu;
