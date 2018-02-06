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

    //   getTest: this.host + "/v2/test", // test
    //   signIn: this.host + "/" + this.apiVersion + "/account/authorization/signin", // 로그인 & 자동 로그인

    };
    return urls;
  }
}