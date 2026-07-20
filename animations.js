// animations.js


window.addEventListener("sectionChanged", function(event){


    const currentSection = event.detail.currentSection;



    console.log("Current section:", currentSection);



    if(currentSection === 1){

        startSectionOneAnimation();

    }


});





const logo = document.getElementById("logo");
const designing = document.getElementById("designing");
const text = document.querySelector(".blob1");

function startSectionOneAnimation(){


    // first animation
    logo.classList.add("active");



    // wait until logo animation finishes

    logo.addEventListener("animationend", function(){



        // second animation starts

        text.classList.add("active");

        designing.classList.add("active");
        logo.classList.remove("active");
        logo.classList.add("moved");



    }, {once:true});



}