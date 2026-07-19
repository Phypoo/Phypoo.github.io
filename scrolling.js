const sections = document.querySelectorAll("header, section");

const sectionCount = sections.length;

let currentSection = 0;
let isScrolling = false;


// Send data to animations.js later
export { sections, sectionCount };



// =========================
// DESKTOP SCROLL
// =========================

window.addEventListener("wheel", function(event){

    event.preventDefault();


    if(isScrolling){
        return;
    }


    updateCurrentSection();


    if(event.deltaY > 0){

        currentSection++;

    }
    else{

        currentSection--;

    }


    limitSection();


    scrollToSection(currentSection);


}, { passive:false });




// =========================
// MOBILE TOUCH
// =========================

let touchStartY = 0;


window.addEventListener("touchstart", function(event){

    touchStartY = event.touches[0].clientY;

});



window.addEventListener("touchend", function(event){


    if(isScrolling){
        return;
    }


    const touchEndY = event.changedTouches[0].clientY;


    const distance = touchStartY - touchEndY;



    // Ignore tiny movements
    if(Math.abs(distance) < 80){

        return;

    }



    updateCurrentSection();



    if(distance > 0){

        currentSection++;

    }
    else{

        currentSection--;

    }


    limitSection();


    scrollToSection(currentSection);


});





// =========================
// FIND REAL SECTION POSITION
// =========================

function updateCurrentSection(){


    let closest = 0;

    let smallestDistance = Infinity;



    sections.forEach(function(section,index){


        const distance = Math.abs(
            section.offsetTop - window.scrollY
        );


        if(distance < smallestDistance){

            smallestDistance = distance;

            closest = index;

        }


    });



    currentSection = closest;


}





// =========================
// KEEP INDEX INSIDE LIMITS
// =========================

function limitSection(){


    if(currentSection < 0){

        currentSection = 0;

    }



    if(currentSection >= sectionCount){

        currentSection = sectionCount - 1;

    }

}





// =========================
// CUSTOM SMOOTH SCROLL
// =========================

function scrollToSection(index){


    isScrolling = true;



    const targetPosition = sections[index].offsetTop;


    const startPosition = window.scrollY;


    const distance = targetPosition - startPosition;



    const duration = 1000;


    let startTime = null;



    function animation(currentTime){



        if(startTime === null){

            startTime = currentTime;

        }



        const timePassed = currentTime - startTime;



        const progress = Math.min(
            timePassed / duration,
            1
        );



        const ease = easeInOutCubic(progress);



        window.scrollTo(
            0,
            startPosition + distance * ease
        );



        if(progress < 1){


            requestAnimationFrame(animation);


        }
        else{


            window.scrollTo(
                0,
                targetPosition
            );



            isScrolling = false;



            sendSectionChange(index);


        }


    }



    requestAnimationFrame(animation);


}





// =========================
// SMOOTH CURVE
// =========================

function easeInOutCubic(t){


    return t < 0.5

    ? 4 * t * t * t

    : 1 - Math.pow(-2 * t + 2,3) / 2;


}





// =========================
// MESSAGE FOR animations.js
// =========================

function sendSectionChange(index){


    window.dispatchEvent(

        new CustomEvent(
            "sectionChanged",
            {
                detail:{
                    currentSection:index
                }
            }
        )

    );


}