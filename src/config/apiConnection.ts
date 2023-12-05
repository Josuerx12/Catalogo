import axios from "axios";

const url = "https://catalogoapi.josuecarvalho.cloud";

export const api = axios.create({
  baseURL: url,
});
