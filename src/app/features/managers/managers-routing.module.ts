import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagersComponent } from './managers.component';
import { LayoutComponent } from 'src/app/shared/components/layout/layout.component';
import { ManagerInnerComponent } from './components/manager-inner/manager-inner.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ManagersComponent, data: { path: '/managers' } },
      { path: 'inner', component: ManagerInnerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagersRoutingModule { }
