import {Component} from '@angular/core';
import {App, NavController, NavParams, IonicPage} from "ionic-angular";
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserProvider} from "../../providers/user/user";
import {ToolProvider} from "../../providers/tool/tool";
import * as moment from 'moment'

@IonicPage({
    name: "goal-checkin",
    segment: "goal/:id/checkin",
})
@Component({
    selector: 'page-goal-checkin',
    templateUrl: 'goal-checkin.html',
})
export class GoalCheckinPage {

    private checkinForm: FormGroup;
    public attachs: any = [];
    public goal;
    public day;

    public min: string = '';
    public max: string = moment().format('YYYY-MM-DD');

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public app: App,
                private formBuilder: FormBuilder,
                private  userProvider: UserProvider,
                private toolProvider: ToolProvider,
                ) {
        this.checkinForm = this.formBuilder.group({
            'content': ['', []],
            'day':['',[]]
        });

        if (this.navParams.get('day')) {
            this.day = this.navParams.get('day');
        } else {
            this.day = moment().format('YYYY-MM-DD');
        }
    }

    ionViewDidLoad() {
        let goal_id = this.navParams.get('id');

        this.userProvider.getGoal(goal_id).then((data)=>{
            this.goal = data;
            this.min = data.start_date;
            if(data.end_date) {
                this.max = data.end_date;
            }
        }).catch((err)=> {

        });
    }

    doCheckin($event) {
        $event.preventDefault();

        let goal_id = this.navParams.get('id');

        let body = this.checkinForm.value;

        body.attachs = this.attachs;

        this.userProvider.checkinGoal(goal_id, body).then(data => {
            if (data) {
                this.navCtrl.pop();
            }
        });
    }

    choosePic($event) {
       this.toolProvider.choosePic($event).then((ret)=>{
           this.attachs[0] = ret;
       }).catch((err)=>{

       });
    }

    removeAttach($event) {
        $event.preventDefault();
        this.attachs = [];
    }

}
