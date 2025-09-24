import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  exports: [NotificationsService],
})
export class NotificationsModule {}

