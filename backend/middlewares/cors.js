const allowedCors = [
  'https://servicebox35.ru',
  'http://servicebox35.ru',
  'https://servicebox35.pp.ru',
  'http://servicebox35.pp.ru',
  'https://servicebox35.pp.ru/services',
  'http://servicebox35.pp.ru/services',
  'https://localhost:5000',
  'http://localhost:5000',
  'https://localhost:5000',
  'https://localhost:8000/services',
  'http://localhost:8000/services',
  'http://localhost:8000/api/products',
  'https://localhost:8000/api/products',
  'http://localhost:3000/send-request',
  'http://localhost:8000/api/',
  'http://localhost:8000',
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