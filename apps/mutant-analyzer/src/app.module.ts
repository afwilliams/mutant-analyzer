import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ControllersModule } from './controllers/controllers.module';
import { StatsController } from './controllers/stats.controller';

@Module({
  imports: [ConfigModule.forRoot(), ControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
