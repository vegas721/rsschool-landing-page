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