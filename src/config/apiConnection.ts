import axios from "axios";

const url = "https://catalogofst.josuecarvalho.cloud/";

export const api = axios.create({
  baseURL: url,
});
