import axios from "axios";

export const appRequest = axios.create({
  baseURL: "http://localhost:3000",
});

// export const appRequest = axios.create({
//     baseURL: "http://localhost:3000",
//   });
