// Action types
const actionTypes = {
  ADD_ITEM_TO_CART: 'cart/ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'cart/REMOVE_ITEM_FROM_CART',
  UPDATE_ITEM_QUANTITY: 'cart/UPDATE_ITEM_QUANTITY',
  RESET_CART: 'cart/RESET_CART',
};

// Actions
export const addItemToCart = (item) => {
  return {
    type: actionTypes.ADD_ITEM_TO_CART,
    payload: item,
  };
};

export const removeItemFromCart = (item) => {
  return {
    type: actionTypes.REMOVE_ITEM_FROM_CART,
    payload: item,
  };
};

export const updateCartItemQuantity = (item, quantity) => {
  return {
    type: actionTypes.UPDATE_ITEM_QUANTITY,
    payload: item,
    quantity
  };
};

export const resetCart = () => {
  return {
    type: actionTypes.RESET_CART,
  };
};

export default actionTypes;
