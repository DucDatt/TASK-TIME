import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TaskModel } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/task'

  getAll(): Observable<TaskModel[]> {
    let tasks = this.http.get(`${this.url}/all`).pipe(
      map((tasks) => {
        return <TaskModel[]>tasks;
      })
    );
    return tasks;
  }

  getAllByUserId(_id: string): Observable<TaskModel[]> {
    let tasks = this.http.get(`${this.url}/all/user/${_id}`).pipe(
      map((tasks) => {
        return <TaskModel[]>tasks;
      })
    );
    return tasks;
  }

  getTaskById(id: string) {
    let task = this.http.get(`${this.url}?id=${id}`).pipe(
      map((task) => {
        return <TaskModel>task;
      })
    );
    return task;
  }

  postTask(task: any) {
    let response = this.http
      .post(`${this.url}/create`, task, {
        headers: new HttpHeaders({
          authorization: '',
        }),
      })
      .pipe(
        map((task) => {
          return <TaskModel>task;
        })
      );
    return response;
  }

  updateTask(task: any) {
    return this.http.put(`${this.url}/update`, task, {
      headers: new HttpHeaders({
        authorization: '',
      }),
    }) as Observable<TaskModel>;
  }
}
