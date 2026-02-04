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
                <h1 className={css.title}>Login</h1>
                <p className={css.subtitle}>Welcome back to Gökçe Cotton</p>

                <form onSubmit={handleSubmit} className={css.form}>
                    <div className={css.field}>
                        <label>Email Address</label>
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
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <p className={css.error}>{error}</p>}

                    <button type="submit" className={css.submitBtn} disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className={css.switch}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
