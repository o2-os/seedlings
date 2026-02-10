import { products } from './products.js';
import './components/ShopItem.js'; // Ensure the component is registered

const shopGrid = document.getElementById('shop-grid');

// Loop through every item in your JS file
products.forEach(item => {
  // Create the element
  const card = document.createElement('shop-item');
  
  // Set the attributes from the data
  card.setAttribute('name', item.name);
  card.setAttribute('bio', item.price);
  card.setAttribute('img', item.img);
  card.setAttribute('url', `product.html?id=${item.id}`);

  // Toss it into the page
  shopGrid.appendChild(card);
});
