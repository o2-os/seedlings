{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const template = document.createElement('template');\
template.innerHTML = `\
  <style>\
    header \{\
      background: #333;\
      color: white;\
      padding: 1rem 2rem;\
      display: flex;\
      justify-content: space-between;\
      align-items: center;\
      font-family: sans-serif;\
    \}\
    nav ul \{\
      list-style: none;\
      display: flex;\
      gap: 20px;\
      margin: 0;\
      padding: 0;\
    \}\
    nav a \{\
      color: white;\
      text-decoration: none;\
      font-weight: bold;\
    \}\
    nav a:hover \{\
      text-underline-offset: 4px;\
      text-decoration: underline;\
    \}\
  </style>\
  <header>\
    <div class="logo">MyBrand</div>\
    <nav>\
      <ul>\
        <li><a href="index.html">Home</a></li>\
        <li><a href="about.html">About</a></li>\
        <li><a href="contact.html">Contact</a></li>\
      </ul>\
    </nav>\
  </header>\
`;\
\
class MainHeader extends HTMLElement \{\
  constructor() \{\
    super();\
    // Create a Shadow Root\
    this.attachShadow(\{ mode: 'open' \});\
    // Append the template content\
    this.shadowRoot.appendChild(template.content.cloneNode(true));\
  \}\
\}\
\
// Define the custom element\
customElements.define('main-header', MainHeader);\
}