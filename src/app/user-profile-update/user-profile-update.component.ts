import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})

export class UserProfileUpdateComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  movies: any = [];
  userFavs: any = [];

  /**
   * 
   * @param fetchApiData 
   * @param snackBar 
   * @param dialogRef 
   */
  constructor(
    public fetchApiData: ApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserProfileUpdateComponent>,

  ) { }

  ngOnInit(): void {
  }

  /**
   * update user information
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((resp) => {
      this.dialogRef.close(); //this will close modal on success
      console.log(resp);
      localStorage.setItem('user', resp.Username);
      this.snackBar.open('Your profile has been successfully updated!', 'OK', {
        duration: 2000,
      });
    }, (resp) => {
      console.log(resp);
      this.snackBar.open(resp, 'OK', {
        duration: 2000,
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

}
