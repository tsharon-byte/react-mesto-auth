import { useLocation } from "react-router-dom";
import Logo from "../images/logo.svg";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import NewCurrentUserContext from "../contexts/NewCurrentUserContext";
import Hamburger from "./Hamburger/Hamburger";

const Header = ({ loggedIn, setLoggedIn }) => {
  const location = useLocation();
  const isRegistration = location.pathname.includes("sign-up");
  const email = useContext(NewCurrentUserContext).email;
  const [collapsed, setCollapsed] = useState(false);
  const handleExit = () => {
    setCollapsed(false);
    setLoggedIn(false);
    localStorage.clear();
  };
  return (
    <div className="container">
      <ul
        className={`dropdown ${
          loggedIn && collapsed ? " dropdown_visible" : ""
        }`}
      >
        <li>
          <div>{email ? email : ""}</div>
        </li>
        <li onClick={handleExit}>
          <NavLink
            className="navlink header__link navlink_type_mobile"
            to={"/react-mesto-auth/sign-in"}
          >
            Выйти
          </NavLink>
        </li>
      </ul>
      <header className="header">
        <NavLink to="/react-mesto-auth/" exact>
          <img className="header__logo" src={Logo} alt="Логотип" />
        </NavLink>
        <div className="header__account">
          <div className="header__email">{loggedIn && email ? email : ""}</div>
          <div onClick={handleExit} className="header__navigation">
            {loggedIn ? (
              <NavLink
                className="navlink navlink_type_desktop"
                to="/react-mesto-auth/sign-in"
              >
                Выйти
              </NavLink>
            ) : isRegistration ? (
              <NavLink className="navlink" to="/react-mesto-auth/sign-in">
                Войти
              </NavLink>
            ) : (
              <NavLink className="navlink" to="/react-mesto-auth/sign-up">
                Регистрация
              </NavLink>
            )}
          </div>
          {loggedIn && (
            <Hamburger collapsed={collapsed} setCollapsed={setCollapsed} />
          )}
        </div>
      </header>
    </div>
  );
};
export default Header;
