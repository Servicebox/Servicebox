const mongoose = require('mongoose');
const { REGEX_URL } = require('../utils/constants');


const messageSchema = new Schema(
    {
        name: {
          type: String,
          required: true,
          minlength: [2, 'Минимальная длина поля "name" - 2'],
          maxlength: [30, 'Максимальная длина поля "name" - 30'],
        },
        phoneNumber: {
          type: String,
        },
        description: {
          type: String,
        }
      }
  );