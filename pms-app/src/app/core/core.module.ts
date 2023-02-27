import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component'
import { AppRoutingModule } from '../app-routing.module'
import { LoginComponent } from './pages/login/login.component'
import { SignupComponent } from './pages/signup/signup.component'
import { MainComponent } from './main/main.component'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

    NotFoundPageComponent,
    WelcomePageComponent,
    LoginComponent,
    SignupComponent,
    MainComponent
  ],
  exports: [HeaderComponent, FooterComponent, MainComponent],
  imports: [CommonModule, AppRoutingModule]
})
export class CoreModule {}
