/**
 * Created by ozknemoy on 08.04.2017.
 */
import {Injectable} from "@angular/core";
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AuthService} from "./auth.service";

@Injectable()
export class HttpService {
    headers = Headers;
    public pageId:string;
    private baseUrl = 'http://beta.constart.ru:81/';
    baseImgUrl:string;

    constructor(public http : Http,public auth:AuthService ) {
        this.baseImgUrl = this.baseUrl+ 'file/download?filename=';
    }

    getCountries(): Observable<string[]> {
        return this.http.get('https://restcountries.eu/rest/v2/all')
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUsers(): Observable<string[]> {
        return this.http.get(this.baseUrl + 'user/list')
            .map(this.extractData)
            .catch(this.handleError);
    }

    setProjPage(id) {
        this.pageId = id;
    }
    getProject(pageId) {
        return this.http.get(this.baseUrl + `project/${pageId}/view`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProjects(): Observable<string[]> {
        return this.http.get(this.baseUrl + 'project/list')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    post(url,d) {
        return this.http.post(this.baseUrl + url,d)
            .map(this.extractData)
            .catch(this.handleError);
    };
    get(url) {
        return this.http.get(this.baseUrl + url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    getProfile() {
        return this.http.get(`${this.baseUrl}user/${this.auth.id}/view`,{headers:this.getHeaders()})
            .map(this.extractData)
            .catch(this.handleError);
    };
    getHeaders() {
        const t =  this.auth.token;
        if(!t) return;
        let _headers = new this.headers();
        _headers.append('X-AUTH-TOKEN', t);
        return _headers
    }
}