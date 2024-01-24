/*Задействование кнопки*/
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");/*Позволит взаимодействовать батону по отношению к Элементам*/
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");/*Позволит дать батону действие*/
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    /*Скролл*/
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");

    /*Возможность передвижения скролла мышью*/
    scrollbarThumb.addEventListener("mousedown", (e) =>{
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        
        //Update Thumb position on mouse move
        const handleMouseMove = (e) =>{
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            /*Ограничение горизонтальной границы*/
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            //перемещение элементов при помощи скролла
            const scrollPosition = (boundedPosition/maxThumbPosition) * maxScrollLeft;
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        //То самое бездействие скролла, после того как пользователь отпустит скролл
        //Or Remove event listeners on mouse up
        const handleMouseUp = (e) => {
        /*Задействие скролла*/
        document.removeEventListener("mousemove", handleMouseMove);
        /*Бездействие скролла*/
        document.removeEventListener("mouseup", handleMouseUp);
        }

        /*Задействие скролла*/
        document.addEventListener("mousemove", handleMouseMove);
        /*Бездействие скролла*/
        document.addEventListener("mouseup", handleMouseUp);
    });

    //Slide images According to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "Prev-slide" ? - 1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({left: scrollAmount, behavior:"smooth"});
        });
    });

    /*Конст для скрывание значтов с экрана после прокрутки*/
    const handleSlideButtons = () =>{
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none": "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none": "block";
    } 

    //Update scrollbar thubm position base on image scroll
    // Добавляет стиль Left после нажатия
    const updateScrollThumbPosition = () =>{
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth)/*7 стр*/
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();/*Кнопки для слайда*/
        updateScrollThumbPosition();/*Скролл для слайда*/
    });
}

window.addEventListener("load", initSlider);