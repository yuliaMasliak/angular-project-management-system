import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public translate: TranslateService,
    private router: Router,
    private authService: AuthService
  ) {}

  checkTokenLogin() {
    if (window.localStorage.getItem(`${this.authService.user.login}token`)) {
      this.router.navigate(['dashboard'])
    } else {
      this.router.navigate(['main', 'login'])
    }
  }
}
