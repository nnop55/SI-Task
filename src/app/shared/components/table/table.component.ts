import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FilterModes, TableColumn } from '../../utils/unions';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() dataSource: any;
  @Input() paginatorParams: any;
  @Input() queryParams: any;
  @Input() isEdit: boolean = false;
  @Input() isDelete: boolean = false;
  @Input() isSale: boolean = false;

  @Output() onDelete = new EventEmitter<string>()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [];

  searchControls: { [key: string]: FormControl } = {};

  private destroy$ = new Subject<void>();

  private route = inject(ActivatedRoute)
  private router = inject(Router)

  FilterModes = FilterModes;
  searchTerms: any = {};

  path!: string;

  ngOnInit(): void {
    this.path = this.route.snapshot.data['path']
    this.displayedColumns = this.columns.map(col => col.key);

    this.initForm()
    this.setFiltersFromUrl()
    this.applyFilter()
  }

  initForm() {
    this.columns.forEach(column => {
      const key = column.key

      if (column.filter !== undefined && key) {
        if (column.filter === FilterModes.FromTo
          || column.filter === FilterModes.Range
        ) {
          const from = `${key}From`;
          const to = `${key}To`
          this.searchControls[from] = new FormControl(null);
          this.searchControls[to] = new FormControl(null);
          return
        }

        this.searchControls[key] = new FormControl(null)
      }
    });
  }

  setFiltersFromUrl() {
    for (
      const [key, value] of
      Object.entries(this.queryParams)
    ) {

      if (value) {
        this.searchTerms[key] = value
        this.searchControls[key]?.setValue(value)
      }
    }
  }

  handlePageEvent(ev: PageEvent) {
    this.paginatorParams.pageSize = ev.pageSize;
    this.paginatorParams.pageIndex = ev.pageIndex;
    this.updateUrl()
  }

  applyFilter() {
    for (
      const [key, value] of
      Object.entries(this.searchControls)
    ) {
      value.valueChanges
        .pipe(
          debounceTime(500),
          takeUntil(this.destroy$)
        ).subscribe(searchTerm => {
          this.searchTerms[key] = searchTerm;

          this.paginatorParams.pageIndex = 0;
          this.updateUrl()
        })
    }

  }

  updateUrl() {
    this.router.navigate([this.path], {
      queryParams: {
        pageSize: this.paginatorParams.pageSize,
        pageIndex: this.paginatorParams.pageIndex,
        ...this.searchTerms
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
