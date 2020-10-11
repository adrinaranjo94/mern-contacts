import axios from "core/axios";

class UserServices {
  getUsers = () => axios.get("/users");

  getUser = (userId) => axios.get(`/users/${userId}`);

  updateUser = (userId, data) => axios.put(`/users/${userId}`, data);

  addUser = (data) => axios.post("/users", data);

  deleteUser = (userId) => axios.delete(`/users/${userId}`);
}

export default UserServices;
