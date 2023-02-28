import { HttpClient } from '@angular/common/http'
import { Injectable, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import { IUser } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  public getUsers(): Observable<IUser[]> {
    console.log(
      this.http
        .get(`http://localhost:4200/users/`)
        .subscribe((res) => console.log(res))
    )
    return this.http.get<IUser[]>(`http://localhost:4200/users`)
  }
  allowLogin(user: IUser): Observable<string | boolean> {
    console.log(this.getUsers())
    if (user.email && user.password) {
      return of(true)
    } else {
      return throwError(() => {
        new Error('Failed login')
      })
    }
  }
}
