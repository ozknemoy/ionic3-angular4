import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
    user:any;
    baseImgUrl: string;

    constructor(/*public navCtrl: NavController,*/ public httpService: HttpService) {
        this.baseImgUrl = httpService.baseImgUrl;

    }

    ionViewDidLoad() {
        this.getProfile();
    }

    getProfile() {
        this.httpService.getProfile().subscribe(d=> {
            this.user = d;
        })
    }

}
