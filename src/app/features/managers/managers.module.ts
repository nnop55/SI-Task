import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagersRoutingModule } from './managers-routing.module';
import { ManagersComponent } from './managers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignModule } from 'src/app/core/components/sign/sign.module';
import { ManagerInnerComponent } from './components/manager-inner/manager-inner.component';


@NgModule({
  declarations: [
    ManagersComponent,
    ManagerInnerComponent
  ],
  imports: [
    CommonModule,
    ManagersRoutingModule,
    SharedModule,
    SignModule
  ]
})
export class ManagersModule { }
