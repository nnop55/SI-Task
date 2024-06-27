import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { LayoutComponent } from 'src/app/shared/components/layout/layout.component';
import { ProductInnerComponent } from './components/product-inner/product-inner.component';
import { ProductResolver } from './resolvers/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ProductComponent, data: { path: '/products' } },
      { path: 'inner', component: ProductInnerComponent },
      { path: 'inner/:id', component: ProductInnerComponent, resolve: { product: ProductResolver } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
