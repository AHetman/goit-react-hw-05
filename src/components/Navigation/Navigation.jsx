import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";
const buildLinkClass = ({ isActive }) => {
  return clsx(css.NavLinkItem, isActive && css.active);
};
const Navigation = () => {
  return (
    <nav className={css.NavigationContainer}>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={buildLinkClass}>
        Movies
      </NavLink>
    </nav>
  );
};
export default Navigation;
