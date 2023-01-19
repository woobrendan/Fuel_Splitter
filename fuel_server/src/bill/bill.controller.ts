import { Controller, Get, Post } from '@nestjs/common';
import { BillService } from './bill.service';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Post('newTrip')
  addNewTrip() {
    return this.billService.addNewTrip();
  }
}
