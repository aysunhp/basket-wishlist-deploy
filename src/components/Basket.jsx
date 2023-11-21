import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "../assets/style/basket.module.css";
import { Button } from "antd";
import { getUser } from "../middleware/api/users";
import { putUser } from "../middleware/api/users";
const Basket = ({ basket, setBasket }) => {
  let user = JSON.parse(localStorage.getItem("user")) || [];

  console.log(user);
  useEffect(() => {
    getUser(user.id).then((res) =>
      localStorage.setItem("basket", JSON.stringify(res.basket))
    );
  }, []);

  return (
    <>
      <div className={style.container}>
        <h1>Basket</h1>
        <table className={style.table}>
          <thead className={style.tr}>
            <th className={style.th}>ID</th>
            <th className={style.th}>Name</th>
            <th className={style.th}>Price</th>
            <th className={style.th}>Discounted</th>
            <th className={style.th}>UnitsInStock</th>
            <th className={style.th}>Delete</th>
          </thead>
          <tbody>
            {basket &&
              basket.map((product) => (
                <tr key={uuidv4()} className={style.tr}>
                  <td className={style.td}>{product.id}</td>
                  <td className={style.td}>{product.name}</td>
                  <td className={style.td}>{product.unitPrice}</td>
                  <td className={style.td}>
                    {product.discontinued ? "true" : "false"}
                  </td>
                  <td className={style.td}>{product.unitsInStock}</td>
                  <td className={style.td} style={{ width: 100 }}>
                    <Button
                      danger
                      className={style.btn}
                      id={product.id}
                      onClick={(e) => {
                        console.log(e.currentTarget.getAttribute("id"));
                        let newBasket = basket.filter(
                          (item) =>
                            item.id !== e.currentTarget.getAttribute("id")
                        );

                        localStorage.setItem(
                          "basket",
                          JSON.stringify(newBasket)
                        );
                        setBasket(newBasket);

                        getUser(user.id).then((res) => {
                          let obj = res;
                          obj.basket = newBasket;
                          console.log(obj);
                          console.log(basket);

                          putUser(user.id, obj);
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr className={style.tr}>
              <th className={style.th}>ID</th>
              <th className={style.th}>Name</th>
              <th className={style.th}>Price</th>
              <th className={style.th}>Discounted</th>
              <th className={style.th}>UnitsInStock</th>
              <th className={style.th}>Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Basket;
