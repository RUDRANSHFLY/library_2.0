import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [AuthModule, DbModule,ConfigModule.forRoot({isGlobal : true}), BookModule, ThrottlerModule.forRoot([{
    ttl : 6000,
    limit : 10,
  }])],
  controllers: [AppController],
  providers: [AppService, DbService,{
    provide : APP_GUARD,
    useClass : ThrottlerGuard,  
  }],
})
export class AppModule {
  configure(consumer : MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
