import { products } from './products.js';
import { posts } from './posts.js';
import './components/ShopItem.js';

// --- SHOP GRID ---
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

// --- FEED ---
const feedContainer = document.getElementById('feed-container');
if (feedContainer) {

    function formatDate(dateStr) {
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    const sorted = [...posts].reverse(); // newest first

    if (sorted.length === 0) {
        feedContainer.innerHTML = '<p style="color:#aaa; text-align:center;">Nothing posted yet.</p>';
    }

    sorted.forEach(post => {
        const el = document.createElement('div');
        el.className = 'post';

        let html = `
            <div class="post-date">${formatDate(post.date)}</div>
            <h2 class="post-title">${post.title}</h2>
        `;

        if (post.img) {
            html += `<img class="post-img" src="${post.img}" alt="${post.title}">`;
        }

        if (post.body) {
            html += `<p class="post-body">${post.body}</p>`;
        }

        if (post.linkUrl) {
            html += `<a id="playPauseBtn" class="post-link" href="${post.linkUrl}">${post.linkText || 'View'} →</a>`;
        }

        el.innerHTML = html;
        feedContainer.appendChild(el);
    });
}

// --- PLAYER ---
const player = document.getElementById('globalPlayer');
const nowPlayingTitle = document.getElementById('nowPlayingTitle');
const playBtn = document.getElementById('playPauseBtn');
const seekSlider = document.getElementById('seekSlider');
const funcUrl = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-fa14d4b3-aac1-4753-98dc-a13f0c4e721d/default/library-connect";

async function queueTrack(fileName) {
    if (nowPlayingTitle) nowPlayingTitle.innerText = `Loading ${fileName}...`;

    try {
        const response = await fetch(`${funcUrl}?fileName=${encodeURIComponent(fileName)}`);
        const data = await response.json();

        if (data.url) {
            player.src = data.url;
            player.play();

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

function togglePlay() {
    if (player.paused) {
        player.play();
        playBtn.innerText = "Pause";
    } else {
        player.pause();
        playBtn.innerText = "Play";
    }
}

if (player && seekSlider) {
    player.ontimeupdate = () => {
        const progress = (player.currentTime / player.duration) * 100;
        seekSlider.value = progress || 0;
    };

    seekSlider.oninput = () => {
        const time = (seekSlider.value / 100) * player.duration;
        player.currentTime = time;
    };
}

if (player) {
    player.addEventListener('error', (event) => {
        console.error("Audio player error:", event.target.error.code);
        if (nowPlayingTitle) nowPlayingTitle.innerText = "Playback error.";
    });
}

window.queueTrack = queueTrack;
window.togglePlay = togglePlay;
