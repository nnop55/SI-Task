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

export enum FilterModes {
    FromTo,
    Range,
    Search
}

export class TableColumn {
    key!: string;
    header!: string;
    hidden?: boolean;
    getVal!: (row: Product | Manager) => any;
    filter?: FilterModes;
    deleteFn?: (id: string) => void;
    saleFn?: (row: Product) => void;
    placeholder?: string;
}

export class IPaginator<T> {
    pageSize!: number;
    pageIndex!: number;
    filters?: T
}

export class ProductFilters {
    title!: string;
    priceFrom!: number;
    priceTo!: number;
    productCountFrom!: number;
    productCountTo!: number;
}

export class ManagerFilters {
    name!: string;
    surname!: string;
    username!: string;
    createdAtFrom!: number;
    createdAtTo!: number;
    totalOfSalesFrom!: number;
    totalOfSalesTo!: number;
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

export type SaleForm = {
    quantity: FormControl<number | null>,
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

export type ProductForm = {
    title: FormControl<string | null>,
    price: FormControl<number | null>,
    productCount: FormControl<number | null>,
}

export class Manager {
    username!: string;
    name!: string;
    surname!: string;
    createdAt!: Date;
    totalOfSales!: number;
}
