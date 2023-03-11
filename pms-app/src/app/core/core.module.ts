import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ProfileComponent } from './dashboard/profile/profile.component'
import { HeaderUserComponent } from './dashboard/header-user/header-user.component'
import { AccountComponent } from './dashboard/profile/components/account/account.component'
import { MatButtonModule } from '@angular/material/button'
import { StartPageComponent } from './dashboard/profile/components/start-page/start-page.component'
import { BoardCreatePageComponent } from './dashboard/profile/components/board-create-page/board-create-page.component'
import { ModalComponent } from './modal/modal.component'
import { AuthService } from '../services/auth.service'
import { GetBoardService } from '../services/get-board.service'
import { ModalServiceService } from '../services/modal-service.service'
import { ColumnsComponent } from './dashboard/profile/components/columns/columns.component'
import { AuthInterceptor } from '../services/auth.interceptor'
import { DragDropModule } from '@angular/cdk/drag-drop'
function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [
    ProfileComponent,
    HeaderUserComponent,
    AccountComponent,
    StartPageComponent,
    BoardCreatePageComponent,
    ModalComponent,
    ColumnsComponent
  ],
  exports: [MatButtonModule],
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    DragDropModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
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
  ]
})
export class CoreModule {}
