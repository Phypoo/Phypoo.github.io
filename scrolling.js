// ===========================
// SETTINGS
// ===========================

const SCROLL_DURATION = 1200; // milliseconds

// ===========================
// VARIABLES
// ===========================

const sections = [...document.querySelectorAll("header, section")];

let currentSection = 0;
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
// ANIMATE SCROLL
// ===========================

function scrollToSection(index) {

    if (isScrolling) return;

    if (index < 0) return;

    if (index >= sections.length) return;

    isScrolling = true;

    const start = window.scrollY;
    const target = sections[index].offsetTop;
    const distance = target - start;

    const startTime = performance.now();

    function animate(time) {

        const elapsed = time - startTime;

        const progress = Math.min(elapsed / SCROLL_DURATION, 1);

        const eased = easeInOutCubic(progress);

        window.scrollTo(0, start + distance * eased);

        if (progress < 1) {

            requestAnimationFrame(animate);

        } else {

            currentSection = index;

            isScrolling = false;

        }

    }

    requestAnimationFrame(animate);

}

// ===========================
// MOUSE WHEEL
// ===========================

window.addEventListener("wheel", (event) => {


    // Allow browser zoom with CTRL + mouse wheel
    if (event.ctrlKey) {
        return;
    }


    event.preventDefault();


    if (isScrolling) return;


    if (event.deltaY > 0) {

        scrollToSection(currentSection + 1);

    } else {

        scrollToSection(currentSection - 1);

    }


}, { passive: false });

// ===========================
// KEYBOARD
// ===========================

window.addEventListener("keydown", (event) => {

    if (isScrolling) return;

    switch (event.key) {

        case "ArrowDown":
        case "PageDown":
        case " ":

            event.preventDefault();

            scrollToSection(currentSection + 1);

            break;

        case "ArrowUp":
        case "PageUp":

            event.preventDefault();

            scrollToSection(currentSection - 1);

            break;

    }

});

// ===========================
// RESIZE
// ===========================

window.addEventListener("resize", () => {

    window.scrollTo(0, sections[currentSection].offsetTop);

});

// ===========================
// START POSITION
// ===========================

window.scrollTo(0, sections[0].offsetTop);