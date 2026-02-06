import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/orders/operations";
import { selectCartItems } from "../../redux/cart/selectors";
import css from "./CheckoutPage.module.css";

export const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);

    const [formData, setFormData] = useState({
        street: "",
        city: "",
        zip: "",
        country: "Turkey",
        contactNumber: "",
        paymentMethod: "Credit Card",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (cartItems.length === 0 && !isSubmitting) {
            navigate("/cart");
        }
    }, [cartItems, navigate, isSubmitting]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderData = {
            address: {
                street: formData.street,
                city: formData.city,
                zip: formData.zip,
                country: formData.country,
            },
            contactNumber: formData.contactNumber,
            paymentMethod: formData.paymentMethod,
        };

        try {
            const result = await dispatch(createOrder(orderData));

            if (createOrder.fulfilled.match(result)) {
                if (result.payload?.paymentMethod === "Credit Card" && result.payload.paymentUrl) {
                    window.location.href = result.payload.paymentUrl;
                } else {
                    navigate("/profile");
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => {
        const price = item.productId?.price || 0;
        const qty = item.quantity || 0;
        return acc + (price * qty);
    }, 0);

    return (
        <div className={css.page}>
            <h1 className={css.title}>Ödeme</h1>

            <form onSubmit={handleSubmit} className={css.container}>
                <div className={css.billing}>
                    <section className={css.section}>
                        <h3>Teslimat Adresi</h3>
                        <div className={css.field}>
                            <label>Sokak/Cadde Adresi</label>
                            <input type="text" name="street" value={formData.street} onChange={handleChange} required />
                        </div>
                        <div className={css.row}>
                            <div className={css.field}>
                                <label>Şehir</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                            </div>
                            <div className={css.field}>
                                <label>Posta Kodu</label>
                                <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className={css.field}>
                            <label>İletişim Numarası</label>
                            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                        </div>
                    </section>

                    <section className={css.section}>
                        <h3>Ödeme Yöntemi</h3>
                        <div className={css.radioGroup}>
                            <label className={css.radio}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Credit Card"
                                    checked={formData.paymentMethod === "Credit Card"}
                                    onChange={handleChange}
                                />
                                <span>Kredi Kartı (Iyzico ile Güvenli)</span>
                            </label>
                            <label className={css.radio}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Cash on Delivery"
                                    checked={formData.paymentMethod === "Cash on Delivery"}
                                    onChange={handleChange}
                                />
                                <span>Kapıda Ödeme</span>
                            </label>
                            <label className={css.radio}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Bank Transfer"
                                    checked={formData.paymentMethod === "Bank Transfer"}
                                    onChange={handleChange}
                                />
                                <span>Banka Havalesi</span>
                            </label>
                        </div>
                    </section>
                </div>

                <aside className={css.summary}>
                    <h3>Sipariş Özeti</h3>
                    <div className={css.items}>
                        {cartItems.map(item => (
                            <div key={item._id} className={css.summaryItem}>
                                <span>{item.productId?.title} x {item.quantity}</span>
                                <span>{(item.productId?.price * item.quantity).toFixed(2)} TL</span>
                            </div>
                        ))}
                    </div>
                    <div className={css.total}>
                        <span>Ödenecek Toplam</span>
                        <span>{subtotal.toFixed(2)} TL</span>
                    </div>
                    <button type="submit" className={css.placeOrderBtn} disabled={isSubmitting || cartItems.length === 0}>
                        {isSubmitting ? "Sipariş Oluşturuluyor..." : "Siparişi Tamamla"}
                    </button>
                </aside>
            </form>
        </div>
    );
};

export default CheckoutPage;
