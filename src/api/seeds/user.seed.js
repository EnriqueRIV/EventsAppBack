require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../../config/db');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const users = [
  {
    userName: 'admin',
    firstname: 'admin',
    lastname: 'Admin',
    password: 'admin123',
    userEmail: 'admin@proyecto10.org',
    imageAvatar:
      'https://res.cloudinary.com/dkwfauuct/image/upload/v1726170971/folders/admin_iewpq3.jpg',
    events: [],
    role: 'admin'
  },
  {
    userName: 'user1',
    firstname: 'user1',
    lastname: 'User',
    password: 'user123',
    userEmail: 'user1@proyecto10.org',
    imageAvatar:
      'https://res.cloudinary.com/dkwfauuct/image/upload/v1727280241/folders/user_ggmb3h.jpg',
    events: [],
    role: 'user'
  },
  {
    userName: 'user2',
    firstname: 'user2',
    lastname: 'User',
    password: 'user123',
    userEmail: 'user2@proyecto10.org',
    imageAvatar:
      'https://res.cloudinary.com/dkwfauuct/image/upload/v1727281087/folders/usere_q8cqfn.jpg',
    events: [],
    role: 'user'
  }
];

const userDocuments = users.map((user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  return new User(user);
});

connectDB()
  .then(async () => {
    const allUsers = await User.find();
    if (allUsers.length) {
      await User.collection.drop();
    }
  })
  .catch((error) => console.log(`Error deleting user data: ${error}`))
  .then(async () => {
    await User.insertMany(userDocuments);
  })
  .catch((error) => console.log(`Error creating user data: ${error}`))
  .finally(() => mongoose.disconnect());
