import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header-welcome-page/header.component'
import { LoginComponent } from './components/login/login.component'
import { MainComponent } from './components/main-welcome-page/main.component'
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component'
import { SignupComponent } from './components/signup/signup.component'
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from './services/auth.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { GetBoardService } from './services/get-board.service'
import { ModalServiceService } from './services/modal-service.service'
import { AuthInterceptor } from './services/auth.interceptor'

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    NotFoundPageComponent,
    SignupComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    GetBoardService,
    ModalServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
