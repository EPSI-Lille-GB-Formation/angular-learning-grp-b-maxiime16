import { Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {

  @HostBinding('style.backgroundColor')
  bgcolor = 'transparent';

  @Input('bg-color')
  bgHighLightColor = 'yellow';

  @Input('default-color')
  bgHighLightDefaultColor = 'transparent';

  constructor() {}

  ngAfterViewInit() {
    this.bgcolor = this.bgHighLightDefaultColor
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.bgcolor= this.bgHighLightColor;
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.bgcolor = this.bgHighLightDefaultColor;
  }
}