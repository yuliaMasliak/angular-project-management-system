import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AccountRoutingModule } from './account-routing.module'
import { ProfileComponent } from './profile/profile.component'
import { HeaderUserComponent } from './header-user/header-user.component'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http'

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [ProfileComponent, HeaderUserComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    RouterModule,
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
export class AccountModule {}
