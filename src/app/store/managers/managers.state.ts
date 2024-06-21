//import { Manager } from '../../models/manager.model';

export interface ManagersState {
    managers: any[];
    loading: boolean;
    error: string | null;
}

export const initialManagersState: ManagersState = {
    managers: [],
    loading: false,
    error: null,
};