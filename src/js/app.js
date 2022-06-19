import { select, settings, classNames } from './settings.js';
import Products from './conponents/Products.js';

const app = {

  initMenu: function () {
    const thisApp = this;

    for (let productData in thisApp.data.products) {
      new Products(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }

  },

  initData: function () {
    const thisApp = this;

    const url = settings.db.url + '/' + settings.db.products;
    thisApp.data = {};
    fetch(url)
      .then((rawResponse) => {
        return rawResponse.json();

      })
      .then((parsedResponse) => {
        thisApp.data.products = parsedResponse;
        thisApp.initMenu();
      });
  },

  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);
    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {

        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#/' + id;

        /* scroll window */

        const home = document.getElementById('about');

        if (link.classList.contains('home')) {
          home.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({
            top: 580,
            behavior: 'smooth',
          });
        }



        /* close menu on click */
        document.body.classList.remove('_lock');
        thisApp.menuBody.classList.remove('_active');
        thisApp.burgerMenu.classList.remove('_active');

      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.pages.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initBurger() {
    const thisApp = this;

    thisApp.burgerMenu = document.querySelector('.menu__icon');


    thisApp.menuBody = document.querySelector('.main-nav');

    thisApp.burgerMenu.addEventListener('click', function () {
      document.body.classList.toggle('_lock');
      thisApp.menuBody.classList.toggle('_active');
      thisApp.burgerMenu.classList.toggle('_active');

    });

  },

  flickitySlider() {
    var elem = document.querySelector('.main-carousel');
    //eslint-disable-next-line
    var flkty = new Flickity(elem, {
      // options
      cellAlign: 'center',
      autoPlay: true,
      prevNextButtons: false,

    });
    


  },

  init: function () {
    const thisApp = this;
    thisApp.initData();
    thisApp.initPages();
    thisApp.initBurger();
    thisApp.flickitySlider();
  },
};

app.init();