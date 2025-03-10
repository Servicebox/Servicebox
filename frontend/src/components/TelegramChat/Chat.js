import React, { useEffect} from 'react';
import axios from 'axios';
import './Chat.css'; // Подключение стилей

import Cha from '../../images/chatonlain.gif'
import userIcon from '../../images/user.png';
import managerIcon from '../../images/manager.svg'; 
import Icon from '../../images/Up.svg'
const Chat = () => {
   useEffect(() => {
    const handleOpenChat = () => {
      const chatInstance = new TelegaChat();
      chatInstance.open();
      chatInstance.startUpdate();
      
      // Добавляем класс 'open' для отображения чата
      const chatWrap = document.querySelector('.chat__wrap');
      if (chatWrap) {
        chatWrap.classList.add('open');
      }
    };
const toggleTheme = () => {
  document.body.classList.toggle('dark-theme');
};
    const handleCloseChat = () => {
      const chatWrap = document.querySelector('.chat__wrap');
      if (chatWrap) {
        chatWrap.classList.remove('open');
      }
    };

    // Получаем кнопку открытия чата
    const openChatButton = document.getElementById('open-chat-button');
    if (openChatButton) {
      openChatButton.addEventListener('click', handleOpenChat);
    }

    // Чистим обработчики при размонтировании
    return () => {
      if (openChatButton) {
        openChatButton.removeEventListener('click', handleOpenChat);
      }
    };
  }, []);

  return (
    <div>
      <button id="open-chat-button" aria-label="Открыть чат">
        <img className="img-chat"src={Cha} alt="Открыть чат" />
      </button>
    </div>
  );
};

  //Стили пишите сами!!!!
//Картинки и звуки качайте сами!



window.$ = (el) => {
  if (document.querySelector(el) !== null) return document.querySelector(el)
  else console.warn(`${el} не найден в дом дереве`);
};

window.$$ = (el) => {
  if (document.querySelectorAll(el) !== null) return document.querySelectorAll(el)
};

//Фунцкия воспроизведения звуков
window.soundPush = (url) => {
  let audio = new Audio(); // Создаём новый элемент Audio
  //audio.src = url; // Указываем путь к звуку "клика"
  //audio.autoplay = true; // Автоматически запускаем
  //audio.volume = 0.7
  $('body').appendChild(audio)
  audio.addEventListener("ended", e => audio.remove())
  return url
}



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let timeNow = new Date().toLocaleTimeString();
const token = `7903855692:AAEsBiERZ5B7apWoaQJvX0nNRB-PEJjmBcc
`; // Получаем тут https://t.me/BotFather
const chatId = `406806305`;  //получаем при вызове https://api.telegram.org/bot7903855692:AAEsBiERZ5B7apWoaQJvX0nNRB-PEJjmBcc/getupdates в браузере
const botId = `7903855692`; //

let startChat = false
let lastMessId, FirstMessId, newMessId, checkReply, Timer, count;
let idStart = getRandomInt(999)


// Имя менагера
const manager = 'Админ '

let tpl = `<div class="chat__wrap">
    <div class="chat__title">Онлайн-чат
    <div class="btm__close chat__close">&times;</div>
    </div>
    <div class="chat__body">
    <div class="chat__body__item chat__body__item__manager">
    <img class="chat__body__item__user__icon cards__theme"src="${managerIcon}" alt="аватарка менеджера">
    <span class="chat__body__item__user">${manager} на связи 🤙</span>
    <span class="chat__body__item__text">Салют! Какой вопрос?</span>
    <i class="chat__body__item__time">${timeNow}</i>
    </div>
    </div>
    <div class="chat__input">
        <div class="chat__input__message">
            <textarea rows="1" wrap="on" type="text" class="chat__main__input" aria-label="Напишите сообщение" placeholder="Напишите сообщение" required ></textarea>
        </div>
        <img class="chat__input__submit" src="${Icon}" alt="Отправить" />
    </div>
    
    </div>`;


class TelegaChat {
  open() {

    this.getIp()

    if (window.innerWidth < 768) $("body").classList.add('overflow__hidden')

    if (!$(".chat__wrap")) $("body").insertAdjacentHTML("afterbegin", tpl);

    let store = localStorage.getItem("historyMessages");

    if (store !== null) {
      $(".chat__body").innerHTML = store;
    }

    $(".chat__main__input").onkeypress = (e) => {
      if (e.key === `Enter`) this.submit();
      if (e.target.value !== '') $(".chat__main__input").classList.remove('validate__error')
    };

    $(".chat__input__submit").onclick = () => this.submit();

    $(".chat__close").onclick = () => this.close()

    $(".chat__body").scrollTop = 100000;

    $(".chat__wrap").classList.add("open");

    setTimeout(() => {
      $('.chat__main__input').focus()
    }, 1000);


    axios.get(`https://api.telegram.org/bot${token}/getupdates`)
    .then((r) => {
      lastMessId = r.data.result[r.data.result.length - 1].message.message_id;
      FirstMessId = lastMessId
    })

    this.deleteItem()
  }

  close() {
    clearInterval(Timer)
    $(".chat__wrap").classList.remove("open");
    if (window.innerWidth < 768) $("body").classList.remove('overflow__hidden')
  }

  deleteItem() {
    $$('.chat__body__item').forEach(el => {
      if (el.querySelector('.chat__body__item__delete')) el.querySelector('.chat__body__item__delete').onclick = () => {
        el.remove()
        localStorage.setItem("historyMessages", $(".chat__body").innerHTML);
      }
    });
  }

getIp() {
  axios.get(`https://servicebox35.pp.ru/get-ip`)
    .then(r => {
      if (r.data && r.data.ip) {
        idStart = r.data.ip; // Теперь получаем правильный IP-адрес
      } else {
        console.error("Не удалось получить IP");
      }
    })
    .catch(error => {
      console.error("Ошибка при получении IP:", error);
    });
}
  submit() {
    timeNow = new Date().toLocaleTimeString();
    let val = $(".chat__main__input").value;
    if (val !== ``) {
      $('.chat__main__input').classList.remove('validate__error')
      let tplItemClient = `<div class="chat__body__item chat__body__item__client">
          <div class="btm__close chat__body__item__delete cards__theme">×</div>
          <img class="chat__body__item__user__icon cards__theme" src="${userIcon}" alt="аватарка user">
        <span class="chat__body__item__user">Вы</span>
        <span class="chat__body__item__text">${val}</span>
        <i class="chat__body__item__time">${timeNow}</i></div>`;

      $(".chat__body").innerHTML += tplItemClient;

      $(".chat__body").scrollTop = 100000;

      axios.get(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=USER:${idStart}
            ${val}`
      );

      //soundPush("/sound/set-whatsapp.mp3");
      localStorage.setItem("historyMessages", $(".chat__body").innerHTML);
      setTimeout(() =>$(".chat__main__input").value = ``.trim(), 0);
    
    } else {
      alert(`Введите текст`)
    }

    this.deleteItem()
    this.startUpdate()

    $(".chat__main__input").value = ``

  }

  startUpdate(){
    Timer = setInterval(() => this.checkResponse(), 3000);
  }

  stopUpdate(){
    clearInterval(Timer)
  }

  checkResponse() {
    count++
    if (count > 120 && lastMessId === FirstMessId) this.stopUpdate()

    axios
      .get(`https://api.telegram.org/bot${token}/getupdates`)
      .then((r) => {

        let resLastMess = r.data.result[r.data.result.length - 1].message
        if (resLastMess.reply_to_message !== undefined) checkReply = resLastMess.reply_to_message.text.includes(idStart)
        else checkReply = false

        newMessId = resLastMess.message_id;

        // console.log(FirstMessId, lastMessId , newMessId, checkReply);

        if (newMessId > lastMessId && checkReply) {

          // console.log(1);

          $(".chat__wrap").classList.add("open");

          let Text = r.data.result[r.data.result.length - 1].message.text;

          let tplItemMenager = `<div class="chat__body__item chat__body__item__manager">
              <div class="btm__close chat__body__item__delete cards__theme">×</div>
              <img class="chat__body__item__user__icon cards__theme" src="${managerIcon}" alt="аватарка менеджера">
              <span class="chat__body__item__user">${manager}</span>
                <span class="chat__body__item__text">${Text}</span>
                <i class="chat__body__item__time">${timeNow}</i></div>`;

          $(".chat__body").innerHTML += tplItemMenager;

          this.deleteItem()

          // soundPush("/sound/get-whatsapp.mp3");

          localStorage.setItem("historyMessages", $(".chat__body").innerHTML);

          $(".chat__body").scrollTop = 100000;

          lastMessId = newMessId

        }
      })
  }
}


// Если нужно отправлять сообщения повторно 
if (localStorage.getItem("historyMessages")) {
  axios.get(`https://api.telegram.org/bot${token}/getupdates`)
    .then((r) => {
      lastMessId = r.data.result[r.data.result.length - 1].message.message_id;
      FirstMessId = lastMessId
      //localStorage.setItem("historyMessages", $(".chat__body").innerHTML);
    })
  new TelegaChat().open()
    $(".chat__wrap").classList.remove("open");
  new TelegaChat().startUpdate()
}


export default Chat;