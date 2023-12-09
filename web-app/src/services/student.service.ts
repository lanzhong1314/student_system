import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Student} from "../common/student";
import {catchError, Observable, throwError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>("http://localhost:4200/student").pipe(
      catchError(this.handleError)
    )
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>("this.heroesUrl", student)
      .pipe(
        catchError(this.handleError)
      );
  }


  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>("", student)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteStudent(id: number): Observable<unknown> {
    // const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete("")
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
