import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCart, updateCartItem, removeCartItem, clearCart, updateGiftWrap } from "../../redux/cart/operations";
import {
    updateCartItemLocal,
    removeFromCartLocal,
    clearCartLocal,
    updateGiftWrapLocal
} from "../../redux/cart/slice";
import { selectCartItems, selectIsLoading } from "../../redux/cart/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./CartPage.module.css";
import noImage from "../../assets/logo-yazili.png";

export const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const isGiftWrap = useSelector(state => state.cart.isGiftWrap);
    const isLoading = useSelector(selectIsLoading);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchCart());
        }
    }, [dispatch, isLoggedIn]);

    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        if (isLoggedIn) {
            dispatch(updateCartItem({ itemId, quantity: newQuantity }));
        } else {
            dispatch(updateCartItemLocal({ itemId, quantity: newQuantity }));
        }
    };

    const handleRemove = (itemId) => {
        if (isLoggedIn) {
            dispatch(removeCartItem(itemId));
        } else {
            dispatch(removeFromCartLocal(itemId));
        }
    };

    const handleClear = () => {
        if (isLoggedIn) {
            dispatch(clearCart());
        } else {
            dispatch(clearCartLocal());
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => {
        // Assuming productId is populated and contains the price
        const itemPrice = item.productId?.price || 0;
        const itemQty = item.quantity || 0;
        return acc + (itemPrice * itemQty);
    }, 0);

    const handleGiftWrapChange = (checked) => {
        if (isLoggedIn) {
            dispatch(updateGiftWrap(checked));
        } else {
            dispatch(updateGiftWrapLocal(checked));
        }
    };

    const shippingCost = totalPrice >= 850 ? 0 : 135;

    if (isLoading) {
        return <div className={css.loading}>Sepetiniz yükleniyor...</div>;
    }

    return (
        <div className={css.page}>
            <h1 className={css.title}>Alışveriş Sepetiniz</h1>

            {cartItems.length === 0 ? (
                <div className={css.empty}>
                    <p>Sepetiniz şu anda boş.</p>
                    <Link to="/products" className={css.shopBtn}>Alışverişe Başla</Link>
                </div>
            ) : (
                <div className={css.container}>
                    <div className={css.itemsList}>
                        {cartItems.map((item) => {
                            // ... existing item rendering ...
                            const product = item.productId;
                            if (!product) return null;

                            return (
                                <div key={item._id} className={css.item}>
                                    <img src={product.images?.[0] || noImage} alt={product.title} className={css.itemImg} />
                                    <div className={css.itemDetails}>
                                        <h3 className={css.itemTitle}>{product.title}</h3>
                                        <p className={css.itemPrice}>{product.price} TL</p>
                                        {item.selectedAttributes && Object.entries(item.selectedAttributes).length > 0 && (
                                            <div className={css.attributes}>
                                                {Object.entries(item.selectedAttributes).map(([key, val]) => (
                                                    <span key={key} className={css.attrTag}>{key}: {val}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className={css.itemActions}>
                                        <div className={css.qtySelector}>
                                            <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                                        </div>
                                        <button className={css.removeBtn} onClick={() => handleRemove(item._id)}>Kaldır</button>
                                    </div>
                                </div>
                            );
                        })}
                        <button className={css.clearBtn} onClick={handleClear}>Sepeti Temizle</button>
                    </div>

                    <aside className={css.summary}>
                        <h3>Sipariş Özeti</h3>
                        <div className={css.summaryRow}>
                            <span>Ara Toplam</span>
                            <span>{totalPrice.toFixed(2)} TL</span>
                        </div>

                        <div className={css.giftWrapRow} style={{ margin: '10px 0', padding: '10px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px', fontSize: '0.9rem' }}>
                                <input
                                    type="checkbox"
                                    checked={isGiftWrap}
                                    onChange={(e) => handleGiftWrapChange(e.target.checked)}
                                    style={{ width: '16px', height: '16px' }}
                                />
                                <span>Hediye Paketi (+50 TL)</span>
                            </label>
                        </div>

                        {isGiftWrap && (
                            <div className={css.summaryRow}>
                                <span>Hediye Paketi</span>
                                <span>50.00 TL</span>
                            </div>
                        )}

                        <div className={css.summaryRow}>
                            <span>Kargo</span>
                            <span>{shippingCost === 0 ? "Ücretsiz" : `${shippingCost.toFixed(2)} TL`}</span>
                        </div>
                        <div className={`${css.summaryRow} ${css.total}`}>
                            <span>Toplam</span>
                            <span>{(totalPrice + (isGiftWrap ? 50 : 0) + shippingCost).toFixed(2)} TL</span>
                        </div>
                        <button className={css.checkoutBtn} onClick={() => navigate("/checkout")}>
                            Ödeme Adımına Geç
                        </button>
                    </aside>
                </div>
            )}
        </div>
    );
};

export default CartPage;
