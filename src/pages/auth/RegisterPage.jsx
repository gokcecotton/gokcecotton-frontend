import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/auth/operations";
import { selectAuthError, selectIsLoading } from "../../redux/auth/selectors";
import css from "./AuthPages.module.css";

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectAuthError);
    const isLoading = useSelector(selectIsLoading);

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div className={css.page}>
            <div className={css.card}>
                <h1 className={css.title}>Create Account</h1>
                <p className={css.subtitle}>Join Gökçe Cotton family</p>

                <form onSubmit={handleSubmit} className={css.form}>
                    <div className={css.row}>
                        <div className={css.field}>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={css.field}>
                            <label>Surname</label>
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={css.field}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
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
                        />
                    </div>

                    {error && <p className={css.error}>{error}</p>}

                    <button type="submit" className={css.submitBtn} disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className={css.switch}>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
