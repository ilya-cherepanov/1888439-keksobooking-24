const makeRequest = async (url, parameters = {}) => {
  const response = await fetch(url, parameters);

  if (!response.ok) {
    throw new Error();
  }

  return response;
};

const loadJsonData = async (url) => {
  const response = await makeRequest(url);

  return response.json();
};

const sendFormData = async (url, formData) => {
  await makeRequest(url, {
    method: 'POST',
    body: formData,
  });
};

export {
  loadJsonData,
  sendFormData
};
