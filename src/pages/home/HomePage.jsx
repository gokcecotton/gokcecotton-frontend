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
                <h2 className={css.sectionTitle}>Kategoriye Göre Alışveriş</h2>
                <div className={css.catGrid}>
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map(cat => (
                            <Link key={cat._id} to={`/products?categoryId=${cat._id}`} className={css.catCard}>
                                {cat.image && <img src={cat.image} alt={cat.name} className={css.catImg} />}
                                <div className={css.catOverlay}>
                                    <h3>{cat.name}</h3>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className={css.noCats}>Kategori bulunamadı.</p>
                    )}
                </div>
            </section>

            <section className={css.featured}>
                <div className={css.featuredContent}>
                    <h2>Hissedebileceğiniz Kalite</h2>
                    <p>Her parça, üstün konfor için %100 organik pamukla işlenmiştir.</p>
                    <Link to="/products" className={css.shopBtn}>Koleksiyonu İncele</Link>
                </div>
            </section>
        </div>
    );
};
