import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Student} from "../common/student";
import {catchError, Observable, throwError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = "http://127.0.0.1:8080/student"

  constructor(private http: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    )
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student)
      .pipe(
        catchError(this.handleError)
      );
  }


  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${id}`, student)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteStudent(id: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/${id}`)
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
