import { sections, sectionCount } from "./scrolling.js";

const logo = document.getElementById('logo');

window.addEventListener("sectionChanged", (event)=>{


    let currentSection = event.detail.currentSection;


    if(currentSection == 1){

        logo.classList.add('active');

    }
    else {
        logo.classList.remove('active');
    }

}); 

console.log("animations.js loaded");