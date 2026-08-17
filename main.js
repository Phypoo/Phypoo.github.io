const line = document.getElementById("line");
const dock = document.querySelector(".navbar");

const lineShow = () => {
    return line.animate([
        {
            transform: "translateX(-50%) translateY(-120px)"
        },

        {
            transform: "translateX(-50%) translateY(10px)"
        },

        {
            transform: "translateX(-50%) translateY(5px)"
        }
    ], {
        duration: 800,
        easing: "ease-in-out",
        fill: "forwards"
    });
}

const lineHide = () => {
    return line.animate([
        {
            transform: "translateX(-50%) scale(120%)"
        },
        {
            transform: "translateX(-50%) translateY(0px)"
        },

        {
            transform: "translateX(-50%) translateY(20px) scale(100%)"
        },

        {
            transform: "translateX(-50%) translateY(15px)"
        },

        {
            transform: "translateX(-50%) translateY(-120px)"
        }
    ], {
        duration: 800,
        easing: "ease-in-out",
        fill: "forwards"
    });
}

const dockShow = () => {
    return dock.animate([
        {
            transform: "translateX(-50%) translateY(-100px)"
        },

        {
            transform: "translateX(-50%) translateY(20px)"
        },

        {
            transform: "translateX(-50%) translateY(15px)"
        }
    ], {
        duration: 800,
        easing: "ease-in-out",
        fill: "forwards"
    });
}

const dockHide = () => {
    return dock.animate([
        {
            transform: "translateX(-50%) translateY(15px)"
        },

        {
            transform: "translateX(-50%) translateY(20px)"
        },

        {
            transform: "translateX(-50%) translateY(-100px)"
        }
    ], {
        duration: 800,
        easing: "ease-in-out",
        fill: "forwards"
    });
}

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

    const animLH = lineHide();

    animLH.finished.then(() => {

        const animDS = dockShow();

        animDS.finished.then(() => {

            active = true;
            busy = false;

        }, { once: true });

    }, { once: true });

}

function deactivate() {

    busy = true;

    const animDH = dockHide();

    animDH.finished.then(() => {

        const animLS = lineShow();

        animLS.finished.then(() => {

            active = false;
            busy = false;

        }, { once: true });

    }, { once: true });

}


export { lineShow, lineHide, dockShow, dockHide };