import { useNavigate, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotalCount } from "../../redux/cart/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";
import css from "./navigation.module.css";
import logo from "../../assets/logo.png";

export const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartCount = useSelector(selectCartTotalCount);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className={css.nav}>
      <div className={css.logoContainer}>
        <Link to="/">
          <img src={logo} alt="Gökçe Cotton Logo" className={css.logoImage} />
        </Link>
        <span className={css.brandName}>GÖKÇE COTTON</span>
      </div>

      <div className={css.links}>
        <NavLink to="/" className={({ isActive }) => isActive ? css.activeLink : css.link}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? css.activeLink : css.link}>
          Shop
        </NavLink>
      </div>

      <div className={css.actions}>
        <Link to="/wishlist" className={css.actionIcon}>
          Wishlist
        </Link>
        <Link to="/cart" className={css.cartContainer}>
          <span>Cart</span>
          {cartCount > 0 && <span className={css.badge}>{cartCount}</span>}
        </Link>
        {isLoggedIn ? (
          <div className={css.userMenu}>
            <Link to="/orders" className={css.profileLink}>Orders</Link>
            <button onClick={handleLogout} className={css.logoutBtn}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className={css.loginBtn}>Login</Link>
        )}
      </div>
    </nav>
  );
};
