import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/orders/operations";
import { selectCartItems } from "../../redux/cart/selectors";
import { selectUser } from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import css from "./CheckoutPage.module.css";
import iyzicoLogo from "../../assets/iyzico_ile_ode_colored.png";

export const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const isGiftWrap = useSelector((state) => state.cart.isGiftWrap);
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

  const [cardData, setCardData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expireMonth: "",
    expireYear: "",
    cvc: "",
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
      cardDetails:
        formData.paymentMethod === "Credit Card" ? cardData : undefined,
    };

    try {
      const result = await dispatch(createOrder(orderData));

      if (createOrder.fulfilled.match(result)) {
        // Direct payment success or other methods
        toast.success("Siparişiniz başarıyla alındı!");
        navigate("/profile");
      } else {
        toast.error(
          result.payload || "Sipariş oluşturulurken bir hata oluştu.",
        );
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
    return acc + price * qty;
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
                <p className={css.addressSelectorTitle}>
                  Kayıtlı Adreslerimden Seç:
                </p>
                {user.addresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className={`${css.addressOption} ${selectedAddressIndex === idx ? css.selectedOption : ""}`}
                    onClick={() => handleSelectAddress(addr, idx)}
                  >
                    <span className={css.addressOptionTitle}>{addr.title}</span>
                    <span className={css.addressOptionDetail}>
                      {addr.address} - {addr.district} / {addr.city}
                    </span>
                    <span className={css.addressOptionDetail}>
                      📞 {addr.telephone}
                    </span>
                  </div>
                ))}
                <div
                  className={`${css.addressOption} ${selectedAddressIndex === null ? css.selectedOption : ""}`}
                  onClick={() => {
                    setSelectedAddressIndex(null);
                    setFormData({
                      ...formData,
                      street: "",
                      city: "",
                      zip: "",
                      contactNumber: "",
                    });
                  }}
                >
                  <span className={css.addressOptionTitle}>
                    + Yeni Adres Gir
                  </span>
                </div>
              </div>
            )}

            {/* Show form if no address selected (New Address mode) or user has no addresses */}
            {(selectedAddressIndex === null ||
              user?.addresses?.length === 0) && (
                <>
                  <div className={css.field}>
                    <label>Sokak/Cadde Adresi</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={css.row}>
                    <div className={css.field}>
                      <label>Şehir</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={css.field}>
                      <label>Posta Kodu (Opsiyonel)</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={css.field}>
                    <label>İletişim Numarası</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                    />
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
                <div className={css.paymentLogos}>
                  <img
                    src={iyzicoLogo}
                    alt="iyzico"
                    className={css.iyzicoLogo}
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className={css.brandLogo}
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                    className={css.brandLogo}
                  />
                </div>
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
                <div className={css.bankTransferInfo}>
                  <p className={css.bankTransferTitle}>
                    Banka Hesap Bilgileri:
                  </p>
                  <p>TC Zraat Bankası</p>
                  <p>
                    IBAN: <strong>TR82 0001 0019 4058 6871 1250 08</strong>
                  </p>
                  <p>Gökçen Korçak</p>
                  <p className={css.bankTransferHelperText}>
                    Lütfen açıklama kısmına sipariş numaranızı yazmayı
                    unutmayınız.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className={css.summary}>
          <h3>Sipariş Özeti</h3>
          <div className={css.items}>
            {cartItems.map((item) => (
              <div key={item._id} className={css.summaryItem}>
                <span>
                  {item.productId?.title} x {item.quantity}
                </span>
                <span>
                  {(item.productId?.price * item.quantity).toFixed(2)} TL
                </span>
              </div>
            ))}
          </div>

          <div className={css.giftWrapSection}>
            <label className={css.giftWrapLabel}>
              <span>Hediye Paketi İstiyorum (+50.00 TL)</span>
            </label>
          </div>

          <div className={css.summaryItem}>
            <span>Kargo</span>
            <span>{subtotal >= 850 ? "Ücretsiz" : "135.00 TL"}</span>
          </div>

          <div className={css.total}>
            <div className={css.summaryRow}>
              <span>Ara Toplam</span>
              <span>{subtotal.toFixed(2)} TL</span>
            </div>
            {isGiftWrap && (
              <div className={css.summaryRow}>
                <span>Hediye Paketi</span>
                <span>50.00 TL</span>
              </div>
            )}
            <div className={css.totalAmountRow}>
              <span>Ödenecek Toplam</span>
              <span>
                {(
                  subtotal +
                  (isGiftWrap ? 50 : 0) +
                  (subtotal >= 850 ? 0 : 135)
                ).toFixed(2)}{" "}
                TL
              </span>
            </div>
          </div>
          <button
            type="submit"
            className={css.placeOrderBtn}
            disabled={isSubmitting || cartItems.length === 0}
          >
            {isSubmitting ? "Sipariş İşleniyor..." : "Siparişi Tamamla"}
          </button>
          {isSubmitting && (
            <p className={css.submitStatus}>
              Ödeme işlemi biraz zaman alabilir, lütfen bekleyiniz...
            </p>
          )}
        </aside>
      </form>
    </div>
  );
};

export default CheckoutPage;
