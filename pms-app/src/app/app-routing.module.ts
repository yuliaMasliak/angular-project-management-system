import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './core/start-pages/login/login.component'
import { NotFoundPageComponent } from './core/start-pages/not-found-page/not-found-page.component'
import { SignupComponent } from './core/start-pages/header-welcome-page/signup/signup.component'
import { WelcomePageComponent } from './core/start-pages/welcome-page/welcome-page.component'

const routes: Routes = [
  {
    path: 'main',
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
    path: 'dashboard',
    loadChildren: () =>
      import('./core/account/account.module').then((m) => m.AccountModule)
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
