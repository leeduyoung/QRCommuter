import { AppConfig } from "../../config/config";

export class Url {
  host: String;
  apiVersion: String;

  constructor() {
    this.apiVersion = AppConfig.apiVersion;
    this.host = AppConfig.production; //실 서버
    this.host = AppConfig.developer; //테스트 서버
  }

  getUrl() {
    let urls = {

      commute: this.host + "/" + this.apiVersion + "/commute", // 직원 출퇴근용 api

    };
    return urls;
  }
}