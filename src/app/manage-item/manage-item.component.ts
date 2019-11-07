import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data';
import {HomePageComponent} from '../home-page/home-page.component';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss']
})

export class ManageItemComponent implements OnInit {
  public user: any = {};
  public userUnchanged: any = {};
  public options: any = {
    isNew: true,
    empty: false
  };

  constructor(
    public route: ActivatedRoute,
    public dataService: DataService,
    public homePage: HomePageComponent
  ) {
  }

  private static clone(sourceObj: any) {
    return JSON.parse(JSON.stringify(sourceObj));
  }


  public ngOnInit() {
    console.log('ngOnInit this.route', this.route);
    this.route.queryParams.subscribe((param: any) => {
      console.log(param);
      if (param.id && param.id !== 'newUser') {
        this.requestUser(param.id);
      }
    });
  }


  public requestUser(id: any) {
    if (id) {
      this.dataService.getUserById(id).subscribe(
        (resp: any) => {
          console.log('resp', resp);
          if (resp) {
            this.user = ManageItemComponent.clone(resp);
            this.userUnchanged = ManageItemComponent.clone(resp);
            this.options.isNew = false;
          }
        },
        (err: any) => {
          console.log('err', err);
        }
      );
    }
  }

  public saveUser(user: any) {
    if ( !user.firstName || !user.lastName) {
      this.options.empty = true;
      console.log(this.options.empty);
      return;
    } else if (user && user.id) {
      this.options.empty = false;
      this.dataService.updateUser(user);
      this.dataService.openEdit(false);
      this.homePage.getList();
    } else if (user) {
      this.options.empty = false;
      this.dataService.createUser(user);
      this.dataService.openEdit(false);
    }
  }

  public close() {
    this.dataService.openEdit(false);
  }
}
