import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MiniTableComponent } from './components/mini-table/mini-table.component';

const materalModules = [
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatIconModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule
]

@NgModule({
  declarations: [
    TextInputComponent,
    ButtonComponent,
    TableComponent,
    LayoutComponent,
    DateFormatPipe,
    DateRangePickerComponent,
    MiniTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...materalModules
  ],
  exports: [
    ...materalModules,
    TextInputComponent,
    ButtonComponent,
    TableComponent,
    ReactiveFormsModule,
    MiniTableComponent,
  ],
  providers: [
    DateFormatPipe
  ]
})
export class SharedModule { }
