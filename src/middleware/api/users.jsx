import axios from "axios";
import { base_url } from "./index";

export async function getAllUsers() {
  let result;
  result = await axios.get(base_url + "users").then((res) => res.data);

  return result;
}

export async function getUser(id) {
  let result;
  result = await axios.get(base_url + "users/" + id).then((res) => res.data);

  return result;
}

export async function postUser(obj) {
  let result;
  result = await axios.post(base_url + "users", obj).then((res) => res.data);

  return result;
}

export async function putUser(id, obj) {
  let result;
  result = await axios
    .put(base_url + "users/" + id, obj)
    .then((res) => res.data);

  return result;
}
