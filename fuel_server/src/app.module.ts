import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OneBillModule } from './one-bill/one-bill.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [AuthModule, OneBillModule, HistoryModule],
})
export class AppModule {}
