import React from 'react'
import {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {cartState} from '../Context/Context';
import Rating from "./Rating";

const Filters = () => {

    let {
        productState: {
            byStock,
            byFastDelivery,
            sort,
            byRating,
        },
        productDispatch
    } = cartState();

    return (
      <div className="filters">
        <span className="title">Filter Products</span>
        <span>
          <Form.Check
            inline
            label="Ascending"
            name="group1"
            type="radio"
            id={`inline-1`}
            onChange={() =>
              productDispatch({ type: "sort-by-price", payload: "lowToHigh" })
            }
            checked={sort === "lowToHigh" ? true : false}
          />
        </span>
        <span>
          <Form.Check
            inline
            label="Descending"
            name="group1"
            type="radio"
            id={`inline-2`}
            onChange={() =>
              productDispatch({ type: "sort-by-price", payload: "highToLow" })
            }
            checked={sort === "highToLow" ? true : false}
          />
        </span>
        <span>
          <Form.Check
            inline
            label="Include Out of Stock"
            name="group1"
            type="checkbox"
            id={`inline-3`}
            onChange={() => productDispatch({ type: "filter-by-stock" })}
            checked={byStock}
          />
        </span>
        <span>
          <Form.Check
            inline
            label="Fast Delivery Only"
            name="group1"
            type="checkbox"
            id={`inline-4`}
            onChange={() => productDispatch({ type: "filter-by-delivery" })}
            checked={byFastDelivery}
          />
        </span>
        <span>
          <label
            style={{
              paddingRight: 10,
            }}
          >
            Rating:
          </label>
          <Rating
            rating={byRating}
            onClick={(i) =>
              productDispatch({
                type: "filter-by-rating",
                payload: i + 1,
              })
            }
            style={{
              cursor: "pointer",
            }}
          />
        </span>
        <Button
          variant="light"
          onClick={() => productDispatch({ type: "clear-filters" })}
        >
          Clear Filters
        </Button>
      </div>
    );
}

export default Filters