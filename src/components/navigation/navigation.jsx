import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotalCount } from "../../redux/cart/selectors";
import { selectIsLoggedIn, selectUser, selectIsAdmin } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";
import css from "./navigation.module.css";
import logo from "../../assets/logo.png";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const user = useSelector(selectUser);
  const cartCount = useSelector(selectCartTotalCount);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    closeMenu();
    navigate("/login");
  };

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <nav className={css.nav}>
      <Link to="/products" className={css.logoContainer} onClick={closeMenu}>
        <img src={logo} alt="Gökçe Cotton Logo" className={css.logoImage} />
        <span className={css.brandName}>GÖKÇE COTTON</span>
      </Link>

      <button
        className={`${css.hamburger} ${isMenuOpen ? css.active : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${css.navContent} ${isMenuOpen ? css.show : ""}`}>
        <div className={css.actions}>
          <Link to="/products" className={css.mobileOnly} onClick={closeMenu}>
            Ürünler
          </Link>
          <Link to="/wishlist" className={css.actionIcon} onClick={closeMenu}>
            Favorilerim
          </Link>
          <Link to="/cart" className={css.cartContainer} onClick={closeMenu}>
            <span>Sepetim</span>
            {cartCount > 0 && <span className={css.badge}>{cartCount}</span>}
          </Link>

          {isLoggedIn ? (
            <div className={css.userMenu}>
              <span className={css.welcomeText}>Hoşgeldiniz, {user?.name}</span>
              <Link to="/profile" className={css.profileLink} onClick={closeMenu}>Profilim</Link>
              {isAdmin && (
                <Link to="/admin" className={css.adminLink} onClick={closeMenu}>
                  Yönetim
                </Link>
              )}
              <button onClick={handleLogout} className={css.logoutBtn}>Çıkış Yap</button>
            </div>
          ) : (
            <Link to="/login" className={css.loginBtn} onClick={closeMenu}>Giriş Yap</Link>
          )}
        </div>
      </div>

      {isMenuOpen && <div className={css.backdrop} onClick={closeMenu}></div>}
    </nav>
  );
};
