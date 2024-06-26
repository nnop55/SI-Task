import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ManagerActions from './manager.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { Injectable } from "@angular/core";
import { ManagerService } from "src/app/features/managers/services/manager.service";

@Injectable()
export class ManagerEffects {
    constructor(
        private actions$: Actions,
        private managerService: ManagerService,
    ) { }

    loadManagers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ManagerActions.loadManagers),
            mergeMap(action =>
                this.managerService.getManagers(action.params).pipe(
                    map(response => ManagerActions.loadManagersSuccess(response)
                    ),
                    catchError(error => of(ManagerActions.loadManagersFailure({ error })))
                )
            )
        )
    );

    loadSaledProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ManagerActions.loadSaledProducts),
            mergeMap(action =>
                this.managerService.getSaledProducts(action.params).pipe(
                    map(response => ManagerActions.loadSaledProductsSuccess(
                        { code: response.code, data: { saledProducts: response.data } }
                    )
                    ),
                    catchError(error => of(ManagerActions.loadSaledProductsFailure({ error })))
                )
            )
        )
    );
}