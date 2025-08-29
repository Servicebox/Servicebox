const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Заменить пробелы на -
    .replace(/[^\w\-]+/g, '')       // Удалить все не-слово символы
    .replace(/\-\-+/g, '-')         // Заменить multiple - на single -
    .replace(/^-+/, '')             // Обрезать - с начала текста
    .replace(/-+$/, '');            // Обрезать - с конца текста
};

export default slugify;