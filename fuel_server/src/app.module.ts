import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BillModule } from './bill/bill.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    AuthModule,
    BillModule,
    HistoryModule,
    MongooseModule.forRoot(process.env.COMPASS_URL),
  ],
})
export class AppModule {}
