import React from 'react';
import { Button, Card } from "react-bootstrap"
import Rating from "./Rating";
import {cartState} from "../Context/Context"

const SingleProduct = ({ product }) => {

  let {state: {cart}, dispatch} = cartState();

  return (
    <div className="product">
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title> {product.name} </Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>$ {product.price.split(" . ")[0]} </span>
            {product.fastDelivery ? ( 
              <div> Fast Delivery </div>
            ) : (
              <div> 4 days delivery </div>
            )}
            <Rating rating={product.ratings} />
          </Card.Subtitle>
          {cart.some((item) => item.id === product.id) ? (
            <Button
              variant="danger"
              onClick={() => {
                dispatch({ type: "remove-from-cart", payload: product });
              }}
            >
              Remove from cart
            </Button>
          ) : (
            <Button
              disabled={!product.inStock}
              onClick={() => {dispatch({ type: "add-to-cart", payload: product })}}
            >
              {product.inStock ? "Add to cart" : "Out of stock"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default SingleProduct