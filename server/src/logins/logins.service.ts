import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {LastState, Login, LoginMongo} from "./login.model";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class LoginsService {
    constructor(
        @InjectModel('Login') private readonly loginModel: Model<LoginMongo>
    ) {
    }

    newLoginEvent(login: Login): Observable<Login> {
        const newLogin = new this.loginModel(login);
        return from(newLogin.save()).pipe(
            map((login: LoginMongo) => {
                console.log(login);
                return login._id;
            })
        )
    }

    getTodayEvents(): Observable<Login[]> {
        return from(this.loginModel.find({ $where: function() {
                const today = new Date(); //
                today.setHours(0,0,0,0);
                return (this._id.getTimestamp() >= today)
            } }).exec());
    }

    getAllEvents(): Observable<Login[]> {
        return from(this.loginModel.find().exec());
    }

    

    getLastStates(): LastState {
        return from(this.loginModel.aggregate([
            {
                $sort: {timestamp: -1}
            },
            {
                $group: {
                    _id: "$providername",
                    eventid: {$first: "$eventid"},
                    timestamp: {$first: "$timestamp"},
                    since: {$push:"$timestamp"}
                }
            },
            {
                $project: {
                    eventid: 1,
                    timestamp: 1,
                    prevStateSince: {$arrayElemAt: ['$since', 1]}
                }
            }
        ]).exec()) as unknown as LastState;
    }
}
