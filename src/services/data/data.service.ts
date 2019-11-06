import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class DataService {

  data = [];
  obj = [];

  public getList() {
    return new Observable((observer: Observer<any>) => {
      observer.next(JSON.parse(localStorage.getItem('currentUser')));
    }).pipe(map((resp: any) => {
      console.log('auth resp in service', resp ? resp : {});
      this.data = resp.data;
      this.obj = resp;
      return resp.data ? resp.data : [];
    }));
  }

  public getUserById(id: number) {
    return new Observable((observer: Observer<any>) => {
      observer.next(this.data.find(user => user.id === +id));
    });
  }

  public setData(dataList) {
    const result = {...this.obj, data: dataList};
    console.log(result);
    localStorage.setItem('currentUser', JSON.stringify(result));
    return result;
  }
  public updateUser(changedUser) {
    this.data = this.data.map((user) => {
      console.log(user.id === changedUser.id ? changedUser : user);
      return user.id === changedUser.id ? changedUser : user;
    });
    const result = { data: this.data};
    console.log(result);
    localStorage.setItem('currentUser', JSON.stringify(result));
    return result;
  }
  public createUser(newUser) {
    const user = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      id: Math.random() * Math.random()
    };
    this.data.push(user);
    const result = { data: this.data};
    console.log(result);
    localStorage.setItem('currentUser', JSON.stringify(result));
    return result;
  }
}
