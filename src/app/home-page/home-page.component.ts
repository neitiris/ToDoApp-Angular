import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../services/data';
import {AuthService} from '../../services/authservice';
import {
  animate,
  animateChild,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        query('@items', stagger(300, animateChild()), { optional: true }),
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('0.3s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
    trigger('slideInLeft', [
      state('in', style({opacity: 1, transform: 'translate3d(0, 0, 0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translate3d(-100%, 0, 0)'
        }),
        animate('0.3s ease-in')
      ]),
    ])
  ]
})
export class HomePageComponent implements OnInit {

  public list: any[] = [];

  constructor(
    private router: Router,
    public dataService: DataService,
    private authService: AuthService
  ) {
  }

  public ngOnInit() {
    this.getList();
  }

  public getList() {
    return this.dataService.getList().subscribe(list => this.list = list);
  }

  public logOut() {
    this.authService.logOutFunk();
  }

  public goToDetails(id: number) {
    console.log(this.dataService.openEdit);
    this.dataService.openEdit(true);
    this.router.navigate(['home', 'edit', id], {queryParams: {id}});
  }

  public createUser() {
    this.dataService.openEdit(true);
    this.router.navigate(['home', 'edit', 'newUser'], {queryParams: {id: 'newUser'}});
  }


  public deleteUserData(id: number | string, index) {
    this.list = this.list.filter(item => item.id !== id);
    this.dataService.setData(this.list);
    this.getList();
  }

}
