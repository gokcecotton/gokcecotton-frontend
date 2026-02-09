import css from "./ContactPage.module.css";

export const ContactPage = () => {
    return (
        <div className={css.page}>
            <div className={css.content}>
                <h1 className={css.title}>İletişim</h1>

                <p className={css.message}>
                    Tüm soru, görüş, iade, teslimat ve tavsiyeleriniz için bize aşağıdaki e-posta adresinden ulaşabilirsiniz.
                </p>

                <div className={css.emailCardWrapper}>
                    <a href="mailto:gokcecotton@gmail.com" className={css.emailCard}>
                        <div className={css.emailIcon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>
                        <span className={css.emailLink}>
                            gokcecotton@gmail.com
                        </span>
                    </a>
                </div>

                <p className={css.subtext}>
                    Size en kısa sürede dönüş yapmaktan mutluluk duyacağız.
                </p>
            </div>
        </div>
    );
};

export default ContactPage;
