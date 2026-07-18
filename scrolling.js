const sections = document.querySelectorAll("header, section");

let scrollTimeout;
let isSnapping = false;


function getClosestSection() {

    let closest = sections[0];
    let smallestDistance = Infinity;

    const viewportCenter = window.innerHeight / 2;


    sections.forEach(section => {

        const rect = section.getBoundingClientRect();

        const sectionCenter = rect.top + rect.height / 2;

        const distance = Math.abs(
            viewportCenter - sectionCenter
        );


        if(distance < smallestDistance){
            smallestDistance = distance;
            closest = section;
        }

    });


    return closest;
}



function snapToClosest(){

    if(isSnapping) return;


    const section = getClosestSection();


    const sectionTop = section.offsetTop;


    if(Math.abs(window.scrollY - sectionTop) < 5){
        return;
    }


    isSnapping = true;


    smoothScrollTo(
        sectionTop,
        1300
    );


    setTimeout(()=>{

        isSnapping=false;

    },1300);

}




window.addEventListener("scroll",()=>{


    if(isSnapping) return;


    clearTimeout(scrollTimeout);



    scrollTimeout=setTimeout(()=>{

        snapToClosest();

    },120);



});