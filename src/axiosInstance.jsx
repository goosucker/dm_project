import { BASED_URL } from "./BASED_URL";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: BASED_URL, 
    withCredentials: true,
  });