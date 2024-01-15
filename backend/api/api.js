// api.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Настройка использования сессий в Express
app.use(require('express-session')({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Настройка локальной стратегии аутентификации
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Здесь вы можете проверить имя пользователя и пароль в вашей базе данных
    if (username === 'admin' && password === 'adminpassword') {
      return done(null, { id: 1, username: 'admin', role: 'admin' }); // Возвращаем пользователя
    } else {
      return done(null, false, { message: 'Неверное имя пользователя или пароль' }); // Ошибка аутентификации
    }
  }
));

// Сериализация и десериализация пользователя
passport.serializeUser(function(user, done) {
  done(null, user.id); // Сохраняем пользователя в сессии
});

passport.deserializeUser(function(id, done) {
  // Загружаем пользователя из сессии
  done(null, { id: 1, username: 'admin', role: 'admin' }); // В реальном проекте данные будут загружаться из базы данных
});