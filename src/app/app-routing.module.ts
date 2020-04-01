import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoadsComponent} from './components/roads/roads.component';
import {AdminComponent} from './components/admin/admin.component';
import {NodesComponent} from './components/nodes/nodes.component';
import {ObstaclesComponent} from './components/obstacles/obstacles.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes =
  [
    {path: '', component: RoadsComponent},
    {path: 'roads', component: RoadsComponent},
    {path: 'admins', component: AdminComponent},
    {path: 'nodes', component: NodesComponent},
    {path: 'obstacles', component: ObstaclesComponent},
    {path: 'login', component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
