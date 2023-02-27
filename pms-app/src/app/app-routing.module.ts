import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component'
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component'

const routes: Routes = [
  {
    path: 'home',
    component: WelcomePageComponent
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
