const { deleteImgCloudinary } = require('../../utils/dlt');
const { generateSign } = require('../../utils/jwt');
const { removeItem } = require('../../utils/removeItem');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      userEmail: req.body.userEmail,
      imageAvatar: req.file ? req.file.path : 'not image',
      events: [],
      role: 'user'
    });

    const userDuplicated = await User.findOne({
      $or: [{ userName: req.body.userName }, { userEmail: req.body.userEmail }]
    });

    if (userDuplicated) {
      return res
        .status(400)
        .json('This username o email already exists, choose another one');
    }

    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const user = await newUser.save();
    const token = generateSign(user._id);
    return res.status(200).json({ mensaje: 'You are login!', user, token });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ userName: req.body.userName }, { userEmail: req.body.userEmail }]
    });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id);
        return res.status(200).json({ mensaje: 'You are login!', user, token });
      } else {
        return res.status(400).json('The username or password are wrong');
      }
    } else {
      return res.status(400).json('The username or password are wrong');
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json('No User found with this id');
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);
    if (userDeleted.imageAvatar) deleteImgCloudinary(userDeleted.imageAvatar);
    return res
      .status(200)
      .json({ mensaje: 'This user was deleted', userDeleted });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userActual = await User.findById(id);
    const userModify = new User(req.body);
    userModify._id = id;
    userModify.userEmail = req.params.userEmail;
    userModify.role = req.params.role;
    userModify.imageAvatar = req.file ? req.file.path : req.params.imageAvatar;
    userModify.userName = req.body.userName
      ? req.body.userName
      : req.params.userName;
    userModify.firstname = req.body.firstname
      ? req.body.firstname
      : req.params.firstname;
    userModify.lastname = req.body.lastname
      ? req.body.lastname
      : req.params.lastname;
    userModify.password = req.body.password
      ? bcrypt.hashSync(req.body.password, 10)
      : req.params.password;
    if (req.body.events == ![]) {
      userModify.events = [...userActual.events];
    } else {
      userModify.events = [...userActual.events, ...[req.body.events]];
    }

    const userDuplicated = await User.findOne({ userName: req.body.userName });

    if (userDuplicated) {
      return res
        .status(400)
        .json('This username already exists, choose another one');
    }

    const userUpdated = await User.findByIdAndUpdate(id, userModify);
    await userUpdated.save();
    if (userActual.imageAvatar) deleteImgCloudinary(userActual.imageAvatar);
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(400).json('errorsaso');
  }
};

const removeEventUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userActual = await User.findById(id);
    const userModify = new User(req.body);
    userModify._id = id;
    userModify.userEmail = req.params.userEmail;
    userModify.role = req.params.role;
    userModify.imageAvatar = req.params.imageAvatar;
    userModify.userName = req.params.userName;
    userModify.firstname = req.params.firstname;
    userModify.lastname = req.params.lastname;
    userModify.password = req.params.password;
    userModify.events = removeItem(userActual.events, req.body.events);

    const userUpdated = await User.findByIdAndUpdate(id, userModify);
    await userUpdated.save();
    if (userActual.imageAvatar) deleteImgCloudinary(userActual.imageAvatar);
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(400).json('error when delete event');
  }
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
  removeEventUser,
  getUserById
};
