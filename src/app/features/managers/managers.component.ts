import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ManagerStoreService } from './services/manager-store.service';
import { FilterModes, Manager, TableColumn } from 'src/app/shared/utils/unions';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { MatDialog } from '@angular/material/dialog';
import { SaledProductsModalComponent } from './components/saled-products-modal/saled-products-modal.component';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent {
  private service = inject(ManagerStoreService)
  private route = inject(ActivatedRoute)
  private datePipe = inject(DateFormatPipe)
  private dialog = inject(MatDialog)

  private destroy$ = new Subject<void>();
  queryParams: any;

  managers$!: Observable<Manager[]>;
  pagingParams$!: Observable<any>;

  ngOnInit(): void {
    this.managers$ = this.service.managers$;
    this.pagingParams$ = this.service.pagingParams$;

    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.queryParams = params;
      this.loadData()
    })
  }

  opensaledProductsDialog() {
    this.dialog.open(SaledProductsModalComponent, {
      width: "60%",
      minWidth: '330px'
    });
  }

  loadData() {
    this.service.loadManagers(this.queryParams)
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
        key: 'username',
        header: 'Username',
        filter: FilterModes.Search,
        getVal: (value) => { return value },
        placeholder: 'Contains'
      },
      {
        key: 'name',
        header: 'Name',
        filter: FilterModes.Search,
        getVal: (value) => { return value },
        placeholder: 'Contains'
      },
      {
        key: 'surname',
        header: 'Surname',
        filter: FilterModes.Search,
        getVal: (value) => { return value },
        placeholder: 'Contains'
      },
      {
        key: 'createdAt',
        header: 'Created at',
        filter: FilterModes.Range,
        getVal: (value) => { return this.datePipe.transform(value) },
      },
      {
        key: 'totalOfSales',
        header: 'Total of sales',
        filter: FilterModes.FromTo,
        getVal: (value) => { return value },
      },
    ]
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
