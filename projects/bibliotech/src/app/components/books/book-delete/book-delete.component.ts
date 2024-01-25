import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';
import { BelongService } from '../../../services/belong.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-book-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-delete.component.html',
  styleUrl: './book-delete.component.css',
})
export class BookDeleteComponent implements OnInit {
  book: Book | undefined;

  deleteSuccess: boolean = false;
  deleteError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private belongService: BelongService
  ) {}

  ngOnInit(): void {
    const idBook = this.route.snapshot.paramMap.get('idBook');
    console.log('idBook à supprimer: ', idBook);

    if (idBook) {
      this.bookService.getBookById(+idBook).subscribe(
        (book: Book | undefined) => {
          this.book = book;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  deleteBook() {
    if (this.book) {
      // Afficher la liste des ID Belongs avec l'ID du livre
      this.belongService
        .getBelongIdsByBookId(this.book?.id ?? 0)
        .subscribe((belongIds: number[]) => {
          console.log('Liste des ID Belongs:', belongIds);

          // Supprimer chaque Belong en utilisant les IDs
          const deleteBelongs = belongIds.map((belongId) =>
            this.belongService.deleteBelongById(belongId)
          );

          // Utiliser forkJoin pour attendre que toutes les suppressions soient terminées
          forkJoin(deleteBelongs).subscribe(
            () => {
              console.log('Belongs supprimés avec succès');

              // Ensuite, supprimer le livre
              if (this.book && this.book.id) {
                this.bookService.deleteBook(this.book.id).subscribe(
                  () => {
                    console.log("Livre supprimé ! Retour a la page d'accueil");
                    this.deleteSuccess = true;
                    this.deleteError = false;

                    setTimeout(() => {
                      this.router.navigate(['']);
                    }, 1000);
                  },
                  (error) => {
                    console.error(
                      'Erreur lors de la suppression du livre :',
                      error
                    );
                    this.deleteSuccess = false;
                    this.deleteError = true;
                  }
                );
              }
            },
            (error: any) => {
              console.error(
                'Erreur lors de la suppression des Belongs :',
                error
              );
              this.deleteSuccess = false;
              this.deleteError = true;
            }
          );
        });
    }
  }

  cancelButton(idBook: number | undefined): void {
    this.router.navigate(['book', idBook]);
  }
}
