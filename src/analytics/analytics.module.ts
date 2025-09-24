import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AnalyticsModule {}

