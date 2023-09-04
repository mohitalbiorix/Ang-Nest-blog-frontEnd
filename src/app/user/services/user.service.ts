import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Get all users 
  getAllUsers(page: number, size: number): Observable<User> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get('/api/users', { params }).pipe(
      map((userData: any) => userData),
      catchError((err) => {
        throw err;
      })
    );
  }

  // Pagination by userName filter
  paginateByName(
    page: number,
    size: number,
    username: string
  ): Observable<User> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('username', username);

    return this.http.get('/api/users', { params }).pipe(
      map((userData: any) => userData),
      catchError((err) => throwError(err))
    );
  }
}
