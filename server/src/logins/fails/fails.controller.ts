import {Controller, Body, Post, Get} from '@nestjs/common';
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
    async getAllFailedEvents() {
        return this.failsService.getAllFailedEvents();
    }

    @Get('today')
    async getTodayFailedEvents() {
        return this.failsService.getTodayFailedEvents();
    }
}
