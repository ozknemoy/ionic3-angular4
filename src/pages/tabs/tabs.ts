import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import {AuthService} from "../../services/auth.service";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    home = HomePage;
    about = AboutPage;
    users = ContactPage;
    profile = ProfilePage;

    constructor(public auth:AuthService) {
        this.auth = auth;
    }
}
