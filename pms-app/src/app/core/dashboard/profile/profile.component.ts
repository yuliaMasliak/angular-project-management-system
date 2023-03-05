import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { adminToken, baseUrl } from 'src/environment/environment'
import { Output } from '@angular/core'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Output() name: string = ''
  @Output() id: number = 0
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}
  ngOnInit() {
    const userToken = `Bearer ${adminToken}`
    console.log
    const config = {
      headers: {
        Authorization: userToken
      }
    }
    this.http.get(`${baseUrl}users`, config).subscribe((data: any) => {
      data.forEach((el: any) => {
        if (el.login == this.authService.user.login) {
          this.name = el.name
          this.id = el._id
          console.log(el._id)
        }
      })
    })
  }
}
