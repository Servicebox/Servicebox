const { config } = require('dotenv');
const URL = 'mongodb://127.0.0.1:27017/serviceboxdb';
const REGEX_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const { SECRET = 'dev-secret' } = process.env;
console.log(SECRET)
const { PORT = 5000 } = process.env;
const { NODE_ENV } = process.env;




if (NODE_ENV === 'production') {
  config();
}

module.exports = {
  PORT,
  URL,
  SECRET,
  REGEX_URL,
  NODE_ENV,
};
