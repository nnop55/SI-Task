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

export class TableColumn {
    key!: string;
    header!: string;
    hidden?: boolean;
    isFilter?: boolean;
}

export class IPaginator<T> {
    pageSize!: number;
    pageIndex!: number;
    filters?: T
}

export class ProductFilters {
    searchTitle!: string;
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

export class IPaginated<T> {
    results!: T;
    pageSize!: number;
    pageIndex!: number;
    totalCount!: number;
    pageCount!: number;
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

export class AddProductRequest {
    title!: string;
    price!: number;
    productCount!: number;
}

export class Product {
    _id!: string;
    title!: string;
    price!: number;
    productCount!: number;
}
