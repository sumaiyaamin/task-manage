import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Module({
  controllers: [SearchController],
  providers: [SearchService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  exports: [SearchService],
})
export class SearchModule {}

