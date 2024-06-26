import { HttpErrorResponse } from "@angular/common/http";

export interface ManagersState {
    managers: any[];
    saledProducts: any[];
    loading: boolean;
    error: HttpErrorResponse | null;
    totalCount?: number,
    pageCount?: number,
    pageSize?: number,
    pageIndex?: number,
}

export const initialManagersState: ManagersState = {
    managers: [],
    saledProducts: [],
    loading: false,
    totalCount: 0,
    pageCount: 0,
    pageSize: 10,
    pageIndex: 0,
    error: null,
};