// import React from "react";
// import axios from "axios";
// import style from "../assets/style/admin.module.css";
// import { Button } from "antd";

// const AddForm = ({
//   proName,
//   setProName,
//   proPrice,
//   setProPrice,
//   products,
//   setProducts,
// }) => {
//   return (
//     <>
//       <AddForm />

//       <form
//         className={style.form}
//         action=""
//         onSubmit={(e) => {
//           e.preventDefault();
//         }}
//       >
//         <input
//           type="text"
//           className={style.input}
//           placeholder="Enter product name"
//           value={proName}
//           onChange={(e) => {
//             setProName(e.target.value);
//           }}
//         />
//         <input
//           type="number"
//           className={style.input}
//           placeholder="Enter product price"
//           value={proPrice}
//           onChange={(e) => {
//             setProPrice(e.target.value);
//           }}
//         />
//         <br />
//         <Button
//           className={style.btn}
//           type="submit"
//           onClick={(e) => {
//             e.preventDefault();
//             let obj = {
//               name: proName,
//               unitPrice: proPrice,
//             };

//             setProName("");
//             setProPrice(0);
//             axios
//               .post(
//                 "https://6556162184b36e3a431efcfa.mockapi.io/api/products",
//                 obj
//               )
//               .then((res) => {
//                 setProducts([...products, res.data]);
//               });
//           }}
//         >
//           Add
//         </Button>
//       </form>
//     </>
//   );
// };

// export default AddForm;
