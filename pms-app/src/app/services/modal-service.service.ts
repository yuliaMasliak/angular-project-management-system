import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  value: boolean = false
  constructor() {}
  open() {
    this.value = true
  }
  close() {
    this.value = false
  }
}
