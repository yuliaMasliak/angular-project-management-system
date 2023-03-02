import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './start-pages/header-welcome-page/header.component'
import { FooterComponent } from './footer/footer.component'
import { NotFoundPageComponent } from './start-pages/not-found-page/not-found-page.component'
import { WelcomePageComponent } from './start-pages/welcome-page/welcome-page.component'
import { AppRoutingModule } from '../app-routing.module'
import { LoginComponent } from './start-pages/login/login.component'
import { SignupComponent } from './start-pages/signup/signup.component'
import { MainComponent } from './start-pages/main-welcome-page/main.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http'
import { ProfileComponent } from './dashboard/profile/profile.component'
import { HeaderUserComponent } from './dashboard/header-user/header-user.component'

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    WelcomePageComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    ProfileComponent,
    HeaderUserComponent
  ],
  exports: [HeaderComponent, FooterComponent, MainComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ]
})
export class CoreModule {}
