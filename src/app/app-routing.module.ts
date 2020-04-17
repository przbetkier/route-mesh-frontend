import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoadsComponent} from './components/roads/roads.component';
import {AdminComponent} from './components/admin/admin.component';
import {NodesComponent} from './components/nodes/nodes.component';
import {ObstaclesComponent} from './components/obstacles/obstacles.component';
import {LoginComponent} from './components/login/login.component';
import {RouteGuardService} from './services/route-guard.service';

const routes: Routes =
  [
    {path: '', component: RoadsComponent, canActivate: [RouteGuardService]},
    {path: 'roads', component: RoadsComponent, canActivate: [RouteGuardService]},
    {path: 'admins', component: AdminComponent, canActivate: [RouteGuardService]},
    {path: 'nodes', component: NodesComponent, canActivate: [RouteGuardService]},
    {path: 'obstacles', component: ObstaclesComponent, canActivate: [RouteGuardService]},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: '/'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
