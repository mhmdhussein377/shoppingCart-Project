import React, { useEffect } from 'react';
import SingleProduct from './SingleProduct';
import {cartState} from "../Context/Context";
import { Link } from 'react-router-dom';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useState } from 'react';
import Rating from './Rating';

const Cart = () => {

  let {state: {cart}, dispatch} = cartState();

  let [total,setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc,curr) => {
      return acc + Number(curr.price) * curr.qty
    }, 0))
  },[cart])

  console.log(total)

  return (
    <>
      <div className="home">
        <div className="productsContainer">
          <ListGroup>
            {cart.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{item.name}</span>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col md={2}>
                    <Rating rating={item.ratings} />
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        dispatch({
                          type: "change-quantity",
                          payload: {
                            id: item.id,
                            qty: e.target.value
                          }
                        });
                      }}
                    >
                      {[...Array(item.inStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="danger"
                      onClick={() => {
                        dispatch({
                          type: "remove-from-cart",
                          payload: item,
                        });
                      }}
                    >
                      Remove from cart
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="filters summary">
          <span className="title">Subtotal {cart.length} items</span>
          <span style={{ fontWeight: 700, fontSize: 20 }}>
            Total: $ {total}
          </span>
          <Button type="button" disabled={cart.length === 0}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </>
  );
}

export default Cart