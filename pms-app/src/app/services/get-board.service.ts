import { Injectable } from '@angular/core'
import { baseUrl } from 'src/environment/environment'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class GetBoardService {
  constructor(private auth: AuthService) {}
  token: string = this.auth.token
  owner = {
    id: ''
  }
  createBoard() {}
}
