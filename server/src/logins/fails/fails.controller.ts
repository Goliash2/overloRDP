import {Controller, Body, Post, Get, Param} from '@nestjs/common';
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
    async getAllFailedEvents(@Param('limit') limit: number, @Param('skip') skip: number, @Param('sortBy') sortBy: string, @Param('direction') direction: number) {
        return this.failsService.getAllFailedEvents(skip, limit, sortBy, direction);
    }

    @Get('today')
    async getTodayFailedEvents(@Param('limit') limit: number, @Param('skip') skip: number, @Param('sortBy') sortBy: string, @Param('direction') direction: number) {
        return this.failsService.getTodayFailedEvents(skip, limit, sortBy, direction);
    }
}
