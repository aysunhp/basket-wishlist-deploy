import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import style from "../assets/style/productpage.module.css";

const { Meta } = Card;

const Wishlist = ({ products, basket, setBasket }) => {
  const [arr, setArr] = useState(JSON.parse(localStorage.getItem("fav")) || []);

  useEffect(() => {
    setArr(JSON.parse(localStorage.getItem("fav")) || []);
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    const newArr = arr.filter((item) => item.id !== productId);
    localStorage.setItem("fav", JSON.stringify(newArr));
    setArr(newArr);
  };
  const addToBasket = (productId) => {
    let found = products.find((item) => item.id === productId);

    if (!basket.some((item) => item.id === found.id)) {
      let newBasket = [...basket, found];
      setBasket(newBasket);
      localStorage.setItem("basket", JSON.stringify(newBasket));
    }
  };
  return (
    <>
      <div className={style.container}>
        <h1 className={style.h1}>Favorites</h1>
        {arr.map((product) => (
          <Card
            key={product.id}
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
            <h2>{product.name} </h2>
            <h3>Price: ${product.unitPrice}</h3>
            <Button
              type="primary"
              ghost
              style={{
                background: "white",
                borderColor: "black",
                color: "black",
                marginLeft: "35px",
              }}
              onClick={() => addToBasket(product.id)}
            >
              Add to Card
            </Button>
            <div
              border="none"
              id={product.id}
              className={style.div}
              onClick={(e) => {
                handleRemoveFromWishlist(product.id);
              }}
            >
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: "red", height: 30 }}
              />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
