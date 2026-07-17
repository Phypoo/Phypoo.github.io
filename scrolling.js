// ===========================
// SETTINGS
// ===========================

const SCROLL_DURATION = 1200;


// ===========================
// SECTIONS
// ===========================

const sections = [
    ...document.querySelectorAll("header, section")
];

let isScrolling = false;


// ===========================
// EASING
// ===========================

function easeInOutCubic(t) {

    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

}


// ===========================
// FIND CLOSEST SECTION
// ===========================

function getClosestSection(){

    let closest = 0;
    let smallestDistance = Infinity;


    sections.forEach((section,index)=>{

        const distance = Math.abs(
            window.scrollY - section.offsetTop
        );


        if(distance < smallestDistance){

            smallestDistance = distance;
            closest = index;

        }

    });


    return closest;

}


// ===========================
// CUSTOM SCROLL
// ===========================

function scrollToSection(index){

    if(index < 0 || index >= sections.length){
        return;
    }


    isScrolling = true;


    const start = window.scrollY;

    const target = sections[index].offsetTop;

    const distance = target - start;


    const startTime = performance.now();



    function animate(time){

        const elapsed = time - startTime;

        const progress = Math.min(
            elapsed / SCROLL_DURATION,
            1
        );


        const eased = easeInOutCubic(progress);


        window.scrollTo(
            0,
            start + distance * eased
        );


        if(progress < 1){

            requestAnimationFrame(animate);

        }
        else{

            isScrolling = false;

        }

    }


    requestAnimationFrame(animate);

}


// ===========================
// MOUSE WHEEL
// ===========================

window.addEventListener("wheel",(event)=>{


    // allow CTRL zoom
    if(event.ctrlKey){
        return;
    }


    event.preventDefault();


    if(isScrolling){
        return;
    }


    const current = getClosestSection();


    if(event.deltaY > 0){

        scrollToSection(current + 1);

    }
    else{

        scrollToSection(current - 1);

    }


},{passive:false});