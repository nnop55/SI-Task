import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { MatPaginatorModule } from '@angular/material/paginator';

const materalModules = [
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [
    TextInputComponent,
    ButtonComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    ...materalModules
  ],
  exports: [
    TextInputComponent,
    ButtonComponent,
    TableComponent
  ]
})
export class SharedModule { }
