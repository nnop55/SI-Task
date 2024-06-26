import { createReducer, on } from '@ngrx/store';
import * as ManagerActions from './manager.actions';
import { initialManagersState as initialState } from './managers.state';

export const managerReducer = createReducer(
    initialState,
    on(ManagerActions.loadManagers, (state) => ({
        ...state,
        loading: true
    })),
    on(ManagerActions.loadManagersSuccess, (state, { code, data }) => ({
        ...state,
        managers: data.results,
        totalCount: data.totalCount,
        pageCount: data.pageCount,
        pageSize: data.pageSize,
        pageIndex: data.pageIndex,
        loading: false
    })),
    on(ManagerActions.loadManagersFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
)