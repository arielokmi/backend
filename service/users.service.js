const mongoose = require("mongoose");
const userSchema = require("../models/users.model");
const createHashedPassword = require("./auth-utils");
const User = mongoose.model("User", userSchema);

const fetchUsers = async () => {
  try {
    return await User.find({});
  } catch (err) {
    console.log("service fetchUsers err", err);
  }
};

const fetchUsersId = async (id) => {
  try {
    return await User.findById({ _id: mongoose.Types.ObjectId(id) });
  } catch (err) {
    console.log("service fetchUsersId err", err);
  }
};

const addUser = async ({ firstName, lastName, email, password, role }) => {
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: createHashedPassword(password),
      role,
    });
    return await newUser.save();
  } catch (err) {
    console.log("service addUser err", err.message);
    throw err;
  }
};

const updateUser = async (id, data) => {
  try {
    const result = await User.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $set: data,
      }
    );

    return result;
  } catch (err) {
    console.log("service updateUser err", err.message);
  }
};

const deleteUser = async (id) => {
  try {
    const result = await User.deleteOne({ _id: mongoose.Types.ObjectId(id) });
    return result;
  } catch (err) {
    console.log("service:deleteUser err", err.message);
  }
};

const ResetPasswordUser = async (email) =>{
 try {
   const result = await User.find(email).$where({email:{email}});
   return result;
 } 
 catch (err) {
  console.log("service:ResetPasswordUser err", err.message);
}
}

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  fetchUsers,
  fetchUsersId,
  ResetPasswordUser,
};
