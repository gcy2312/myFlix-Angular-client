import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-movie-api-2312.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

/**
 * Service enanbles communication with myFlix API to perform CRUD operations 
 */
export class ApiDataService {
  /** 
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   */
  constructor(private http: HttpClient) {
  }

  /** 
   * Making the api call (POST) for the user registration endpoint: /users
   * register user
   * @param userDetails username, password, email, brithday
  */
  userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    //posts it to the API endpoint and returns the API's response
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
  * API call to login
  * @param userDetails
  * @returns
  */
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    //posts it to the API endpoint and returns the API's response
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to GET ALL movies
   * @returns
   */
  getAllMovies(): Observable<any> {
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

  /**
  * API call to GET single movies
  * @param title {string}
  * @returns
  */
  getMovie(title: string): Observable<any> {
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

  /**
 * API call to GET genre details
 * @param name {string}
 * @returns
 */
  getGenre(name: string): Observable<any> {
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

  /**
 * API call to GET director details
 * @param name {string}
 * @returns
 */
  getDirector(name: string): Observable<any> {
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

  /**
 * API call to GET user details
 * @param user 
 * @returns
 */
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    // const user = localStorage.getItem('user');
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

  /**
 * API call to PUT update user details
 * @param userData
 * @returns
 */
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}/users/${user}`, userData, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
 * API call to DELETE user
 * @returns
 */
  deleteUser(): Observable<any> {
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

  /**
 * API call to POST add movie to user's favorites list
 * @param movieId {string}
 * @returns
 */
  addFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .post(`${apiUrl}/users/${user}/favorites/${movieId}`, movieId, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
 * API call to DELETE remove movie from user's favorites list
 * @param movieId {string}
 * @returns
 */
  deleteFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}/users/${user}/favorites/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Non-typed response extraction + set type OR object to remove error
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
 * Handles errors within the method used
 * @param error
 * @returns
 */
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

