const createValidationHandlers = (printValidity) => {

  const onInputHandler = ({ target }) => {
    printValidity(target);
    target.reportValidity();
  };

  const onInvalidHandler = ({ target }) => {
    printValidity(target);
  };

  return { onInputHandler, onInvalidHandler };
};

const setInputHandler = (formElement, onInputHandler, handlerAddition = true) => {
  formElement[handlerAddition ? 'addEventListener' : 'removeEventListener']('input', onInputHandler);
};

const setValidationHandlers = (formElement, onInputHandler, onInvalidHandler, handlerAddition = true) => {
  setInputHandler(formElement, onInputHandler, handlerAddition);
  formElement[handlerAddition ? 'addEventListener' : 'removeEventListener']('invalid', onInvalidHandler);
};


export {
  createValidationHandlers,
  setInputHandler,
  setValidationHandlers
};
