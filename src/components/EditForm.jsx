import { Button } from "antd";
import React from "react";
import style from "../assets/style/admin.module.css";
import { putProduct } from "../middleware/api/products";

const EditForm = ({
  edit,
  products,
  setProducts,
  editName,
  editPrice,
  setEditName,
  setEditPrice,
}) => {
  return (
    <>
      <form
        action=""
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();

          if (!edit) {
            console.error("Trying to edit a non-existent item");
            return;
          }

          let edited = {
            name: editName,
            unitPrice: editPrice,
          };

          putProduct(edit.id, edited)
            .then((res) => {
              let arr = [...products];
              let idx;
              let editedProduct = arr.find((item) => item.id === res.data.id);
              products.forEach((item, i) => {
                if (item.id === editedProduct.id) {
                  idx = i;
                }
              });

              products[idx] = res.data;
              setProducts([...products]);
            })
            .catch((error) => {
              console.error("Error editing product:", error);
            });

       

          setEditName("");
          setEditPrice(0);
        }}
      >
        <input
          type="text"
          className={style.input}
          placeholder="Edit name"
          onChange={(e) => {
            setEditName(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          className={style.input}
          placeholder="Edit price"
          onChange={(e) => {
            setEditPrice(e.target.value);
          }}
        />
        <br />
      </form>
    </>
  );
};

export default EditForm;
