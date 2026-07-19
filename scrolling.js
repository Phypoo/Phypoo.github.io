const sections = document.querySelectorAll("header, section");

const sectionCount = sections.length;

let currentSection = 0;
let isScrolling = false;


window.addEventListener("wheel", (event)=> {

    event.preventDefault();

    if(isScrolling){
        return;
    }


    if(event.deltaY > 0){

        currentSection++;

    }
    else{

        currentSection--;

    }


    if(currentSection < 0){
        currentSection = 0;
    }


    if(currentSection >= sectionCount){
        currentSection = sectionCount - 1;
    }


    scrollToSection(currentSection);


}, {passive:false});


function scrollToSection(index){

    isScrolling = true;


    const targetPosition = sections[index].offsetTop;

    const startPosition = window.scrollY;

    const distance = targetPosition - startPosition;

    const duration = 1200;

    let startTime = null;


    function animation(currentTime){


        if(startTime === null){

            startTime = currentTime;

        }


        const timePassed = currentTime - startTime;

        const progress = Math.min(timePassed / duration, 1);


        const ease = easeInOutCubic(progress);


        window.scrollTo(
            0,
            startPosition + distance * ease
        );


        if(progress < 1){

            requestAnimationFrame(animation);

        }
        else{

            isScrolling = false;

        }


    }


    requestAnimationFrame(animation);

}



function easeInOutCubic(t){

    return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;

}

let touchStart = 0;
let touchEnd = 0;


window.addEventListener("touchstart", function(event){

    touchStart = event.touches[0].clientY;

});


window.addEventListener("touchend", function(event){

    touchEnd = event.changedTouches[0].clientY;


    handleSwipe();

});



function handleSwipe(){


    const swipeDistance = touchStart - touchEnd;


    if(Math.abs(swipeDistance) < 50){

        return;

    }


    if(isScrolling){

        return;

    }


    if(swipeDistance > 0){

        currentSection++;

    }
    else{

        currentSection--;

    }



    if(currentSection < 0){

        currentSection = 0;

    }


    if(currentSection >= sectionCount){

        currentSection = sectionCount - 1;

    }


    scrollToSection(currentSection);


}

export { sections, sectionCount };