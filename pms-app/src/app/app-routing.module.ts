import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { MainComponent } from './components/main-welcome-page/main.component'
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component'
import { SignupComponent } from './components/signup/signup.component'
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component'
import { CoreModule } from './core/core.module'
import { AccountComponent } from './core/dashboard/profile/components/account/account.component'
import { ProfileComponent } from './core/dashboard/profile/profile.component'

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'welcome',
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
      { path: 'not-found', component: NotFoundPageComponent }
    ]
  },

  {
    path: 'dashboard',
    component: ProfileComponent,
    children: [
      {
        path: 'account',
        component: AccountComponent
      }
    ]
  },

  {
    path: '',
    redirectTo: '/main/welcome',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/main/not-found',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [CoreModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
