import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiDataService } from '../fetch-api-data.service';

import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  movies: any = [];
  userFavs: any = [];

  /**
   * 
   * @param dialog 
   * @param snackBar 
   * @param fetchApiData 
   */
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public fetchApiData: ApiDataService,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * gets user details
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.userData = resp;
      this.user = resp;
      this.userData.Birthday = resp.Birthday.substr(0, 10);

      this.getMovies();
    });
  }

  /**
   * get user list of favorite movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavs();
    });
  }

  /**
   * filters user favorite movies
   * @param movie._id
   * @returns 
   */
  filterFavs(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.userFavs.push(movie);
      }
    });
    console.log(this.userFavs);
    return this.userFavs;
  }

  /**
   * removes movie from user list of favorites
   * @param movieId 
   */
  removeFav(movieId: string): any {
    this.fetchApiData.deleteFavorite(movieId).subscribe((resp: any) => {
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 2000,
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }

  /**
   * opens modal to update user information
   */
  openUpdateDialog(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '500px'
    });
  }

  /**
   * opens modal to delete user account
   */
  openDeleteDialog(): void {
    this.dialog.open(UserProfileDeleteComponent, {
      width: '500px'
    });
  }

}
