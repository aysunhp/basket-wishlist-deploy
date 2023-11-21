import React from "react";
import { Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Layout from "./Layout";
import axios from "axios";
import Login from "./Login";
import Products from "./Products";
import Register from "./Register";
import HeaderSection from "./HeaderSection";
import ProductsPage from "./ProductsPage";
import Wishlist from "./Wishlist";
import Basket from "./Basket";
import LogOut from "./LogOut";
import { getAllProducts } from "./../middleware/api/products";
import { getAllUsers } from "./../middleware/api/users";
const Userpage = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [fakeProducts, setFakeProducts] = useState([]);
  const [active, setActive] = useState(false);
  const [rname, setRName] = useState("");
  const [rpass, setRPass] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(true);
  const [user, setUser] = useState([]);
  // const [basket, setBasket] = useState([]);
  const [account, setAccount] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const aysun = useRef();
  
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem("basket")) || []
  );
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("fav")) || []
  );

  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res);
      setFakeProducts(res);
      console;
    });
  }, []);

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HeaderSection
                account={account}
                setAccount={setAccount}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            }
          >
            <Route
              index
              element={
                <ProductsPage
                  products={products}
                  setProducts={setProducts}
                  basket={basket}
                  setBasket={setBasket}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  fakeProducts={fakeProducts}
                  setFakeProducts={setFakeProducts}
                  account={account}
                />
              }
            />

            <Route
              path="login"
              element={
                <Login
                  setName={setName}
                  setPass={setPass}
                  setActive={setActive}
                  name={name}
                  pass={pass}
                  active={active}
                  setRName={setRName}
                  setRPass={setRPass}
                  setEmail={setEmail}
                  setAdmin={setAdmin}
                  rname={rname}
                  rpass={rpass}
                  email={email}
                  aysun={aysun}
                  account={account}
                  setAccount={setAccount}
                  setUser={setUser}
                  isAdmin={isAdmin}
                  setIsAdmin={setIsAdmin}
                />
              }
            />
            <Route
              path="admin"
              element={
                <Products
                  products={products}
                  setProducts={setProducts}
                  fakeProducts={fakeProducts}
                  setFakeProducts={setFakeProducts}
                  setActive={setActive}
                  user={user}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="register"
              element={
                <Register
                  setRName={setRName}
                  setRPass={setRPass}
                  setEmail={setEmail}
                  setUsers={setUsers}
                  rname={rname}
                  rpass={rpass}
                  email={email}
                />
              }
            />
            <Route path="account" element={<Register />} />
            <Route path="logout" element={<LogOut />} />
            <Route
              path="wishlist"
              element={
                <Wishlist
                  products={products}
                  basket={basket}
                  setBasket={setBasket}
                />
              }
            />
            <Route
              path="basket"
              element={<Basket basket={basket} setBasket={setBasket} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Userpage;
