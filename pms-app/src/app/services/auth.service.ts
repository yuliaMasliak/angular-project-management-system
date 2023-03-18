import { HttpClient } from '@angular/common/http'
import { Injectable, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IUser } from '../models/interfaces'
import { baseUrl } from 'src/environment/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = ''
  user = {
    id: localStorage.getItem('access_id'),
    name: '',
    login: '',
    password: ''
  }
  id: string = ''

  constructor(private router: Router, private http: HttpClient) {}

  public createUser(user: IUser): void {
    const headers = {
      'Content-Type': 'application/json'
    }
    let modalResult = document.querySelector('.success-login') as HTMLElement
    let result = document.querySelector('.modal-result-login') as HTMLElement
    this.http.post(`${baseUrl}auth/signup`, user, { headers }).subscribe(
      (data: any) => {
        if (data._id) {
          this.user.id = data._id
          this.id = data._id
          this.userLogin(user.login, user.password)
          this.user.name = data.name
          localStorage.setItem('access_id', data._id)
          console.log(window.localStorage.getItem('access_id'))
        }
      },
      (err) => {
        modalResult.classList.remove('hidden')
        result.innerHTML =
          err.error.message + '. <br/>Please, choose another one'
        setTimeout(() => {
          modalResult.classList.add('active'),
            this.router.navigate(['main/signup'])
          modalResult.classList.add('hidden')
        }, 2000)
      }
    )
  }

  userLogin(userLogin: string, userPassword: string) {
    const headers = {
      'Content-Type': 'application/json'
    }
    const usertoLogin = {
      login: userLogin,
      password: userPassword
    }

    let modalResult = document.querySelector('.success-login') as HTMLElement
    let result = document.querySelector('.modal-result-login') as HTMLElement
    this.http.post(`${baseUrl}auth/signin`, usertoLogin, { headers }).subscribe(
      (data: any) => {
        if (data.token) {
          const userToken = `Bearer ${data.token}`
          const config = {
            headers: {
              Authorization: userToken
            }
          }
          this.http.get(`${baseUrl}users`, config).subscribe((data: any) => {
            data.forEach((el: any) => {
              if (el.login == userLogin) {
                console.log(el.id)
                window.localStorage.setItem('access_id', el._id)
                console.log(window.localStorage.getItem('access_id'))
              }
            })
          })

          this.token = data.token
          console.log(window.localStorage.getItem('access_id'))
          window.localStorage.setItem('access_token', data.token)

          this.user.login = usertoLogin.login
          this.user.password = usertoLogin.password
          modalResult.classList.remove('hidden')
          result.innerHTML = 'You were successfully<br />logged in'
          setTimeout(() => {
            modalResult.classList.add('active'),
              this.router.navigate(['dashboard/start'])
          }, 2000)
        }
      },
      (err) => {
        modalResult.classList.remove('hidden')
        result.innerHTML = 'Failed login'
        setTimeout(() => {
          modalResult.classList.add('active'),
            this.router.navigate(['main/welcome'])
          modalResult.classList.add('hidden')
        }, 2000)
      }
    )
  }
}
