import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { IUser } from 'src/app/models/interfaces'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  newUserToPost: IUser | null = null

  constructor(private router: Router, private authService: AuthService) {}
  submitSignUp() {
    this.newUserToPost = {
      name: this.signupForm.value.name,
      login: this.signupForm.value.login,
      password: this.signupForm.value.password
    }
    this.authService.createUser(this.newUserToPost)
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
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
