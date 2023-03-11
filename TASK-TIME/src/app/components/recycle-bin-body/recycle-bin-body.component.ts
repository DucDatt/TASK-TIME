import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-recycle-bin-body',
  templateUrl: './recycle-bin-body.component.html',
  styleUrls: ['./recycle-bin-body.component.scss']
})
export class RecycleBinBodyComponent {
  constructor(private projectsService: ProjectsService, private router: Router) { }
  projects = new Observable<any[]>;

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.projects = await this.projectsService.getAll();
    this.projects.subscribe((data) => {
      console.log(data);
    })
  }
}
