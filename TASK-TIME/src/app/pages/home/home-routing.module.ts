import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { StarredComponent } from './components/starred/starred.component';
import { RecycleBinComponent } from './components/recycle-bin/recycle-bin.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: 'projects', component: ProjectsComponent },
      { path: 'starred', component: StarredComponent },
      { path: 'recyclebin', component: RecycleBinComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
