import { products } from './products.js';
import './components/ShopItem.js'; // Ensure the component is registered

const shopGrid = document.getElementById('shop-grid');

if (shopGrid) { // Only run this if the element actually exists on the current page
    products.forEach(item => {
      const card = document.createElement('shop-item');
      card.setAttribute('name', item.name);
      card.setAttribute('bio', item.price);
      card.setAttribute('img', item.img);
      card.setAttribute('url', `product.html?id=${item.id}`);
      shopGrid.appendChild(card);
    });
}

async function handlePlay(fileName) {
    const status = document.getElementById('statusMessage');
    const player = document.getElementById('globalPlayer');
    status.innerText = "Requesting secure link...";

    try {
        // Use your full function URL here
        const funcUrl = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-fa14d4b3-aac1-4753-98dc-a13f0c4e721d/default/library-connect";
        
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

window.handlePlay = handlePlay;
