import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Login, LoginMongo} from "../login.model";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class FailsService {
    constructor(
        @InjectModel('Login') private readonly loginModel: Model<LoginMongo>
    ) {
    }

    getAllFailedEvents(skip = 0, limit = 20, sortBy = 'timestamp', direction = -1): Observable<Login[]> {
        return from(this.loginModel.find({
            "eventid": 4625
        }, {
            timestamp: 1,
            eventid: 1,
            providername: 1,
            ipaddress: 1,
            username: 1
        }).skip(skip).limit(limit).sort({[sortBy]: direction}).exec());
    }

    getTodayFailedEvents(skip = 0, limit = 20, sortBy = 'timestamp', direction = -1): Observable<Login[]> {
        return from(this.loginModel.find({
            $where: function() {
                const today = new Date(); //
                today.setHours(0,0,0,0);
                return (this._id.getTimestamp() >= today)
            },
            "eventid": 4625
        }, {
            timestamp: 1,
            eventid: 1,
            providername: 1,
            ipaddress: 1,
            username: 1
        }).skip(skip).limit(limit).sort({[sortBy]: direction}).exec());
    }
}
