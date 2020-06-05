module.exports.ErrorMessages = {
  UNAUTORIZED_ERROR: 'Ошибка овторизации',
  AUTORIZATION_NEEDED_ERROR: 'Требуется авторизация',
  NO_USER_ERROR: 'Нет такого пользователя',
  NOT_FOUND_ERROR: 'Запрашиваемый ресурс не найден',
  FORBIDDEN_ERROR: 'У вас недостаточно прав',
  KEYWORD_IS_EMPTY_ERROR: 'Не указана поисковая фраза',
  LINK_IS_EMPTY_ERROR: 'Ссылка должна быть заполнена',
  LINK_IS_INCORRECT_ERROR: 'Значение не является корректной ссылкой',
  EMAIL_IS_EMPTY_ERROR: 'Email должен быть заполнен',
  EMAIL_IS_INCORRECT_ERROR: 'Значение не является корректным Email-ом',
  USER_OR_PASS_NOT_FOUND_ERROR: 'Неправильные почта или пароль',
  SERVER_ERROR: 'На сервере произошла ошибка',
  BAD_REQUEST_ERROR: 'Неправильный формат запроса',
  MAIN_API_ERROR: 'Ошибка MainApi',
  NEWS_API_ERROR: 'Ошибка NewsApi',
};

module.exports.ErrorValidationMessages = {
  EMPTY_STRING: 'Строка не может состоять из одних пробелов',
  INVALID_EMAIL_FORMAT: 'Неправильный формат email',
  INVALID_LINK_FORMAT: 'Неправильный формат ссылки',
  TYPE_MISMATCH: 'Неверный формат',
  VALUE_MISSING: 'Требуется не пустое значение',
  PATTERN_MISMATCH: 'Неверный формат',
  STRING_TOO_LONG: 'Слишком длинная строка',
  STRING_TOO_SHORT: 'Слишком короткая строка',
  BAD_INPUT: 'Введен некорректный символ',
};

module.exports.InfoMessages = {
  LOGOUT_COMPLETE_INFO: 'Вы успешно вышли',
};

module.exports.DebugMessages = {
  SERVER_WILL_BE_CRASHED_DEBUG: 'Сервер сейчас упадёт',
};
  