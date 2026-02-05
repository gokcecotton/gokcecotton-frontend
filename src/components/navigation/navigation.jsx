import { useNavigate, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotalCount } from "../../redux/cart/selectors";
import { selectIsLoggedIn, selectUser, selectIsAdmin } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";
import css from "./navigation.module.css";
import logo from "../../assets/logo.png";

export const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const user = useSelector(selectUser);
  const cartCount = useSelector(selectCartTotalCount);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className={css.nav}>
      <Link to="/products" className={css.logoContainer}>
        <img src={logo} alt="Gökçe Cotton Logo" className={css.logoImage} />
        <span className={css.brandName}>GÖKÇE COTTON</span>
      </Link>

      <div className={css.actions}>
        <Link to="/wishlist" className={css.actionIcon}>
          Favorilerim
        </Link>
        <Link to="/cart" className={css.cartContainer}>
          <span>Sepetim</span>
          {cartCount > 0 && <span className={css.badge}>{cartCount}</span>}
        </Link>
        {isAdmin && (
          <Link to="/admin" className={css.adminLink}>
            Yönetim
          </Link>
        )}
        {isLoggedIn ? (
          <div className={css.userMenu}>
            <span className={css.welcomeText}>Hoşgeldiniz, {user?.name}</span>
            <Link to="/orders" className={css.profileLink}>Siparişlerim</Link>
            <button onClick={handleLogout} className={css.logoutBtn}>Çıkış Yap</button>
          </div>
        ) : (
          <Link to="/login" className={css.loginBtn}>Giriş Yap</Link>
        )}
      </div>
    </nav>
  );
};
