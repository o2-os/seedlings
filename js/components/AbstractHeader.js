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
      background-color: #f9f9f3; /* Your requested background */
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
    <div class="logo">abstract garden</div>
    <nav>
      <ul>
        <li><a href="https://spiralingpress.com">press</a></li>
        <li><a href="seedlings.html">music</a></li>
        <li><a href="shop.html">shop</a></li>
        <li><a href="https://www.ebay.com/usr/abstractvintage">vintage</a></li>
      </ul>
    </nav>
  </header>
`;

class MainHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('main-header', MainHeader);
