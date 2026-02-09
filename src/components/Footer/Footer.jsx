import { Link } from "react-router-dom";
import css from "./Footer.module.css";
import hooksLogo from "../../assets/hooks-logo.png";

export const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <div className={css.section}>
                    <h3 className={css.brand}>GÖKÇE COTTON</h3>
                    <p className={css.description}>Konforunuz için birinci sınıf kaliteli pamuklu ürünler.</p>
                </div>
                <div className={css.section}>
                    <ul className={css.list}>
                        <li><Link to="/about">Hakkımızda</Link></li>
                        <li><Link to="/contact">İletişim</Link></li>
                        <li><Link to="/delivery">Teslimat ve İadeler</Link></li>
                        <li>
                            <a href="https://www.instagram.com/gokcecotton?igsh=NmptMzA5YXUxZXVs" target="_blank" rel="noopener noreferrer" className={css.instagramLink}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={css.instagramIcon}
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={css.bottom}>
                <p>&copy; {new Date().getFullYear()} Gökçe Cotton. Tüm hakları saklıdır.</p>
                <div className={css.developer}>
                    Developed by{" "}
                    <a
                        href="https://www.instagram.com/hookssoftwaresolutions?igsh=MWFmajMxYm5hMzhweQ=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css.devLink}
                    >
                        <img src={hooksLogo} alt="HOOKS Logo" className={css.devLogo} />
                        HOOKS SOFTWARE SOLUTIONS
                    </a>
                </div>
            </div>
        </footer>
    );
};
