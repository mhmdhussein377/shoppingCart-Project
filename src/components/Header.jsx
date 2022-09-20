import React from 'react'
import { Navbar, Container, FormControl, Dropdown, Nav, Badge, Button } from "react-bootstrap";
import { AiFillDelete } from 'react-icons/ai';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cartState } from "../Context/Context"

const Header = () => {

    let {state: {cart}, dispatch, productDispatch} = cartState();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 60 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 450 }}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) => productDispatch({ type: "filter-by-search", payload: e.target.value })}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge bg="transparent">{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 170 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <span className="cartItem" key={item.id}>
                      <img
                        src={item.image}
                        className="cartItemImg"
                        alt={item.name}
                      ></img>
                      <div className="cartItemDetail">
                        <span>{item.name}</span>
                        <span>$ {item.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({ type: "remove-from-cart", payload: item })
                        }
                      />
                    </span>
                  ))}
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
              <Link to="/cart">
                <Button style={{ width: "95%", margin: "0 10px" }}>
                  Go to Cart
                </Button>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header