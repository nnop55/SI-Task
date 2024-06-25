import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsState } from 'src/app/store/product/products.state';
import * as ProductActions from 'src/app/store/product/product.actions';
import * as ProductSelectors from 'src/app/store/product/product.selector';
import { Observable } from 'rxjs';
import { AddProductRequest, IPaginator, Product, ProductFilters } from 'src/app/shared/utils/unions';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  products$: Observable<Product[]>;
  product$: Observable<Product | null>;
  pagingParams$: Observable<any>;

  constructor(private store: Store<{ product: ProductsState }>) {
    this.products$ = this.store.select(ProductSelectors.selectProducts);
    this.product$ = this.store.select(ProductSelectors.selectOneProduct);
    this.pagingParams$ = this.store.select(ProductSelectors.selectPagingParams);
  }

  loadProducts(params: IPaginator<ProductFilters>) {
    this.store.dispatch(ProductActions.loadProducts({ params }));
  }

  addProduct(payload: AddProductRequest) {
    this.store.dispatch(ProductActions.addProduct({ payload }));
  }

  updateProduct(payload: Product) {
    this.store.dispatch(ProductActions.editProduct({ payload }));
  }

  deleteProduct(productId: string) {
    this.store.dispatch(ProductActions.deleteProduct({ productId }));
  }

  saleProduct(productId: string, quantity: number) {
    this.store.dispatch(ProductActions.saleProduct({ productId, quantity }));
  }

  getProductById(productId: string) {
    this.store.dispatch(ProductActions.getProductById({ productId }));
  }
}
