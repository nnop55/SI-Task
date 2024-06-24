import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsState } from 'src/app/store/product/products.state';
import * as ProductActions from 'src/app/store/product/product.actions';
import * as ProductSelectors from 'src/app/store/product/product.selector';
import { Observable } from 'rxjs';
import { IPaginator, Product, ProductFilters } from 'src/app/shared/utils/unions';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  product$: Observable<Product[]>;
  pagingParams$: Observable<any>;

  constructor(private store: Store<{ product: ProductsState }>) {
    this.product$ = this.store.select(ProductSelectors.selectProducts);
    this.pagingParams$ = this.store.select(ProductSelectors.selectPagingParams);
  }

  loadProducts(params: IPaginator<ProductFilters>) {
    this.store.dispatch(ProductActions.loadProducts({ params }));
  }
}
