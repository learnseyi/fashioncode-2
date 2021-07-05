// DOM SELECTORS
const body = document.querySelector('body');
const carousel = document.querySelector('.carousel-section');
const stickyTop = document.querySelector('.sticky-top');
const sections = document.querySelectorAll('section');
const navList = document.querySelectorAll('.main-nav li a');
const head = document.querySelector('.top-message');
const slides = document.querySelectorAll('.carousel-items')
const subNav = document.querySelector('.sub-section-nav');
const reviews = document.querySelectorAll('.review')
const indicators= document.querySelectorAll('.indicator');
const root = head.getBoundingClientRect().height;
const offset = stickyTop.getBoundingClientRect().height - root;


// NAVBAR ANIMATION
const animate = () => {
    subNav.style.paddingTop = scrollY >= root ? 0 : 1 + 'em';
    subNav.style.paddingBottom = scrollY >= root ? 0 : 1 + 'em';
    subNav.style.borderBottom = scrollY >= root ? `3px solid #fc97f9` : 'none';
}
const isAnimate = () => {
    setTimeout(animate, 200)
}

document.addEventListener('scroll', isAnimate)

// carousel animation
slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * i}%)`;
})
// scroll to function
const getElement = (id) => {
    let element = " ";
    sections.forEach(section => {
        if ("#" + section.getAttribute('id') === id)
            element = section;
    })
    return element;
}

navList.forEach(nav => {
    nav.addEventListener('click', (e) => {
        e.preventDefault();
        const element = document.getElementById(e.target.getAttribute('href'))
        const elementPosition = element.offsetTop - offset
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    })
})
// review slider
reviews.forEach((review,i) =>{
    review.style.transform =`translateX(${100 * i}%)`
    console.log(review.children[1].innerHTML)

})


// NAVBAR INTERSECTION OBSERVER
// const options = {
//     root: null,
//     rootMargin: `-${root}px`,
//     // threshold: .2
// }
// const navAnimation = (entries) => {
//     if (entries[0].isIntersecting) {
//         console.log('I am intesecting', observer.thresholds)
//     } else {
//         console.log(entries[0].isIntersecting)
//     }


// }
// const observer = new IntersectionObserver(navAnimation, options)

// observer.observe(carousel)
