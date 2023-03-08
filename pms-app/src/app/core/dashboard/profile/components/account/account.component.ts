import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { ModalServiceService } from 'src/app/services/modal-service.service'
import { baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    public modal: ModalServiceService
  ) {}

  @Output() name: string = ''
  @Output() login: string = ''
  @Output() id: string = ''
  @Output() password: string = this.auth.user.password
  userToken = `Bearer ${this.auth.token}`

  config = {
    headers: {
      Authorization: this.userToken
    }
  }
  input = document.querySelector('.form-control') as HTMLInputElement

  ngOnInit() {
    this.http.get(`${baseUrl}users`, this.config).subscribe((data: any) => {
      data.forEach((el: any) => {
        if (el.login == this.auth.user.login) {
          this.login = el.login
          this.name = el.name
          this.id = el._id
          console.log(this.id)
        }
      })
    })
  }
  editName() {
    this.modal.openName()
  }

  editLogin() {
    this.modal.openLogin()
  }
  editPassword() {
    this.modal.openPassword()
  }

  provideResultOfModal(value: boolean) {
    if (value && this.modal.name) {
      this.name = this.input.value
      this.updateUser()
      this.modal.closeName()
    } else if (value && this.modal.login) {
      this.login = this.input.value
      this.updateUser()
      this.modal.closeLogin()
    } else if (value && this.modal.password) {
      this.login = this.input.value
      this.updateUser()
      this.modal.closePassword()
    } else {
      this.modal.closeName()
      this.modal.closeLogin()
      this.modal.closePassword()
    }
  }
  updateUser() {
    const body = {
      name: this.name,
      login: this.login,
      password: this.password
    }
    this.http
      .put(`${baseUrl}users/${this.id}`, body, this.config)
      .subscribe((data: any) => {
        this.id = data._id
        this.modal.close()
      })
  }
  deleteUser() {
    this.http
      .delete(`${baseUrl}users/${this.id}`, this.config)
      .subscribe((data) => {
        this.modal.close()
        window.localStorage.clear()
        this.router.navigate(['main/welcome'])
      })
  }
}
