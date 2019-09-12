import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/Todo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // using this "fake" jsonplace holder data to emulate getting data from a "database"
  // using this because this is just for learning
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=10';
  // need to inject the http into the constructor to use it
  constructor(private http:HttpClient) { }

  // method called getTodos() that will return a Observable<Todo[]>. typescript notation
  // observable is like a data stream
  getTodos():Observable<Todo[]> {
    // the get request method in ng
    // template literal inside to hide the url
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // delete todo (in the server) although there's no "real" server for this project
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.delete<Todo>(url, httpOptions);
  }

  // add todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // toggle completed (in the server) although there's no "real" server for this project
  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put(url, todo, httpOptions);
  }
}
