// ==================================================
// SECTION SCROLL ENGINE
// ==================================================


// ===========================
// SETTINGS
// ===========================

const SCROLL_DURATION = 1000; // smooth animation time
const SNAP_DELAY = 150;       // delay after manual scrolling


// ===========================
// FIND SECTIONS
// ===========================
//
// Automatically detects:
//
// header
// section
// section
// section
//
// and creates an array


const sections = [
    ...document.querySelectorAll("header, section")
];



// ===========================
// VARIABLES
// ===========================

let isScrolling = false;

let scrollTimer = null;

let touchStartY = 0;

let touchEndY = 0;



// ===========================
// EASING
// ===========================
//
// Slow start
// Fast middle
// Slow ending


function easeInOutCubic(t){

    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2*t + 2,3)/2;

}



// ===========================
// FIND CLOSEST SECTION
// ===========================
//
// Checks the center of viewport.
//
// The section closest to your eyes wins.


function getClosestSection(){


    let closest = 0;

    let smallestDistance = Infinity;



    const viewportCenter =
        window.scrollY + window.innerHeight / 2;



    sections.forEach((section,index)=>{


        const sectionCenter =
            section.offsetTop +
            section.offsetHeight / 2;



        const distance =
            Math.abs(
                viewportCenter - sectionCenter
            );



        if(distance < smallestDistance){

            smallestDistance = distance;

            closest = index;

        }


    });



    return closest;

}



// ===========================
// SMOOTH SCROLL ANIMATION
// ===========================


function scrollToSection(index){


    if(index < 0 || index >= sections.length){
        return;
    }



    if(isScrolling){
        return;
    }



    isScrolling = true;



    const start =
        window.scrollY;



    const target =
        sections[index].offsetTop;



    const distance =
        target - start;



    const startTime =
        performance.now();




    function animate(time){


        const elapsed =
            time - startTime;



        const progress =
            Math.min(
                elapsed / SCROLL_DURATION,
                1
            );



        const eased =
            easeInOutCubic(progress);



        window.scrollTo(
            0,
            start + distance * eased
        );



        if(progress < 1){


            requestAnimationFrame(
                animate
            );


        }
        else{


            isScrolling = false;


        }

    }



    requestAnimationFrame(
        animate
    );


}



// ==================================================
// MOUSE WHEEL
// ==================================================


window.addEventListener(
"wheel",
(event)=>{


    // allow CTRL + wheel zoom
    if(event.ctrlKey){
        return;
    }



    event.preventDefault();



    if(isScrolling){
        return;
    }



    const current =
        getClosestSection();



    if(event.deltaY > 0){


        // scroll down

        scrollToSection(
            current + 1
        );


    }
    else{


        // scroll up

        scrollToSection(
            current - 1
        );


    }



},
{
    passive:false
});





// ==================================================
// SCROLL EVENT SNAP
// ==================================================
//
// Handles:
//
// - scrollbar dragging
// - middle mouse scrolling
// - phone natural scrolling
//
// When movement stops:
// find closest section
// move there


window.addEventListener(
"scroll",
()=>{


    if(isScrolling){
        return;
    }



    clearTimeout(scrollTimer);



    scrollTimer = setTimeout(()=>{


        const closest =
            getClosestSection();



        scrollToSection(
            closest
        );


    }, SNAP_DELAY);



});




// ==================================================
// TOUCH SUPPORT FOR PHONES
// ==================================================


window.addEventListener(
"touchstart",
(event)=>{


    touchStartY =
        event.touches[0].clientY;


});




window.addEventListener(
"touchend",
(event)=>{


    touchEndY =
        event.changedTouches[0].clientY;



    const difference =
        touchStartY - touchEndY;



    // ignore small movement

    if(Math.abs(difference) < 50){
        return;
    }



    if(isScrolling){
        return;
    }



    const current =
        getClosestSection();



    // swipe up

    if(difference > 0){


        scrollToSection(
            current + 1
        );


    }


    // swipe down

    else{


        scrollToSection(
            current - 1
        );


    }



});




// ==================================================
// KEYBOARD
// ==================================================


window.addEventListener(
"keydown",
(event)=>{


    if(isScrolling){
        return;
    }



    const current =
        getClosestSection();



    if(event.key === "ArrowDown"){


        scrollToSection(
            current + 1
        );


    }



    if(event.key === "ArrowUp"){


        scrollToSection(
            current - 1
        );


    }



});




// ==================================================
// RESIZE
// ==================================================


window.addEventListener(
"resize",
()=>{


    const current =
        getClosestSection();



    scrollToSection(
        current
    );


});
