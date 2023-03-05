import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(
    public translate: TranslateService,
    private router: Router,
    private authService: AuthService
  ) {}

  checkTokenLogin() {
    if (window.localStorage.getItem(`${this.authService.user.login}token`)) {
      this.router.navigate(['dashboard'])
    } else {
      this.router.navigate(['login'])
    }
  }
}
