import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private router: Router, private authService: AuthService) {}

  async submitUserLogin() {
    this.authService
      .allowLogin(this.loginForm.value)
      .subscribe({ next: () => this.router.navigate(['dashboard']) })
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
