import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/orders/operations";
import { selectCartItems } from "../../redux/cart/selectors";
import { selectUser } from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import css from "./CheckoutPage.module.css";

export const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const user = useSelector(selectUser);

    const [formData, setFormData] = useState({
        street: "",
        city: "",
        zip: "",
        country: "Turkey",
        contactNumber: "",
        paymentMethod: "Credit Card",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [isGiftWrap, setIsGiftWrap] = useState(false);

    const [cardData, setCardData] = useState({
        cardHolderName: "",
        cardNumber: "",
        expireMonth: "",
        expireYear: "",
        cvc: ""
    });

    useEffect(() => {
        if (cartItems.length === 0 && !isSubmitting) {
            navigate("/cart");
        }
    }, [cartItems, navigate, isSubmitting]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (selectedAddressIndex !== null) {
            // If editing while address selected, maybe clear selection? 
            // Or just let them edit the form data which acts as "new address" data if we were saving it.
            // For now, let's keep logic simple.
        }
    };

    const handleCardChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    const handleSelectAddress = (addr, index) => {
        setSelectedAddressIndex(index);
        setFormData({
            ...formData,
            street: addr.address,
            city: addr.city,
            contactNumber: addr.telephone,
            // zip alanı user.addresses içinde yoksa boş kalabilir veya backend'e eklenebilir
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderData = {
            address: {
                street: formData.street,
                city: formData.city,
                zip: formData.zip || "00000",
                country: formData.country,
            },
            contactNumber: formData.contactNumber,
            paymentMethod: formData.paymentMethod,
            cardDetails: formData.paymentMethod === "Credit Card" ? cardData : undefined,
            isGiftWrap: isGiftWrap,
        };

        try {
            const result = await dispatch(createOrder(orderData));

            if (createOrder.fulfilled.match(result)) {
                // Direct payment success or other methods
                toast.success("Siparişiniz başarıyla alındı!");
                navigate("/profile");
            } else {
                toast.error(result.payload || "Sipariş oluşturulurken bir hata oluştu.");
            }
        } catch (error) {
            toast.error("Beklenmedik bir hata oluştu.");
            console.error(error);
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

                        {user?.addresses?.length > 0 && (
                            <div className={css.addressSelector}>
                                <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>Kayıtlı Adreslerimden Seç:</p>
                                {user.addresses.map((addr, idx) => (
                                    <div
                                        key={idx}
                                        className={`${css.addressOption} ${selectedAddressIndex === idx ? css.selectedOption : ''}`}
                                        onClick={() => handleSelectAddress(addr, idx)}
                                    >
                                        <span className={css.addressOptionTitle}>{addr.title}</span>
                                        <span className={css.addressOptionDetail}>{addr.address} - {addr.district} / {addr.city}</span>
                                        <span className={css.addressOptionDetail}>📞 {addr.telephone}</span>
                                    </div>
                                ))}
                                <div
                                    className={`${css.addressOption} ${selectedAddressIndex === null ? css.selectedOption : ''}`}
                                    onClick={() => {
                                        setSelectedAddressIndex(null);
                                        setFormData({ ...formData, street: "", city: "", zip: "", contactNumber: "" });
                                    }}
                                >
                                    <span className={css.addressOptionTitle}>+ Yeni Adres Gir</span>
                                </div>
                            </div>
                        )}

                        {/* Show form if no address selected (New Address mode) or user has no addresses */}
                        {(selectedAddressIndex === null || user?.addresses?.length === 0) && (
                            <>
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
                                        <label>Posta Kodu (Opsiyonel)</label>
                                        <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className={css.field}>
                                    <label>İletişim Numarası</label>
                                    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                                </div>
                            </>
                        )}
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

                            {formData.paymentMethod === "Credit Card" && (
                                <div className={css.creditCardForm}>
                                    <div className={css.field}>
                                        <label>Kart Üzerindeki İsim</label>
                                        <input
                                            type="text"
                                            name="cardHolderName"
                                            value={cardData.cardHolderName}
                                            onChange={handleCardChange}
                                            placeholder="Ad Soyad"
                                            required
                                        />
                                    </div>
                                    <div className={css.field}>
                                        <label>Kart Numarası</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={cardData.cardNumber}
                                            onChange={handleCardChange}
                                            placeholder="0000 0000 0000 0000"
                                            maxLength="19"
                                            required
                                        />
                                    </div>
                                    <div className={css.row}>
                                        <div className={css.field}>
                                            <label>Ay</label>
                                            <input
                                                type="text"
                                                name="expireMonth"
                                                value={cardData.expireMonth}
                                                onChange={handleCardChange}
                                                placeholder="MM"
                                                maxLength="2"
                                                required
                                            />
                                        </div>
                                        <div className={css.field}>
                                            <label>Yıl</label>
                                            <input
                                                type="text"
                                                name="expireYear"
                                                value={cardData.expireYear}
                                                onChange={handleCardChange}
                                                placeholder="YY"
                                                maxLength="2"
                                                required
                                            />
                                        </div>
                                        <div className={css.field}>
                                            <label>CVC</label>
                                            <input
                                                type="text"
                                                name="cvc"
                                                value={cardData.cvc}
                                                onChange={handleCardChange}
                                                placeholder="123"
                                                maxLength="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <label className={css.radio}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Bank Transfer"
                                    checked={formData.paymentMethod === "Bank Transfer"}
                                    onChange={handleChange}
                                />
                                <span>EFT / Havale</span>
                            </label>

                            {formData.paymentMethod === "Bank Transfer" && (
                                <div className={css.bankTransferInfo} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px', border: '1px solid #eee' }}>
                                    <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Banka Hesap Bilgileri:</p>
                                    <p>IBAN: <strong>TR11 1111 1111 1111 1111 1111 11</strong></p>
                                    <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>
                                        Lütfen açıklama kısmına sipariş numaranızı yazmayı unutmayınız.
                                    </p>
                                </div>
                            )}
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

                    <div className={css.giftWrapSection} style={{ padding: '10px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', margin: '10px 0' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}>
                            <input
                                type="checkbox"
                                checked={isGiftWrap}
                                onChange={(e) => setIsGiftWrap(e.target.checked)}
                                style={{ width: '18px', height: '18px' }}
                            />
                            <span>Hediye Paketi İstiyorum (+50.00 TL)</span>
                        </label>
                    </div>

                    <div className={css.total}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>
                            <span>Ara Toplam</span>
                            <span>{subtotal.toFixed(2)} TL</span>
                        </div>
                        {isGiftWrap && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>
                                <span>Hediye Paketi</span>
                                <span>50.00 TL</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '10px' }}>
                            <span>Ödenecek Toplam</span>
                            <span>{(subtotal + (isGiftWrap ? 50 : 0)).toFixed(2)} TL</span>
                        </div>
                    </div>
                    <button type="submit" className={css.placeOrderBtn} disabled={isSubmitting || cartItems.length === 0}>
                        {isSubmitting ? "Sipariş İşleniyor..." : "Siparişi Tamamla"}
                    </button>
                    {isSubmitting && <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9rem' }}>Ödeme işlemi biraz zaman alabilir, lütfen bekleyiniz...</p>}
                </aside>
            </form>
        </div>
    );
};

export default CheckoutPage;
