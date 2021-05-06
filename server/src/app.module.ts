import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginsModule } from './logins/logins.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL), LoginsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
