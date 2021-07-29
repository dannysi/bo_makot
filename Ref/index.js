import './style.scss';
import {my_debounce} from './helpers';

const INTERVAL = 8000;
const MYSELF_USERNAME = 'Me';


const {Chat} = window;
const form = document.querySelector('.controls');
const input = document.querySelector('input');
const messages = document.querySelector('.messages');
const typingElement = document.querySelector('.typing');

let lastUser;
const usersToCB = {};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const content = input.value;
  input.value = '';
  Chat.sendMessage(content)
});

Chat.onMessage(msg => {
  createMessageCard(msg);
})

const renderTyping = () => {
  const users = Object.keys(usersToCB)
  const length = users.length;
  
  let text = '';
  let suffix = '';
  if(length === 0) {
    typingElement.innerHTML = '';
    return
  }
  if(length === 1){
    text = users[0];
    suffix = ' is typing';
  }
  else if(length === 2){
    text = users[0] + ' and ' + users[1];
    suffix = ' are typing';
  }
  else if(length > 2) {
    let rest = length - 2 == 1? 'other' : 'others'
    text = users[0] + ' and ' + users[1] + 'and ' + (length - 2) + ' ' + rest;
    suffix = ' are typing';

  }

  typingElement.innerHTML = text + suffix +'...';
}

const removeFromTyping = (user) => {
  if(usersToCB[user]){
    delete usersToCB[user];
  }
  renderTyping();
}

Chat.onTyping(user => {
  usersToCB[user] = my_debounce(() => removeFromTyping(user), INTERVAL);
  usersToCB[user]();
  renderTyping();
});

const isMe = (msg) => msg.user === MYSELF_USERNAME

const getMessageCls = (msg) => {
  const selfCls =  isMe(msg) ? 'self': '';
  const arrowCls = lastUser && lastUser == msg.user? '' : 'with-arrow';
  return ['message', selfCls, arrowCls].join(' ');
}

const getTimeFormatted = (msg) => {
  const d = new Date(msg.timestamp);
  return d.getHours()+':'+d.getMinutes();
}

const createMessageCard = (msg) => {
  const msgCls = getMessageCls(msg);
  lastUser = msg.user;

  let template = `
    <div class="${msgCls}">
      ${!isMe(msg)? `<div>${msg.user}</div>` : ``}
      <div>${msg.content}</div>
      <div class="time">${getTimeFormatted(msg)}</div>
    </div>
  `
  messages.innerHTML = messages.innerHTML + template;
  messages.lastChild && messages.lastElementChild.scrollIntoView(true);
}

