
// const line = document.getElementById("line");
// const navbar = document.querySelector(".navbar");

// const trigger = {
//     x: window.innerWidth / 2 - 175, // left edge
//     y: 0,                           // top edge
//     width: 350,
//     height: 100
// };

// document.addEventListener("mousemove", (e) => {

//     const inside =
//         e.clientX >= trigger.x &&
//         e.clientX <= trigger.x + trigger.width &&
//         e.clientY >= trigger.y &&
//         e.clientY <= trigger.y + trigger.height;

//     if (inside) {
//         line.classList.add("active");
//     } else {
//         line.classList.remove("active");
//     }

//      const outside =
//         e.clientX >= trigger.x &&
//         e.clientX <= trigger.x + trigger.width &&
//         e.clientY >= trigger.y &&
//         e.clientY <= trigger.y + trigger.height;

//     if (outside) {
//         navbar.classList.add("active");
//     } else {
//         navbar.classList.remove("active");
//     }

// });

const line = document.getElementById("line");
const dock = document.querySelector(".navbar");

const trigger = {
    x: window.innerWidth / 2 - 175,
    y: 0,
    width: 350,
    height: 120
};

let active = false;
let busy = false;

document.addEventListener("mousemove", (e) => {

    const inside =
        e.clientX >= trigger.x &&
        e.clientX <= trigger.x + trigger.width &&
        e.clientY >= trigger.y &&
        e.clientY <= trigger.y + trigger.height;

    if (inside && !active && !busy) {
        activate();
    }

    if (!inside && active && !busy) {
        deactivate();
    }

});

function activate() {

    busy = true;

    line.classList.add("active");

    line.addEventListener("animationend", function onLineEnd() {

        dock.classList.add("active");

        dock.addEventListener("animationend", function onDockEnd() {

            active = true;
            busy = false;

        }, { once: true });

    }, { once: true });

}

function deactivate() {

    busy = true;

    dock.classList.remove("active");
    dock.classList.add("hide");

    dock.addEventListener("animationend", function onDockUp() {

        line.classList.remove("active");
        dock.classList.remove("hide");

        active = false;
        busy = false;

    }, { once: true });

}