import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Login, LoginMongo} from "./login.model";
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
}
