const copyTemplate = (templateId) => (
  document.querySelector(`${templateId}`)
    .content
    .firstElementChild
    .cloneNode(true)
);


export { copyTemplate };
