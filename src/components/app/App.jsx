import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SharedLayout } from "../SharedLayout/SharedLayout";
import { refreshUser } from "../../redux/auth/operations";
import RestrictedRoute from "../../routes/RestrictedRoute";
import PrivateRoute from "../../routes/PrivateRoute";
import AdminRoute from "../../routes/AdminRoute";
import { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import { Loader } from "../loader/loader";

const HomePage = lazy(() =>
  import("../../pages/home/HomePage").then((m) => ({ default: m.HomePage })),
);
const ProductsPage = lazy(() => import("../../pages/products/ProductsPage"));
const ProductDetailsPage = lazy(
  () => import("../../pages/products/ProductDetailsPage"),
);
const CartPage = lazy(() => import("../../pages/cart/CartPage"));
const LoginPage = lazy(() => import("../../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../../pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(
  () => import("../../pages/auth/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(
  () => import("../../pages/auth/ResetPasswordPage"),
);
const CheckoutPage = lazy(() => import("../../pages/checkout/CheckoutPage"));
const ProfilePage = lazy(() => import("../../pages/profile/ProfilePage"));
const WishlistPage = lazy(() => import("../../pages/wishlist/WishlistPage"));
const AdminPage = lazy(() => import("../../pages/admin/AdminPage"));
const AboutPage = lazy(() => import("../../pages/info/AboutPage"));
const ContactPage = lazy(() => import("../../pages/info/ContactPage"));
const DeliveryPage = lazy(() => import("../../pages/info/DeliveryPage"));

function App() {
  const dispatch = useDispatch();
  const isAuthLoading = useSelector((state) => state.auth.isLoading);
  const isAuthRefreshing = useSelector((state) => state.auth.isRefreshing);
  const isProductsLoading = useSelector((state) => state.products.isLoading);
  const isOrdersLoading = useSelector((state) => state.orders.isLoading);
  const isCartLoading = useSelector((state) => state.cart.isLoading);
  const isWishlistLoading = useSelector((state) => state.wishlist.isLoading);
  const isCategoriesLoading = useSelector(
    (state) => state.categories.isLoading,
  );

  const isLoading =
    isAuthLoading ||
    isAuthRefreshing ||
    isProductsLoading ||
    isOrdersLoading ||
    isCartLoading ||
    isWishlistLoading ||
    isCategoriesLoading;

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <Suspense fallback={<Loader />}>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<SharedLayout />}>
            <Route path="products" element={<ProductsPage />} />
            <Route
              path="products/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="cart" element={<CartPage />} />

            <Route
              path="login"
              element={
                <RestrictedRoute redirectTo="/products">
                  <LoginPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="register"
              element={
                <RestrictedRoute redirectTo="/products">
                  <RegisterPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="forgot-password"
              element={
                <RestrictedRoute redirectTo="/products">
                  <ForgotPasswordPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="reset-password"
              element={
                <RestrictedRoute redirectTo="/products">
                  <ResetPasswordPage />
                </RestrictedRoute>
              }
            />
            {/* Hatalı link yapılarını yakalamak için ek rota */}
            <Route
              path="api/auth/reset-password"
              element={
                <RestrictedRoute redirectTo="/products">
                  <ResetPasswordPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="api/auth//reset-password"
              element={
                <RestrictedRoute redirectTo="/products">
                  <ResetPasswordPage />
                </RestrictedRoute>
              }
            />

            <Route
              path="checkout"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="wishlist"
              element={
                <PrivateRoute>
                  <WishlistPage />
                </PrivateRoute>
              }
            />

            <Route
              path="admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />

            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            <Route
              path="*"
              element={
                <div className={css.notFound}>
                  <h2>404 - Sayfa Bulunamadı</h2>
                  <p>Aradığınız sayfa mevcut değil veya yer değiştirmiş.</p>
                </div>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
