import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component'
import { AppRoutingModule } from '../app-routing.module'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

    NotFoundPageComponent,
    WelcomePageComponent
  ],
  exports: [HeaderComponent, FooterComponent],
  imports: [CommonModule, AppRoutingModule]
})
export class CoreModule {}
