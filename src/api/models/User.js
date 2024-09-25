const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, trim: true, required: true, unique: true },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    password: { type: String, trim: true, required: true },
    userEmail: { type: String, trim: true, required: true, unique: true },
    imageAvatar: { type: String, trim: true, required: true },
    events: [{ type: mongoose.Types.ObjectId, required: false, ref: 'events' }],
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['admin', 'user']
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
