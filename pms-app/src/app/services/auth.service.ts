import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { IUser } from '../models/user'
import { baseUrl } from 'src/environment/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userResponse: string = ''
  userId: any = ''
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
          this.router.navigate(['dashboard'])
          alert('You were successfully logged in')
        }
      },
      (err) => {
        this.router.navigate(['main'])
        alert('Failed Login')
      }
    )
  }
}
