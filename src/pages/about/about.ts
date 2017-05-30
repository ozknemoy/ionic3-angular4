import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AudioProvider } from 'ionic-audio';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    myTracks:any[];
    allTracks:any[];
    selectedTrack;
    repeat = true;
    trackss;progress;id=0;
    constructor(private _audioProvider:AudioProvider) {
        // plugin won't preload data by default, unless preload property is defined within json object - defaults to 'none'
        this.myTracks = [
            {
            src: 'http://mpsound.ru/uploads/tracks/510496811_572314412_1814582943.mp3',
            artist: 'John Mayer',
            title: 'Why Georgia',
            art: 'img/johnmayer.jpg',
            preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
        },
            {
                src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
                artist: 'John Mayer',
                title: 'Who Says',
                art: 'img/johnmayer.jpg',
                preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
            }];

    this.trackss = [this.myTracks[0].src,this.myTracks[1].src];
       // console.log("this.trackss",this.trackss);

    }


    ngAfterContentInit() {
        // get all tracks managed by AudioProvider so we can control playback via the API
        this.allTracks = this._audioProvider.tracks;
        console.log("this._audioProvider.tracks[this.id]",this.allTracks,this.allTracks[0]);

        //this.progress = this._audioProvider.tracks[this.id].progress
    }

    /*playSelectedTrack() {
        console.log("_____selectedTrack",this.selectedTrack);

        // use AudioProvider to control selected track
        this._audioProvider.play(this.selectedTrack);
    }

    pauseSelectedTrack() {
        console.log("_____selectedTrack",this.selectedTrack);
        // use AudioProvider to control selected track
        this._audioProvider.pause(this.selectedTrack);
    }*/

    onTrackFinished(track:any) {
        this.nextTrack(track.id);
        console.log('Track finished', track)
    }

    nextTrack(id=this._audioProvider.current) {
        console.log("current",id);

        this._audioProvider.stop(id);
        if(id < this.myTracks.length-1 ) {
            this._audioProvider.play(id+1);
            console.log("this.selectedTrack",this.selectedTrack);
            //this._audioProvider.play(this.selectedTrack);
        } else if(this.repeat && id == this.myTracks.length-1) {
            this._audioProvider.play(0);
        }
    }
    check() {
        console.log('this._audioProvider', this._audioProvider)
    }
}
