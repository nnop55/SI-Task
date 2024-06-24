import { createAction, props } from '@ngrx/store';
import { AddProductRequest, IApi, IPaginated, IPaginator, LoginRequest, LoginResponse, Product, ProductFilters, RefreshTokenResponse, RegisterRequest } from 'src/app/shared/utils/unions';


export const ADD_PRODUCT = '[Product] Add Product'
export const ADD_PRODUCT_SUCCESS = '[Product] Add Product Success'
export const ADD_PRODUCT_FAILURE = '[Product] Add Product Failure'
export const LOAD_PRODUCT = '[Product] Load Products'
export const LOAD_PRODUCT_SUCCESS = '[Product] Load Products Success'
export const LOAD_PRODUCT_FAILURE = '[Product] Load Products Failure'
export const EDIT_PRODUCT = '[Product] Edit Product'
export const EDIT_PRODUCT_SUCCESS = '[Product] Edit Product Success'
export const EDIT_PRODUCT_FAILURE = '[Product] Edit Product Failure'
export const DELETE_PRODUCT = '[Product] Delete Product'
export const DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Success'
export const DELETE_PRODUCT_FAILURE = '[Product] Delete Product Failure'
export const SALE_PRODUCT = '[Product] Sale Product'
export const SALE_PRODUCT_SUCCESS = '[Product] Sale Product Success'
export const SALE_PRODUCT_FAILURE = '[Product] Sale Product Failure'
export const GET_PRODUCT_BY_ID = '[Product] Get By Id Product'
export const GET_PRODUCT_BY_ID_SUCCESS = '[Product] Get By Id Product Success'
export const GET_PRODUCT_BY_ID_FAILURE = '[Product] Get By Id Product Failure'



// Load Products
export const loadProducts = createAction(LOAD_PRODUCT, props<{ params: IPaginator<ProductFilters> }>());
export const loadProductsSuccess = createAction(LOAD_PRODUCT_SUCCESS, props<IApi<IPaginated<Product[]>>>());
export const loadProductsFailure = createAction(LOAD_PRODUCT_FAILURE, props<{ error: string }>());

// Add Product
export const addProduct = createAction(ADD_PRODUCT, props<{ payload: AddProductRequest }>());
export const addProductSuccess = createAction(ADD_PRODUCT_SUCCESS, props<IApi<Product>>());
export const addProductFailure = createAction(ADD_PRODUCT_FAILURE, props<{ error: string }>());

// Edit Product
export const editProduct = createAction(EDIT_PRODUCT, props<{ payload: Product }>());
export const editProductSuccess = createAction(EDIT_PRODUCT_SUCCESS, props<IApi<Product>>());
export const editProductFailure = createAction(EDIT_PRODUCT_FAILURE, props<{ error: string }>());

// Delete Product
export const deleteProduct = createAction(DELETE_PRODUCT, props<{ productId: string }>());
export const deleteProductSuccess = createAction(DELETE_PRODUCT_SUCCESS, props<IApi<Product>>());
export const deleteProductFailure = createAction(DELETE_PRODUCT_FAILURE, props<{ error: string }>());

// Sale Product
export const saleProduct = createAction(SALE_PRODUCT, props<{ productId: string, quantity: number }>());
export const saleProductSuccess = createAction(SALE_PRODUCT_SUCCESS, props<IApi<Product>>());
export const saleProductFailure = createAction(SALE_PRODUCT_FAILURE, props<{ error: string }>());

// Get Product by ID
export const getProductById = createAction(GET_PRODUCT_BY_ID, props<{ productId: string }>());
export const getProductByIdSuccess = createAction(GET_PRODUCT_BY_ID_SUCCESS, props<IApi<Product>>());
export const getProductByIdFailure = createAction(GET_PRODUCT_BY_ID_FAILURE, props<{ error: string }>());
