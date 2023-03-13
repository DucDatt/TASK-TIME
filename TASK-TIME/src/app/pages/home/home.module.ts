import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/shared/material.module';

import { ProjectsComponent } from './components/projects/projects.component';
import { StarredComponent } from './components/starred/starred.component';
import { RecycleBinComponent } from './components/recycle-bin/recycle-bin.component';
import { RequestComponent } from 'src/app/components/request/request.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProjectsComponent,
    StarredComponent,
    RecycleBinComponent,
    RequestComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
