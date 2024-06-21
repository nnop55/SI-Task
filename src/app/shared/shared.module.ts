import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    TextInputComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    TextInputComponent,
    ButtonComponent,
  ]
})
export class SharedModule { }
