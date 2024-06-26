import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignComponent } from './sign.component';
import { InComponent } from './in/in.component';
import { UpComponent } from './up/up.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [SignComponent, InComponent, UpComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SignComponent, InComponent, UpComponent
  ]
})
export class SignModule { }
