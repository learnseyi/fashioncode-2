// DOM SELECTORS

const stickyTop = document.querySelector('.sticky-top');
const navList = document.querySelectorAll('.main-nav li a');
const head = document.querySelector('.top-message');
const slides = document.querySelectorAll('.carousel-items')
const nextSlide = document.querySelector(' .forward')
const prevSlide = document.querySelector('.previous');
const subNav = document.querySelector('.sub-section-nav');
const reviews = document.querySelectorAll('.review')
const nextReviewBtn = document.querySelector('.nextBtn');
const prevReviewBtn = document.querySelector('.previousBtn');
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

// CAROUSEL ANIMATION
let currentSlide = 0;
const sliderNumber = slides.length;

//  <-- update slide -->
const showSlide = (sliderIndex)=>{
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - sliderIndex)}%)`;
    })
}
// initialize slider to index zero onPageload
showSlide(0) 
// <--slider forward control -->
const showNextSlide = ()=>{
    if(currentSlide === sliderNumber - 1){
        currentSlide = 0;
    }else{
        currentSlide++;
    }
showSlide(currentSlide);
}
// <-- slider previous control -->
const showPrevSlide = ()=>{
    if(currentSlide > 0 ){
        currentSlide --;
    }else{
        currentSlide = 0;
    }   
    showSlide(currentSlide)
}

//  <-- REVIEWS SECTION SLIDER ANIMATION -->
// review slider
const reviewNumber = reviews.length;
// update slider
const showReview = (reviewIndex)=>{
    reviews.forEach((review,i) =>{
        review.style.transform =`translateX(${100 * (i - reviewIndex)}%)`
    })
}
showReview(0)
// <-- next review control -->
const showNextReview = ()=>{
    if(currentSlide === reviewNumber - 1){
        currentSlide = 0; 
    }else{
        currentSlide++;
    }
    showReview(currentSlide)
}
//  <-- previous review control -->
const showPreviousReview = ()=>{
    if(currentSlide > 0){
        currentSlide--;
    }else{
        currentSlide = 0;
    }
    showReview(currentSlide)
}
// EVENT LISTENERS
nextSlide.addEventListener('click',showNextSlide)
prevSlide.addEventListener('click',showPrevSlide)
nextReviewBtn.addEventListener('click',showNextReview);
prevReviewBtn.addEventListener('click',showPreviousReview);
// scroll to function
const scrollToSection = (e)=>{
    e.preventDefault();
    const element = document.getElementById(e.target.getAttribute('href'))
    const elementPosition = element.offsetTop - offset
    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
}
navList.forEach(nav => {
    nav.addEventListener('click', scrollToSection)
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
