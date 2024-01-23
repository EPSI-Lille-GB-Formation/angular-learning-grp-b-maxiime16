import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Page } from '../../../models/page';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

  constructor(
    private router: Router,
  ){}

  @Input("value")
  page: Page | undefined;

  GoToDetailsPagePage(idBook: number, idPage: number):void {
    this.router.navigate(['book/', idBook, '/page/,', idPage]);
  }

}
