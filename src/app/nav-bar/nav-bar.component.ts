import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  /**
   * 
   * @param router 
   * @param snackBar 
   */
  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  /**
   * logOut user - remove from localStorage
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
    this.snackBar.open('You have successfully logged out!', 'OK', {
      duration: 2000,
    });
  }

}
