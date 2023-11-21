import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import style from "../assets/style/login.module.css";
import { getAllUsers } from "../middleware/api/users";

const Login = ({
  active,
  name,
  pass,
  setName,
  setPass,
  setActive,
  setRName,
  setRPass,
  setEmail,
  rname,
  rpass,
  setUser,
  setAccount,
  setIsAdmin,
  isAdmin,
}) => {
  const [users, setUsers] = useState([]);
  const [newuser, setNewUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <>
      <div className="containerr">
        <form
          className={style.form}
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            size="large"
            className={style.input}
            placeholder="Enter username"
            prefix={<UserOutlined />}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <br />
          <Input
            type="password"
            className={style.input}
            size="large"
            placeholder="Enter password"
            prefix={<UserOutlined />}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          {console.log(users)}
          {console.log(newuser)}
          <br />
          <Button
            className={style.btn}
            onClick={() => {
              let newUser = users.find(
                (item) => item.username == name && item.password == pass
              );
              console.log(newUser);
              setNewUser(newUser);
              {
                newUser ? navigate("/") : console.log("yoxdu");
              }
              localStorage.setItem("user", JSON.stringify(newUser));
              newUser.isAdmin != "false" ? setIsAdmin(true) : null;
              setAccount(true);
            }}
          >
            Log in
          </Button>
          <br />
          <p>
            Need an acount?
            <span
              className="register"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
