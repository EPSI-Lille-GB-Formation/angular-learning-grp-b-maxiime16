// page-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-page-list',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit{

  pageList: Observable<Page[]> = new Observable<Page[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService,
  ){}

  ngOnInit(): void {
    const bookIdString = this.route.snapshot.paramMap.get('idBook')
    const bookId = Number(bookIdString);
    console.log('idBook= ',bookId)

    this.pageList = this.pageService.getPageByIdBook(bookId);
    this.pageList.subscribe((pages)=>{
      console.log('Liste des pages: ', pages)
    })
  }

}
