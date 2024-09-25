const express = require('express');
const { isAdmin } = require('../../middlewares/isadmin');
const {
  getUsers,
  register,
  login,
  deleteUser,
  updateUser,
  getUserById,
  removeEventUser
} = require('../controllers/user');
const { uploadFileUser, uploadFile } = require('../../middlewares/uploadfile');
const { isAuth } = require('../../middlewares/auth');

const usersRoutes = express.Router();

usersRoutes.get('/', [isAuth], getUsers);
usersRoutes.get('/:id', [isAuth], getUserById);
usersRoutes.post('/register', uploadFileUser.single('imageAvatar'), register);
usersRoutes.post('/login', login);
usersRoutes.delete('/delete/:id', [isAdmin], deleteUser);
usersRoutes.put(
  '/edit/:id',
  [isAuth],
  uploadFileUser.single('imageAvatar'),
  updateUser
);
usersRoutes.put('/remove/:id', [isAuth], removeEventUser);

module.exports = usersRoutes;
