import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent {
  @Input() name: string = ''
  constructor(
    private router: Router,
    public translate: TranslateService,
    private auth: AuthService
  ) {}
  deleteToken() {
    window.localStorage.clear()
    this.router.navigate(['../main/welcome'])
  }
  toMainPage() {
    this.router.navigate(['../main/welcome'])
  }
  editProfile() {
    this.router.navigate(['dashboard/account'])
  }
}
