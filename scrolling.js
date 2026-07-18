const sections = document.querySelectorAll("header, section");

let currentSection = 0;
let scrolling = false;


function goToSection(index){

    if(index < 0 || index >= sections.length)
        return;


    scrolling = true;

    currentSection = index;


    const target =
        sections[index].offsetTop;


    animateScroll(
        window.scrollY,
        target,
        1200
    );


    setTimeout(()=>{

        scrolling = false;

    },1200);

}



function animateScroll(start, end, duration){

    let startTime = null;


    function frame(time){

        if(!startTime)
            startTime = time;


        const elapsed = time - startTime;

        const progress =
            Math.min(elapsed / duration,1);


        // cinematic ease
        const ease =
        progress < 0.5
        ?
        4 * progress * progress * progress
        :
        1 - Math.pow(-2 * progress + 2,3)/2;


        window.scrollTo(
            0,
            start + (end-start)*ease
        );


        if(progress < 1){

            requestAnimationFrame(frame);

        }

    }


    requestAnimationFrame(frame);

}



function getCurrentSection(){

    const center =
    window.scrollY + window.innerHeight/2;


    let closest = 0;
    let distance = Infinity;


    sections.forEach((section,index)=>{

        const sectionCenter =
        section.offsetTop +
        section.offsetHeight/2;


        const diff =
        Math.abs(center-sectionCenter);


        if(diff < distance){

            distance = diff;
            closest = index;

        }

    });


    return closest;

}



window.addEventListener("wheel",(event)=>{


    if(scrolling)
        return;


    const direction =
    event.deltaY > 0 ? 1 : -1;


    currentSection =
    getCurrentSection();


    goToSection(
        currentSection + direction
    );


},
{
    passive:true
});



let touchStart = 0;


window.addEventListener("touchstart",(event)=>{

    touchStart =
    event.touches[0].clientY;

});



window.addEventListener("touchend",(event)=>{


    if(scrolling)
        return;


    const touchEnd =
    event.changedTouches[0].clientY;


    const difference =
    touchStart - touchEnd;


    if(Math.abs(difference)<50)
        return;


    currentSection =
    getCurrentSection();


    if(difference > 0){

        goToSection(currentSection+1);

    }
    else{

        goToSection(currentSection-1);

    }


});