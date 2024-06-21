export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    error: string | null;
}

export const initialAuthState: AuthState = {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    error: null
};
