import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProductRequest, IApi, IPaginated, IPaginator, Product, ProductFilters } from 'src/app/shared/utils/unions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl + '/api/product';

  constructor(private http: HttpClient) { }

  getProducts(params: IPaginator<ProductFilters>): Observable<IApi<IPaginated<Product[]>>> {
    return this.http.post<IApi<IPaginated<Product[]>>>(this.baseUrl, params)
  }

  addProduct(product: AddProductRequest): Observable<IApi<Product>> {
    return this.http.post<IApi<Product>>(`${this.baseUrl}/add`, product);
  }

  editProduct(product: Product): Observable<IApi<Product>> {
    return this.http.put<IApi<Product>>(`${this.baseUrl}/update/${product['_id']}`, product);
  }

  deleteProduct(productId: string): Observable<IApi<Product>> {
    return this.http.delete<IApi<Product>>(`${this.baseUrl}/delete/${productId}`);
  }

  saleProduct(productId: string, quantity: number): Observable<IApi<Product>> {
    return this.http.post<IApi<Product>>(`${this.baseUrl}/sale`, { quantity, productId });
  }

  getProductById(productId: string): Observable<IApi<Product>> {
    return this.http.get<IApi<Product>>(`${this.baseUrl}/${productId}`);
  }
}
