import { products } from './products.js';
import './components/ShopItem.js'; 

const shopGrid = document.getElementById('shop-grid');
if (shopGrid) {
    products.forEach(item => {
      const card = document.createElement('shop-item');
      card.setAttribute('name', item.name);
      card.setAttribute('bio', item.price);
      card.setAttribute('img', item.img);
      card.setAttribute('url', `product.html?id=${item.id}`);
      shopGrid.appendChild(card);
    });
}

// --- NEW PLAYER CONSTANTS ---
const player = document.getElementById('globalPlayer');
const nowPlayingTitle = document.getElementById('nowPlayingTitle');
const playBtn = document.getElementById('playPauseBtn');
const seekSlider = document.getElementById('seekSlider');
const funcUrl = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-fa14d4b3-aac1-4753-98dc-a13f0c4e721d/default/library-connect";

// UPDATED: Fetches secure URL and updates the custom UI
async function queueTrack(fileName) {
    if (nowPlayingTitle) nowPlayingTitle.innerText = `Loading ${fileName}...`;
    
    try {
        const response = await fetch(`${funcUrl}?fileName=${encodeURIComponent(fileName)}`);
        const data = await response.json();

        if (data.url) {
            player.src = data.url;
            player.play(); 
            
            // UI Updates
            if (nowPlayingTitle) nowPlayingTitle.innerText = fileName;
            if (playBtn) {
                playBtn.disabled = false;
                playBtn.innerText = "Pause";
            }
            console.log("Player updated with secure stream.");
        } else {
            console.error("Bouncer error:", data.error);
            if (nowPlayingTitle) nowPlayingTitle.innerText = "Error loading track.";
        }
    } catch (err) {
        console.error("Connection error:", err);
        if (nowPlayingTitle) nowPlayingTitle.innerText = "Network error.";
    }
}

// --- NEW CUSTOM UI FUNCTIONS ---

// Toggles between play and pause states
function togglePlay() {
    if (player.paused) {
        player.play();
        playBtn.innerText = "Pause";
    } else {
        player.pause();
        playBtn.innerText = "Play";
    }
}

// Updates the slider as the song plays
if (player && seekSlider) {
    player.ontimeupdate = () => {
        const progress = (player.currentTime / player.duration) * 100;
        seekSlider.value = progress || 0;
    };

    // Allows user to drag the slider to change time
    seekSlider.oninput = () => {
        const time = (seekSlider.value / 100) * player.duration;
        player.currentTime = time;
    };
}

player.addEventListener('error', (event) => {
    console.error("Audio player error:", event.target.error.code);
    if (nowPlayingTitle) nowPlayingTitle.innerText = "Playback error.";
});

// EXPOSE TO HTML
window.queueTrack = queueTrack;
window.togglePlay = togglePlay;
