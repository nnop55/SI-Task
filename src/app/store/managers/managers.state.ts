export interface ManagersState {
    managers: any[];
    loading: boolean;
    error: string | null;
    totalCount?: number,
    pageCount?: number,
    pageSize?: number,
    pageIndex?: number,
}

export const initialManagersState: ManagersState = {
    managers: [],
    loading: false,
    totalCount: 0,
    pageCount: 0,
    pageSize: 10,
    pageIndex: 0,
    error: null,
};