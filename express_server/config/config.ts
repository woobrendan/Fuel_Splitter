import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.rmiuql1.mongodb.net/`;

const MONGO_TEST = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.rmiuql1.mongodb.net/fuel_test`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 2020;

export const config = {
  mongo: {
    url: MONGO_TEST,
  },
  server: {
    port: SERVER_PORT,
  },
};
