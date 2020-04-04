document.addEventListener('DOMContentLoaded', () => {

    let nav = document.querySelector('nav');
    let links = document.querySelectorAll('.tabs');
    let blocks = document.querySelectorAll('.blocks');
    let order = document.querySelector('.btn__product');
    let modal = document.querySelector('.modal');
    let close = document.querySelectorAll('.close')
    let pull = document.querySelector('.modal__form');
    let load = document.querySelector('.load__img');
    let count = document.querySelectorAll('.count');
    let plus = document.querySelector('.plus');
    let minus = document.querySelector('.minus');

    let error = modal.querySelector('.error');
    let modalOrder = document.querySelector('.modal__order');
    let congratulation = document.querySelector('.congratulation');
    let timer;

    document.addEventListener('scroll', () => {
        if(pageYOffset > 20) {
            nav.style.backgroundColor = '#397ded';
            nav.style.left = '0';
            nav.style.width = 100 + "%";
            nav.style.padding = '0 30px';
        }
        else {
            nav.style.backgroundColor = '';
            nav.style.width = '';
            nav.style.left = '';
        }
    })
    links.forEach((el, i) => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            sections(i);
        })
    })
    function sections(a) {
        scrollToEl(blocks[a].offsetTop); 
    }
    function scrollToEl(offset) { 
        if(pageYOffset  < offset - 20 && pageYOffset < 2000) {
            getScroll(20, offset)
        } else if(pageYOffset  > offset && pageYOffset > 0)  {
            getScroll(-20, offset)   
        }
        else clearTimeout(timer);
    }
    function getScroll(a, offset) {
        let scroll = pageYOffset;
        scroll += a;
        window.scrollTo(0, scroll);
        timer = setTimeout(function() {
            scrollToEl(offset);
        }, 10)
    }
    order.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        modalOrder.style.display = 'block';
        document.body.style.overflow = 'hidden';
    })
    close.forEach((el) => {
        el.addEventListener('click', function(e) {
            this.parentElement.style.display = 'none';
            modal.style.display = 'none';
            load.style.display = 'none';
            document.body.style.overflow = '';
        })
    })
    

    function prom() {
        return new Promise( (resovle, reject) => {
            load.style.display = 'block';
            let xhr = new XMLHttpRequest();
            let data = new FormData(pull);

            xhr.open('POST', 'mailer/smart.php');
            xhr.send(data);

            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) resovle();
                else if (this.readyState == 4 && this.status == 404) reject();
            }
            xhr.addEventListener('error', () => reject());
        })
    }
    pull.addEventListener('submit', (e) => {
        e.preventDefault()
        let getPromise = prom();

        getPromise.then(
            () => {
                load.style.display = 'none';
                modalOrder.style.display = 'none';
                congratulation.style.display = 'block';
            },
            () => {
                load.style.display = 'none';
                modalOrder.style.display = 'none';
                error.style.display = 'block';
            }
        )
    })

    plus.addEventListener('click', () => {
        ++count[0].value;
        count[1].value = count[0].value;
    })
    minus.addEventListener('click', () => {
        let a = --count[0].value;
        count[1].value = count[0].value;
        if(a < 0) {
            count[0].value = 0;
        }
    })
})
