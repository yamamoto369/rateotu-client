import actionTypes from './actions';

const initialState = {
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_CART:
      if (state.cartItems.some((i) => i.id === action.payload.id)) {
        return {
          ...state,
          cartCount: ++state.cartCount,
          cartTotal: state.cartTotal + action.payload.price * 1,
          cartItems: [
            ...state.cartItems.map((i) =>
              i.id === action.payload.id
                ? {
                    ...i,
                    quantity: ++i.quantity,
                  }
                : i,
            ),
          ],
        };
      }
      return {
        ...state,
        cartCount: ++state.cartCount,
        cartTotal: state.cartTotal + action.payload.price * 1,
        cartItems: [...state.cartItems, { quantity: 1, ...action.payload }],
      };
    case actionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartCount: state.cartCount - action.payload.quantity,
        cartTotal: state.cartTotal - action.payload.price * action.payload.quantity,
        cartItems: state.cartItems.filter((i) => i.id !== action.payload.id),
      };
    case actionTypes.UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        cartCount:
          action.quantity > state.cartItems.find((i) => i.id === action.payload.id).quantity
            ? ++state.cartCount
            : --state.cartCount,
        cartTotal:
          action.quantity > state.cartItems.find((i) => i.id === action.payload.id).quantity
            ? state.cartTotal + action.payload.price * 1
            : state.cartTotal - action.payload.price * 1,
        cartItems: [
          ...state.cartItems.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: action.quantity > 0 ? action.quantity : i.quantity }
              : i,
          ),
        ],
      };
    case actionTypes.RESET_CART:
      return {
        ...state,
        cartCount: 0,
        cartTotal: 0,
        cartItems: [],
      };
    default:
      return state;
  }
}
