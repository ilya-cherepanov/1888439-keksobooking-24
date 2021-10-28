const createValidationHandlers = (printValidity) => {

  const onInputHandler = ({ target: targetElement }) => {
    printValidity(targetElement);
    targetElement.reportValidity();
  };

  const onInvalidHandler = ({ target: targetElement }) => {
    printValidity(targetElement);
  };

  return { onInputHandler, onInvalidHandler };
};

const setValidationHandlers = (formElement, onInputHandler, onInvalidHandler, handlerAddition = true) => {
  formElement[handlerAddition ? 'addEventListener' : 'removeEventListener']('input', onInputHandler);
  formElement[handlerAddition ? 'addEventListener' : 'removeEventListener']('invalid', onInvalidHandler);
};


export {
  createValidationHandlers,
  setValidationHandlers
};
