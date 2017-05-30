import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import {HttpService} from "../../services/http.service";
import { HomePage } from '../home/home';
import {NavParams} from "ionic-angular";

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {
    home = HomePage;
        proj = {};
    errorMessage: string;
    baseImgUrl: string;

    constructor(public httpService: HttpService,public navParams: NavParams) {
        this.baseImgUrl = httpService.baseImgUrl;
        this.getCountries();
    }

    ionViewDidLoad() {

    }

    getCountries() {
        this.httpService.getProject(this.navParams.get('id'))
            .subscribe(
                proj => this.proj = proj,
                error =>  this.errorMessage = <any>error);
    }

}
