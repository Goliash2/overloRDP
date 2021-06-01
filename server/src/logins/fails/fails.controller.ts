import {Controller, Get, Query, ParseIntPipe} from '@nestjs/common';
import {FailsService} from "./fails.service";

@Controller('login/fails')
export class FailsController {
    constructor(
        private readonly failsService: FailsService
    ) {
    }

    @Get('all')
    async getAllFailedEvents(@Query('limit', ParseIntPipe) limit: number, @Query('skip', ParseIntPipe) skip: number, @Query('sortBy') sortBy: string, @Query('direction', ParseIntPipe) direction: number) {
        return this.failsService.getAllFailedEvents(skip, limit, sortBy, direction);
    }

    @Get('today')
    async getTodayFailedEvents(@Query('limit', ParseIntPipe) limit: number, @Query('skip', ParseIntPipe) skip: number, @Query('sortBy') sortBy: string, @Query('direction', ParseIntPipe) direction: number) {
        return this.failsService.getTodayFailedEvents(skip, limit, sortBy, direction);
    }
}
