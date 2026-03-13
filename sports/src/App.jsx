import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Home from './Home'
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
import SearchResults from "./SearchResults";
import AdminOrders from './AdminOrders'

function App() {

  return (

    <div className="bg-[#e8f3f1] min-h-screen flex justify-center">

      {/* Website container */}
      <div className="w-full max-w-[1400px]">

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
            <Route path="/search/:keyword" element={<SearchResults />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>

          <Footer />

          <ToastContainer
            position="top-center"
            autoClose={1000}
            
            toastStyle={{
              width: "250px",
              fontSize: "13px",
              padding: "8px"
            }}
          />
        </BrowserRouter>

      </div>

    </div>

  )
}

export default App