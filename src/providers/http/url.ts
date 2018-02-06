import { appConfig } from "../../config/config";

export class Url {
  host: String;
  apiVersion: String;

  constructor() {
    this.apiVersion = Environment.apiVersion;
    this.host = Environment.production; //실 서버
    this.host = Environment.demo; //테스트 서버
    // this.host = 'http://localhost:3000'; //test
  }

  getUrl() {
    let urls = {
      getTest: this.host + "/v2/test", // test
      signIn: this.host + "/" + this.apiVersion + "/account/authorization/signin", // 로그인 & 자동 로그인
      signOut: this.host + "/" + this.apiVersion + "/account/authorization/signout", // 로그아웃
      signUp: this.host + "/" + this.apiVersion + "/account/signup", // 회원가입
      deleteAccount: this.host + "/" + this.apiVersion + "/account/revoke", // 회원탈퇴
      regionList: this.host + "/" + this.apiVersion + "/tags", // 지역태그조회
      requestAuthCode: this.host + "/" + this.apiVersion + "/account/authorization/confirm-code/send", // 인증번호발송
      confirmAuthCode: this.host + "/" + this.apiVersion + "/account/authorization/confirm-code/check", // 인증번호확인
      clubList: this.host + "/" + this.apiVersion + "/clubs", // 시설조회 & 시설목록조회 (page)
      posterList: this.host + "/" + this.apiVersion + "/posters", // 포스터조회 & 포스터목록조회
      productList: this.host + "/" + this.apiVersion + "/plans", // 리필상품 목록조회
      checkIn: this.host + "/" +this.apiVersion + "/checkin/pass", // 입장요청
      checkInReady: this.host + "/" + this.apiVersion + "/checkin/scan", // 입장 전 화면
      user: this.host + "/" + this.apiVersion + "/account/information", // 유저정보 조회 & 수정 & setting(push 알림 설정 )
      shotPack: this.host + "/" + this.apiVersion + "/account/shot-pack", // 보유샷 조회
      cs: this.host + "/" + this.apiVersion + "/common", // CS 정보 조회
      premiumClubList: this.host + "/" + this.apiVersion + "/clubs/premium", // 프리미엄 시설 조회
      shotHistory: this.host + "/" + this.apiVersion + "/account/shot-stack", // 샷 이용현황 조회
      clubImageList: this.host + "/" + this.apiVersion + "/clubs", // 시설 이미지 조회 (/{version}/clubs/{id}/photos)
      accessTerms: this.host + "/" + this.apiVersion + "/common/policies", // 이용약관, 개인정보취급방침 조회
      likeClub: this.host + "/" + this.apiVersion + "/account/like-clubs", // 관심 시설 
      payment: this.host + "/" + this.apiVersion + "/payment", // 결제 요청 & 결제 완료
      emailDuplicationCheck: this.host + "/" + this.apiVersion + "/account/check-email",
      
      // 결제 (결제정보조회, ...)
      // club: this.host + "/" + this.apiVersion + "/",

      // shot이용현황조회
      // club: this.host + "/" + this.apiVersion + "/",
    };
    return urls;
  }
}