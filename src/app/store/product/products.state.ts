//import { Product } from '../../models/product.model';

export interface ProductsState {
    products: any[];
    loading: boolean;
    error: string | null;
}

export const initialProductsState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};