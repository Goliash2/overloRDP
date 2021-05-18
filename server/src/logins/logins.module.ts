import { Module } from '@nestjs/common';
import { LoginsController } from './logins.controller';
import { LoginsService } from './logins.service';
import {LoginSchema} from "./login.model";
import {MongooseModule} from "@nestjs/mongoose";
import { FailsController } from './fails/fails.controller';
import { FailsService } from './fails/fails.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Login', schema: LoginSchema}]),
  ],
  controllers: [LoginsController, FailsController],
  providers: [LoginsService, FailsService],
  exports: [LoginsService]
})
export class LoginsModule {}
