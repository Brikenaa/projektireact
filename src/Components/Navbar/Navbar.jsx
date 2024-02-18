import React, { useContext, useState } from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ModalDialog from "../ModalDialog/ModalDialog";
import { Context } from "../../Context/Products";
import LangFlag from "./LangFlag";
import language from "../../lang";

const Navbar = () => {
  const [{ lang, basket }, dispatch] = useContext(Context);
  const [menuVisible, setMenuVisible] = useState(false);
  const [modal, setModal] = useState(false);

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
          {language[lang].menuHeader.map((el) => (
            <li key={el.path}>
              <NavLink to={el.path}>{el.name}</NavLink>
            </li>
          ))}


          <li className="shopallicon">
            <span onClick={() => setModal(true)} className="shopall-icon-circle">
              {(basket.length > 0) && <span>{basket.length}</span>}
              <ShoppingCartIcon />
            </span>
          </li>
          <li>
            <button onClick={() => changeLang()}>
              <LangFlag lang={lang} />
            </button>
          </li>
          <li>
            <NavLink to="/login">
              {language[lang].login}
            </NavLink>
          </li>
        </ul>
      </div>
      <ModalDialog open={modal && (basket.length > 0)} handleClose={() => setModal(false)} />
    </div>
  );
};

export default Navbar;
