import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProductRequest, IApi, IPaginated, IPaginator, Product, ProductFilters } from 'src/app/shared/utils/unions';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts(params: IPaginator<ProductFilters>): Observable<IApi<IPaginated<Product[]>>> {
    return this.http.post<IApi<IPaginated<Product[]>>>(`${this.baseUrl}/api/product`, params)
  }

  addProduct(product: AddProductRequest): Observable<IApi<Product>> {
    return this.http.post<IApi<Product>>(this.baseUrl, product);
  }

  editProduct(product: Product): Observable<IApi<Product>> {
    return this.http.put<IApi<Product>>(`${this.baseUrl}/${product['_id']}`, product);
  }

  deleteProduct(productId: string): Observable<IApi<Product>> {
    return this.http.delete<IApi<Product>>(`${this.baseUrl}/${productId}`);
  }

  saleProduct(productId: string, quantity: number): Observable<IApi<Product>> {
    return this.http.post<IApi<Product>>(`${this.baseUrl}sale`, { quantity, productId });
  }

  getProductById(productId: string): Observable<IApi<Product>> {
    return this.http.get<IApi<Product>>(`${this.baseUrl}/${productId}`);
  }
}
