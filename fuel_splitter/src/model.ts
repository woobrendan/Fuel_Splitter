interface IndividualInfo {
  totalKM: number;
  totalTrips: number;
  billPortion: number;
}

export interface FuelBill {
  totalPrice: number;
  costPerLitre: number;
  person1Info: IndividualInfo;
  person2Info: IndividualInfo;
  person3Info?: IndividualInfo;
  person4Info?: IndividualInfo;
}
