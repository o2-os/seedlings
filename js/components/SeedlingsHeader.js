const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* The :host selector styles the custom element itself (<main-header>) */
    :host {
      display: block;
      position: sticky; /* Keeps it at the top */
      top: 0;
      z-index: 1000;    /* Ensures it stays above other content */
    }

    header {
      background-color: white; /* Your requested background */
      color: #333;             /* Dark text for contrast against white */
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: sans-serif;
    }

    nav ul {
      list-style: none;
      display: flex;
      gap: 20px;
      margin: 0;
      padding: 0;
    }

    nav a {
      color: #333;
      text-decoration: none;
    }

    nav a:hover {
      text-decoration: underline;
    }
  </style>
  <header>
    <div class="logo">
      <a style="text-decoration: none; color: #333" href="./index.html">    <img src="images/seedlings.png" style="width: 7rem;" />

      </a>
      </div>
    <nav>
      <ul>
        <li><a href="#">Tapes</a></li>
        <li><a href="#">Mxz</a></li>
        <li><a href="https://datafruits.fm/shows/counterbalance">Radio</a></li>
        <li><a href="shop.html">Shop</a></li>
        <li><a href="https://www.discogs.com/seller/cb.r1919/profile">Discogs Store</a></li>
      </ul>
    </nav>
  </header>
`;

class SeedlingsHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('seedlings-header', SeedlingsHeader);
