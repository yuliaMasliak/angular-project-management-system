import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AccountRoutingModule } from './account-routing.module'
import { ProfileComponent } from './profile/profile.component'

import { HeaderUserComponent } from './header-user/header-user.component'
import { DashboardComponent } from './dashboard/dashboard.component'

@NgModule({
  declarations: [ProfileComponent, HeaderUserComponent, DashboardComponent],
  imports: [CommonModule, AccountRoutingModule, RouterModule]
})
export class AccountModule {}
