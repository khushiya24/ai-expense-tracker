import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-expense-tracker-rb4b.onrender.com/api",
});

export default API;