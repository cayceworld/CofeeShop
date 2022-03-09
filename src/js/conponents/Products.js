import {templates, select } from '../settings.js';

class Products {
  constructor(id, data) {
    const thisProduct = this;

    thisProduct.id = id;
    thisProduct.data = data;
    thisProduct.renderPage();
  }

  renderPage() {
    const thisProduct = this;

    const utils = {};
    utils.createDOMFromHTML = function (htmlString) {
      let div = document.createElement('div');
      div.innerHTML = htmlString.trim();
      return div.firstChild;
    };

    const menuContainer = document.querySelectorAll(select.containerOf.products);

    for (let current of menuContainer) {
      const generateHTML = templates.productsPage(thisProduct.data);
      thisProduct.element = utils.createDOMFromHTML(generateHTML);
      current.appendChild(thisProduct.element);
    }
  }
}
export default Products; 