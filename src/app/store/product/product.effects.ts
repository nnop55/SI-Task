import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { ProductService } from 'src/app/features/product/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(action =>
                this.productService.getProducts(action.params).pipe(
                    map(response => ProductActions.loadProductsSuccess(response)
                    ),
                    catchError(error => of(ProductActions.loadProductsFailure({ error })))
                )
            )
        )
    );

    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.addProduct),
            mergeMap(action =>
                this.productService.addProduct(action.payload).pipe(
                    map(response => ProductActions.addProductSuccess(response)),
                    tap((response) => {
                        this.router.navigate(['products'])
                    }),
                    catchError(error => of(ProductActions.addProductFailure({ error })))
                )
            )
        ),
        { dispatch: false }
    );

    editProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.editProduct),
            mergeMap(action =>
                this.productService.editProduct(action.payload).pipe(
                    map(response => ProductActions.editProductSuccess(response)),
                    catchError(error => of(ProductActions.editProductFailure({ error })))
                )
            )
        ),
        { dispatch: false }
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            mergeMap(action =>
                this.productService.deleteProduct(action.productId).pipe(
                    map((response) => ProductActions.deleteProductSuccess(response)),
                    catchError(error => of(ProductActions.deleteProductFailure({ error })))
                )
            )
        )
    );

    saleProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.saleProduct),
            mergeMap(action =>
                this.productService.saleProduct(action.productId, action.quantity).pipe(
                    map(response => ProductActions.saleProductSuccess(response)),
                    catchError(error => of(ProductActions.saleProductFailure({ error })))
                )
            )
        )
    );

    getProductById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.getProductById),
            mergeMap(action =>
                this.productService.getProductById(action.productId).pipe(
                    map(response => ProductActions.getProductByIdSuccess(response)),
                    catchError(error => of(ProductActions.getProductByIdFailure({ error })))
                )
            )
        )
    );
}
