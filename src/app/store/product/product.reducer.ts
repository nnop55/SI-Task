import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { initialProductsState as initialState } from './products.state';

export const productReducer = createReducer(
    initialState,
    on(ProductActions.loadProducts, (state) => ({
        ...state,
        loading: true
    })),
    on(ProductActions.loadProductsSuccess, (state, { code, data }) => ({
        ...state,
        products: data.results,
        totalCount: data.totalCount,
        pageCount: data.pageCount,
        pageSize: data.pageSize,
        pageIndex: data.pageIndex,
        loading: false
    })),
    on(ProductActions.loadProductsFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(ProductActions.addProductSuccess, (state, { code, data }) => ({
        ...state,
        products: [...state.products, data]
    })),
    on(ProductActions.addProductFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ProductActions.editProductSuccess, (state, { code, data }) => ({
        ...state,
        products: state.products.map(p => p['_id'] === data['_id'] ? data : p)
    })),
    on(ProductActions.editProductFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ProductActions.deleteProductSuccess, (state, { code, data }) => ({
        ...state,
        products: state.products.filter(p => p['_id'] !== data['_id']),
        totalCount: state.totalCount! - 1
    })),
    on(ProductActions.deleteProductFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ProductActions.saleProductSuccess, (state, { code, data }) => ({
        ...state,
        products: state.products.map(p =>
            p['_id'] === data['_id'] ? data : p
        )
    })),
    on(ProductActions.saleProductFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ProductActions.getProductById, (state) => ({
        ...state,
        loading: true
    })),
    on(ProductActions.getProductByIdSuccess, (state, { code, data }) => ({
        ...state,
        selectedProduct: data,
        loading: false
    })),
    on(ProductActions.getProductByIdFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);