import { Component, OnInit } from '@angular/core';
import { BelongsService } from '../../services/belongs.service';
import { CategoryService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-votre-composant',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>page test </h1>
    <div *ngIf="labels !== null">
      <p>Labels pour le livre avec l'id {{ currentBookId }} :</p>
      <p>{{ labels.join(', ') }}</p>
    </div>
    <div *ngIf="labels === null">
      <p>Aucun label trouvé pour le livre avec l'id {{ currentBookId }}.</p>
    </div>
  `,
  styles: []
})
export class TestComponent implements OnInit {
  currentBookId: number= 1;
  labels: string[] | null = null;

  constructor(
    private belongsService: BelongsService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    const idBook = 1; // Remplacez par l'id du livre que vous souhaitez tester
    this.currentBookId = idBook;
    this.testGetLabelByIdCategory(idBook);
  }

  testGetLabelByIdCategory(idBook: number): void {
    this.categoryService.getLabelByIdCategory(idBook).subscribe(
      (labels: string[]) => {
        console.log(`Les labels pour le livre avec l'id ${idBook} sont :`, labels);
        this.labels = labels;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des labels :', error);
      }
    );
  }
}
