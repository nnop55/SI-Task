import { createAction, props } from "@ngrx/store";
import { IApi, IPaginated, IPaginator, Manager, ManagerFilters } from "src/app/shared/utils/unions";




export const LOAD_MANAGER = '[Manager] Load Managers'
export const LOAD_MANAGER_SUCCESS = '[Manager] Load Managers Success'
export const LOAD_MANAGER_FAILURE = '[Manager] Load Managers Failure'

export const loadManagers = createAction(LOAD_MANAGER, props<{ params: IPaginator<ManagerFilters> }>());
export const loadManagersSuccess = createAction(LOAD_MANAGER_SUCCESS, props<IApi<IPaginated<Manager[]>>>());
export const loadManagersFailure = createAction(LOAD_MANAGER_FAILURE, props<{ error: string }>());