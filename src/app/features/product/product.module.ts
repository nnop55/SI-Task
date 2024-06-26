import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductInnerComponent } from './components/product-inner/product-inner.component';
import { SaleProductModalComponent } from './components/sale-product-modal/sale-product-modal.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductInnerComponent,
    SaleProductModalComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
