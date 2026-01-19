function createDots(value, max = 5) {
  // создаём пустую строку, куда будем добавлять кружки
  let dotsHtml = '';

  for (let i = 1; i <= max; i++) {
    if (i <= value) {
      dotsHtml += '<span class="dot dot-colored"></span>'; //кружок закрашиваем
    } else {
      dotsHtml += '<span class="dot"></span>'; // пустой кружок
    }
  }

  return dotsHtml;
}

export { createDots };
