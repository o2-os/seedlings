class ShopItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 400px;
          margin: 0 auto 4rem auto; /* Added more bottom margin for scrolling */
        }
        /* The container is now a link */
        .container {
          display: flex;
          flex-direction: column;
          text-decoration: none; /* Removes underline from title */
          color: inherit;        /* Keeps your text color */
          cursor: pointer;
        }
        .image-wrapper {
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background-color: #f0f0f0;
          margin-bottom: 1.2rem;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .container:hover img {
          transform: scale(1.05);
        }
        .details { text-align: center; }
        h2 { margin: 0; font-size: 1.2rem; font-weight: 500; }
        p { margin: 6px 0 0; color: #666; font-size: 1rem; }
      </style>
      
      <!-- Wrap everything in a link tag -->
      <a id="item-link" class="container">
        <div class="image-wrapper">
          <img id="item-img" src="" alt="Product Image">
        </div>
        <div class="details">
          <h2 id="name"></h2>
          <p id="bio"></p>
        </div>
      </a>
    `;
  }

  static get observedAttributes() {
    return ['name', 'bio', 'img', 'url']; // Added 'url'
  }

   attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadowRoot) return;

    if (name === 'url') {
      const link = this.shadowRoot.getElementById('item-link');
      if (link) link.href = newValue;
    } else if (name === 'img') {
      const img = this.shadowRoot.getElementById('item-img');
      if (img) img.src = newValue;
    } else if (name === 'name' || name === 'bio') {
      const el = this.shadowRoot.getElementById(name);
      if (el) el.innerText = newValue;
    }
  }
}
customElements.define('shop-item', ShopItem);
