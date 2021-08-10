import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root'
})

export class ApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call (POST) for the user registration endpoint: /users
  //register user
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    //posts it to the API endpoint and returns the API's response
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  //user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    //posts it to the API endpoint and returns the API's response
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }
  //api call (GET) to get all movies endpoint: /movies
  //get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(`${apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //get 1 movie
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(`${apiUrl}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //get 1 genre
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/genres/${name}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //get 1 director
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/directors/${name}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //get user by username
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}/users/${user}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //update user
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}/users/${user}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //delete user
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}/users/${user}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        catchError(this.handleError)
      );
  }

  //add movie to favorites
  public addFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .post(`${apiUrl}/users/${user}/favorites`, { movieId: movieId }, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //delete movie to favorites
  public deleteFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}/users/${user}/favorites/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Non-typed response extraction + set type OR object to remove error
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

