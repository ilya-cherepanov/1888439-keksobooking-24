import { copyTemplate } from './utils/dom.js';
import { setListener } from './forms/utils.js';


const isEscKey = (evt) => evt.keyCode === 27;

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
  if (type === 'error') {
    messageElement.querySelector('.error__button').addEventListener('click', onClickCloseButtonHandler);
  }

  document.body.append(messageElement);
};


export { showMessage };
