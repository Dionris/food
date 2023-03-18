window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const   tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');
        

    function hideTabContent() {
        tabsContent.forEach(item => {

            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }


    function showTabContent(i = 0) {
        
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }


    hideTabContent(); 
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });



    //timer 
    
    const deadLine = '2023-04-01';


    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const   t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function getZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endtime) {
        const   timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }

    
    setClock('.timer', deadLine);

    

    // Modal

    const   modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal');
            // modalCloseBtn = document.querySelector('[data-close]'); // так как динамически сосздаем окно благодарности , это нам уже не нужно


    //избавляемся от повторения кода, создав функцию которую мы будем вызывать
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show'); //второй вариант открытия модального окна (1)
        document.body.style.overflow = 'hidden'; // убираем скрол при открытом модальном окне
        clearInterval(ModalTimerId); // (Modal 2.0) останавливает setTimeout
    }


    // открываем модально окно
    modalTrigger.forEach(btn => { 
        btn.addEventListener('click', openModal);
    });


    // избавляемся от повторения кода, создав функцию которую мы будем вызывать
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show'); //второй вариант открытия модального окна (1)
        document.body.style.overflow = ''; // добавляем скрол после закрытия модального окна
    }


    //закрываем модальное окно
    // modalCloseBtn.addEventListener('click', closeModal);  //функция не вызываем а просто пишем название // так как динамически сосздаем окно благодарности , это нам уже не нужно



    // закрываем модально окно по клику на подложку
    modal.addEventListener('click', (e) => { 
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // добавили условия что если мы нажимаем на подложку или на любой крестик
            closeModal(); // тут уже вызываем функцию после выполненого условия
        }
    });


    //закрываем модальное окно по нажатию на клавишу
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });



    // Modal 2.0

    // открытия модального окна через 10 секунд
    const ModalTimerId = setTimeout(openModal, 50000);


    // при скроле до самого низа открывается модальное окно
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll) // открывает модальное окно при скроле только один раз
        }
    }


    // вызываем функцию которая при скроле до самого низа открывается модальное окно
    window.addEventListener('scroll', showModalByScroll);



    // используем Классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // Старая версия до (...classes)
        // render() {
        //     const element = document.createElement('div');
        //     element.innerHTML = `
        //         <div class="menu__item">
        //             <img src=${this.src} alt=${this.alt}>
        //             <h3 class="menu__item-subtitle">${this.title}</h3>
        //             <div class="menu__item-descr">${this.descr}</div>
        //             <div class="menu__item-divider"></div>
        //             <div class="menu__item-price">
        //                 <div class="menu__item-cost">Цена:</div>
        //                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        //             </div>
        //         </div>
        //     `;
        //     this.parent.append(element);
        // }


        // Новая версия с (...classes)
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element); // если мы ничего не передадим в (classes)
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            
            `;
            this.parent.append(element);
        }
    }


    // Более долгий вариант, ниже указан более быстрый
    // const div = new MenuCard();
    // div.render();

    // более быстрый вариант
    // new MenuCard().render();

    // Сразу создаем тут обьект и вызываем метод рендер, он чтото сделает и потом исчезнет так как на него нету больше ссылок
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item'  // если нету (classes) то это не нужно писать и так в остальных   
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        17,
        '.menu .container',
        'menu__item'
    ).render();

    

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postDate(item);
    });

    function postDate(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Убирает перезагрузку страницы при отправке формы

            const statusMessage = document.createElement('img'); // Меняем 'div' на 'img'
            //statusMessage.classList.add('status'); // и после смены на img мы убиарем класс 'status'
            statusMessage.src = message.loading; // подставляем для картинки img атрибут src из машего обьекта
            //statusMessage.textContent = message.loading; // для img эта строчка не нужно
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;// для img добавляем стилстические свойства
            // form.append(statusMessage); // вставляем img в форму
            form.insertAdjacentElement('afterend', statusMessage); // вставляем наш img в под форму

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php'); // отправляем на сервер методом 'POST' и выбераем путь на сервер

            // request.setRequestHeader('Content-type', 'application/json'); // после fetch эта строка нам не нужна
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value,key){
                object[key] = value;
            });

            // const json = JSON.stringify(object);

            // request.send(json); 

            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object) //formData
            })
            .then(data => data.text())
            .then(data => { // если запрос fetch удачный
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => { // если произошла ошибка в запросе 
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         // statusMessage.textContent = message.success;
            //         showThanksModal(message.success);
            //         form.reset();
            //         // setTimeout(() => { 
            //             statusMessage.remove();
            //         // }, 2000); 
            //     } else {
            //         // statusMessage.textContent = message.failure;
            //         showThanksModal(message.failure);

            //     }
            // });
        });
    }



    // Красивое оповещение от отравке Form

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        openModal();

        const thenksModal = document.createElement('div');
        thenksModal.classList.add('modal__dialog');
        thenksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close data-close">×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thenksModal);
        setTimeout(() => {
            thenksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }



    // Fetch API - пример работы

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));



    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
});