// Файл маршрута users/me
const userRouter = require('express').Router();

const {
  editUserInfoValidator,
} = require('../middlewares/validation');

const { getUserInfo, editUserInfo } = require('../controllers/users');

userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me', editUserInfoValidator, editUserInfo);

module.exports = userRouter;