import { useSelector } from "react-redux";
import { selectCategories } from "../../redux/categories/selectors";
import css from "./CategoryFilters.module.css";

export const CategoryFilters = ({ activeCategory, onCategoryChange }) => {
    const categories = useSelector(selectCategories);

    return (
        <div className={css.container}>
            <h3 className={css.title}>Kategoriler</h3>
            <button
                className={`${css.btn} ${!activeCategory ? css.active : ""}`}
                onClick={() => onCategoryChange(null)}
            >
                Tüm Ürünler
            </button>
            {categories.map((category) => (
                <button
                    key={category._id}
                    className={`${css.btn} ${activeCategory === category._id ? css.active : ""}`}
                    onClick={() => onCategoryChange(category._id)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};
