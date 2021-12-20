import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

export class FireArm {
  constructor(
    public name: string,
    public dob: any,
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
  dataSource: FireArm[] = [];
  displayedColumns = ['name', 'dob', 'state', 'nin', 'gun', 'bullet'];
  @ViewChild('createForm') createForm: NgForm | undefined;
  @ViewChild('searchForm') searchForm: NgForm | undefined;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  async onCreateSubmit(): Promise<void> {
    try {
      const [y, m, d] = this.fireArm.dob.toISOString().split('T')[0].split('-');
      this.fireArm.dob = `${m}-${d}-${y}`;
      const fireArm = JSON.parse(JSON.stringify(this.fireArm));
      const formData = new FormData();
      for (const key in this.fireArm) {
        formData.append(key, fireArm[key]);
      }
      await firstValueFrom(this.http.post('/create/', formData));
      this.snackBar.open('Fire Arm successfully created.', '', {
        panelClass: ['snackbar-success']
      });
      this.createForm?.resetForm();
      this.fireArm = new FireArm('', '', '', '', '', '');
    } catch (error) {
      console.error(error);
      this.snackBar.open(`${(error as { message: string }).message}`, '', {
        panelClass: ['snackbar-error']
      });
    }
  }

  async onSearchSubmit(): Promise<void> {
    try {
      this.searching = true;
      this.dataSource = (await firstValueFrom(
        this.http.get(`/results/${this.search.bullet}/`)
      )) as FireArm[];
      this.searching = false;
    } catch (error) {
      console.error(error);
      this.snackBar.open(`${error}`, '', {
        panelClass: ['snackbar-error']
      });
    }
  }
}
