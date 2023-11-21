import axios from "axios";
import { base_url } from "./index";

export async function getAllProducts() {
  let result;
  result = await axios.get(base_url + "products").then((res) => res.data);

  return result;
}

export async function putProduct(id, obj) {
  let result;
  result = await axios
    .put(base_url + "products/" + id, obj)
    .then((res) => res.data);

  return result;
}

export async function deleteProduct(id) {
  let result;
  result = await axios
    .delete(base_url + "products/" + id)
    .then((res) => res.data);

  return result;
}
