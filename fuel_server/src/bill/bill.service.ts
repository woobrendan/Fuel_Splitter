import { Injectable } from '@nestjs/common';

@Injectable({})
export class BillService {
  addNewTrip() {
    return {
      message: 'Adding new trip',
    };
  }
}
