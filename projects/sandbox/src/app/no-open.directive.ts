import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[preventLink]',
  standalone: true

})
export class PreventLinkDirective {
  constructor() { }
  
  @HostListener('click', ['$event'])
  onClick(event: Event){
    event.preventDefault();
  }
}