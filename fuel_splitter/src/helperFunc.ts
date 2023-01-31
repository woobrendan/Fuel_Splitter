import axios from "axios";

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
    console.log("Error:", error);
  }
};

export { getToday, dateToString, resetTripLog };
