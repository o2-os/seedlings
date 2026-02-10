// components/ShopItem.js
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
          margin: 0 auto 3rem auto; /* Centers the component itself and adds bottom spacing */
        }
        .container {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
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
        .details {
          text-align: center; /* Centered text under the picture */
        }
        h2 { 
          margin: 0; 
          font-size: 1.2rem; 
          font-weight: 500; 
          letter-spacing: 0.5px;
          color: #333;
        }
        p { 
          margin: 6px 0 0; 
          color: #666; 
          font-size: 1rem; 
        }
      </style>
      <div class="container">
        <div class="image-wrapper">
          <img id="item-img" src="" alt="Product Image">
        </div>
        <div class="details">
          <h2 id="name"></h2>
          <p id="bio"></p>
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['name', 'bio', 'img'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const el = this.shadowRoot.getElementById(name === 'img' ? 'item-img' : name);
    if (el) {
      if (name === 'img') {
        el.src = newValue;
      } else {
        el.innerText = newValue;
      }
    }
  }
}

customElements.define('shop-item', ShopItem);
