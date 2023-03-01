import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import { IUser } from '../models/user'
import { baseUrl } from 'src/environment/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null
  userResponse: string = ''
  userId: any = ''
  constructor(private router: Router, private http: HttpClient) {}

  public createUser(user: IUser): Observable<string | boolean> {
    let result = false
    const headers = {
      'Content-Type': 'application/json'
    }

    this.http
      .post(`${baseUrl}auth/signup`, user, { headers })
      .subscribe((data: any) => {
        if (data.token) {
          result = true
        }
        result = false
      })
    return of(result)
  }

  userLogin(
    userLogin: string,
    userPassword: string
  ): Observable<string | boolean> {
    const headers = {
      'Content-Type': 'application/json'
    }
    let result = false
    const usertoLogin = {
      login: userLogin,
      password: userPassword
    }
    this.http
      .post(`${baseUrl}auth/signin`, usertoLogin, { headers })
      .subscribe((data: any) => {
        if (data.token) {
          result = true
        }
        result = false
      })
    return of(result)
  }
}
