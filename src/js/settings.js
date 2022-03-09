export const select = {
  templateOf: {
    homePage: '#template-home-page',
    productsPage: '#template-products-page',
    contactPage: '#template-contact-page'
  },
  containerOf: {
    pages: '#pages',
    products: '.product-boxes',
  },
  nav:{
    links: '.menu__list li a'
  }
};

export const classNames = {
  pages: {
    active: 'active',
  }
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    products: 'products',
  },

};
export const templates = {
  productsPage: Handlebars.compile(document.querySelector(select.templateOf.productsPage).innerHTML)
};