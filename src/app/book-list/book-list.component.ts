import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { AddBook, RemoveBook } from '../books/book.actions';
import { AppState } from '../app.state';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  books$: Observable<Book[]>;
  searchTerm: string = '';
  filterBy: 'all' | 'title' | 'author' = 'all';
  
  constructor(private store: Store<AppState>) {
    this.books$ = store.pipe(select('book'));
  }

  addBook(id: string, title: string, author: string) {
    if (id && title && author) {
      this.store.dispatch(AddBook({ id, title, author }));
    }
  }

  removeBook(bookId: string) {
    this.store.dispatch(RemoveBook({ bookId }));
  }

  filterBooks(books: Book[]): Book[] {
    if (!this.searchTerm) return books;
    
    const search = this.searchTerm.toLowerCase();
    return books.filter(book => {
      if (this.filterBy === 'title') {
        return book.title.toLowerCase().includes(search);
      } else if (this.filterBy === 'author') {
        return book.author.toLowerCase().includes(search);
      }
      return book.title.toLowerCase().includes(search) || 
             book.author.toLowerCase().includes(search);
    });
  }
}