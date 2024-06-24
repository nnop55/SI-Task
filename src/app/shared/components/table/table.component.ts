import { Component, Input, ViewChild, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TableColumn } from '../../utils/unions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() dataSource: any;
  @Input() paginatorParams: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [];

  private route = inject(ActivatedRoute)
  private router = inject(Router)

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(col => col.key);
  }

  handlePageEvent(ev: PageEvent) {
    console.log(ev)
    const path = this.route.snapshot.data['path']
    // this.router.navigate([path], { queryParams: this.paginatorParams })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.route.snapshot)
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}
