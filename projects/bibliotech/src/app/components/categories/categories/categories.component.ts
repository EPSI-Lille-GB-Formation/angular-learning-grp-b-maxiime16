import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Categories } from '../../../models/categories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  constructor(private router: Router) {}

  @Input('value')
  categorie: Categories | undefined;

  GoToUpdateCategPage(idCategory: number | undefined): void {
    this.router.navigate(['categories/update', idCategory]);
  }

  GoToDeleteCategPage(idCategory: number | undefined): void {
    this.router.navigate(['categories/delete', idCategory]);
  }
}