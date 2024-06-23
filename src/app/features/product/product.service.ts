import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts() {
    this.http.post(`${this.baseUrl}/api/product`, {}).subscribe()
  }
}
