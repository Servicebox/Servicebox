const allowedCors = [
  'https://servicebox35.ru',
  'http://servicebox35.ru',
  'https://servicebox35.pp.ru',
  'http://servicebox35.pp.ru',
  'https://servicebox35.pp.ru/services',
  'http://servicebox35.pp.ru/services',
  'https://servicebox35.pp.ru/api',
  'http://servicebox35.pp.ru/api',
  'https://localhost:5000',
  'http://localhost:5000',
  'https://localhost:5000',
  'https://localhost:8000/services',
  'http://localhost:8000/services',
  'http://localhost:8000/products',
  'https://localhost:8000/api/products',
  'https://servicebox35.pp.ru/get-client-id',
  'http://localhost:8000/api/images',
  'http://localhost:3000/send-request',
  'http://localhost:8000/api/', 
  'http://localhost:8000',
  'http://localhost:5000',
  'https://localhost:3000',
  'http://localhost:3000',
  'https://optfm.ru/api/',
  'http://optfm.ru/api/',
];


module.exports = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    const { method } = req;

    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

    const requestHeaders = req.headers['access-control-request-headers'];

    if (method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin');
      
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  }
  return next();
};
