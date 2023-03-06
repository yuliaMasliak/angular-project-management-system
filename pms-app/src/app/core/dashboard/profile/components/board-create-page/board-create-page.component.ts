import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-board-create-page',
  templateUrl: './board-create-page.component.html',
  styleUrls: ['./board-create-page.component.css']
})
export class BoardCreatePageComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {}
  ngOnInit(): void {}
}
