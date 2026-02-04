import css from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <div className={css.section}>
                    <h3 className={css.brand}>GÖKÇE COTTON</h3>
                    <p className={css.description}>Konforunuz için birinci sınıf kaliteli pamuklu ürünler.</p>
                </div>
                <div className={css.section}>
                    <h4>Bağlantılar</h4>
                    <ul className={css.list}>
                        <li>Hakkımızda</li>
                        <li>İletişim</li>
                        <li>Teslimat ve İadeler</li>
                    </ul>
                </div>
                <div className={css.section}>
                    <h4>Sosyal Medya</h4>
                    <ul className={css.list}>
                        <li>Instagram</li>
                        <li>Facebook</li>
                    </ul>
                </div>
            </div>
            <div className={css.bottom}>
                <p>&copy; {new Date().getFullYear()} Gökçe Cotton. Tüm hakları saklıdır.</p>
            </div>
        </footer>
    );
};
