require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, SECRET } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

/** POST-запрос. Зарегистрировать нового пользователя */
function createUser(req, res, next) {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(201).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError(
            'Пользователь с таким электронным адресом уже зарегистрирован',
          ),
        );
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при регистрации пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
}

/** контроллер login, который получает из запроса почту и пароль и проверяет их */
function loginUser(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign(
          { userId },
          NODE_ENV === 'production' ? SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );

        return res.send({ token });
      }

      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .catch(next);
}

/** GET-запрос. Получить всех пользователей  */
function getUsers(_, res, next) {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
}

/** GET-запрос. Получить всех пользователей по id */
function getUserById(req, res, next) {
  const { id } = req.params;

  User.findById(id)

    .then((user) => {
      if (user) return res.send(user);

      throw new NotFoundError('Пользователь с таким id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
}

/**  поиск пользователя * */
function getCurrentUserInfo(req, res, next) {
  const { userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (user) return res.send(user);

      throw new NotFoundError('Пользователь с таким id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
}

/** обновить данные пользователя */
function updateUser(req, res, next) {
  const { name, about } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) return res.send(user);

      throw new NotFoundError('Пользователь с таким id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля',
          ),
        );
      } else {
        next(err);
      }
    });
}

/** PATCH-запрос /users/me/avatar. Обновить аватар пользователя */
function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) return res.send(user);

      throw new NotFoundError('Пользователь с таким id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
}

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  getCurrentUserInfo,
  updateUser,
  updateUserAvatar,
};
