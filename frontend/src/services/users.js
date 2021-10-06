import axios from "axios";
import { PROXY } from "../utils/config";

const baseUrl = `${PROXY}/api/users`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  console.log(response);
  return response.data;
};

export default { getAll, getUser };
