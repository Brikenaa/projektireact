import React, { useContext, useState } from "react";
import "../Assets/styles/Navbar.scss";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import ModalDialog from "../ModalDialog/ModalDialog";
import { Context } from "../../Context/Products";
import "./style.css"

const Navbar = () => {
  const [{ lang, basket }, dispatch] = useContext(Context);
  const [menuVisible, setMenuVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const enteredUsername = event.target.username.value;
    const enteredPassword = event.target.password.value;

    // For simplicity, let's assume the login is successful
    localStorage.setItem('username', enteredUsername);
    setUsername(enteredUsername);
    setShowModal(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const changeLang = () => {
    const setLang = lang === "sq" ? "en" : "sq";
    localStorage.setItem("lang", setLang);
    dispatch({
      type: "LANG",
      payland: { lang: setLang }
    })
  }

  console.log("Lang", lang)
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <NavLink to="/" className="logo-link">
          <h1>
            Sneak<span>Peak</span>
          </h1>
        </NavLink>

        <div className="menu-icon" onClick={toggleMenu}>
          <MenuIcon />
        </div>
        <ul className={`nav-links ${menuVisible ? "active" : ""}`}>
          
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          
          <li>
            <NavLink to="/shopall">Shop</NavLink>
          </li>
          {username ? (
  <div className="welcome-message">
    <p>Welcome, {username}!</p>
    <button onClick={handleLogout}>Logout</button>
  </div>
) : (
  <button className="login-button" onClick={handleLogin}>Login</button>
)}
         {showModal && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleModalClose}>&times;</span>
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label className="login-label">Username:</label>
          <input className="login-input" type="text" name="username" />
        </div>
        <div>
          <label className="login-label">Password:</label>
          <input className="login-input" type="password" name="password" />
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  </div>
)}
          
          &nbsp;&nbsp;&nbsp;
          
          <li className="shopallicon">
            <span onClick={() => setModal(true)} className="shopall-icon-circle">
            <ShoppingCartIcon />
              {(basket.length > 0) && <span>{basket.length}</span>}
              
            </span>
          </li>
        </ul>

      </div>
      <ModalDialog open={modal && (basket.length > 0)} handleClose={() => setModal(false)} />
    </div>
  );
};

export default Navbar;
