import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import header from "../assets/style/header.module.css";
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function HeaderSection({ account, setAccount, isAdmin, setIsAdmin }) {
  useEffect(() => {
    setAccount(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      <nav className={header.nav}>
        <div className={header.container}>
          <div className={header.div}>
            <div className="logo">
              <img
                style={{ height: 70 }}
                src="https://images.squarespace-cdn.com/content/v1/5f1155b4bacb5b1f3bf222da/6177a13b-102e-4096-8480-4b1f54d1d653/IL-Quirky%2BHand+Drawn%2BFood%2BLogo%2BIcons.png"
                alt=""
              />
            </div>
            <ul className={header.ul}>
              <li className={header.li}>
                <Link to="/" style={{ color: "darkblue", fontWeight: "bold" }}>
                  Home
                </Link>
              </li>
              {!account ? (
                <ul>
                  <li className={header.li}>
                    <Link
                      to="/login"
                      style={{ color: "darkblue", fontWeight: "bold" }}
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              ) : null}
              {!account ? (
                <ul>
                  <li className={header.li}>
                    <Link
                      to="/register"
                      style={{ color: "darkblue", fontWeight: "bold" }}
                    >
                      Register
                    </Link>
                  </li>
                </ul>
              ) : null}

              {isAdmin ? (
                <ul>
                  <li className={header.li}>
                    <Link
                      to="/admin"
                      style={{ color: "darkblue", fontWeight: "bold" }}
                    >
                      Admin Panel
                    </Link>
                  </li>
                </ul>
              ) : null}
            </ul>
          </div>
          <div className={header.div}>
            <ul className={header.ul}>
              <li className={header.li}>
                {" "}
                <Link
                  style={{ color: "darkblue", fontWeight: "bold" }}
                  to="/wishlist"
                >
                  Wishlist
                </Link>
              </li>
              <li className={header.li}>
                {" "}
                <Link
                  to="/basket"
                  style={{ color: "darkblue", fontWeight: "bold" }}
                >
                  Basket
                </Link>
              </li>

              {account ? (
                <li
                  className={header.li}
                  onClick={() => {
                    setAccount(false);
                    setIsAdmin(false);
                    localStorage.clear();
                  }}
                >
                  <Link style={{ color: "darkblue", fontWeight: "bold" }}>
                    Log out
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default HeaderSection;
