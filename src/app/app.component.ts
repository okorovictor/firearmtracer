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

const FIREARMS: FireArm[] = [
  new FireArm('Person1', '2000-01-01', 'Abia', '10000000001', 'AE00', 'AE001'),
  new FireArm('Person2', '2000-02-01', 'Adam', '10000000001', 'AE00', 'AE001'),
  new FireArm('Person3', '2000-03-01', 'Anam', '10000000001', 'AE00', 'AE001'),
  new FireArm('Person4', '2000-04-01', 'Delt', '10000000001', 'AE00', 'AE001'),
  new FireArm('Person5', '2000-05-01', 'Ebon', '10000000001', 'AE00', 'AE001')
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fireArm = new FireArm('', '', '', '', '', '');
  search = new Search('');
  searching = false;
  dataSource = FIREARMS;
  displayedColumns = ['name', 'dob', 'state', 'nin', 'gun', 'bullet'];
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
