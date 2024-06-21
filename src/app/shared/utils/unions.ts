import { FormControl } from "@angular/forms"

export enum Status {
    InProgress,
    Completed,
    WontDo
}

export enum Sign {
    In,
    Up
}

export enum ResponseStatus {
    Success = 1,
    Error
}


export type RegisterForm = {
    username: FormControl<string | null>,
    name: FormControl<string | null>,
    surname: FormControl<string | null>,
    password: FormControl<string | null>,
    confirmPassword: FormControl<string | null>,
}

export type LoginForm = {
    username: FormControl<string | null>,
    password: FormControl<string | null>,
}

export type TaskForm = {
    title: FormControl<string | null>,
    description: FormControl<string | null>,
    status: FormControl<number | null>,
}

export class IApi<T> {
    code!: number;
    data!: T;
    error?: string;
}

export class LoginResponse {
    accessToken!: string;
    refreshToken!: string
}

export class LoginRequest {
    username!: string;
    password!: string
}

export class RegisterRequest {
    username!: string;
    name!: string;
    surname!: string;
    password!: string
}

export class RefreshTokenResponse {
    accessToken!: string;
}
