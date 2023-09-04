import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Return all registered users
  getAllRegisteredUsers(): Observable<any> {
    return this.http.get<any>(`/api/users`).pipe(
      map((users) => {
        if (users) {
          return users;
        }
      }),
      catchError((err) => {
        throw err;
      })
    );
  }
}
