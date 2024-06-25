import { Component, inject } from '@angular/core';
import { ProductStoreService } from './services/product-store.service';
import { Observable, Subject, map, take, takeUntil } from 'rxjs';
import { FilterModes, IPaginator, Product, ProductFilters, TableColumn } from 'src/app/shared/utils/unions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SaleProductModalComponent } from './components/sale-product-modal/sale-product-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  private service = inject(ProductStoreService)
  private route = inject(ActivatedRoute)
  private dialog = inject(MatDialog)

  products$!: Observable<Product[]>;
  pagingParams$!: Observable<Product[]>;

  private destroy$ = new Subject<void>();

  queryParams: any;

  ngOnInit(): void {
    this.products$ = this.service.products$;
    this.pagingParams$ = this.service.pagingParams$;

    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.queryParams = params;
      this.loadData()
    })
  }

  loadData() {
    this.service.loadProducts(this.queryParams as IPaginator<ProductFilters>)
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
        filter: FilterModes.Search
      },
      {
        key: 'price',
        header: 'Price',
        filter: FilterModes.FromTo
      },
      {
        key: 'productCount',
        header: 'Quantity',
        filter: FilterModes.FromTo
      },
      {
        key: 'actions',
        header: '',
        deleteFn: (id) => {
          this.service.deleteProduct(id)
        },
        saleFn: (row) => {
          const dialogRef = this.dialog.open(SaleProductModalComponent, {
            width: '300px',
            data: row
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
        }
      }
    ]
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
