import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SignComponent } from './core/components/sign/sign.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./features/product/product-routing.module')
        .then(m => m.ProductRoutingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'managers',
    loadChildren: () =>
      import('./features/managers/managers-routing.module')
        .then(m => m.ManagersRoutingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sign',
    component: SignComponent
  },
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
