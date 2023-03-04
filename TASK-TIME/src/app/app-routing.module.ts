import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }, { path: 'task', loadChildren: () => import('./pages/task/task.module').then(m => m.TaskModule) }, { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
