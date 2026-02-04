import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Hero } from "../../components/hero/hero";
import { fetchCategories } from "../../redux/categories/operations";
import { selectCategories } from "../../redux/categories/selectors";
import css from "./HomePage.module.css";

export const HomePage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className={css.container}>
            <Hero />

            <section className={css.categories}>
                <h2 className={css.sectionTitle}>Shop by Category</h2>
                <div className={css.catGrid}>
                    {categories.map(cat => (
                        <Link key={cat._id} to={`/products?categoryId=${cat._id}`} className={css.catCard}>
                            {cat.image && <img src={cat.image} alt={cat.name} className={css.catImg} />}
                            <div className={css.catOverlay}>
                                <h3>{cat.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className={css.featured}>
                <div className={css.featuredContent}>
                    <h2>Quality You Can Feel</h2>
                    <p>Every piece is crafted with 100% organic cotton for ultimate comfort.</p>
                    <Link to="/products" className={css.shopBtn}>View Collection</Link>
                </div>
            </section>
        </div>
    );
};
