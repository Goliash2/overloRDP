import {Controller, Body, Post, Get, Query, ParseIntPipe} from '@nestjs/common';
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
    async getTodayEvents(@Query('limit') limit: any, @Query('skip') skip: any, @Query('sortBy') sortBy: string, @Query('direction') direction: any) {
        return this.loginsService.getTodayEvents(parseInt(skip), parseInt(limit), sortBy, parseInt(direction));
    }

    @Get('all')
    async getAllEvents(@Query('limit') limit: any, @Query('skip') skip: any, @Query('sortBy') sortBy: string, @Query('direction') direction: any) {
        return this.loginsService.getAllEvents(parseInt(skip), parseInt(limit), sortBy, parseInt(direction));
    }

    @Get('laststates')
    async getLastStates() {
        return this.loginsService.getLastStates();
    }
}
