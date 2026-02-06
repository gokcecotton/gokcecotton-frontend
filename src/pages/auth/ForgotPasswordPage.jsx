import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import css from "./AuthPages.module.css";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Geçerli bir e-posta adresi giriniz")
        .required("E-posta adresi zorunludur"),
});

export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const result = await dispatch(sendPasswordResetEmail(values.email));
            if (sendPasswordResetEmail.fulfilled.match(result)) {
                toast.success("Sıfırlama bağlantısı e-posta adresinize gönderildi!");
            } else {
                toast.error(result.payload || "Bir hata oluştu");
            }
        },
    });

    return (
        <div className={css.page}>
            <div className={css.card}>
                <h1 className={css.title}>Şifremi Unuttum</h1>
                <p className={css.subtitle}>
                    Şifrenizi sıfırlamak için e-posta adresinizi girin.
                </p>

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

                    <button type="submit" className={css.submitBtn} disabled={isLoading}>
                        {isLoading ? "Gönderiliyor..." : "Bağlantı Gönder"}
                    </button>
                </form>

                <p className={css.switch}>
                    Hatırladınız mı? <Link to="/login">Giriş yapın</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
