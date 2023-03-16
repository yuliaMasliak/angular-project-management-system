import { Directive, Input, Output, EventEmitter } from '@angular/core'

@Directive({
  selector: '[appNgInit]'
})
export class NgInitDirective {
  @Input() isLoaded: boolean = true

  @Output('ngInit') initEvent: EventEmitter<any> = new EventEmitter()

  ngOnInit() {
    if (this.isLoaded) {
      this.initEvent.emit()
    }
  }
}
