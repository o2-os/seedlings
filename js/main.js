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

async function handlePlay(fileName) {
    const status = document.getElementById('statusMessage');
    const player = document.getElementById('globalPlayer');
    status.innerText = "Requesting secure link...";

    try {
        // Use your full function URL here
        const funcUrl = "https://faas-nyc1-2ef2e6cc.doserverless.co";
        
        const response = await fetch(`${funcUrl}?fileName=${encodeURIComponent(fileName)}`);
        const data = await response.json();

        if (data.url) {
            status.innerText = ""; // Clear errors
            player.src = data.url;
            player.play();
            console.log("Success! Secure URL received.");
        } else {
            // This captures errors from your index.js 'catch' block
            status.innerText = "Error from Bouncer: " + (data.error || "Unknown error");
            console.error("Bouncer Error:", data);
        }
    } catch (err) {
        status.innerText = "Network Error: Could not reach the Bouncer.";
        console.error("Fetch Error:", err);
    }
}
