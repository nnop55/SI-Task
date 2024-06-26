import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ManagersState } from "./managers.state";

export const selectManagersFeature = createFeatureSelector<ManagersState>('manager');

export const selectManagers = createSelector(
    selectManagersFeature,
    (state: ManagersState) => state.managers
)

export const selectSaledProducts = createSelector(
    selectManagersFeature,
    (state: ManagersState) => state.saledProducts
)

export const selectPagingParams = createSelector(
    selectManagersFeature,
    (state: ManagersState) => {
        return {
            pageCount: state.pageCount,
            pageSize: state.pageSize,
            pageIndex: state.pageIndex,
            totalCount: state.totalCount
        }
    }
)