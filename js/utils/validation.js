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

const registerValidationHandlers = (formElement, onInputHandler, onInvalidHandler) => {
  formElement.addEventListener('input', onInputHandler);
  formElement.addEventListener('invalid', onInvalidHandler);
};

const unregisterValidationHandlers = (formElement, onInputHandler, onInvalidHandler) => {
  formElement.removeEventListener('input', onInputHandler);
  formElement.removeEventListener('invalid', onInvalidHandler);
};


export {
  createValidationHandlers,
  registerValidationHandlers,
  unregisterValidationHandlers
};
