export const selectProducts = (state) => state.products.items;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductsPageInfo = (state) => ({
    page: state.products.page,
    perPage: state.products.perPage,
    totalItems: state.products.totalItems,
    totalPages: state.products.totalPages,
    hasPreviousPage: state.products.hasPreviousPage,
    hasNextPage: state.products.hasNextPage,
});
export const selectIsLoading = (state) => state.products.isLoading;
export const selectError = (state) => state.products.error;
