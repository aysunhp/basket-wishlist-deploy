import React from "react";
import { Input, Button } from "antd";
import style from "../assets/style/login.module.css";

const SearchProduct = ({
  products,
  setProducts,
  fakeProducts,
  setFakeProducts,
}) => {
  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={style.div}>
          <Input
            className={style.input}
            style={{ width: 800, display: "block" }}
            type="text"
            placeholder="Search product"
            onKeyUp={(e) => {
              let founds = products;
              founds = fakeProducts.filter((product) =>
                product.name.toLowerCase().includes(e.target.value)
              );
              setProducts(founds);
            }}
          />
        </div>
        <br />
      </form>
    </>
  );
};

export default SearchProduct;
