import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { loginUser } from "../../redux/auth/operations";
import { resetError } from "../../redux/auth/slice";
import { selectAuthError, selectIsLoading } from "../../redux/auth/selectors";
import css from "./AuthPages.module.css";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Geçerli bir e-posta adresi giriniz")
        .required("E-posta adresi zorunludur"),
    password: Yup.string()
        .min(6, "Parola en az 6 karakter olmalıdır")
        .required("Parola zorunludur"),
});

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(selectAuthError);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(resetError());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const result = await dispatch(loginUser(values));
            if (loginUser.fulfilled.match(result)) {
                toast.success("Başarıyla giriş yapıldı!");
                navigate("/products");
            } else {
                toast.error(result.payload || "Giriş yapılamadı");
            }
        },
    });

    return (
        <div className={css.page}>
            <div className={css.card}>
                <h1 className={css.title}>Giriş Yap</h1>
                <p className={css.subtitle}>Gökçe Cotton'a tekrar hoş geldiniz</p>

                <form onSubmit={formik.handleSubmit} className={css.form}>
                    <div className={css.field}>
                        <label>E-posta Adresi</label>
                        <input
                            type="email"
                            name="email"
                            {...formik.getFieldProps("email")}
                            placeholder="name@example.com"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className={css.fieldError}>{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className={css.field}>
                        <label>Parola</label>
                        <input
                            type="password"
                            name="password"
                            {...formik.getFieldProps("password")}
                            placeholder="Parolanızı girin"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className={css.fieldError}>{formik.errors.password}</div>
                        ) : null}
                    </div>

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
