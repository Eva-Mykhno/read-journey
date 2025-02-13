// import axios from "axios";

// export const api = axios.create({
//   baseURL: "https://readjourney.b.goit.study/api",
// });

import axios from "axios";

export const api = axios.create({
  baseURL: "https://readjourney.b.goit.study/api",
});

const tokenFromStorage = localStorage.getItem("token");
if (tokenFromStorage) {
  api.defaults.headers.common["Authorization"] = `Bearer ${tokenFromStorage}`;
}
