import { MatSortModule } from '@angular/material/sort';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/project'

  async getAll() {
    let projects = this.http.get(`${this.url}/all`).pipe(map((data: any) => {
      return <any[]>data;
    }));
    return projects;
  }

  async getProjectById(id: string) {
    let project = lastValueFrom(this.http.get(`${this.url}?id=${id}`));
    return project;
  }

  async postProject(project: any) {
    let response = lastValueFrom(this.http.post(`${this.url}/create`, project,
      {
        headers: new HttpHeaders({
          'authorization': ''
        })
      }
    ));
    return response;
  }

  async updateProject(project: any) {
    let response = lastValueFrom(this.http.put(`${this.url}/update`, project,
      {
        headers: new HttpHeaders({
          'authorization': ''
        })
      }
    ));
    return response;
  }


  // SORT BY
  // async sortByAlphabet(projectName: string) {
  //   let sortName = this.http.get(`${this.url}/all=${projectName}`)



  //   return projects;
  // }
}
