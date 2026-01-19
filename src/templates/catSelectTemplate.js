const createCatSelectMarkup = arr => {
  return arr
    .map(cat => `<option value=${cat.id} > ${cat.name} </option>`)
    .join('');
};

export { createCatSelectMarkup };
