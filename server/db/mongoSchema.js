const { Schema } = require('mongoose');

// change to true once auth is done
const userSchema = new Schema({
  email: String,
  googleID: {
    type: String,
    unique: true,
  },
  firstName: String,
  lastName: String,
  password: String,
  image: String,
  imageType: String,
  source: { type: String, required: [false, 'source not specified'] },
  lastVisited: { type: Date, default: new Date() },
});

const petSchema = new Schema({
  petId: {
    type: Number,
    unique: true,
  },
  species: String,
  breed: String,
  gender: String,
  name: String,
  age: String,
  tags: Schema.Types.Mixed,
  shelterInfo: Schema.Types.Mixed,
  adopted: String,
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
  userId: String,
  petId: String,
});

module.exports = {
  userSchema,
  petSchema,
  postSchema,
  followersSchema,
  savedPetSchema,
};
