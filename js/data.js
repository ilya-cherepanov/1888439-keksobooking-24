const loadData = async () => {
  const response = await fetch('https://24.javascript.pages.academy/keksobooking/data');

  if (response.status !== 200) {
    throw new Error();
  }

  return await response.json();
};

const sendData = async (url, formData) => {
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (response.status !== 200) {
    throw new Error();
  }
};

export {
  loadData,
  sendData
};
