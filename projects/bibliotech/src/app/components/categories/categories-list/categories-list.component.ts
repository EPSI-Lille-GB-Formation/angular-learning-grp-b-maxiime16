import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Categories } from '../../../models/categories';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, CategoriesComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  categoriesList: Observable<Categories[]> = new Observable<Categories[]>();

  constructor(
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesList = this.categoriesService.getCategories();
    this.categoriesList.subscribe((categories) => {
      console.log('Liste des catégories:', categories);
    });
  }

  GoToCategorieCreatePage(){
    this.router.navigate(['/categories/create']);
  }
}
