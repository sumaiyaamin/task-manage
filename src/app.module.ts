import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        if (!process.env.REDIS_URL) {
          return { ttl: 5 } as any; // in-memory store
        }
        return {
          store: await redisStore({ url: process.env.REDIS_URL }),
          ttl: 5,
        } as any;
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const useSqlite = process.env.DB_TYPE === 'sqlite' || process.env.NODE_ENV === 'test';
        return useSqlite
          ? {
              type: 'sqlite' as const,
              database: process.env.SQLITE_PATH || ':memory:',
              autoLoadEntities: true,
              synchronize: true,
            }
          : {
              type: 'postgres' as const,
              host: process.env.DB_HOST || 'localhost',
              port: Number(process.env.DB_PORT || 5432),
              username: process.env.DB_USER || 'postgres',
              password: process.env.DB_PASS || 'postgres',
              database: process.env.DB_NAME || 'collab_pm',
              autoLoadEntities: true,
              synchronize: true,
            };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    UsersModule,
    ProjectsModule,
    TasksModule,
    AuthModule,
    SearchModule,
    NotificationsModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
