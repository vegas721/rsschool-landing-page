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
});


//switcher category
const menuCoffee = document.querySelector('.menu-switch.coffee');
const menuTea = document.querySelector('.menu-switch.tea');
const menuDessert = document.querySelector('.menu-switch.dessert');
const menuCardsCoffee = document.querySelector('.menu-cards.coffee');
const menuCardsTea = document.querySelector('.menu-cards.tea');
const menuCardsDessert = document.querySelector('.menu-cards.dessert');
console.log(menuCardsTea);


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
    switchCategory(menuCardsTea, menuCardsCoffee, menuCardsDessert);
})

menuDessert.addEventListener('click', () => {
    switchCategory(menuDessert, menuCoffee, menuTea);
    switchCategory(menuCardsDessert, menuCardsCoffee, menuCardsTea);
})

menuCoffee.addEventListener('click', () => {
    switchCategory(menuCoffee, menuDessert, menuTea);
    switchCategory(menuCardsCoffee, menuCardsDessert, menuCardsTea);
})