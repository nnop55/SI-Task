import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.state";

export const selectProductFeature = createFeatureSelector<ProductsState>('product');

export const selectProducts = createSelector(
    selectProductFeature,
    (state: ProductsState) => state.products
)

export const selectPagingParams = createSelector(
    selectProductFeature,
    (state: ProductsState) => {
        return {
            pageCount: state.pageCount,
            pageSize: state.pageSize,
            pageIndex: state.pageIndex
        }
    }
)