import { copyTemplate } from './utils/dom.js';
import { setListener } from './forms/utils.js';

const ESC_KEY_CODE = 27;

const MessageType = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const isEscKey = (evt) => evt.keyCode === ESC_KEY_CODE;

const closeMessages = () => {
  const messageElements = document.querySelectorAll('body > .success, body > .error');
  messageElements.forEach((messageElement) => messageElement.remove());
};

const onDocumentEscKeyHandler = (evt) => {
  if (!isEscKey(evt)) {
    return;
  }

  closeMessages();
  setCloseHandling(false);
};

const onDocumentClickHandler = () => {
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
  setListener(document, 'keydown', onDocumentEscKeyHandler, enabled);
  setListener(document, 'click', onDocumentClickHandler, enabled);
}

const showMessage = (type) => {
  const messageElement = copyTemplate(`#${type}`);

  setCloseHandling(true);
  if (type === MessageType.ERROR) {
    messageElement.querySelector('.error__button').addEventListener('click', onClickCloseButtonHandler);
  }

  document.body.append(messageElement);
};


export { showMessage, MessageType };
