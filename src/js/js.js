document.addEventListener('DOMContentLoaded', () => {

    let nav = document.querySelector('nav');
    let links = document.querySelectorAll('.tabs');
    let blocks = document.querySelectorAll('.blocks');
    let order = document.querySelector('.btn__product');
    let modal = document.querySelector('.modal');
    let close = document.querySelector('.close')
    let pul = document.querySelector('.ajax');
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
        let scroll = pageYOffset;
        
        if(pageYOffset  < offset - 20 && pageYOffset < 2000) {
            scroll += 20;
            window.scrollTo(0, scroll);
            timer = setTimeout(function() {
                scrollToEl(offset);
            }, 10)
        } else if(pageYOffset  > offset && pageYOffset > 0)  {
            scroll -= 20;
            window.scrollTo(0, scroll);
            timer = setTimeout(function() {
                scrollToEl(offset);
            }, 10)
        }
        else clearTimeout(timer);
    }
    order.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    })
    close.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    })
    pul.addEventListener('click', (e) => {
        e.preventDefault()
        let xhr = new XMLHttpRequest();

        xhr.open('POST', 'mailer/smart.php');
        xhr.send();
    })

})
