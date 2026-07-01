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

const sections = [...document.querySelectorAll("header, section")];

let isScrolling = false;

function getClosestSection() {
  const scrollPos = window.scrollY;

  let closestIndex = 0;
  let closestDistance = Infinity;

  sections.forEach((sec, i) => {
    const distance = Math.abs(sec.offsetTop - scrollPos);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  });

  return closestIndex;
}

function smoothScrollTo(el) {
  isScrolling = true;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  setTimeout(() => {
    isScrolling = false;
  }, 1200);
}

window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  let index = getClosestSection();

  if (e.deltaY > 0) {
    index++;
  } else {
    index--;
  }

  index = Math.max(0, Math.min(index, sections.length - 1));

  smoothScrollTo(sections[index]);
}, { passive: true });