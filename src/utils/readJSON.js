import { request } from "./api.js";

export default function readJSON(jsonName) {
  const jsonData = (dataName) => request(dataName);

  return jsonData(jsonName);
}
