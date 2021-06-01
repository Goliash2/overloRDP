import {Controller, Body, Post, Get, Param} from '@nestjs/common';
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
    async getTodayEvents(@Param('limit') limit: number, @Param('skip') skip: number) {
        return this.loginsService.getTodayEvents(skip, limit);
    }

    @Get('all')
    async getAllEvents(@Param('limit') limit: number, @Param('skip') skip: number) {
        return this.loginsService.getAllEvents(skip, limit);
    }

    @Get('laststates')
    async getLastStates() {
        return this.loginsService.getLastStates();
    }
}
