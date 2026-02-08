import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { registerUser } from "../../redux/auth/operations";
import { mergeLocalCart } from "../../redux/cart/operations";
import { resetError } from "../../redux/auth/slice";
import { selectAuthError, selectIsLoading } from "../../redux/auth/selectors";
import css from "./AuthPages.module.css";

const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, "Ad en az 2 karakter olmalıdır")
        .required("Ad zorunludur"),
    surname: Yup.string()
        .min(2, "Soyad en az 2 karakter olmalıdır")
        .required("Soyad zorunludur"),
    email: Yup.string()
        .email("Geçerli bir e-posta adresi giriniz")
        .required("E-posta adresi zorunludur"),
    password: Yup.string()
        .min(6, "Parola en az 6 karakter olmalıdır")
        .required("Parola zorunludur"),
});

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const error = useSelector(selectAuthError);
    const isLoading = useSelector(selectIsLoading);

    const from = location.state?.from?.pathname || "/products";

    useEffect(() => {
        dispatch(resetError());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const result = await dispatch(registerUser(values));
            if (registerUser.fulfilled.match(result)) {
                dispatch(mergeLocalCart());
                toast.success("Hesabınız başarıyla oluşturuldu!");
                navigate(from, { replace: true });
            } else {
                toast.error(result.payload || "Kayıt işlemi başarısız");
            }
        },
    });

    return (
        <div className={css.page}>
            <div className={css.card}>
                <h1 className={css.title}>Hesap Oluştur</h1>
                <p className={css.subtitle}>Gökçe Cotton ailesine katılın</p>

                <form onSubmit={formik.handleSubmit} className={css.form}>
                    <div className={css.row}>
                        <div className={css.field}>
                            <label>Ad</label>
                            <input
                                type="text"
                                name="name"
                                {...formik.getFieldProps("name")}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className={css.fieldError}>{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className={css.field}>
                            <label>Soyad</label>
                            <input
                                type="text"
                                name="surname"
                                {...formik.getFieldProps("surname")}
                            />
                            {formik.touched.surname && formik.errors.surname ? (
                                <div className={css.fieldError}>{formik.errors.surname}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className={css.field}>
                        <label>E-posta Adresi</label>
                        <input
                            type="email"
                            name="email"
                            {...formik.getFieldProps("email")}
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
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className={css.fieldError}>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button type="submit" className={css.submitBtn} disabled={isLoading}>
                        {isLoading ? "Hesap oluşturuluyor..." : "Kayıt Ol"}
                    </button>
                </form>

                <p className={css.switch}>
                    Zaten hesabınız var mı? <Link to="/login">Buradan giriş yapın</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
