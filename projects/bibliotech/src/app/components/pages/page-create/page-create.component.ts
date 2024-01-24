import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'app-page-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './page-create.component.html',
  styleUrl: './page-create.component.css',
})
export class PageCreateComponent {
  ajoutReussi: boolean = false;

  constructor(
    private pageService: PageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  pageForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.pageForm.valid) {
      this.pageService.getPage().subscribe(
        (pages: Page[]) => {
          const idBookUrl = this.route.snapshot.paramMap.get('idBook');
          const idBook = Number(idBookUrl);

          const newPage: Page = {
            id: this.pageService.genIdPage(pages),
            title: this.pageForm.get('title')?.value,
            content: this.pageForm.get('content')?.value,
            createdAt: new Date(),
            updatedAt: null,
            idBook: idBook,
          };

          this.pageService
            .createPage(newPage)
            .subscribe((createdPage: Page) => {
              this.ajoutReussi = true;
              console.log('Page créé avec succés: ', createdPage);

              setTimeout(() => {
                const idBook = this.route.snapshot.paramMap.get('idBook');
                this.router.navigate(['book', idBook]);
              }, 1000);
            });
        },
        (error: any) => {
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
