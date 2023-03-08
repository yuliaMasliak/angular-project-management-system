import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string = ''
  @Output() submitResult = new EventEmitter()
  onClick(value: boolean) {
    this.submitResult.emit(value)
  }
}
