// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const getSavedCartItems = require("./helpers/getSavedCartItems");
// const saveCartItems = require("./helpers/saveCartItems");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const { interfaces } = require("mocha");

// const { fetchItem } = require("./helpers/fetchItem");

// const { fetchProducts } = require("./helpers/fetchProducts");

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const saveStorage = (valor) => {
  const data = JSON.parse(getSavedCartItems());
  if (data) {
    data.push(valor);
    saveCartItems(data);
  } else {
    saveCartItems([valor]);
  }
};
const clearStorage = (sto) => {
  const storage = JSON.parse(getSavedCartItems(sto));
  const storageIndex = storage.findIndex((a) => a.id === sto);
  storage.splice(storageIndex, 1);
  saveCartItems(storage);
};
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const cartItemClickListener = ({ target }, id) => {
  target.remove();
  clearStorage(id);
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, id));
  return li;
};

const carregar = async () => {
  const eve = await fetchProducts('computador');
  const objItems = document.querySelector('.items');
  eve.results.forEach((a) => {
    objItems.appendChild(createProductItemElement(a));
  });
};
const clickItems = document.querySelector('.cart__items');

const randomClickEvent = async (elem) => {
  const data = await fetchItem(elem);
  clickItems.appendChild(createCartItemElement(data));
  saveStorage(data);
};

const addItems = (buttons) => {
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
    randomClickEvent(event.target.parentNode.firstChild.innerHTML);
    });
  });
};
const clearBTN = () => {
 const itemsLimpar = document.querySelector('.cart__items');
  itemsLimpar.innerHTML = '';
  localStorage.removeItem('cartItems');
};

const limparCarrinho = () => {
  const carrinhoBTN = document.querySelector('.empty-cart');
 carrinhoBTN.addEventListener('click', clearBTN);
};
const storageIF = () => {
  const da1 = JSON.parse(getSavedCartItems());
  if (da1) {
    da1.forEach((a) => {
      clickItems.appendChild(createCartItemElement(a));
    });
  } 
};

window.onload = async () => {
  await carregar();
  const butItems = document.querySelectorAll('.item__add');
  addItems(butItems);
  limparCarrinho();
  storageIF();
};
