import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CategoriesService } from '../../../services/categories.service';
import { Categories } from '../../../models/categories';

@Component({
  selector: 'app-categories-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories-create.component.html',
  styleUrl: './categories-create.component.css',
})
export class CategoriesCreateComponent {
  ajoutReussi: boolean = false;
  ajoutError: boolean = false;

  constructor(
    private categService: CategoriesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  categForm: FormGroup = this.formBuilder.group({
    label: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.categForm.valid) {
      this.categService.getCategories().subscribe(
        (categ: Categories[]) => {

          const newCateg: Categories = {
            id: this.categService.genIdCategory(categ),
            label: this.categForm.get('label')?.value,
          };

          this.categService
            .createCategory(newCateg)
            .subscribe((createdCateg: Categories) => {
              this.ajoutReussi = true;
              this.ajoutError = false;

              setTimeout(() => {
                this.router.navigate(['categories']);
              }, 1000);
            });
        },
        (error: any) => {
          console.error(error);
          this.ajoutReussi = false;
          this.ajoutError = true;
        }
      );
    }
  }

  cancelButton() {
    this.router.navigate(['categories']);
  }
}
