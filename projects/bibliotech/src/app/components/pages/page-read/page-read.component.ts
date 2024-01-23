import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'app-page-read',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-read.component.html',
  styleUrl: './page-read.component.css',
})
export class PageReadComponent implements OnInit {
  pageRead: Page | undefined;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pageId = this.route.snapshot.paramMap.get('idPage');

    if (pageId) {
      this.pageService.getPageById(+pageId).subscribe(
        (book: Page | undefined) => {
          this.pageRead = book;
          console.log('Informations du livre:', this.pageRead);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  cancelButton(): void{
    const idBook = this.route.snapshot.paramMap.get('idBook');
    this.router.navigate(['book', idBook])
  }

  GoToPageUpdatePage(){
    const idBook = this.route.snapshot.paramMap.get('idBook');
    const idPage = this.route.snapshot.paramMap.get('idPage');
    this.router.navigate(['book', idBook,'page','update',idPage])
  }

  GoToPageDeletePage(){
    const idBook = this.route.snapshot.paramMap.get('idBook');
    const idPage = this.route.snapshot.paramMap.get('idPage');
    this.router.navigate(['book', idBook,'page','delete',idPage])
  }
}
