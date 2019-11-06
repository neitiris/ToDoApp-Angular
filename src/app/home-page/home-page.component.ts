import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public tableOptions: any = {
    headerItems: [
      { title: 'Id', value: 'id' },
      { title: 'First Name', value: 'firstName' },
      { title: 'Email', value: 'email' },
      { title: 'Company Name', value: 'companyName' },
      { title: 'Created At', value: 'createdAt' },
    ],
    searchItems: [
      { title: 'First Name', value: 'firstName' },
      { title: 'Last Name', value: 'lastName' },
      { title: 'Email', value: 'email' },
      { title: 'Company Name', value: 'companyName' },
      { title: 'Description', value: 'description' },
      { title: 'Phone Number 1', value: 'phoneNumber1' },
      { title: 'Phone Number 2', value: 'phoneNumber2' },
    ],
    checkedAll: false,
  };
  public list: any[] = [];

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.getList().subscribe(list => this.list = list);
  }

  public getList() {
    return this.dataService.getList();
  }

  public logOut() {
    this.authService.logOutFunk();
  }

  // public createUser() {
  // }


  public deleteUserData(id: number | string) {
    this.list = this.list.filter(item => item.id !== id);
    this.dataService.setData(this.list);
  }

}
