import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export class FireArm {
  constructor(
    public name: string,
    public dob: string,
    public state: string,
    public nin: string,
    public gun: string,
    public bullet: string
  ) {}
}

export class Search {
  constructor(public bullet: string) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fireArm = new FireArm('', '', '', '', '', '');
  search = new Search('');
  searching = false;
  @ViewChild('createForm') createForm: NgForm | undefined;
  @ViewChild('searchForm') searchForm: NgForm | undefined;

  constructor(private snackBar: MatSnackBar) {}

  async onCreateSubmit(): Promise<void> {
    try {
      console.log(this.fireArm);
      this.snackBar.open('Fire Arm successfully created.', '', {
        panelClass: ['snackbar-success']
      });
      this.createForm?.resetForm();
      this.fireArm = new FireArm('', '', '', '', '', '');
    } catch (error) {
      console.error(error);
      this.snackBar.open(`${error}`, '', {
        panelClass: ['snackbar-error']
      });
    }
  }

  async onSearchSubmit(): Promise<void> {
    try {
      console.log(this.search);
      this.searching = true;
    } catch (error) {
      console.error(error);
      this.snackBar.open(`${error}`, '', {
        panelClass: ['snackbar-error']
      });
    }
  }
}
