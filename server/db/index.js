const mongoose = require('mongoose');

const password = process.env.DB_PASS;
const username = process.env.DB_USER;
const mongoUri = `mongodb+srv://${username}:${password}@newhome.ha7ybpt.mongodb.net/?retryWrites=true&w=majority`;

const db = mongoose.connect(mongoUri, () => {
  console.log('connected to mongoose');
});

module.exports = db;
