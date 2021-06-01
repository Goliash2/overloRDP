import {Controller, Body, Post, Get, Param, Query} from '@nestjs/common';
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
    async getTodayEvents(@Query('limit') limit: number, @Query('skip') skip: number, @Query('sortBy') sortBy: string, @Query('direction') direction: number) {
        return this.loginsService.getTodayEvents(skip, limit, sortBy, direction);
    }

    @Get('all')
    async getAllEvents(@Query('limit') limit: number, @Query('skip') skip: number, @Query('sortBy') sortBy: string, @Query('direction') direction: number) {
        return this.loginsService.getAllEvents(skip, limit, sortBy, direction);
    }

    @Get('laststates')
    async getLastStates() {
        return this.loginsService.getLastStates();
    }
}
