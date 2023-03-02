import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProfileComponent } from './dashboard/profile/profile.component'

const routes: Routes = [
  {
    children: [
      {
        path: '',
        component: ProfileComponent
      },
      { path: 'profile', component: ProfileComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
