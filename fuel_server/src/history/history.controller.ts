import { Controller, Get, Post } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('bill')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Post('new')
  addNewTrip() {
    return this.historyService.addToHistory;
  }
}
