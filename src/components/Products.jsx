import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Modal, Form, Input, message } from "antd";
import style from "../assets/style/admin.module.css";
import EditForm from "./EditForm";
import { deleteProduct } from "../middleware/api/products";
// import AddForm from "./AddForm";

const Products = ({
  products,
  setProducts,
  user,
  setUser,
  proName,
  setProName,
  proPrice,
  setProPrice,
  formactive,
  setFormActive,
}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState(0);

  const showEditModal = (product) => {
    setEditProduct(product);
    setEditName(product.name);
    setEditPrice(product.unitPrice);
    setVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedProduct = await fetch(
        "https://6556162184b36e3a431efcfa.mockapi.io/api/products/" +
          editProduct.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editName,
            unitPrice: editPrice,
          }),
        }
      ).then((response) => response.json());
      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
      setEditProduct(null);
      setVisible(false);
      message.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Failed to update product");
    }
  };

  const handleDelete = async (productId) => {
    try {
      deleteProduct(productId);

      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      message.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product");
    }
  };

  return (
    <>
      <div>
        <table variant="sm" className={style.table}>
          <thead className={style.tr}>
            <>
              <th className={style.th}>ID</th>
              <th className={style.th}>Name</th>
              <th className={style.th}>Price</th>
              <th className={style.th}>Discounted</th>
              <th className={style.th}>UnitsInStock</th>
              <th className={style.th}>Edit</th>
              <th className={style.th}>Delete</th>
            </>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={uuidv4()} className={style.tr}>
                <td className={style.td}>{product.id}</td>
                <td className={style.td}>{product.name}</td>
                <td className={style.td}>{product.unitPrice}</td>
                <td className={style.td}>
                  {product.discontinued ? "true" : "false"}
                </td>
                <td className={style.td}>{product.unitsInStock}</td>
                <th className={style.td}>
                  <Button onClick={() => showEditModal(product)}>Edit</Button>
                </th>
                <th className={style.td}>
                  <Button onClick={() => handleDelete(product.id)}>
                    Delete
                  </Button>
                </th>
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
              <th className={style.th}>Edit</th>
              <th className={style.th}>Delete</th>
            </tr>
          </tfoot>
        </table>

        <Modal
          title="Edit Product"
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setEditProduct(null);
          }}
          onOk={handleUpdate}
        >
          <EditForm
            form={form}
            editProduct={editProduct}
            setEditName={setEditName}
            setEditPrice={setEditPrice}
          />
        </Modal>
      </div>
    </>
  );
};

export default Products;
