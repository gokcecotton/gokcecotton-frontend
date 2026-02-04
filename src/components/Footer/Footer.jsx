import css from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <div className={css.section}>
                    <h3 className={css.brand}>GÖKÇE COTTON</h3>
                    <p className={css.description}>Premium quality cotton products for your comfort.</p>
                </div>
                <div className={css.section}>
                    <h4>Links</h4>
                    <ul className={css.list}>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Shipping & returns</li>
                    </ul>
                </div>
                <div className={css.section}>
                    <h4>Social</h4>
                    <ul className={css.list}>
                        <li>Instagram</li>
                        <li>Facebook</li>
                    </ul>
                </div>
            </div>
            <div className={css.bottom}>
                <p>&copy; {new Date().getFullYear()} Gökçe Cotton. All rights reserved.</p>
            </div>
        </footer>
    );
};
