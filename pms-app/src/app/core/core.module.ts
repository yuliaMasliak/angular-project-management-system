import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http'
import { ProfileComponent } from './dashboard/profile/profile.component'
import { HeaderUserComponent } from './dashboard/header-user/header-user.component'
import { AccountComponent } from './dashboard/profile/components/account/account.component'

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [ProfileComponent, HeaderUserComponent, AccountComponent],
  exports: [],
  imports: [
    RouterModule,
    CommonModule,

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
