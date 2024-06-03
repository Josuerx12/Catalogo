import axios from "axios";

const url = "https://catalogo-api-theta.vercel.app/";

export const api = axios.create({
  baseURL: url,
});
