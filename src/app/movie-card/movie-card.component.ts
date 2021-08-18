import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];
  userFavs: any[] = [];

  constructor(
    public fetchApiData: ApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavs();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getDirector(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name: name, bio: bio, birth: birth, death: death },
      width: '500px'
    });
  }

  getGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name: name, description: description },
      width: '500px'
    });
  }

  getSynopsis(title: string, description: string, poster: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { title, description, poster },
      width: '500px'
    });
  }

  getUserFavs(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.userFavs = resp.FavoriteMovies;
    });
    console.log(this.userFavs);
  }

  isFavorite(movieId: string) {
    return this.userFavs.includes(movieId);
  }

  toggleFavorite(movieId: string): any {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavorite(movieId).subscribe((resp: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      //mutates array by removing "index"
      const index = this.userFavs.indexOf(movieId);
      return this.userFavs.splice(index, 1);
    } else {
      this.fetchApiData.addFavorite(movieId).subscribe((resp: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    console.log(this.userFavs);
    return this.userFavs.push(movieId);
  }


}
