import { Component, Input } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent {
  @Input() name: string = ''
  constructor(public translate: TranslateService) {}
}
