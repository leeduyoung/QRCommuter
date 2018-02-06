import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Url } from './url';

@Injectable()
export class HttpProvider {

  headers: Headers;
  params: URLSearchParams;
  queryString: string;

  constructor(public http: Http, private url: Url) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    this.params = new URLSearchParams();
    this.queryString = '';
  }

  appendHeader(key, value) {
    this.headers.append(key, value);
  }

  deleteHeader(key) {
    this.headers.delete(key);
  }

  // test() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.get(this.url.getUrl().getTest, {headers: headers}).map(res => res.json());
  // }

  // signIn(user) {
  //   let body = {
  //     username: user.id,
  //     password: user.password,
  //     grant_type: Environment.grantTypePassword,
  //     client_id: Environment.clientId,
  //     client_secret: Environment.clientSecret,
  //     device_model: this.dataFactory.getDeviceModel().model,
  //     device_platform: this.dataFactory.getDeviceModel().platform,
  //     device_uuid: this.dataFactory.getDeviceModel().uuid,
  //     device_manufacturer: this.dataFactory.getDeviceModel().manufacturer,
  //     device_version: this.dataFactory.getDeviceModel().version,
  //     app_version: this.dataFactory.getAppModel().versionNumber
  //   }
  //   return this.http.post(this.urlFactory.getUrl().signIn, body, {headers: this.headers}).map(res => res.json()).catch(err => Observable.throw(err.json()));
  // }

}
