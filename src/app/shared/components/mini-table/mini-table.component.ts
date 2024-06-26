import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../../utils/unions';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-mini-table',
  templateUrl: './mini-table.component.html',
  styleUrls: ['./mini-table.component.scss']
})
export class MiniTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() dataSource: any;
  @Output() onSearchFilter = new EventEmitter<string>()
  searchControl = new FormControl(null);

  displayedColumns: string[] = [];

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(col => col.key);
    this.applyFilter();
  }

  applyFilter() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$)
      ).subscribe(searchTerm => {
        this.onSearchFilter.emit(searchTerm ?? undefined)
      })
  }

}
