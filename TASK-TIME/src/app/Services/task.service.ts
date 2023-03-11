import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/task'

  async getAll() {
    let tasks = this.http.get(`${this.url}/all`).pipe(map((data: any) => {
      return <any[]>data;
    }));
    return tasks;
  }

  async getTaskById(id: string) {
    let task = lastValueFrom(this.http.get(`${this.url}?id=${id}`));
    return task;
  }

  async postTask(task: any) {
    let response = lastValueFrom(this.http.post(`${this.url}/create`, task,
      {
        headers: new HttpHeaders({
          'authorization': ''
        })
      }
    ));
    return response;
  }

  async updateTask(task: any) {
    let response = lastValueFrom(this.http.put(`${this.url}/update`, task,
      {
        headers: new HttpHeaders({
          'authorization': ''
        })
      }
    ));
    return response;
  }
}
