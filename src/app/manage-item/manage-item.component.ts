import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.css']
})

export class ManageItemComponent implements OnInit {
  public user: any = {};
  public userUnchanged: any = {};
  public options: any = {
    isNew: true
  };
  constructor(
    public route: ActivatedRoute,
    public dataService: DataService
  ) { }

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
    if (user && user.id) {
          console.log(user);
          this.dataService.updateUser(user);
        } else {
      this.dataService.createUser(user);
    }
  }
}
