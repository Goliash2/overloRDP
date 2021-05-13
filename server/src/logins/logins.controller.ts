import {Controller, Body, Post, Get} from '@nestjs/common';
import {LoginsService} from "./logins.service";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Login} from "./login.model";

@Controller('login')
export class LoginsController {
    constructor(
        private readonly loginsService: LoginsService
    ) {
    }

    @Post()
    addProduct(@Body() login: Login): Observable<Login | any> {
        return this.loginsService.newLoginEvent(login).pipe(
            map((login: Login) => login),
            catchError(err => of({error: "e1 " + err.message}))
        );
    }

    @Get('today')
    async getTodayEvents() {
        return this.loginsService.getTodayEvents();
    }

    @Get('all')
    async getAllEvents() {
        return this.loginsService.getAllEvents();
    }

    @Get('laststates')
    async getLastStates() {
        return this.loginsService.getLastStates();
    }
}
