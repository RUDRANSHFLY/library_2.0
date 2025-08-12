import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [AuthModule, DbModule,ConfigModule.forRoot({isGlobal : true})],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
