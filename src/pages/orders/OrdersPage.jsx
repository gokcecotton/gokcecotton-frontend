import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/orders/operations";
import { selectOrders, selectIsLoading } from "../../redux/orders/selectors";
import css from "./OrdersPage.module.css";

export const OrdersPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (isLoading) {
        return <div className={css.loading}>Sipariş geçmişi yükleniyor...</div>;
    }

    return (
        <div className={css.page}>
            <h1 className={css.title}>Siparişlerim</h1>

            {orders.length === 0 ? (
                <div className={css.empty}>Henüz bir sipariş vermediniz.</div>
            ) : (
                <div className={css.ordersList}>
                    {orders.map((order) => (
                        <div key={order._id} className={css.orderCard}>
                            <div className={css.orderHeader}>
                                <div>
                                    <p className={css.label}>Sipariş Tarihi</p>
                                    <p className={css.value}>{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className={css.label}>Toplam Tutar</p>
                                    <p className={css.value}>{order.totalPrice.toFixed(2)} TL</p>
                                </div>
                                <div className={css.statusCol}>
                                    <p className={css.label}>Durum</p>
                                    <span className={`${css.status} ${css[order.status.toLowerCase()]}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div>
                                    <p className={css.label}>Sipariş No</p>
                                    <p className={css.idValue}>#{order._id.slice(-8)}</p>
                                </div>
                            </div>

                            <div className={css.orderItems}>
                                {order.items.map((item, idx) => (
                                    <div key={idx} className={css.item}>
                                        <p className={css.itemName}>
                                            {item.productId?.title || "Ürün"} <span>x{item.quantity}</span>
                                        </p>
                                        <p className={css.itemPrice}>{item.price.toFixed(2)} TL</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
