import axios from "axios";
import { FuelBill, TripInfo } from "./model";

const getToday = (): string => {
  let today: Date = new Date();
  const dd: string = String(today.getDate()).padStart(2, "0");
  const mm: string = String(today.getMonth() + 1).padStart(2, "0");
  const year: number = today.getFullYear();
  return `${mm}-${dd}-${year}`;
};

const dateToString = (date: string): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateArr = date.split("-");
  const monthNum: number = Number(dateArr[1]) - 1;
  const day: number = Number(dateArr[2]);
  const monthName: string = months[monthNum];
  return `${monthName} ${day}, ${Number(dateArr[0])}`;
};

const resetTripLog = async () => {
  try {
    axios.delete("http://localhost:1212/trips/delete/all");
  } catch (error) {
    console.log("Error deleting all trips:", error);
  }
};

const addToHistory = (fuelBill: FuelBill) => {
  try {
    axios.post("http://localhost:1212/history/new", fuelBill);
  } catch (error) {
    console.log("Error adding to History:", error);
  }
};

const addTripLog = async (trip: TripInfo) => {
  try {
    await fetch("http://localhost:1212/trips/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trip),
    });
  } catch (error) {
    console.log("Error posting trip:", error);
  }
};

const convertDateToString = (day: any): string => {
  let newDate: string = "";
  if (typeof day === "string") {
    newDate = day.split("T")[0];
  } else {
    newDate = day.toISOString().split("T")[0];
  }
  return dateToString(newDate);
};

const getNames = (nameArr: string[]) => {
  let names: string = "";
  if (nameArr.length === 1) return nameArr[0];
  for (let i = 0; i < nameArr.length; i++) {
    if (i === nameArr.length - 1) {
      names += nameArr[i];
    } else {
      names += `${nameArr[i]}, `;
    }
  }
  return names;
};

export {
  getToday,
  dateToString,
  resetTripLog,
  addToHistory,
  addTripLog,
  convertDateToString,
  getNames,
};
