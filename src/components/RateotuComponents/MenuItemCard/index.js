import React from 'react'
import { connect } from 'react-redux';
import { Card, Button, Tooltip, Avatar, Tag } from 'antd';
import PropTypes from 'prop-types';
import { addItemToCart } from 'redux/cart/actions';
import { getMenuItemTagStyle } from 'utils/ui';
import styles from './style.module.scss';

const { Meta } = Card;

const MenuItemCard = ({ item, dispatchAddItemToCart }) => {
  const handleClick = () => {
    dispatchAddItemToCart(item);
  };

  return (
    <Card
      cover={<img alt="food item" src={item.imageUrl} height={200} />}
      actions={[
        <Button
          block
          className={styles.cartBuyButton}
          icon="shopping-cart"
          onClick={handleClick}
        />,
      ]}
      hoverable
    >
      <Meta
        avatar={
          item.description && (
            <span className="float-left">
              <Tooltip placement="topLeft" className="align-self-center" title={item.description}>
                <Avatar shape="square" icon="info-circle" style={{ backgroundColor: 'red' }} />
              </Tooltip>
            </span>
          )
        }
        title={<p className="text-center font-weight-bolder text-break">{item.name}</p>}
        description={
          <>
            <span className="float-left">
              <b>£ {item.price}</b>
            </span>
            <span className="float-right">
              <Tag style={{ ...getMenuItemTagStyle(item.category.name.toUpperCase()) }}>
                {item.category.name.toUpperCase()}
              </Tag>
            </span>
          </>
        }
      />
    </Card>
  );
};

MenuItemCard.propTypes = {
  item: PropTypes.object.isRequired
};

export default connect(undefined, { dispatchAddItemToCart: addItemToCart })(MenuItemCard);
