import axios from "axios";

const api = axios.create({
  baseURL: "https://anarch-y-smarttutor-ai.hf.space/",
});

export default api;
