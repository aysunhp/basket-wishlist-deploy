import React from "react";
import { Button, Input } from "antd";
import style from "../assets/style/login.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { postUser } from "../middleware/api/users";
const Register = ({
  setRName,
  setRPass,
  setEmail,
  setUsers,
  rname,
  rpass,
  email,
}) => {
  const navigate = useNavigate();
  return (
    <form
      action=""
      className={style.form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input
        type="text"
        className={style.input}
        value={rname}
        placeholder="Enter username"
        onChange={(e) => {
          setRName(e.target.value);
        }}
      />
      <br />
      <Input
        type="password"
        className={style.input}
        value={rpass}
        placeholder="Enter password"
        onChange={(e) => {
          setRPass(e.target.value);
        }}
      />
      <br />
      <Input
        type="email"
        className={style.input}
        value={email}
        placeholder="Enter email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />

      <Button
        className={style.btn}
        onClick={() => {
          let newUser = {
            username: rname,
            email: email,
            password: rpass,
            isAdmin: "false",
          };

          postUser(newUser).then((res) => {
            setUsers(res.data);
          });

          setRName("");
          setRPass("");
          setEmail("");
          navigate("/login");
        }}
      >
        Sign in
      </Button>
    </form>
  );
};

export default Register;
