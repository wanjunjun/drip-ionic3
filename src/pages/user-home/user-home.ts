import {Component, ViewChild,ChangeDetectorRef} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserProvider} from "./../../providers/user/user";
import { SuperTabsController } from "ionic2-super-tabs/dist/index";
import { Content} from 'ionic-angular'

@IonicPage({
    name: 'user-home',
    segment: 'user/:id/home'
})
@Component({
    selector: 'page-user-home',
    templateUrl: 'user-home.html',
})
export class UserHomePage {

    @ViewChild(Content) content: Content;

    public user: any = {};
    public mode:string = "more";

    page1: any = "user-home-events";
    page2: any = "user-home-goals";
    page3: any = "user-home-photos";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private superTabsCtrl: SuperTabsController,
                private ref: ChangeDetectorRef,
                private userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        console.log(this.navParams.get('id'));

        this.userProvider.getUser(this.navParams.get('id')).then((data) => {
            if (data) {
                this.user = data;
            }
        });
    }

    goVipPage() {
        this.navCtrl.push("vip");
    }

    goUserFollowingPage() {
        this.navCtrl.push("user-following",{id:this.user.id,user:this.user});
    }

    goUserFanPage() {
        this.navCtrl.push("user-fan",{id:this.user.id,user:this.user});
    }

    ngAfterViewInit() {
        this.content.ionScroll.subscribe((scroll)=>{
            console.log('scrolling ', scroll);

            if(scroll.scrollTop > 100) {
                this.mode = "less";
            } else {
                this.mode = "more";
            }

            console.log(this.mode);

            this.ref.detectChanges();

        });

    }

}
