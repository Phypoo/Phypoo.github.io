// SCROLLING EXPERIENCE //

// PLUGINS //

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "./gsap/ScrollToPlugin";

gsap.registerPlugin(Observer, ScrollToPlugin);


// DEFINING VARIABLES //

const sections = document.querySelectorAll("header, section");

const sectionCount = sections.length;

let isScrolling = false;

let sectionLocation = {
    previous: undefined,
    actual: undefined,
    present: undefined,
    upcoming: undefined
};


// SETTING SECTIONS ORIGINS //

sections.forEach(section => {

    section.style.transformOrigin = "center";

});


// GET CURRENT SECTION //

function getLocation() {

    let closestSection = undefined;
    let closestDistance = Infinity;

    const screenCenter = window.innerHeight / 2;

    sections.forEach((section, index) => {

        const rect = section.getBoundingClientRect();

        const sectionCenter =
            rect.top + rect.height / 2;

        const distance =
            Math.abs(screenCenter - sectionCenter);

        if (distance < closestDistance) {

            closestDistance = distance;
            closestSection = index;

        }

    });

    sectionLocation.present = closestSection;

    return closestSection;
}


// SNAP TO CURRENT SECTION //

function snapToLocation() {

    const section = sections[sectionLocation.present];

    if (!section) return;

    gsap.to(window, {

        duration: 3,

        scrollTo: {
            y: section,
            offsetY: window.innerHeight / 2 - section.offsetHeight / 2
        },

        ease: "back.Out"

    });

}


// GO TO NEXT / PREVIOUS SECTION //

function goToSection(direction) {

    if (isScrolling) return;

    getLocation();

    sectionLocation.previous = sectionLocation.present;

    sectionLocation.upcoming =
        (sectionLocation.present + direction + sectionCount)
        % sectionCount;

    isScrolling = true;

    sectionLocation.present = sectionLocation.upcoming;

    gsap.to(window, {
        duration: 0.8,

        scrollTo: {
            y: sections[sectionLocation.present],
            offsetY:
                window.innerHeight / 2 -
                sections[sectionLocation.present].offsetHeight / 2
        },

        ease: "power3.inOut",

        onComplete: () => {
            isScrolling = false;

            console.log(
                "Previous:",
                sectionLocation.previous,
                "Present:",
                sectionLocation.present
            );
        }
    });
}


// GSAP OBSERVER //
Observer.create({
    target: window,
    type: "wheel,touch",

    preventDefault: true,

    tolerance: 40,

    onDown: () => {
        goToSection(1);
    },

    onUp: () => {
        goToSection(-1);
    }
});


// INITIAL LOCATION //

getLocation();

console.log(
    "Starting section:",
    sectionLocation.present
);