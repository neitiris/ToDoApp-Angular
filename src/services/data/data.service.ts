import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class DataService {

  data = [];

  public getList() {
    return new Observable((observer: Observer<any>) => {
      observer.next(JSON.parse(localStorage.getItem('currentUser')));
    }).pipe(map((resp: any) => {
      console.log('auth resp in service', resp ? resp : {});
      this.data = resp;
      return resp.data ? resp.data : [];
    }));
  }

  public setData(dataList) {
    const result = {...this.data, data: dataList};
    console.log(result);
    localStorage.setItem('currentUser', JSON.stringify(result));
  }
}
