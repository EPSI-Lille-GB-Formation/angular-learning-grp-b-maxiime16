import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../../../models/book';
import { UserService } from '../../../services/user.service';
import { CategoriesService } from '../../../services/categories.service';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  categoriesLabels$: Observable<string[]> = new Observable<string[]>();
  authorName$: Observable<string | null> = new Observable<string | null>();
  authorFirstName$: Observable<string | null> = new Observable<string | null>();
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private router: Router,
    private userService: UserService,
    private categService: CategoriesService,
    private shareService: ShareService
  ) {}

  @Input('value') book: Book | undefined;

  ngOnInit(): void {
    this.isLoggedIn$ = this.shareService.isLoggedIn$;

    this.authorName$ = this.userService.getCurrentUserNameFromId(
      this.book?.idUser || null
    );
    this.authorFirstName$ = this.userService.getCurrentUserFirstNameFromId(
      this.book?.idUser || null
    );
    if (this.book) {
      this.categoriesLabels$ = this.categService.getLabelByIdCategory(
        this.book.id
      );
    }
  }

  GoToDetailsBookPage(idBook: number): void {
    this.router.navigate(['book', idBook]);
  }
}