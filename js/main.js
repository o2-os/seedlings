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

const player = document.getElementById('globalPlayer');
const nowPlayingTitle = document.getElementById('nowPlayingTitle');
const funcUrl = "https://faas-nyc1-2ef2e6cc.doserverless.co";

// Function to fetch the secure URL and load it into the player
async function queueTrack(fileName) {
    nowPlayingTitle.innerText = `Loading ${fileName}...`;
    
    try {
        const response = await fetch(`${funcUrl}?fileName=${encodeURIComponent(fileName)}`);
        const data = await response.json();

        if (data.url) {
            player.src = data.url;
            player.play(); // Start playing immediately
            nowPlayingTitle.innerText = fileName; // Update UI with current track
            console.log("Player updated with secure stream.");
        } else {
            console.error("Bouncer error:", data.error);
            nowPlayingTitle.innerText = "Error loading track.";
        }
    } catch (err) {
        console.error("Connection error:", err);
        nowPlayingTitle.innerText = "Network error.";
    }
}

// Optional: Add event listeners for better UX
player.addEventListener('error', (event) => {
    console.error("Audio player error:", event.target.error.code);
    nowPlayingTitle.innerText = "Playback error.";
});

// Since we have a 'queue' system now, we don't use window.handlePlay anymore:
window.queueTrack = queueTrack; // Expose the new function globally

