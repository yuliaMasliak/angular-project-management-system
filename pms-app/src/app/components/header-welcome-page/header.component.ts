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
    if (window.localStorage.getItem('access_token')) {
      this.router.navigate(['dashboard/start'])
    } else {
      this.router.navigate(['main', 'login'])
    }
  }
  toggleBurger() {
    let burger = document.querySelector('.collapsed') as HTMLElement
    let close = document.querySelector('.close') as HTMLElement
    burger.classList.toggle('active')
    close.classList.toggle('active')
  }
  closeBurger() {
    let burger = document.querySelector('.collapsed') as HTMLElement
    burger.classList.remove('active')
    let close = document.querySelector('.close') as HTMLElement
    close.classList.remove('active')
  }
}
