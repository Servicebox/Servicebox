const allowedCors = [
  'https://servicebox35.ru',
  'http://servicebox35.ru',
  'https://servicebox35.pp.ru',
  'http://servicebox35.pp.ru',
  'https://localhost:5000',
  'http://localhost:5000',
  'https://localhost:5000',
  'https://localhost:8080',
  'http://localhost:8080',
  'http://localhost:5000',
  'https://localhost:3000',
  'http://localhost:3000',
  'https://optfm.ru/api/',
  'http://optfm.ru/api/',
];

const corsOptions = { 
  origin: (origin, callback) => {
    if (allowedCors.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

module.exports = { allowedCors, corsOptions };