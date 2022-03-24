import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  MobileIcon,
  Nav,
  NavbarContainer,
  NavItem,
  NavLinks,
  NavLogo,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavBtnLinkGuest,
  NavBtnLinkAdmin,
  NavBtnLinkEmployee,
} from "./NavbarElements";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const logOutPls = () => {
    // Logs out of the account by clearing session data.
    localStorage.token_data = "";
    document.cookie="session=;max-age=0";
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo onClick={toggleHome} to="/">
              Hotel Knightro
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavBtn>
              {/* This is what we in the business call "black magic sorcery." It literally pulls roles out of the void (the JWT) */}
              {/* admin */}
              {
                localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "admin" ? <NavBtnLinkAdmin to="/admin">Rooms</NavBtnLinkAdmin>  : null) : null
              }
              {
                localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "admin" ? <NavBtnLinkAdmin to="/registeraccount">Register Account</NavBtnLinkAdmin>  : null) : null
              }
              {
                localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "admin" ? <NavBtnLink to="/inventory">Inventory</NavBtnLink>  : null) : null
              }
              {
                localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "admin" ? <NavBtnLink to="/checkout">Check Out</NavBtnLink>  : null) : null
              }
              {/* employee */}
              {
                localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "employee" ? <NavBtnLinkEmployee to="/orders">Orders</NavBtnLinkEmployee>  : null) : null
              }
              {/* guest */}
              {
                localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "guest" ? <NavBtnLinkGuest to="/guest">Services</NavBtnLinkGuest>  : null) : null
              }
              {/* All */}
              {
                localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "none" ? null  : <NavBtnLink to="/settings">Settings</NavBtnLink>) : null
              }
              {
                localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "none" ? <NavBtnLink to="/signin">Sign In</NavBtnLink>  : <NavBtnLink onClick={logOutPls} to="/">Sign Out</NavBtnLink>) : <NavBtnLink onClick={logOutPls} to="/signin">Sign In</NavBtnLink>
              }
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
