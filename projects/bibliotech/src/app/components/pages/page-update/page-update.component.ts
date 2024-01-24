import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'app-page-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './page-update.component.html',
  styleUrl: './page-update.component.css',
})
export class PageUpdateComponent implements OnInit {
  page: Page | undefined;

  modifReussi: boolean = false;
  erreurAjout: boolean = false;

  pageForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  constructor(
    private pageService: PageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idPage = this.route.snapshot.paramMap.get('idPage');

    if (idPage) {
      this.pageService
        .getPageById(+idPage)
        .subscribe((page) => (this.page = page));
    }
  }

  onSubmit(): void {
    if (this.pageForm.valid) {
      const updatedPage: Page = {
        ...this.page!,
        title:
          this.pageForm.value.title !== ''
            ? this.pageForm.value.title
            : this.page!.title,
        content:
          this.pageForm.value.content !== ''
            ? this.pageForm.value.content
            : this.page!.content,
        updatedAt: new Date(),
      };

      this.pageService.updatePage(updatedPage).subscribe(
        () => {
          console.log('Page mise à jour! Retour à la page');

          setTimeout(() => {
            const idBook = this.route.snapshot.paramMap.get('idBook');
            const idPage = this.route.snapshot.paramMap.get('idPage');
            this.router.navigate(['book', idBook, 'page', idPage]);
          }, 1000);
        },
        (error) => {
          console.error(error);
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
