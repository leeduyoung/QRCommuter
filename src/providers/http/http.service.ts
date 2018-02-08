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

  commute(data) {
    let body = {
      email: data.email,
      kind: data.kind
    }
    return this.http.post(this.url.getUrl().commute, body, {headers: this.headers}).map(res => res.json());
  }

}
