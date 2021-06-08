/*
 * File Name: UserModel.js
 * Description: User Model file to work with Mongo Database.
 * Author: mathewjames.dev
 * Author URL: https://mathewjames.dev
 */
const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;
  
// Think of this as Schema for the User Table.
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  resetToken: {
    type: String
  },
  resetTokenExp: {
    type: Date
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  },
  health: {
    type: Number,
    default: 100
  },
  maxHealth: {
    type: Number,
    default: 100
  },
});

// Pre-Save hook - This will encrypt the users password prior t saving.
UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

// Function to check whether the passed password matches the users password.
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;