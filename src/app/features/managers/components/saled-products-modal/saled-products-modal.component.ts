import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { SaledProductFilters, TableColumn } from 'src/app/shared/utils/unions';
import { ManagerStoreService } from '../../services/manager-store.service';

@Component({
  selector: 'app-saled-products-modal',
  templateUrl: './saled-products-modal.component.html',
  styleUrls: ['./saled-products-modal.component.scss']
})
export class SaledProductsModalComponent {
  private service = inject(ManagerStoreService)
  private datePipe = inject(DateFormatPipe)

  saledProducts$!: Observable<SaledProductFilters[]>;

  searchTerm!: string;

  ngOnInit(): void {
    this.saledProducts$ = this.service.saledProducts$;
    this.loadData()
  }

  loadData() {
    this.service.loadSaledProducts({ title: this.searchTerm })
  }

  onFilter(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.loadData()
  }

  getColumns(): TableColumn[] {
    return [
      {
        key: '_id',
        header: 'ID',
        hidden: true,
        getVal: (value) => { return value },
      },
      {
        key: 'title',
        header: 'Title',
        getVal: (value) => { return value },
        placeholder: 'Contains'
      },
      {
        key: 'price',
        header: 'Price',
        getVal: (value) => { return value },
      },
      {
        key: 'saledProductCount',
        header: 'Saled quantity',
        getVal: (value) => { return value },
      },
      {
        key: 'saledAt',
        header: 'Saled at',
        getVal: (value) => { return this.datePipe.transform(value, 'dd/MM/yyyy HH:mm') },
      },

    ]
  }

}
