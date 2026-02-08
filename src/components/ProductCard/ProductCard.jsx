import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart/operations";
import { addToCartLocal } from "../../redux/cart/slice";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./ProductCard.module.css";
import noImage from "../../assets/logo-yazili.png";
import toast from "react-hot-toast";

export const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { _id, title, price, images, brand } = product;

    const handleAddToCart = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            dispatch(addToCart({ productId: _id, quantity: 1 }));
        } else {
            dispatch(addToCartLocal({ productId: product, quantity: 1, selectedAttributes: {} }));
            toast.success("Ürün sepete eklendi (Misafir)");
        }
    };

    return (
        <div className={css.card}>
            <Link to={`/products/${_id}`} className={css.link}>
                <div className={css.imageWrapper}>
                    <img
                        src={(product.images && product.images[0]) || noImage}
                        alt={product.title}
                        className={css.image}
                        onError={(e) => { e.target.src = noImage; }}
                    />
                    <div className={css.overlay}>
                        <button className={css.quickAdd}>Hızlı Bakış</button>
                    </div>
                </div>
                <div className={css.info}>
                    <p className={css.brand}>{brand}</p>
                    <h3 className={css.title}>{title}</h3>
                    <p className={css.price}>{price} TL</p>
                </div>
            </Link>
            <button className={css.addBtn} onClick={handleAddToCart}>
                Sepete Ekle
            </button>
        </div>
    );
};
