import {Controller, Get, Query, ParseIntPipe} from '@nestjs/common';
import {FailsService} from "./fails.service";

@Controller('login/fails')
export class FailsController {
    constructor(
        private readonly failsService: FailsService
    ) {
    }

    @Get('all')
    async getAllFailedEvents(@Query('limit') limit: any, @Query('skip') skip: any, @Query('sortBy') sortBy: string, @Query('direction') direction: any) {
        return this.failsService.getAllFailedEvents(parseInt(skip), parseInt(limit), sortBy, parseInt(direction));
    }

    @Get('today')
    async getTodayFailedEvents(@Query('limit') limit: any, @Query('skip') skip: any, @Query('sortBy') sortBy: string, @Query('direction') direction: any) {
        return this.failsService.getTodayFailedEvents(parseInt(skip), parseInt(limit), sortBy, parseInt(direction));
    }
}
