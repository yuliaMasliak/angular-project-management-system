import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { adminToken, baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  constructor(private auth: AuthService, private http: HttpClient) {}
  name: string = ''

  ngOnInit() {
    const userToken = `Bearer ${adminToken}`

    const config = {
      headers: {
        Authorization: userToken
      }
    }
    this.http.get(`${baseUrl}users`, config).subscribe((data: any) => {
      data.forEach((el: any) => {
        if (el.login == this.auth.user.login) {
          this.name = el.name
        }
      })
    })
  }
}
