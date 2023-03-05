import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import user from 'final-task-backend/Project management application/src/models/user'
import { AuthService } from 'src/app/services/auth.service'
import { adminToken, baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  @Output() name: string = ''
  @Output() login: string = ''
  @Output() id: number = 0
  @Output() password: string = this.auth.user.password

  ngOnInit() {
    const userToken = `Bearer ${adminToken}`

    const config = {
      headers: {
        Authorization: userToken
      }
    }
    this.http.get(`${baseUrl}users`, config).subscribe((data: any) => {
      data.forEach((el: any) => {
        if (el.login == this.auth.user.login) {
          console.log(el)
          this.login = el.login
          this.name = el.name
          this.id = el._id
        }
      })
    })
  }
  editName() {
    const modal = document.querySelector('.modal-name') as HTMLElement
    modal.classList.add('active')
    const modalSubmit = document.querySelector('.submit-name') as HTMLElement
    modalSubmit.addEventListener('click', () => {
      const inputName = document.getElementById(
        'input-name-modal'
      ) as HTMLInputElement
      this.name = inputName.value
      modal.classList.remove('active')
      this.updateUser()
    })
  }

  editLogin() {
    const modal = document.querySelector('.modal-login') as HTMLElement
    modal.classList.add('active')
    const modalSubmit = document.querySelector('.submit-login') as HTMLElement
    modalSubmit.addEventListener('click', () => {
      const inputName = document.getElementById(
        'input-login-modal'
      ) as HTMLInputElement
      this.login = inputName.value
      modal.classList.remove('active')
      this.updateUser()
    })
  }
  editPassword() {
    const modal = document.querySelector('.modal-password') as HTMLElement
    modal.classList.add('active')
    const modalSubmit = document.querySelector(
      '.submit-password'
    ) as HTMLElement
    modalSubmit.addEventListener('click', () => {
      const inputName = document.getElementById(
        'input-password-modal'
      ) as HTMLInputElement
      this.password = inputName.value
      modal.classList.remove('active')
      this.updateUser()
    })
  }
  deleteUser() {
    const modal = document.querySelector('.modal-delete') as HTMLElement
    modal.classList.add('active')
    const modalSubmit = document.querySelector(
      '.delete-password'
    ) as HTMLElement
    const modalCancel = document.querySelector(
      '.cancel-password'
    ) as HTMLElement
    modalSubmit.addEventListener('click', () => {
      const userToken = `Bearer ${adminToken}`
      const config = {
        headers: {
          Authorization: userToken
        }
      }

      this.http
        .delete(`${baseUrl}users/${this.id}`, config)
        .subscribe((data) => {
          console.log(data)
        })
      modal.classList.remove('active')
      window.localStorage.clear()
      this.router.navigate(['main/welcome'])
    })
    modalCancel.addEventListener('click', () => {
      modal.classList.remove('active')
    })
  }
  updateUser() {
    const userToken = `Bearer ${adminToken}`
    const config = {
      headers: {
        Authorization: userToken
      }
    }
    const body = {
      name: this.name,
      login: this.login,
      password: this.password
    }
    this.http
      .put(`${baseUrl}users/${this.id}`, body, config)
      .subscribe((data) => {
        console.log(data)
      })
  }
}
