import axios from "axios";

const baseUrl = `${
  process.env.API_BASE_URL || "http://localhost:3003"
}/api/users`;

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
