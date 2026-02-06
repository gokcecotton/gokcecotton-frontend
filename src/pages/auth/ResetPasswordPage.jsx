import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import css from "./AuthPages.module.css";

const validationSchema = Yup.object({
    password: Yup.string()
        .min(6, "Parola en az 6 karakter olmalıdır")
        .required("Yeni parola zorunludur"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Parolalar eşleşmiyor")
        .required("Parola doğrulaması zorunludur"),
});

export const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const isLoading = useSelector(selectIsLoading);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            if (!token) {
                toast.error("Geçersiz veya eksik token");
                return;
            }

            const result = await dispatch(
                resetPassword({ token, newPassword: values.password })
            );

            if (resetPassword.fulfilled.match(result)) {
                toast.success("Şifreniz başarıyla sıfırlandı!");
                navigate("/products");
            } else {
                toast.error(result.payload || "Sıfırlama işlemi başarısız");
            }
        },
    });

    if (!token) {
        return (
            <div className={css.page}>
                <div className={css.card}>
                    <h1 className={css.title}>Hata</h1>
                    <p className={css.subtitle}>
                        Sıfırlama bağlantısı geçersiz veya süresi dolmuş.
                    </p>
                    <p className={css.switch}>
                        <Link to="/forgot-password">Yeni bir bağlantı iste</Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={css.page}>
            <div className={css.card}>
                <h1 className={css.title}>Yeni Şifre Belirle</h1>
                <p className={css.subtitle}>Lütfen yeni şifrenizi girin.</p>

                <form onSubmit={formik.handleSubmit} className={css.form}>
                    <div className={css.field}>
                        <label>Yeni Şifre</label>
                        <input
                            type="password"
                            name="password"
                            {...formik.getFieldProps("password")}
                            placeholder="En az 6 karakter"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className={css.fieldError}>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className={css.field}>
                        <label>Yeni Şifre (Tekrar)</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            {...formik.getFieldProps("confirmPassword")}
                            placeholder="Şifreyi onaylayın"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className={css.fieldError}>{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>

                    <button type="submit" className={css.submitBtn} disabled={isLoading}>
                        {isLoading ? "Sıfırlanıyor..." : "Şifreyi Güncelle"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
