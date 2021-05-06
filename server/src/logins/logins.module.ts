import { Module } from '@nestjs/common';
import { LoginsController } from './logins.controller';
import { LoginsService } from './logins.service';
import {LoginSchema} from "./login.model";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Login', schema: LoginSchema}]),
  ],
  controllers: [LoginsController],
  providers: [LoginsService],
  exports: [LoginsService]
})
export class LoginsModule {}
