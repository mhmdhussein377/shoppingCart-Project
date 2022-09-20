import React, { createContext, useReducer } from 'react';
import * as faker from "faker";
import {cartReducer} from "./Reducers"
import { useContext } from 'react';
import {productReducer} from "./Reducers"

let cart = createContext();
faker.seed(99);

const CartProvider = ({children}) => {

    let products = [...Array(20)].map(() => (
        {
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.random.image(),
            inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
            fastDelivery: faker.datatype.boolean(),
            ratings: faker.random.arrayElement([1, 2, 3, 4, 5])
        }
    ));
    

    let [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: [],
    });

    let [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
    });

  return (
    <cart.Provider value={{state, dispatch, productState, productDispatch}}>
        {children}
    </cart.Provider>
  )
}

export default CartProvider;

export let cartState = () => {
    return useContext(cart);
}