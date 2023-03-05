import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  constructor(private auth: AuthService, private http: HttpClient) {}
  name: string = ''
  id: number = 0
  userToken = `Bearer ${this.auth.token}`

  config = {
    headers: {
      Authorization: this.userToken,
      'Content-Type': 'application/json'
    }
  }
  ngOnInit() {
    console.log(this.auth.token)
    this.http.get(`${baseUrl}users`, this.config).subscribe((data: any) => {
      data.forEach((el: any) => {
        if (el.login == this.auth.user.login) {
          this.name = el.name
          this.id = el._id
        }
      })
    })
  }
  cancelCreateNewBoard() {
    document
      .querySelector('.cancel-create-board')
      ?.addEventListener('click', () => {
        document
          .querySelector('.modal-create-board')
          ?.classList.remove('active')
      })
  }
  submitCreateNewBoard() {
    const input = document.getElementById('title') as HTMLInputElement
    const body = {
      title: input.value,
      owner: this.id,
      users: ['']
    }
    this.http
      .post(`${baseUrl}boards`, body, this.config)
      .subscribe((data: any) => console.log(data))
    document.querySelector('.modal-create-board')?.classList.remove('active')
  }
}
