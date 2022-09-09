const { Schema } = require('mongoose');

const  userSchame = new Schema({
  username: {type: String, unique: true},
  
});

const animalsSchema = new Schema({
  species: String,
  breed: String,
  gender: String,
  name: String,
  age: String,
  temperment: Schema.Types.Mixed,
  shelterInfo: Schema.Types.Mixed,
  status: Boolean,
});

const postSchema = new Schema({
  message: String,
  image: String,
  animalId: String,
  date: { type: Date, default: Date.now },
});

const followersSchema = new Schema({
  userId: String,
  postId: String,
});

const savedAnimalsSchema = new Schema({
  UserId: String,
  animalId: String,
});

module.exports = {
  userSchame,
  animalsSchema,
  postSchema,
  followersSchema,
  savedAnimalsSchema
};
