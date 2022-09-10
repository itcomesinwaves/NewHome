const mongoose = require('mongoose');

const FIELD = './index.js';
const password = process.env.DB_PASS;
const username = process.env.DB_USER;
const mongoUri = `mongodb+srv://${username}:${password}@newhome.ha7ybpt.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db yo');
  })
  .catch((err) => {
    console.error('err in db', err);
  });

module.exports = FIELD;
