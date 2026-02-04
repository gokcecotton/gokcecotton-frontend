import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/auth/operations";
import { selectAuthError, selectIsLoading } from "../../redux/auth/selectors";
import css from "./AuthPages.module.css";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectAuthError);
    const isLoading = useSelector(selectIsLoading);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    return (
        <div className={css.page}>
            <div className={css.card}>
                <h1 className={css.title}>Giriş Yap</h1>
                <p className={css.subtitle}>Gökçe Cotton'a tekrar hoş geldiniz</p>

                <form onSubmit={handleSubmit} className={css.form}>
                    <div className={css.field}>
                        <label>E-posta Adresi</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className={css.field}>
                        <label>Parola</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Parolanızı girin"
                        />
                    </div>

                    {error && <p className={css.error}>{error}</p>}

                    <button type="submit" className={css.submitBtn} disabled={isLoading}>
                        {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                    </button>
                </form>

                <p className={css.switch}>
                    Hesabınız yok mu? <Link to="/register">Buradan kayıt olun</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
