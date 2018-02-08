import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {

  user: any = {};
  inTime: string = null;
  outTime: string = null;

  constructor() {

  }

}
