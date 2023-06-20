import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const elements = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

elements.select.hidden = true;
elements.error.hidden = true;
elements.loader.hidden = false;
fetchBreeds()
  .then(data => {
    elements.select.innerHTML = createList(data);
    new SlimSelect({
      select: 'select',
    });
  })
  .catch(error => {
    elements.error.hidden = false;
    Notiflix.Report.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {
    elements.select.hidden = false;
    elements.loader.hidden = true;
  });

function createList(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

elements.select.addEventListener('change', handlerSelect);

function handlerSelect(evt) {
  const userSelect = evt.target.value;
  elements.catInfo.hidden = true;
  elements.loader.hidden = false;
  fetchCatByBreed(userSelect)
    .then(info => {
      console.log(info);
      elements.catInfo.innerHTML = createCatInfo(info);
    })
    .catch(error => {
      elements.error.hidden = false;
      Notiflix.Report.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      elements.catInfo.hidden = false;
      elements.loader.hidden = true;
    });
}

function createCatInfo(catDesc) {
  return catDesc
    .map(({ url, breeds }) => {
      const { name, description, temperament } = breeds[0];
      return `<img src="${url}" alt="${name}" width = 400>
    <div><h2>${name}</h2>
    <p>${description}</p>
    <p><b>Temperament: </b>${temperament}</p></div>`;
    })
    .join('');
}
