import axios from "axios";

export const localAPI = axios.create({
  baseURL: process.env.NEXT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 29000,
});
