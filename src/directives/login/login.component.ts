/**
 * Created by ozknemoy on 16.04.2017.
 */
import {Component} from '@angular/core'
//import { Storage } from '@ionic/storage';
import {HttpService} from "../../services/http.service";
import {AuthService} from "../../services/auth.service";
import {ProfilePage} from "../../pages/profile/profile";
import {ToastController} from "ionic-angular";

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html'
})
export class loginComponent {
    private email = '';
    private password = '';
    public profilePage = ProfilePage;
    constructor(public httpService:HttpService,public auth:AuthService,private toastCtrl: ToastController) {
        this.auth = auth;
    }

    login() {
        this.httpService.post('user/login',{
            "email": this.email.toLowerCase(),
            "password": this.password
        }).subscribe(loginData=> {
            this.auth.setAuth(loginData);
            this.toast('Вы успешно вошли')
        })
    }

    logout() {
        this.auth.deleteAuth();
        this.toast('Вы успешно вышли')
    }

    toast(message) {
        let toast = this.toastCtrl.create({
            message,
            duration: 5000,
            position: 'middle'
        });

        toast.present();
    }
}
