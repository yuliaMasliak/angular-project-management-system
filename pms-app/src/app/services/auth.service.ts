import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { IUser } from '../models/user'
import { baseUrl } from 'src/environment/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = {
    name: '',
    login: '',
    password: ''
  }
  constructor(private router: Router, private http: HttpClient) {}

  public createUser(user: IUser): void {
    const headers = {
      'Content-Type': 'application/json'
    }

    this.http
      .post(`${baseUrl}auth/signup`, user, { headers })
      .subscribe((data: any) => {
        if (data._id) {
          this.userLogin(user.login, user.password)
          this.user.name = data.name
        }
      })
  }

  userLogin(userLogin: string, userPassword: string) {
    const headers = {
      'Content-Type': 'application/json'
    }

    const usertoLogin = {
      login: userLogin,
      password: userPassword
    }
    this.http.post(`${baseUrl}auth/signin`, usertoLogin, { headers }).subscribe(
      (data: any) => {
        if (data.token) {
          window.localStorage.setItem(`${userLogin}token`, data.token)
          this.router.navigate(['dashboard/start'])
          this.user.login = usertoLogin.login
          this.user.password = usertoLogin.password
          alert('You were successfully logged in')
        }
      },
      (err) => {
        alert('Failed Login')
        this.router.navigate(['main/welcome'])
      }
    )
  }
}
