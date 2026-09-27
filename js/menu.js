//theme-switch
const themeSwitcherDark = document.querySelector('.theme-dark--btn');
const themeSwitcherLight = document.querySelector('.theme-light--btn');
var theme;

themeSwitcherDark.classList.add('no-active');

if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('theme-dark');
    themeSwitcherLight.classList.add('no-active');
    themeSwitcherDark.classList.remove('no-active');
}

themeSwitcherDark.addEventListener('click', () => {
    document.documentElement.classList.add('theme-dark');
    themeSwitcherDark.classList.remove('no-active');
    themeSwitcherLight.classList.add('no-active');
    /*if (document.documentElement.classList.contains('theme-dark')) {
        theme = 'dark';
    } else {
        theme = 'light'
    }*/
    localStorage.setItem('theme', 'dark');
    localStorage.removeItem('hoverdark', 'yes');
    localStorage.setItem('hoverlight', 'yes');
    }
)

themeSwitcherLight.addEventListener('click', () => {
    document.documentElement.classList.remove('theme-dark');
    themeSwitcherLight.classList.remove('no-active');
    themeSwitcherDark.classList.add('no-active');
    localStorage.removeItem('theme', 'dark');
    localStorage.removeItem('hoverlight', 'yes');
    localStorage.setItem('hoverdark', 'yes');
    }
)


//burger menu
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');
const elementMenu = document.querySelector('.nav-list');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
})

navMenu.addEventListener('click', (even) => {
    if (even.target.classList.contains('nav-item') || even.target.classList.contains('nav-link')) {
        burgerMenu.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('open')) {
        burgerMenu.classList.toggle('open');
        navMenu.classList.toggle('open');
    }
})


//switcher category and create data cards
const menuCoffee = document.querySelector('.menu-switch.coffee');
const menuTea = document.querySelector('.menu-switch.tea');
const menuDessert = document.querySelector('.menu-switch.dessert');
const menuSwitch = document.querySelectorAll('.menu-switch');
const menuCards = document.querySelector('.menu-cards');
//const menuCardsCoffee = document.querySelector('.menu-cards.coffee');
//const menuCardsTea = document.querySelector('.menu-cards.tea');
//const menuCardsDessert = document.querySelector('.menu-cards.dessert');
let cardCategory = 'tea';

async function loadProducts() {
  try {
    const response = await fetch('./products.json');
    const products = await response.json();
    console.log(products);

    createCard(products);
  } catch (error) {
    console.error(error);
  }
}

function createCard(products) {
  menuCards.innerHTML = '';

  //if (menuSwitch.classList.contains('active') && menuSwitch.classList.contains(''))

    /*if (menuSwitch.classList.contains('coffee')) {
        cardCategory = 'coffee';
    } else if (menuSwitch.classList.contains('tea')) {
        cardCategory = 'tea';
    } else if (menuSwitch.classList.contains('dessert')) {
        cardCategory = 'dessert';
    }*/

    menuSwitch.forEach(cat => {
    if (cat.classList.contains('coffee') && cat.classList.contains('active')) {
        cardCategory = 'coffee';
    } else if (cat.classList.contains('tea') && cat.classList.contains('active')) {
        cardCategory = 'tea';
    } else if (cat.classList.contains('dessert') && cat.classList.contains('active')) {
        cardCategory = 'dessert';
    }
    })

  products.forEach(product => {
    
    if (product.category === cardCategory) {
        const card = document.createElement('button');
        card.classList.add('menu-cards--box');

        card.innerHTML = `
            <div class="menu-cards--box_img">
            <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="menu-cards--box_info">
            <p class="menu-cards--box_title">${product.name}</p>
            <p class="menu-cards--box_text">${product.description}</p>
            <p class="menu-cards--box_price">$${product.price}</p>
            </div>
        `;

        menuCards.appendChild(card);
    }
    
  });
}

loadProducts();

function switchCategory(tab1, tab2, tab3) {
    tab1.classList.remove('no-active');
    tab1.classList.add('active');
    tab2.classList.remove('active');
    tab2.classList.add('no-active');
    tab3.classList.remove('active');
    tab3.classList.add('no-active');
}

menuTea.addEventListener('click', () => {
    switchCategory(menuTea, menuCoffee, menuDessert);
    loadProducts();
    //switchCategory(menuCardsTea, menuCardsCoffee, menuCardsDessert);
})

menuDessert.addEventListener('click', () => {
    switchCategory(menuDessert, menuCoffee, menuTea);
    loadProducts();
    //switchCategory(menuCardsDessert, menuCardsCoffee, menuCardsTea);
})

menuCoffee.addEventListener('click', () => {
    switchCategory(menuCoffee, menuDessert, menuTea);
    loadProducts();
    //switchCategory(menuCardsCoffee, menuCardsDessert, menuCardsTea);
})







//module window
const popup = document.querySelector('.pop-up');
const cardBtn = document.querySelector('.menu-cards--box');
const popupClose = document.querySelector('.pop-up--close');

/*cardBtn.addEventListener('click', () => {
    popup.classList.toggle('hidden');
})*/

popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('pop-up')) {
        popup.classList.toggle('hidden');
    }
})

popupClose.addEventListener('click', () => {
    popup.classList.toggle('hidden');
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        popup.classList.add('hidden');
    }
})