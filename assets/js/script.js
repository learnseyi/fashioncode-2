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

// GLOBAL OBJECTS

// creating carousel blueprint
class Carousel{
    constructor(slides,indicators = []){
        this.slides = slides;
        this.sliderNumbers = slides.length;
        this.currentSlide = 0;
        this.indicators = indicators;
        this.timer;
    }

    updateCarousel(){
            this.slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${100 * (i - this.currentSlide)}%)`;   
    }
            )}
    slideForward(){
        clearInterval(this.timer)
            this.currentSlide === this.sliderNumbers - 1 ?   this.currentSlide = 0 : this.currentSlide++;
            this.carouselIndicator(this.currentSlide)
            this.updateCarousel();
            this.startTimer()
            }
    slideBackward(){
        clearInterval(this.timer)
        this.currentSlide > 0 ? this.currentSlide-- : this.currentSlide = 0;
        this.carouselIndicator(this.currentSlide)
        this.updateCarousel();
        this.startTimer();
            }
    startTimer(){
        this.timer = setInterval(()=>{
            this.slideForward();
            },4000)
        }
    autoSlide(){
        this.startTimer()
    }

    carouselIndicator(index){
        this.indicators.forEach((indicator,i)=>{    
           i === index ? this.indicators[i].style.backgroundColor = '#fc97f9' :
          this.indicators[i].style.backgroundColor = '#808080';
          
          ;
        })
       
    }
  

}
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

// initializing main carousel instance
const mainCarousel = new Carousel(slides)
window.addEventListener('load',()=>{
    mainCarousel.updateCarousel()
})
nextSlide.addEventListener('click',(e)=>{
    e.preventDefault();
    mainCarousel.slideForward();
})
prevSlide.addEventListener('click',(e)=>{
    e.preventDefault()
    mainCarousel.slideBackward();
})
mainCarousel.autoSlide();

// initializing review section carousel

const reviewSlider = new Carousel(reviews,indicators);

// review section slider control

nextReviewBtn.addEventListener('click',()=>{
    reviewSlider.slideForward();
})
prevReviewBtn.addEventListener('click',()=>{
    reviewSlider.slideBackward();
})


reviewSlider.updateCarousel();
reviewSlider.autoSlide();
reviewSlider.carouselIndicator();



// // CAROUSEL ANIMATION
// let currentSlide = 0;
// const sliderNumber = slides.length;

//  <-- update slide -->
// const showSlide = (sliderIndex)=>{
//     slides.forEach((slide, i) => {
//         slide.style.transform = `translateX(${100 * (i - sliderIndex)}%)`;
//     })
// }
// initialize slider to index zero onPageload
// showSlide(0) 
//  <-- automatic slide show function -->
// ??  <-- There is code duplication here -->
// const getSliderIndex = ()=>{
//     if(currentSlide === sliderNumber - 1){
//         currentSlide = 0;
//     }else{
//         currentSlide++;
//     }
//     return currentSlide;
// }
// const autoSlideShow = ()=>{
//     setInterval(()=>{
//         showSlide(getSliderIndex())
        
//     }
//        ,3000 ) 
// }
// // autoSlideShow()
// // <--slider forward control -->
// const showNextSlide = ()=>{
//     if(currentSlide === sliderNumber - 1){
//         currentSlide = 0;
//     }else{
//         currentSlide++;
//     }
// showSlide(currentSlide);
// }
// // <-- slider previous control -->
// const showPrevSlide = ()=>{
//     if(currentSlide > 0 ){
//         currentSlide --;
//     }else{
//         currentSlide = 0;
//     }   
//     showSlide(currentSlide)
// }

// //  <-- REVIEWS SECTION SLIDER ANIMATION -->
// // review slider
// const reviewNumber = reviews.length;
// // update slider
// const showReview = (reviewIndex)=>{
//     reviews.forEach((review,i) =>{
//         review.style.transform =`translateX(${100 * (i - reviewIndex)}%)`
//     })
// }
// showReview(0)
// // <-- next review control -->
// const showNextReview = ()=>{
//     if(currentSlide === reviewNumber - 1){
//         currentSlide = 0; 
//     }else{
//         currentSlide++;
//     }
//     showReview(currentSlide)
// }
// //  <-- previous review control -->
// const showPreviousReview = ()=>{
//     if(currentSlide > 0){
//         currentSlide--;
//     }else{
//         currentSlide = 0;
//     }
//     showReview(currentSlide)
// }
// EVENT LISTENERS
// nextSlide.addEventListener('click',showNextSlide)
// prevSlide.addEventListener('click',showPrevSlide)
// nextReviewBtn.addEventListener('click',showNextReview);
// prevReviewBtn.addEventListener('click',showPreviousReview);
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
