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

  constructor(
    public fetchApiData: ApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getMovies();
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
}
