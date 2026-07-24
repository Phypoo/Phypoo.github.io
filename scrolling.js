const sections = document.querySelectorAll("header, section");
const sectionCount = sections.length;


let currentSection = 0;
let isScrolling = false;


// For animations.js
export { sections, sectionCount };



// ==============================
// DESKTOP MOUSE WHEEL
// ==============================

window.addEventListener("wheel", function(event){


    const canvas3D = document.getElementById("modelingCanvas");
    const canvasPrint = document.getElementById("printingCanvas");


    const mouseOver3D =
        canvas3D && canvas3D.matches(":hover");


    const mouseOverPrint =
        canvasPrint && canvasPrint.matches(":hover");



    // Allow CTRL + wheel zoom inside canvases
    if(event.ctrlKey){

        return;

    }

    if(mouseOver3D || mouseOverPrint){

        return;

    }



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



    clampSection();


    scrollToSection(currentSection);



}, { passive:false });







// ==============================
// MOBILE TOUCH
// ==============================


let touchStartY = 0;
let touchEndY = 0;



window.addEventListener("touchstart", function(event){


    if(isScrolling){
        return;
    }


    touchStartY = event.touches[0].clientY;


}, {passive:false});





window.addEventListener("touchmove", function(event){


    event.preventDefault();


}, {passive:false});






window.addEventListener("touchend", function(event){


    if(isScrolling){
        return;
    }



    touchEndY = event.changedTouches[0].clientY;



    const distance = touchStartY - touchEndY;



    // Ignore small touches
    if(Math.abs(distance) < 70){

        return;

    }



    updateCurrentSection();



    if(distance > 0){

        currentSection++;

    }
    else{

        currentSection--;

    }



    clampSection();


    scrollToSection(currentSection);



}, {passive:false});








// ==============================
// FIND REAL CURRENT SECTION
// ==============================

function updateCurrentSection(){


    let closest = 0;

    let smallestDistance = Infinity;



    sections.forEach(function(section,index){



        const distance = Math.abs(
            window.scrollY - section.offsetTop
        );



        if(distance < smallestDistance){

            smallestDistance = distance;

            closest = index;

        }



    });



    currentSection = closest;


}







// ==============================
// LIMIT SECTION NUMBER
// ==============================

function clampSection(){


    if(currentSection < 0){

        currentSection = 0;

    }



    if(currentSection >= sectionCount){

        currentSection = sectionCount - 1;

    }


}







// ==============================
// CUSTOM SMOOTH SCROLL
// ==============================

function scrollToSection(index){


    isScrolling = true;



    const start = window.scrollY;

    const target = sections[index].offsetTop;


    const distance = target - start;



    const duration = 1000;



    let startTime = null;




    function animate(time){



        if(startTime === null){

            startTime = time;

        }



        const elapsed = time - startTime;



        const progress = Math.min(
            elapsed / duration,
            1
        );



        const eased = easeInOut(progress);



        window.scrollTo(
            0,
            start + distance * eased
        );



        if(progress < 1){


            requestAnimationFrame(animate);


        }
        else{


            // Force exact position
            window.scrollTo(
                0,
                target
            );



            isScrolling = false;



            sendSectionEvent(index);


        }


    }



    requestAnimationFrame(animate);


}







// ==============================
// SMOOTH CURVE
// ==============================

function easeInOut(t){


    return t < 0.5

    ? 4 * t * t * t

    : 1 - Math.pow(-2 * t + 2,3) / 2;


}







// ==============================
// ANIMATION EVENT
// ==============================

function sendSectionEvent(index){


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