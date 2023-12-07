const API_URL = "http://servicebox35.pp.ru/api"; // URL моего бэкенда

// Функция для отправки сообщения в телеграмм
async function sendMessageToTelegram(message) {
  try {
    const response = await fetch(`${API_URL}/telegram/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    // Проверка статуса ответа
    if (response.ok) {
      console.log('Сообщение успешно отправлено в телеграмм');
      return true;
    } else {
      console.error('Ошибка при отправке сообщения в телеграмм');
      return false;
    }
  } catch (error) {
    console.error('Произошла ошибка при отправке сообщения в телеграмм:', error);
    return false;
  }
}

export { sendMessageToTelegram };