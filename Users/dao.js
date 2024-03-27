import userModel from "./model.js";

export const findAllUsers = () => userModel.find();
export const findUserById = (userId) => userModel.findById(userId);
export const findUserByUsername = (username) => userModel.findOne({ username });
export const findUserByCredentials = (username, password) =>
  userModel.findOne({ username, password });
export const createUser = (user) => userModel.create(user);
export const updateUser = (userId, userUpdates) =>
  userModel.updateOne({ _id: userId }, { $set: userUpdates });
export const deleteUser = (userId) => userModel.deleteOne({ _id: userId });
