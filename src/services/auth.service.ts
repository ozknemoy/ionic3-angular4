/**
 * Created by ozknemoy on 16.04.2017.
 */
import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {
    private TOKENS = [/*'token',*/'id','foto','name','surname','sex'];
    public _isAuth:boolean;
    public token:string;
    public id:string;
    public name:string;
    public surname:string;
    public foto:string;
    constructor(public storage:Storage) {
        this.checkAuth()
    }

    checkAuth() {
        this.storage.ready().then(() => {
            this.storage.get('token').then((val) => {
                this._isAuth = !!val;
                this.token = val;
                console.log('token', val);
                if(this._isAuth) {
                    this.TOKENS.forEach(TOKEN=> {
                        this.storage.get(TOKEN).then(val => {
                            this[TOKEN] = val;
                        })
                    })
                }
            });

        });
    }
    isAuth() {
        return this._isAuth
    }

    setAuth(loginData) {
        this._isAuth = true;
        for(var key in loginData) {
            this.storage.set(key, loginData[key]);
            this[key] = loginData[key];
        }
        // перезагруза приложения
        //location.reload();
        /*$localStorage.user_id = d.id;
         $localStorage.token = d.token;
         $localStorage.foto = d.foto;
         $localStorage.name = d.name;
         $localStorage.surname = d.surname;
         $localStorage.sex = d.sex;*/
    }

    deleteAuth() {
        var tokens = this.TOKENS.concat('token');
        console.log("tokens",tokens);

        Promise.all(
            tokens.map(TOKEN=>
                this.storage.remove(TOKEN).then(() => {
                    console.log("remove");

                   return this[TOKEN] = undefined
                })
            )
        ).then(d=> {
            console.log("all",d);
            this._isAuth = false;
            //location.reload();
        })

    }
}