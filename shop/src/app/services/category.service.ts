import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Category } from '../category/category';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  path = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.path).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  handleError(handleError: HttpErrorResponse) {
    let errorMessage = '';
    if (handleError.error instanceof ErrorEvent) {
      errorMessage = 'Bir hata oluştu ' + handleError.error.message;
    } else {
      errorMessage = 'Sistemsel bir hata oluştu.';
    }
    return throwError(errorMessage);
  }
}
