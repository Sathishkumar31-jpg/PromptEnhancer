//     import axios from "axios";

// const API_BASE = "http://localhost:8000";

// export const enhancePrompt = async (text) => {
//   const response = await axios.post(`${API_BASE}/enhance`, {
//     prompt: text,
//   });
//   return response.data.enhanced_prompt;
// };


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const enhancePrompt = async (prompt) => {
  const res = await API.post("/enhance", { prompt });
  return res.data.enhanced_prompt;
};
