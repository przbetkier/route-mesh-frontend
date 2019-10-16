import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoadsComponent} from './components/roads/roads.component';
import {AdminComponent} from './components/admin/admin.component';

const routes: Routes =
  [
    {path: '', component: RoadsComponent},
    {path: 'roads', component: RoadsComponent},
    {path: 'admins', component: AdminComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
