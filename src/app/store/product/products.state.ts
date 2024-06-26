import { HttpErrorResponse } from "@angular/common/http";
import { Product } from "src/app/shared/utils/unions";

export interface ProductsState {
    products: any[];
    error: HttpErrorResponse | null;
    loading: boolean | null,
    selectedProduct: Product | null,
    totalCount?: number,
    pageCount?: number,
    pageSize?: number,
    pageIndex?: number,
    quantitySaled?: number
}

export const initialProductsState: ProductsState = {
    products: [],
    error: null,
    selectedProduct: null,
    totalCount: 0,
    pageCount: 0,
    pageSize: 10,
    pageIndex: 0,
    quantitySaled: 0,
    loading: false
};