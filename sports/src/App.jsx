import React, { useEffect } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Home from './Home'
import Trending from './Trending'
import Products from './Products'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Football from './Football'
import SingleProduct from './SingleProduct'
import Cricket from './Cricket'
import Indoor from './Indoor'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wishlist from './Wishlist'
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import MyOrders from "./Myorders";
import Checkout from "./Checkout";
import Payment from "./Payment";







function App() {

  return (
    <div className='bg-[#e8f3f1]'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/football" element={<Football />} />
          <Route path="/cricket" element={<Cricket />} />
          <Route path="/indoor" element={<Indoor />} />
          <Route path="/products" element={<Products />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>

        <Footer />
        <ToastContainer position="top-center" autoClose={1000} />

      </BrowserRouter>
    </div>
  )
}

export default App
