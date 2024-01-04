import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { TicketingController } from './ticketing.controller';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticketing } from './entities/ticketing.entity';
import { ShowService } from 'src/show/show.service';
import { ShowController } from 'src/show/show.controller';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Ticketing, Show, User]),
  ],
  controllers: [TicketingController, ShowController, UserController],
  providers: [TicketingService, ShowService, UserService],
})
export class TicketingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // 미들웨어 적용!
      .forRoutes(
        { path: 'ticketing/:showId', method: RequestMethod.POST },
        { path: 'ticketing', method: RequestMethod.GET },
      );
    // create 엔드포인트에만 적용
  }
}
