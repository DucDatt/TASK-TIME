import { ProjectModel } from './../model/project.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/project';

  getAll(): Observable<ProjectModel[]> {
    let projects = this.http.get(`${this.url}/all`).pipe(
      map((projects) => {
        return <ProjectModel[]>projects;
      })
    );
    return projects;
  }

  getAllByUserId(_id: string): Observable<ProjectModel[]> {
    let projects = this.http.get(`${this.url}/all/user/${_id}`).pipe(
      map((projects) => {
        return <ProjectModel[]>projects;
      })
    );
    return projects;
  }

  getProjectById(id: string) {
    let project = this.http.get(`${this.url}?id=${id}`).pipe(
      map((project) => {
        return <ProjectModel>project;
      })
    );
    return project;
  }

  postProject(project: any) {
    let response = this.http
      .post(`${this.url}/create`, project, {
        headers: new HttpHeaders({
          authorization: '',
        }),
      })
      .pipe(
        map((project) => {
          return <ProjectModel>project;
        })
      );
    return response;
  }

  updateProject(project: any) {
    return this.http.put(`${this.url}/update`, project, {
      headers: new HttpHeaders({
        authorization: '',
      }),
    }) as Observable<ProjectModel>;
  }
}
