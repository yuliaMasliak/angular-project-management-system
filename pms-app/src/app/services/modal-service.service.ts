import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  value: boolean = false
  login: boolean = false
  name: boolean = false
  password: boolean = false

  constructor() {}
  open() {
    this.value = true
  }
  close() {
    this.value = false
  }
  openName() {
    this.name = true
  }
  openLogin() {
    this.login = true
  }
  openPassword() {
    this.password = true
  }
  closeName() {
    this.name = false
  }
  closeLogin() {
    this.login = false
  }
  closePassword() {
    this.password = false
  }
}
