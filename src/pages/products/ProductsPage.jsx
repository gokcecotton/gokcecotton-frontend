import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/products/operations";
import { fetchCategories } from "../../redux/categories/operations";
import { selectProducts, selectIsLoading as selectProductsLoading } from "../../redux/products/selectors";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { CategoryFilters } from "../../components/CategoryFilters/CategoryFilters";
import css from "./ProductsPage.module.css";

export const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const pageInfo = useSelector(selectProductsPageInfo);
    const isLoading = useSelector(selectProductsLoading);

    const [activeCategory, setActiveCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const params = {
            page,
            categoryId: activeCategory || undefined,
            search: searchTerm || undefined
        };
        dispatch(fetchProducts(params));
    }, [dispatch, activeCategory, page, searchTerm]);

    const handleCategoryChange = (catId) => {
        setActiveCategory(catId);
        setPage(1); // Reset to first page
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    return (
        <div className={css.page}>
            <header className={css.header}>
                <h1 className={css.title}>Our Collection</h1>
                <div className={css.searchBar}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={css.searchInput}
                    />
                </div>
            </header>

            <div className={css.content}>
                <aside className={css.sidebar}>
                    <CategoryFilters
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </aside>

                <section className={css.main}>
                    {isLoading ? (
                        <div className={css.loading}>Loading items...</div>
                    ) : (
                        <>
                            <div className={css.grid}>
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>

                            {products.length === 0 && (
                                <div className={css.empty}>No products found.</div>
                            )}

                            {pageInfo.totalPages > 1 && (
                                <div className={css.pagination}>
                                    <button
                                        disabled={!pageInfo.hasPreviousPage}
                                        onClick={() => setPage(prev => prev - 1)}
                                        className={css.pageBtn}
                                    >Previous</button>

                                    <span className={css.pageInfo}>
                                        Page {pageInfo.page} of {pageInfo.totalPages}
                                    </span>

                                    <button
                                        disabled={!pageInfo.hasNextPage}
                                        onClick={() => setPage(prev => prev + 1)}
                                        className={css.pageBtn}
                                    >Next</button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ProductsPage;
