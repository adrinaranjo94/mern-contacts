import axios from "core/axios";

export const getUsers = () => axios.get("/users");

export const getUser = (userId) => axios.get(`/users/${userId}`);

export const updateUser = (userId, data) => axios.put(`/users/${userId}`, data);

export const addUser = (data) => axios.post("/users", data);

export const deleteUser = (userId) => axios.delete(`/users/${userId}`);
