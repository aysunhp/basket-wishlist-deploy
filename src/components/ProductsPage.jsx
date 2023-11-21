import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import style from "../assets/style/productpage.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import SearchProduct from "./SerchProduct";
import { putUser } from "./../middleware/api/users";
import { getUser } from "./../middleware/api/users";
const { Meta } = Card;

const ProductsPage = ({
  fakeProducts,
  setFakeProducts,
  basket,
  setBasket,
  account,
  products,
  setProducts,
  wishlist,
  setWishlist,
}) => {
  let user = JSON.parse(localStorage.getItem("user")) || [];
  console.log(user);
  useEffect(() => {
    getUser(user.id).then((res) =>
      localStorage.setItem("basket", JSON.stringify(res.basket))
    );
  }, []);

  useEffect(() => {
    getUser(user.id).then((res) => {
      localStorage.setItem("fav", JSON.stringify(res.favorite));
    });
  }, []);
  const navigate = useNavigate();

  const addToBasket = (productId) => {
    let found = products.find((item) => item.id === productId);

    if (!basket.some((item) => item.id === found.id)) {
      let newBasket = [...basket, found];
      setBasket(newBasket);
      localStorage.setItem("basket", JSON.stringify(newBasket));

      getUser(user.id).then((res) => {
        let obj = res;
        obj.basket = newBasket;
        console.log(obj);
        console.log(basket);

        putUser(user.id, obj);
      });
    }
  };

  const toggleWishlist = (productId) => {
    let found = products.find((item) => item.id === productId);
    let check = wishlist.some((item) => item.id === found.id);

    setWishlist(
      check
        ? wishlist.filter((item) => item.id !== found.id)
        : [...wishlist, found]
    );

    localStorage.setItem(
      "fav",
      JSON.stringify(
        check
          ? wishlist.filter((item) => item.id !== found.id)
          : [...wishlist, found]
      )
    );

    {
      check
        ? getUser(user.id).then((res) => {
            let obj = res;
            obj.favorite = wishlist.filter((item) => item.id !== found.id);
            console.log(obj);

            putUser(user.id, obj);
          })
        : getUser(user.id).then((res) => {
            let obj = res;
            obj.favorite = [...wishlist, found];
            console.log(obj);

            putUser(user.id, obj);
          });
    }
  };

  return (
    <>
      <div className={style.container}>
        <h1 className={style.h1}>Products</h1>
        <SearchProduct
          products={products}
          setProducts={setProducts}
          fakeProducts={fakeProducts}
          setFakeProducts={setFakeProducts}
        />
        <br />
        <Button
          onClick={() => {
            let sorted = [...products].sort(
              (a, b) => a.unitPrice - b.unitPrice
            );
            setProducts(sorted);
          }}
        >
          Min-Max
        </Button>
        <Button
          onClick={() => {
            let sorted = [...products].sort(
              (a, b) => b.unitPrice - a.unitPrice
            );
            setProducts(sorted);
          }}
        >
          Max-Min
        </Button>
        <br />
        {products.map((product) => (
          <Card
            key={uuidv4()}
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src="https://wallpapers.com/images/hd/aesthetic-food-pictures-zbvuhugdhljixaqm.jpg"
              />
            }
          >
            <Meta title={product.name} />
            <h3>Price: $ {product.unitPrice}</h3>
            {product.discountPercentage ? (
              <div className={style.divv} style={{ backgroundColor: "green" }}>
                % {product.discountPercentage}
              </div>
            ) : null}
            <Button
              type="primary"
              id={product.id}
              className={style.btn}
              ghost
              style={{
                background: "white",
                borderColor: "black",
                color: "black",
              }}
              onClick={() => {
                {
                  account ? addToBasket(product.id) : navigate("/login");
                }
              }}
            >
              Add to Card
            </Button>
            <div
              border="none"
              id={product.id}
              className={style.div}
              onClick={() => {
                {
                  account ? toggleWishlist(product.id) : navigate("/login");
                }
              }}
            >
              <FontAwesomeIcon
                icon={faHeart}
                style={{
                  color: wishlist.some((item) => item.id === product.id)
                    ? "red"
                    : "white",
                  height: 30,
                }}
              />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
