import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BillModule } from './bill/bill.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [AuthModule, BillModule, HistoryModule],
})
export class AppModule {}
