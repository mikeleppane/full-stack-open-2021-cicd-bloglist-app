import axios from "axios";
import { PROXY } from "../utils/config";

const baseUrl = `${PROXY}/api/login`;

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
