import { Injectable } from '@nestjs/common';

@Injectable({})
export class HistoryService {
  addToHistory() {
    return 'adding to history';
  }
}