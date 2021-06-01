import {Controller, Body, Post, Get, Param, Query} from '@nestjs/common';
import {FailsService} from "./fails.service";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Login} from "../login.model";

@Controller('login/fails')
export class FailsController {
    constructor(
        private readonly failsService: FailsService
    ) {
    }

    @Get('all')
    async getAllFailedEvents(@Query('limit') limit: number, @Query('skip') skip: number, @Query('sortBy') sortBy: string, @Query('direction') direction: number) {
        return this.failsService.getAllFailedEvents(skip, limit, sortBy, direction);
    }

    @Get('today')
    async getTodayFailedEvents(@Query('limit') limit: number, @Query('skip') skip: number, @Query('sortBy') sortBy: string, @Query('direction') direction: number) {
        return this.failsService.getTodayFailedEvents(skip, limit, sortBy, direction);
    }
}
