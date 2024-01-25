import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from '../../../services/categories.service';
import { Categories } from '../../../models/categories';

@Component({
  selector: 'app-categories-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories-update.component.html',
  styleUrl: './categories-update.component.css',
})
export class CategoriesUpdateComponent implements OnInit {
  categ: Categories | undefined;

  modifReussi: boolean = false;
  erreurAjout: boolean = false;

  categForm: FormGroup = this.formBuilder.group({
    label: [''],
  });

  constructor(
    private CategService: CategoriesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idCateg = this.route.snapshot.paramMap.get('idCategory');

    if (idCateg) {
      this.CategService.getCategoryById(+idCateg).subscribe(
        (categ) => (this.categ = categ)
      );
    }
  }

  onSubmit(): void {
    if (this.categForm.valid) {
      const updatedCateg: Categories = {
        ...this.categ!,
        label:
          this.categForm.value.label !== ''
            ? this.categForm.value.label
            : this.categ!.label,
      };

      this.CategService.updateCategory(updatedCateg).subscribe(
        () => {
          console.log(
            'Catégorie mise à jour! Retour à la page liste catégorie'
          );
          this.modifReussi = true;
          this.erreurAjout = false;

          setTimeout(() => {
            this.router.navigate(['categories']);
          }, 1000);
        },
        (error) => {
          console.error(error);
          this.modifReussi = false;
          this.erreurAjout = true;
        }
      );
    }
  }

  cancelButton() {
    this.router.navigate(['categories']);
  }
}
