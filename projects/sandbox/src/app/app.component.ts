import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HighlightDirective } from './highlight.directive';
import {PreventLinkDirective} from './no-open.directive'



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HighlightDirective, PreventLinkDirective],
  template: `
  <h1>Découverte des directives d'attributs!</h1>

  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aliquam distinctio illum iste dolore excepturi vitae optio vero repellendus reiciendis libero dignissimos velit consequuntur earum ab, ea sed modi facilis!
</p>
  <p highlight bg-color="green" default-color="blue">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, alias obcaecati harum atque perferendis laudantium provident ab quidem et quas iusto. Perferendis beatae necessitatibus, odit nihil rem commodi consequatur vitae.
  </p>
  <a preventLink href="https://google.com" >NE PAS CLIQUER ICI</a>`,

  styles: []
})

export class AppComponent {
  title = 'sandbox';
}