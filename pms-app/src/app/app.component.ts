import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  title = 'pms-app'
  ngOnInit(): void {
    console.log(window.localStorage.getItem('access_id'))
  }
}
