import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { PageService } from '../../../services/page.service';
import { Page } from '../../../models/page';

@Component({
  selector: 'app-page-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-delete.component.html',
  styleUrl: './page-delete.component.css',
})
export class PageDeleteComponent implements OnInit {
  page: Page | undefined;

  deleteSuccess: boolean = false;
  deleteError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    const idPage = this.route.snapshot.paramMap.get('idBook');
    console.log('idBook à supprimer: ', idPage);

    if (idPage) {
      this.pageService.getPageById(+idPage).subscribe(
        (book: Page | undefined) => {
          this.page = book;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  deletePage() {
    if (this.page) {
      this.pageService.deletePage(this.page.id).subscribe(
        () => {
          console.log('Page supprimé ! Retour a la page du livre');
          this.deleteSuccess = true;
          this.deleteError = false;

          setTimeout(() => {
            const idBook = this.route.snapshot.paramMap.get('idBook');
            this.router.navigate(['book', idBook]);
          }, 1000);
        },
        (error) => {
          console.error(error);
          this.deleteSuccess = false;
          this.deleteError = true;
        }
      );
    }
  }

  cancelButton() {
    const idBook = this.route.snapshot.paramMap.get('idBook');
    const idPage = this.route.snapshot.paramMap.get('idPage');
    this.router.navigate(['book', idBook, 'page', idPage]);
  }
}
