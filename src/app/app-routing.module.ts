import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SignComponent } from './core/components/sign/sign.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./features/product/product.module')
        .then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'managers',
    loadChildren: () =>
      import('./features/managers/managers.module')
        .then(m => m.ManagersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sign',
    loadChildren: () =>
      import('./core/components/sign/sign.module')
        .then(m => m.SignModule),
  },
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
