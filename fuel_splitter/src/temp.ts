import { FuelBill } from "./model";

export const tempHistory: FuelBill[] = [
  {
    totalPrice: 15.99,
    totalKM: 25,
    costPerLitre: 1.45,
    brendan: { name: "Brendan", totalKM: 10, totalTrips: 1, billPortion: 0.4 },
    lory: {
      name: "Lory",
      totalKM: 10,
      totalTrips: 1,
      billPortion: 0.4,
    },
    david: { name: "David", totalKM: 2.5, totalTrips: 1, billPortion: 0.1 },
    parco: { name: "Parco", totalKM: 2.5, totalTrips: 1, billPortion: 0.1 },
    tripLogs: [
      {
        isBrendanIn: true,
        isLoryIn: true,
        isDavidIn: false,
        isParcoIn: false,
        totalKM: 20,
        date: new Date(),
      },
      {
        isBrendanIn: false,
        isLoryIn: false,
        isDavidIn: true,
        isParcoIn: true,
        totalKM: 5,
        date: new Date(),
      },
    ],
  },
  {
    totalPrice: 50.27,
    totalKM: 60,
    costPerLitre: 1.66,
    brendan: {
      name: "Brendan",
      totalKM: 11.25,
      totalTrips: 2,
      billPortion: 0.28,
    },
    david: { name: "David", totalKM: 8.75, totalTrips: 2, billPortion: 0.22 },
    lory: { name: "Lory", totalKM: 13.75, totalTrips: 3, billPortion: 0.34 },
    parco: { name: "Parco", totalKM: 6.25, totalTrips: 1, billPortion: 0.16 },
    tripLogs: [
      {
        isBrendanIn: true,
        isLoryIn: true,
        isDavidIn: false,
        isParcoIn: false,
        totalKM: 10,
        date: new Date(),
      },
      {
        isBrendanIn: false,
        isLoryIn: true,
        isDavidIn: true,
        isParcoIn: false,
        totalKM: 5,
        date: new Date(),
      },
      {
        isBrendanIn: true,
        isLoryIn: true,
        isDavidIn: true,
        isParcoIn: true,
        totalKM: 25,
        date: new Date(),
      },
    ],
  },
];
