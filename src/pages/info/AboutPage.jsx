import css from "./AboutPage.module.css";

export const AboutPage = () => {
    return (
        <div className={css.page}>
            <div className={css.content}>
                <h1 className={css.title}>Hikayemiz</h1>

                <div className={css.story}>
                    <p>
                        <span className={css.highlight}>Gökçe Cotton</span>, doğallığın ve sadeliğin değerini bilenler için doğdu.<br />
                        Her şey pamukla başladı… Nefes alan, yumuşacık ve cilde dost dokularla.
                    </p>

                    <p>
                        Ürünlerimizde önceliğimiz her zaman %100 pamuk ve müslin.<br />
                        Bebeklerin hassas tenine, kadınların günlük konforuna ve evinizin doğal şıklığına uyum sağlayan parçalar tasarlıyoruz.
                    </p>

                    <div className={css.highlight}>Gökçe Cotton’da her ürün;</div>
                    <ul className={css.features}>
                        <li>🌿 doğal,</li>
                        <li>🧵 özenle seçilmiş kumaşlardan,</li>
                        <li>🤍 güvenle kullanabileceğiniz kalite anlayışıyla hazırlanır.</li>
                    </ul>

                    <p>
                        Modası geçmeyen, zamansız ve sade tasarımlarla;<br />
                        doğallığı hayatın her anına taşımayı amaçlıyoruz.
                    </p>

                    <p className={css.footerNote}>
                        "Çünkü, doğal olan her şey gibi, en güzeli de bu."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
