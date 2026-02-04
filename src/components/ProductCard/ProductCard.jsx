import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/operations";
import css from "./ProductCard.module.css";

export const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { _id, title, price, images, brand } = product;

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart({ productId: _id, quantity: 1 }));
    };

    return (
        <div className={css.card}>
            <Link to={`/products/${_id}`} className={css.link}>
                <div className={css.imageWrapper}>
                    <img
                        src={(product.images && product.images[0]) || "https://via.placeholder.com/300x400?text=Görsel+Yok"}
                        alt={product.title}
                        className={css.image}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=Görsel+Bulunamadı"; }}
                    />
                    <div className={css.overlay}>
                        <button className={css.quickAdd}>Hızlı Bakış</button>
                    </div>
                </div>
                <div className={css.info}>
                    <p className={css.brand}>{brand}</p>
                    <h3 className={css.title}>{title}</h3>
                    <p className={css.price}>${price}</p>
                </div>
            </Link>
            <button className={css.addBtn} onClick={handleAddToCart}>
                Sepete Ekle
            </button>
        </div>
    );
};
