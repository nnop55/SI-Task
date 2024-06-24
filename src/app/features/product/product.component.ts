import { Component, inject } from '@angular/core';
import { ProductStoreService } from './services/product-store.service';
import { Observable, map, take } from 'rxjs';
import { Product, TableColumn } from 'src/app/shared/utils/unions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  private service = inject(ProductStoreService)
  private route = inject(ActivatedRoute)
  products$!: Observable<Product[]>;
  pagingParams$!: Observable<Product[]>;


  ngOnInit(): void {
    this.service.loadProducts({ pageSize: 10, pageIndex: 0 })

    this.products$ = this.service.product$;
    this.pagingParams$ = this.service.pagingParams$;
  }

  getColumns(): TableColumn[] {
    return [
      {
        key: '_id',
        header: 'ID',
        hidden: true
      },
      {
        key: 'title',
        header: 'Title',
        isFilter: true
      },
      {
        key: 'price',
        header: 'Price'
      },
      {
        key: 'productCount',
        header: 'Quantity'
      }
    ]
  }

  // ngOnDestroy(): void {
  //   this.route.queryParams
  // }
}
