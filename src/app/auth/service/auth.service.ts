import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { LoginUserInfo } from 'src/app/shared/models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // user login
  login(user: LoginUserInfo): Observable<Object> {
    return this.http.post<any>(`/api/users/login`, user).pipe(
      map((token) => {
        if (token?.access_token) {
          localStorage.setItem('blog-token', token?.access_token);
          return token;
        }
        return null;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  // user registration
  register(user: LoginUserInfo): Observable<any> {
    return this.http.post<any>(`/api/users`, user).pipe(
      map((user) => user),
      catchError((err) => {
        throw err;
      })
    );
  }
}
