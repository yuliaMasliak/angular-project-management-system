import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { IUserToLogin } from 'src/app/models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(private router: Router, private authService: AuthService) {}

  loginAuthUser() {
    this.authService.userLogin(
      this.loginForm.value.login,
      this.loginForm.value.password
    )
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]),
      argeement: new FormControl('', [
        Validators.required,
        Validators.pattern('true')
      ])
    })
  }
}
