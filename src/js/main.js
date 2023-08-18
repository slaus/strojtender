// Мобильное меню бургер
function burgerMenu() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const htmlTag = document.querySelector('html');
    burger.addEventListener('click', () => {
        if (!menu.classList.contains('active')) {
            menu.classList.add('active');
            burger.classList.add('active');
            htmlTag.classList.add('locked');
        } else {
            menu.classList.remove('active');
            burger.classList.remove('active');
            htmlTag.classList.remove('locked');
        }

        // MOBILE SUBMENU
        const menuUl = document.querySelector('ul.menu.active');

        if (menuUl) {
            const menuDropdownItems = menuUl.querySelectorAll('.menu__dropdown');

            menuDropdownItems.forEach(function (menuItem) {
                const menuLink = menuItem.querySelector('.menu__link');
                if (menuLink && !menuLink.querySelector('span')) {
                    const spanElement = document.createElement('span');
                    menuLink.appendChild(spanElement);
                }

                menuItem.querySelectorAll('span').forEach(function (item) {
                    item.addEventListener('click', function (event) {
                        event.preventDefault();
                        const submenu = item.closest(".menu__dropdown").querySelector(".submenu");
                        if (submenu) {
                            if (submenu.style.display === 'block') {
                                submenu.style.display = '';
                                item.closest(".menu__dropdown").classList.remove("active");
                            } else {
                                submenu.style.display = 'block';
                                item.closest(".menu__dropdown").classList.add("active");
                            }
                        }
                    })
                });
            });
        }
    })
    // Вот тут мы ставим брейкпоинт навбара
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991.98) {
            menu.classList.remove('active')
            burger.classList.remove('active')
            htmlTag.classList.remove('locked')
        }
    })
}

burgerMenu()



// SLIDER
try {
    const wrapper = document.querySelector('.slider__wrapper'),
        list = wrapper.querySelector('.slider__list'),
        images = wrapper.querySelectorAll('.slider__item'),
        liTags = document.querySelectorAll('.slider__indicator li'),
        autoTimer = wrapper.getAttribute('data-interval'),
        prev = document.querySelector('[data-slide="prev"]'),
        next = document.querySelector('[data-slide="next"]');

    let i = 0,
        browserWidth = document.body.clientWidth,
        qty;

    const qtyItems = () => {
        // if (browserWidth < 767) {
        //     qty = 1;
        // } else if (browserWidth < 992) {
        //     qty = 2;
        // } else {
        //     qty = 3;
        // }
        return qty = 1;
    };

    const setAdaptiveSlider = (index = i) => {
        qtyItems();
        liTags[0].classList.add('active');

        let itemWidth = wrapper.offsetWidth / qty,
            total = images.length * itemWidth;
        list.style.width = total + 'px';

        images.forEach(item => {
            item.style.width = itemWidth + 'px';
        });

        next.addEventListener('click', (e) => {
            e.preventDefault();
            index = index + 1;
            if (index > images.length - qty) {
                index = 0;
            }
            removeActive(liTags);
            liTags[index].classList.add('active');
            list.style.transform = `translateX(-${index * itemWidth}px)`;
        });

        prev.addEventListener('click', (e) => {
            e.preventDefault();
            index = index - 1;
            if (index < 0) {
                index = images.length - qty;
            }
            removeActive(liTags);
            liTags[index].classList.add('active');
            list.style.transform = `translateX(-${index * itemWidth}px)`
        });

        //console.log(images.length);

        activateAnimation = () => {
            paused = setInterval(function () {
                index = index + 1;
                if (index > images.length - qty) {
                    index = 0;
                }
                removeActive(liTags);
                liTags[index].classList.add('active');
                list.style.transform = `translateX(-${index * itemWidth}px)`;
            }, autoTimer);
        }

        activateAnimation();

        removeActive = (tag) => {
            tag.forEach(item => {
                item.classList.remove('active');
            });
        }
    };

    setAdaptiveSlider();

    window.addEventListener('resize', () => {
        setAdaptiveSlider();
    });
} catch (e) { }



// CONVERT SIDEBAR MENU TO DROPDOWN
const scriptElement = document.currentScript;
const paramValue = scriptElement.getAttribute('param');
const chooseText = paramValue === 'ru' ? 'Выберите раздел' : paramValue === 'ua' ? 'Виберіть розділ' : 'Choose the category';

const menuList = document.getElementById('menu');
try {
    function createDropdownMenu(trigger) {
        const selectElement = document.createElement('select');
        selectElement.classList.add('dropdown-select');

        const chooseOption = document.createElement('option');
        chooseOption.value = '';
        chooseOption.textContent = chooseText;
        selectElement.appendChild(chooseOption);

        const menuItems = trigger.querySelectorAll('.menu__item');
        menuItems.forEach((menuItem, index) => {
            const option = document.createElement('option');
            const menuLink = menuItem.querySelector('.menu__link');
            option.value = menuLink.getAttribute('href');
            option.textContent = menuLink.textContent;
            selectElement.appendChild(option);
        });

        selectElement.addEventListener('change', (event) => {
            window.location.href = event.target.value;
        });

        trigger.parentNode.replaceChild(selectElement, trigger);
    }

    function checkScreenWidth() {
        if (window.innerWidth <= 767) {
            createDropdownMenu(menuList);
        } else {
            const dropdownSelect = document.querySelector('.dropdown-select');
            if (dropdownSelect) {
                trigger.parentNode.replaceChild(trigger, dropdownSelect);
            }
        }
    }

    checkScreenWidth();

    window.addEventListener('resize', checkScreenWidth);
} catch (e) { }



// MODAL WINDOW
function bindModal(trigger, modal, close) {
    trigger = document.querySelector(trigger),
        modal = document.querySelector(modal),
        close = document.querySelector(close)

    const htmlTag = document.querySelector('html');

    trigger.addEventListener('click', e => {
        e.preventDefault()
        modal.style.display = 'flex'
        htmlTag.classList.add('locked')
    });
    close.addEventListener('click', () => {
        modal.style.display = 'none'
        htmlTag.classList.remove('locked')
    });
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none'
            htmlTag.classList.remove('locked')
        }
    })
}

bindModal('.modal__btn', '.modal__wrapper', '.modal__close');


