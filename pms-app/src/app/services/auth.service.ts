import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import { IUser, userResponse } from '../models/user'
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

  public getUsers(): void {
    console.log(this.http.get(baseUrl).subscribe((res) => console.log(res)))
  }
  public createUser(user: IUser): void {
    const headers = {
      'Content-Type': 'application/json'
    }

    this.http
      .post(`${baseUrl}auth/signup`, user, { headers })
      .subscribe((data: any) => this.userLogin(data.login, data.password))
  }

  userLogin(userLogin: string, userPassword: string): void {
    const headers = {
      'Content-Type': 'application/json'
    }
    const usertoLogin = {
      login: userLogin,
      password: userPassword
    }
    this.http
      .post(`${baseUrl}auth/signin`, usertoLogin, { headers })
      .subscribe((data) => console.log(data))
  }
}
