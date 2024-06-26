import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IApi, IPaginated, IPaginator, Manager, ManagerFilters, SaledProductFilters, SaledProductResponse } from "src/app/shared/utils/unions";




export const LOAD_MANAGER = '[Manager] Load Managers'
export const LOAD_MANAGER_SUCCESS = '[Manager] Load Managers Success'
export const LOAD_MANAGER_FAILURE = '[Manager] Load Managers Failure'

export const LOAD_SALED_PRODUCT = '[Saled Product] Load Sale Product'
export const LOAD_SALED_PRODUCT_SUCCESS = '[Saled Product] Load Sale Product Success'
export const LOAD_SALED_PRODUCT_FAILURE = '[Saled Product] Load Sale Product Failure'

export const loadManagers = createAction(LOAD_MANAGER, props<{ params: IPaginator<ManagerFilters> }>());
export const loadManagersSuccess = createAction(LOAD_MANAGER_SUCCESS, props<IApi<IPaginated<Manager[]>>>());
export const loadManagersFailure = createAction(LOAD_MANAGER_FAILURE, props<{ error: HttpErrorResponse }>());

export const loadSaledProducts = createAction(LOAD_SALED_PRODUCT, props<{ params: SaledProductFilters }>());
export const loadSaledProductsSuccess = createAction(LOAD_SALED_PRODUCT_SUCCESS, props<IApi<{ saledProducts: SaledProductResponse[] }>>());
export const loadSaledProductsFailure = createAction(LOAD_SALED_PRODUCT_FAILURE, props<{ error: HttpErrorResponse }>()); 