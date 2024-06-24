export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    error: string | null;
    isRegistered?: boolean;
}

export const initialAuthState: AuthState = {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    error: null,
    isRegistered: false,
};
