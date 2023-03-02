import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { adminToken, baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit() {
    const userToken = `Bearer ${adminToken}`
    console.log
    const config = {
      headers: {
        Authorization: userToken
      }
    }
    this.http
      .get(`${baseUrl}users`, config)
      .subscribe((data) => console.log(data))
  }
}
