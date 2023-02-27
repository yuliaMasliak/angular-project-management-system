import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './core/pages/login/login.component'
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component'
import { SignupComponent } from './core/pages/signup/signup.component'
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component'

const routes: Routes = [
  {
    path: 'logo',
    component: WelcomePageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: WelcomePageComponent
  },
  { path: '**', component: NotFoundPageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
