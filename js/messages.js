import { copyTemplate } from './utils/dom.js';


const isEscKey = (evt) => evt.keyCode === 27;

const closeMessages = () => {
  const messageElements = document.querySelectorAll('body > .success, body > .error');
  messageElements.forEach((messageElement) => messageElement.remove());
};

const onEscHandler = (evt) => {
  if (!isEscKey(evt)) {
    return;
  }

  closeMessages();
  setCloseHandling(false);
};

const onClickHandler = () => {
  closeMessages();
  setCloseHandling(false);
};

const onClickCloseButtonHandler = (evt) => {
  closeMessages();
  setCloseHandling(false);
  evt.target.removeEventListener('click', onClickCloseButtonHandler);
};

// Нужен hoisting
function setCloseHandling(enabled){
  document[enabled ? 'addEventListener' : 'removeEventListener']('keydown', onEscHandler);
  document[enabled ? 'addEventListener' : 'removeEventListener']('click', onClickHandler);
}

const showMessage = (type) => {
  const messageElement = copyTemplate(`#${type}`);

  setCloseHandling(true);
  if (type === 'error') {
    messageElement.querySelector('.error__button').addEventListener('click', onClickCloseButtonHandler);
  }

  document.body.append(messageElement);
};


export { showMessage };
