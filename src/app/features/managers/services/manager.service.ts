import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApi, IPaginated, IPaginator, Manager, ManagerFilters, SaledProductFilters, SaledProductResponse } from 'src/app/shared/utils/unions';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private baseUrl = 'http://localhost:3000/api/manager';

  constructor(private http: HttpClient) { }

  getManagers(params: IPaginator<ManagerFilters>): Observable<IApi<IPaginated<Manager[]>>> {
    return this.http.post<IApi<IPaginated<Manager[]>>>(this.baseUrl, params)
  }

  getSaledProducts(params: SaledProductFilters): Observable<IApi<SaledProductResponse[]>> {
    return this.http.post<IApi<SaledProductResponse[]>>(`${this.baseUrl}/saled-products`, params)
  }

}
