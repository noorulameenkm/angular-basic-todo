import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from 'src/app/models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // tslint:disable-next-line: no-inferrable-types
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  // tslint:disable-next-line: no-inferrable-types
  todosLimit: string = '?_limit=5';

  constructor(private http: HttpClient) { }

  // Function to get Todo
  getTodos(): Observable<Todo[]> {
      return this.http.get<Todo[]>(`${this.todosUrl}${ this.todosLimit }`);
  }

  // Function to mark todo as complete
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${ this.todosUrl }/${ todo.id }`;
    return this.http.put(url, todo, httpOptions);
  }

  deleteTodo(todo: Todo): Observable<any> {
    const url = `${ this.todosUrl }/${ todo.id }`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
