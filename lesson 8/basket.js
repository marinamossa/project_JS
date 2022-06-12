"use strict"

const basket = document.querySelector('.basket');
const basketCounter = document.querySelector('.cartIconWrap span');
const basketTotalValue = document.querySelector('.basketTotalValue');
const basketTotal = document.querySelector('.basketTotal');

const basketStorage = {};//хранилище товаров в корзине

//ф-ция показать корзину по клику
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basket.classList.toggle('hidden');
});

//ф-ция считывания товара по клику на значок добавить
document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const featuredItem = event.target.closest('.featuredItem');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCart(id, name, price);
});
//ф-ция добавления товаров в корзину
function addToCart(id, name, price) {
    if (!(id in basketStorage)) {
        basketStorage[id] = {
            id: id,
            name: name,
            price: price,
            count: 0,
        };
    }
    basketStorage[id].count++;
    basketCounter.textContent = getTotalBasketCount();
    basketTotalValue.textContent = getTotalBasketPrice().toFixed(2);
    renderBasketProductList(id);
}

//ф-ция считает общее кол-во товаров
function getTotalBasketCount() {
    const productsArray = Object.values(basketStorage);
    let count = 0;
    for (const product of productsArray) {
        count += product.count;
    }
    return count;
}
//ф-ция считает общую стоимость товаров
function getTotalBasketPrice() {
    return Object.values(basketStorage)
        .reduce((acc, product) => acc + product.count * product.price, 0)
}
//ф-ция отображает список товаров в корзине
function renderBasketProductList(id) {
    const basketRow = basket.querySelector(`.basketRow[data-id="${id}"]`);
    if (!basketRow) {
        renderNewProductinBasket(id);
        return;
    }
    basketRow.querySelector('.productCount')
        .textContent = basketStorage[id].count;
    basketRow.querySelector('.productTotalRow')
        .textContent = basketStorage[id].count * basketStorage[id].price;
}

//ф-ция добавляет к отображению новый товар в корзине
function renderNewProductinBasket(productId) {
    const productRow = `
    <div class="basketRow" data-id="${productId}">
    <div>${basketStorage[productId].name}</div>
    <div>
      <span class="productCount">${basketStorage[productId].count}</span> шт.
    </div>
    <div>$${basketStorage[productId].price}</div>
    <div>
      $<span class="productTotalRow">${(basketStorage[productId].price * basketStorage[productId].count).toFixed(2)}</span>
    </div>
  </div>
  `;
    basketTotal.insertAdjacentHTML("beforebegin", productRow);
}