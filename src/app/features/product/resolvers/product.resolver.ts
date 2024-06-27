import { Injectable, inject } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, filter, first, of, tap } from 'rxjs';
import { ProductsState } from 'src/app/store/product/products.state';
import * as ProductActions from 'src/app/store/product/product.actions';
import * as ProductSelectors from 'src/app/store/product/product.selector';
import { Product } from 'src/app/shared/utils/unions';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product | null> {

  constructor(private store: Store<ProductsState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product | null> {
    const productId = route.paramMap.get('id');
    if (!productId) {
      return of(null);
    }

    this.store.dispatch(ProductActions.getProductById({ productId }));

    return this.store.select(ProductSelectors.selectOneProduct).pipe(
      filter(product => !!product && product['_id'] === productId),
      first(),
      catchError(() => of(null))
    );
  }
}
