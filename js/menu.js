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
let cardCategory = 'coffee';
//let productName = [];

async function loadProducts() {
  try {
    const response = await fetch('./products.json');
    const products = await response.json();
    console.log('json tab =',products);

    createCard(products);

  } catch (error) {
    console.error(error);
  }
}

function createCard(products, productName) {
    menuCards.innerHTML = '';

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

        card.addEventListener('click', () => {
            createModuleCard(products, product.name);
        })

        menuCards.appendChild(card);
    }
    
  });
}

loadProducts();

let cardBtn = document.querySelectorAll('.menu-cards--box');
console.log(cardBtn);

function switchCategory(tab1, tab2, tab3) {
    tab1.classList.remove('no-active');
    tab1.classList.add('active');
    tab2.classList.remove('active');
    tab2.classList.add('no-active');
    tab3.classList.remove('active');
    tab3.classList.add('no-active');
}

//module window
const popup = document.querySelector('.pop-up');

async function loadModuleProducts() {
  try {
    const response = await fetch('./products.json');
    const products = await response.json();
    console.log('json module =',products);

    createModuleCard(products);

  } catch (error) {
    console.error(error);
  }
}

function createModuleCard(products, productName) {
    popup.innerHTML = '';

    products.forEach(product => {

    if (product.name === productName) {
        popup.classList.toggle('hidden');
        const card = document.createElement('div');
        card.classList.add('pop-up--card');

        card.innerHTML = `
            <div class="pop-up--img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="pop-up--info">
                <div>
                    <p class="pop-up--title">${product.name}</p>
                    <p class="pop-up--text">${product.description}</p>
                </div>
                <div class="pop-up--size">
                    <p>Size</p>
                    <div class="pop-up--size_ml">
                        <button class="size-s active"><div>S</div><span>${product.sizes.s.size}</span></button>
                        <button class="size-m"><div>M</div><span>${product.sizes.m.size}</span></button>
                        <button class="size-l"><div>L</div><span>${product.sizes.l.size}</span></button>
                    </div>
                </div>
                <div class="pop-up--additives">
                    <p>Additives</p>
                    <div class="pop-up--additives_items">
                        <button class="sugar"><div>1</div><span>${product.additives[0].name}</span></button>
                        <button class="cinnamon"><div>2</div><span>${product.additives[1].name}</span></button>
                        <button class="syrup"><div>3</div><span>${product.additives[2].name}</span></button>
                    </div>
                </div>
                <div class="pop-up--price">
                    <p>Total:</p>
                    <p class="total-price">$${product.price}</p>
                </div>
                <div class="pop-up--note">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_147811_7961)">
    <path d="M8 7.66663V11" stroke="var(--menu-module-color)" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8 5.00667L8.00667 4.99926" stroke="var(--menu-module-color)" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  <defs>
    <clipPath id="clip0_147811_7961">
      <rect width="16" height="16" fill="white" />
    </clipPath>
  </defs>
                    </svg>
                    <p>The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
                </div>
                <button class="pop-up--close">Close</button>
            </div>
        `;

        popup.appendChild(card);
        document.body.classList.toggle('no-scroll');

        const sizeS = document.querySelector('.size-s');
        const sizeM = document.querySelector('.size-m');
        const sizeL = document.querySelector('.size-l');
        const addSugar = document.querySelector('.sugar');
        const addCinnamon = document.querySelector('.cinnamon');
        const addSyrup = document.querySelector('.syrup');

        const totalPrice = document.querySelector('.total-price');

        function switchSizes(size1, size2, size3) {
            size1.classList.add('active');
            size2.classList.remove('active');
            size3.classList.remove('active');
        }

        /*function addAdditives(item1, item2, item3) {
            item1.classList.toggle('active');
            item2.classList.toggle('active');
            item3.classList.toggle('active');
        }*/


        const priceProduct = +product.price;
        const priceS = +product.sizes.s.price;
        const priceM = +product.sizes.m.price;
        const priceL = +product.sizes.l.price;
        const priceSugar = +product.additives[0].price;
        const priceCinnamon = +product.additives[1].price;
        const priceSyrup = +product.additives[2].price;
        //let priceTotal = 0;
        //let currentPrice = 0;

        function calcPrice(priceItem, priceSize, priceAdd1, priceAdd2, priceAdd3) {
            let priceTotal = priceItem + priceSize;
            if (addSugar.classList.contains('active')) {
                priceTotal += priceAdd1;
            }
            if (addCinnamon.classList.contains('active')) {
                priceTotal += priceAdd2;
            }
            if (addSyrup.classList.contains('active')) {
                priceTotal += priceAdd3;
            }
            return priceTotal.toFixed(2);
        }

        addSugar.addEventListener('click', () => {
            addSugar.classList.toggle('active');
            totalPrice.innerHTML = `$${calcPrice(priceProduct, priceS, priceSugar, priceCinnamon, priceSyrup)}`;
        })

        addCinnamon.addEventListener('click', () => {
            addCinnamon.classList.toggle('active');
            totalPrice.innerHTML = `$${calcPrice(priceProduct, priceS, priceSugar, priceCinnamon, priceSyrup)}`;
        })

        addSyrup.addEventListener('click', () => {
            addSyrup.classList.toggle('active');
            totalPrice.innerHTML = `$${calcPrice(priceProduct, priceS, priceSugar, priceCinnamon, priceSyrup)}`;
        })

        // size M
        sizeM.addEventListener('click', () => {
            switchSizes(sizeM, sizeS, sizeL);
            //totalPrice.innerHTML = `$${(+product.price + +product.sizes.m.price).toFixed(2)}`;
            totalPrice.innerHTML = `$${calcPrice(priceProduct, priceM, priceSugar, priceCinnamon, priceSyrup)}`;
            addSugar.addEventListener('click', () => {
                addSugar.classList.toggle('active');
                totalPrice.innerHTML = `$${calcPrice(priceProduct, priceM, priceSugar, priceCinnamon, priceSyrup)}`;
            })

            addCinnamon.addEventListener('click', () => {
                addCinnamon.classList.toggle('active');
                totalPrice.innerHTML = `$${calcPrice(priceProduct, priceM, priceSugar, priceCinnamon, priceSyrup)}`;
            })

            addSyrup.addEventListener('click', () => {
                addSyrup.classList.toggle('active');
                totalPrice.innerHTML = `$${calcPrice(priceProduct, priceM, priceSugar, priceCinnamon, priceSyrup)}`;
            })
        })
        //size L
        sizeL.addEventListener('click', () => {
            switchSizes(sizeL, sizeS, sizeM);
            totalPrice.innerHTML = `$${calcPrice(priceProduct, priceL, priceSugar, priceCinnamon, priceSyrup)}`;
            addSugar.addEventListener('click', () => {
                addSugar.classList.toggle('active');
                totalPrice.innerHTML = `$${calcPrice(priceProduct, priceL, priceSugar, priceCinnamon, priceSyrup)}`;
            })

            addCinnamon.addEventListener('click', () => {
                addCinnamon.classList.toggle('active');
                totalPrice.innerHTML = `$${calcPrice(priceProduct, priceL, priceSugar, priceCinnamon, priceSyrup)}`;
            })

            addSyrup.addEventListener('click', () => {
                addSyrup.classList.toggle('active');
                totalPrice.innerHTML = `$${calcPrice(priceProduct, priceL, priceSugar, priceCinnamon, priceSyrup)}`;
            })
        })
        //size S
        sizeS.addEventListener('click', () => {
            switchSizes(sizeS, sizeL, sizeM);
            totalPrice.innerHTML = `$${calcPrice(priceProduct, priceS, priceSugar, priceCinnamon, priceSyrup)}`;
            addSugar.addEventListener('click', () => {
                addSugar.classList.toggle('active');
                totalPrice.innerHTML = `$${calcPrice(priceProduct, priceS, priceSugar, priceCinnamon, priceSyrup)}`;
            })

            addCinnamon.addEventListener('click', () => {
                addCinnamon.classList.toggle('active');
                totalPrice.innerHTML = `$${calcPrice(priceProduct, priceS, priceSugar, priceCinnamon, priceSyrup)}`;
            })

            addSyrup.addEventListener('click', () => {
                addSyrup.classList.toggle('active');
                totalPrice.innerHTML = `$${calcPrice(priceProduct, priceS, priceSugar, priceCinnamon, priceSyrup)}`;
            })
        })

        const popupClose = document.querySelector('.pop-up--close');
        popupClose.addEventListener('click', () => {
            popup.classList.toggle('hidden');
            document.body.classList.toggle('no-scroll');
        })

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                popup.classList.toggle('hidden');
                document.body.classList.toggle('no-scroll');
            }
        })

        }
  });
}

menuTea.addEventListener('click', () => {
    switchCategory(menuTea, menuCoffee, menuDessert);
    loadProducts();
})

menuDessert.addEventListener('click', () => {
    switchCategory(menuDessert, menuCoffee, menuTea);
    loadProducts();
    moreBtn.classList.remove('hide');
})

menuCoffee.addEventListener('click', () => {
    switchCategory(menuCoffee, menuDessert, menuTea);
    loadProducts();
    moreBtn.classList.remove('hide');
})

popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('pop-up')) {
        popup.classList.toggle('hidden');
        document.body.classList.toggle('no-scroll');
    }
})


//more button (pagination) for < 768px
const moreBtn = document.querySelector('.menu-more-btn');
const allCards = document.querySelectorAll('.menu-cards--box');

moreBtn.addEventListener('click', () => {
    const allCards = document.querySelectorAll('.menu-cards--box');
    allCards.forEach(card => {
            card.classList.add('show');
    });
    moreBtn.classList.add('hide');
});