import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header"
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {

  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cart" element={<Cart />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
