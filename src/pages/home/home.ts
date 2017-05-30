import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpService} from "../../services/http.service";
import { ProjectPage } from '../project/project';
import { MediaPlugin, MediaObject } from '@ionic-native/media';
import {Observable} from 'Rxjs';
//import {FileChooser} from 'ionic-native';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    projects:string[];
    errorMessage:string;
    baseImgUrl:string;
    errorA:string;
    fileInfo;
    file;
    onStatus;
    now = 0;
    isStoped = true;
    nowPretify = '00:00';
    duration;
    isPlaying = false;
    zero = 'http://mpsound.ru/uploads/tracks/510496811_572314412_1814582943.mp3';
    one:'http://mpsound.ru/uploads/tracks/1079607940_912362615_277437141.mp3';
    two:'http://mpsound.ru/uploads/tracks/1505002870_1873085336_2097864131.mp3';

    interval;
    _interval;
    lag = '0';
    snd;


    constructor(public httpService:HttpService, public nav:NavController, private media:MediaPlugin) {
        this.baseImgUrl = httpService.baseImgUrl;
        this.getProjects();

    }

    ionViewDidLoad() {

    }

    onLoadA() {
        /*this.input$ = Observable
            .interval(1000)
            .flatMap(() => this.interv());
            //.fromEvent(this._el.nativeElement, 'input')

        this.input$.subscribe(event=>  console.log(event));*/
        /*setInterval(()=> {
            this.interv()
        }, 1000);*/
        this.duration = this.snd.getDuration();
        console.log("load    this.duration",this.duration);
    }
    interv() {

        this.interval = this.snd.getTime();//parseInt(this.snd.getTime()) + parseInt(this.lag);
        this._interval = Math.round(this.interval);
        console.log("lag", this.lag, this.interval);
        this.nowPretify = this.pretifyTime(this.interval < 0 ? 0 : this.interval)
    }

    resetA() {
        this.lag = '0';
        this.interval = 0;
        this._interval = 0;

    };

    stop(v) {
        this.snd.stop();
        this.resetA()
    };

    play(v) {
        console.log("this.snd.getTime()", this.snd.getTime(), this.snd);

        this.snd.togglePlay();
    };

    setTime(v) {
        this.lag = v;
        this.snd.setTime(v);
        this.interval = v
    };


    initMed() {
        //'https://s130f.storage.yandex.net/get-mp3/ab463af84cfb21c0ae46e4b6ae8218e1/00054cb72db5b2c9/music/48/3/data-0.19:35781766751:4209266?track-id=4332442&play=false'
        this.media.create(this.zero, this.onStatusUpdate)
            .then((file:MediaObject) => {
                console.log("file", file);
                this.file = file;
                this.fileInfo = JSON.stringify(file);
                // play the file
                this.playPause();

// get file duration
                //this.duration = file.getDuration();

                setInterval(()=>this.getCurrentPosition(), 1000);

                // release the native audio resource
                // Platform Quirks:
                // iOS simply create a new instance and the old one will be overwritten
                // Android you must call release() to destroy instances of media when you are done
                //file.release();

            })
            .catch(e => {

                this.errorA = <any>e;
                console.log('Error opening media file', e)
            });
    }

    getCurrentPosition() {
        this.file.getCurrentPosition().then(pos => {
            this.isStoped = pos < 0;
            //pos = pos<0? 0:pos;
            this.now = pos;
            this.nowPretify = this.pretifyTime(pos < 0 ? 0 : pos)
        });
    }

    pretifyTime(v) {
        var d = new Date(v * 1000) + '';
        return d.slice(19, 24);
    }

    playPause() {
        this.isPlaying = !this.isPlaying;
        if (!this.isPlaying) this.file.play();
        else this.file.pause();
    }

    /*
     changeNow(e) {
     this.now = e;
     console.log("v", this.now * 1000);
     this.seek(e * 1000)
     }


     stop() {
     this.isPlaying = false;
     this.file.stop();
     }

     seek(v) {
     if (this.file) {
     this.seekT = v;
     this.file.seekTo(v)
     }

     }
     */
    onStatusUpdate(i) {
        this.onStatus = 'StatusUPDATED!!!!';
    }

    getProjects(count=6,callback?) {
        this.httpService.getProjects()
            .subscribe(
                projects => {
                    if(callback) callback.complete();
                    this.projects = projects.slice(0, count)
                },
                        error =>  this.errorMessage = <any>error
                );
    }
    doRefresh(refresher) {
        this.getProjects(15,refresher);
    }
    openPage(pageId) {
        this.nav.push(<any>ProjectPage, {id: pageId});
        //this.httpService.setProjPage(pageId);
        //this.nav.push(ProjectPage);
    }

    /*getCollectedSum(that) {
     return countFactory.notN(that.own_money,that.reward_collected_sum,that.investments_collected_sum,that.loan_collected_sum)
     };

     getCountryAndRegion(cID,regID) {
     return handleDataFactory.getCountryAndRegion(cID,regID,this.geo);
     };*/

}
