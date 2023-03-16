import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { StarredComponent } from './components/starred/starred.component';
import { RecycleBinComponent } from './components/recycle-bin/recycle-bin.component';
import { RequestComponent } from 'src/app/components/request/request.component';
import { TaskBodyComponent } from 'src/app/components/task-body/task-body.component';
import { HomeBodyComponent } from 'src/app/components/home-body/home-body.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // { path: '', redirectTo: 'projects', pathMatch: 'full' },
      {
        path: 'projects',
        component: ProjectsComponent,
        children: [
          { path: '', component: HomeBodyComponent },
          { path: 'tasks/:id', component: TaskBodyComponent },
        ],
      },
      { path: 'starred', component: StarredComponent },
      { path: 'recyclebin', component: RecycleBinComponent },
      { path: 'request', component: RequestComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
