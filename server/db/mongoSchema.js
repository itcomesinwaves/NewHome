const { Schema } = require('mongoose');

// change to true once auth is done
const userSchema = new Schema({
  username: { type: String, unique: true },
  email: String,
  googleID: String,
  firstName: String,
  lastName: String,
  password: String,
  image: String,
  imageType: String,
  source: { type: String, required: [false, 'source not specified'] },
  lastVisited: { type: Date, default: new Date() },
});

const petSchema = new Schema({
  species: String,
  breed: String,
  gender: String,
  name: String,
  age: String,
  temperament: Schema.Types.Mixed,
  shelterInfo: Schema.Types.Mixed,
  adopted: Boolean,
  userId: String,
});

const postSchema = new Schema({
  title: String,
  message: String,
  image: String,
  imageType: String,
  petId: String,
  date: { type: Date, default: Date.now },
});

const followersSchema = new Schema({
  userId: String,
  petId: String,
});

const savedPetSchema = new Schema({
  UserId: String,
  petId: String,
});

module.exports = {
  userSchema,
  petSchema,
  postSchema,
  followersSchema,
  savedPetSchema,
};
