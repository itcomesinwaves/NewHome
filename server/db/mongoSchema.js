const { Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, unique: true },
});

const petSchema = new Schema({
  species: String,
  breed: String,
  gender: String,
  name: String,
  age: String,
  temperament: Schema.Types.Mixed,
  shelterInfo: Schema.Types.Mixed,
  status: Boolean,
});

const postSchema = new Schema({
  message: String,
  image: String,
  petId: String,
  date: { type: Date, default: Date.now },
});

const followersSchema = new Schema({
  userId: String,
  postId: String,
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
