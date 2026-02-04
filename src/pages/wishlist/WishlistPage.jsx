import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../redux/wishlist/operations";
import { selectWishlistItems, selectIsLoading } from "../../redux/wishlist/selectors";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import css from "./WishlistPage.module.css";

export const WishlistPage = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectWishlistItems);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    if (isLoading) {
        return <div className={css.loading}>Favori listesi yükleniyor...</div>;
    }

    return (
        <div className={css.page}>
            <h1 className={css.title}>Favorilerim</h1>

            {items.length === 0 ? (
                <div className={css.empty}>Favori listeniz boş.</div>
            ) : (
                <div className={css.grid}>
                    {items.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
