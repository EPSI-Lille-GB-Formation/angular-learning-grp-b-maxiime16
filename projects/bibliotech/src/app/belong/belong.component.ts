import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Belong } from '../models/belong';
import { BelongService } from '../services/belong.service';

@Component({
  selector: 'app-belong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './belong.component.html',
  styleUrl: './belong.component.css',
})
export class BelongComponent implements OnInit{
  constructor(
    private belongService: BelongService,
  ) {}

  ngOnInit(): void {
    this.displayAllBelongs(); // Appeler la méthode au moment de l'initialisation
  }

  onSubmit(): void {
    console.log('test');
    const newBelong: Belong = {
      id: 11,
      idBook: Number(10), // Assurez-vous que ces valeurs sont numériques
      idCategory: Number(10), // Assurez-vous que ces valeurs sont numériques
    };
  
    this.belongService.createBelong(newBelong).subscribe(
      (createdBelong: Belong) => {
        console.log('Created Belong:', createdBelong);
      },
      (error: any) => {
        console.error('Error creating Belong:', error);
      }
    );
  }
  
  test(){
    console.log('test')
  }

  displayAllBelongs(): void {
    this.belongService.getBelongs().subscribe(
      (belongs: Belong[]) => {
        console.log('All Belongs:', belongs);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
