import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private ElementRef: ElementRef, private Renderer2: Renderer2) {}
  @HostListener('mouseenter', ['$event'])
  public onMouseEnter(event: MouseEvent) {
    this.highlight('#520099')
    this.Renderer2.setStyle(this.ElementRef.nativeElement, 'fontWeight', '600')
  }
  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(event: MouseEvent) {
    this.highlight('#453953 ')
    this.Renderer2.setStyle(this.ElementRef.nativeElement, 'fontWeight', '')
  }
  private highlight(color: string) {
    this.Renderer2.setStyle(this.ElementRef.nativeElement, 'color', color)
    this.Renderer2.setStyle(this.ElementRef.nativeElement, 'cursor', 'pointer')
  }
}
