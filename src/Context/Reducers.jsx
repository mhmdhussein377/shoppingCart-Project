export let cartReducer = (state, action) => {
  switch (action.type) {
    case "add-to-cart":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "remove-from-cart": 
      return {...state, cart: state.cart.filter(item => item.id !== action.payload.id)}
    case "change-quantity":
      return {...state, cart: state.cart.filter(item => item.id === action.payload.id ? (item.qty = action.payload.qty) : item.qty)}
    default:
      return state;
  }
}

export let productReducer = (state,action) => {
  switch(action.type) {
    case "sort-by-price":
      return {...state, sort: action.payload}
    case "filter-by-stock": 
      return {...state, byStock: !state.byStock}
    case "filter-by-delivery":
      return {...state, byFastDelivery: !state.byFastDelivery}
    case "filter-by-rating":
      return {...state, byRating: action.payload}
    case "filter-by-search":
      return {...state, searchQuery: action.payload}
    case "clear-filters":
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
      };
    default:
      return state
  }
}