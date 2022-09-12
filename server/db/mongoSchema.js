const { Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: [true, "email already registered"],
  },
  firstName: String,
  lastName: String,
  password: String,
  profilePhoto: String,
  source: { type: String, required: [true, "source not specified"] },
  lastVisited: { type: Date, default: new Date() }
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
