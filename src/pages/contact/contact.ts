import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  users;
  baseImgUrl: string;

  constructor(public navCtrl: NavController, public httpService: HttpService) {
    this.baseImgUrl = httpService.baseImgUrl;

  }

  ionViewDidLoad() {
    this.getUsers();
  }

  getUsers() {
    this.httpService.getUsers().subscribe(d=> {
      this.users = d;
    })
  }

}
