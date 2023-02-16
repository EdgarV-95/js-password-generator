let slider = document.querySelector('#slider');
slider.addEventListener('click', updateSlider);

function updateSlider() {
  return document
    .querySelector('.length__title')
    .setAttribute('data-length', slider.value);
}

function getSliderValue() {
  return document
    .querySelector('.length__title')
    .getAttribute('data-length');
}

document
  .querySelector('#generate')
  .addEventListener('click', () =>
    generatePassword(
      document
        .querySelector('.length__title')
        .getAttribute('data-length')
    )
  );

function generatePassword(passwordLength) {
  let upperBool = document.querySelector('#uppercase').checked;
  let lowerBool = document.querySelector('#lowercase').checked;
  let numberBool = document.querySelector('#number').checked;
  let symbolBool = document.querySelector('#symbol').checked;

  if (upperBool) upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  else upperChars = '';
  if (lowerBool) lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  else lowerChars = '';
  if (numberBool) numberChars = '0123456789';
  else numberChars = '';
  if (symbolBool) symbolChars = '!#$%&()*+-./:;<=>?@[]^_`{|}~';
  else symbolChars = '';

  let allChars = upperChars + lowerChars + numberChars + symbolChars;
  let randPasswordArray = Array(+passwordLength + 1);
  randPasswordArray[0] = upperChars;
  randPasswordArray[1] = lowerChars;
  randPasswordArray[2] = numberChars;
  randPasswordArray[3] = symbolChars;
  randPasswordArray = randPasswordArray.fill(allChars, 4);
  document.querySelector('#result').textContent = shuffleArray(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
  ).join('');
}

function shuffleArray(array) {
  for (let i = array.length + 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const copyContent = async () => {
  let text = document.querySelector('#result').textContent;
  try {
    await navigator.clipboard.writeText(text);
    alert('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
document
  .querySelector('#result')
  .addEventListener('click', copyContent);
