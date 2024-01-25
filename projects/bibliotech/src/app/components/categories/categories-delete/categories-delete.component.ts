import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from '../../../services/categories.service';
import { Categories } from '../../../models/categories';

@Component({
  selector: 'app-categories-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-delete.component.html',
  styleUrl: './categories-delete.component.css',
})
export class CategoriesDeleteComponent implements OnInit {
  category: Categories | undefined;

  deleteSuccess: boolean = false;
  deleteError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    const idCateg = this.route.snapshot.paramMap.get('idCategory');
    console.log('idCateg à supprimer: ', idCateg);

    if (idCateg) {
      this.categoriesService.getCategoryById(+idCateg).subscribe(
        (categorie: Categories | undefined) => {
          this.category = categorie;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  deleteCateg() {
    if (this.category) {
      this.categoriesService.deleteCategory(this.category.id).subscribe(
        () => {
          console.log('Page supprimé ! Retour a la page du livre');
          this.deleteSuccess = true;
          this.deleteError = false;

          setTimeout(() => {
            this.router.navigate(['categories']);
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
    this.router.navigate(['categories']);
  }
}
