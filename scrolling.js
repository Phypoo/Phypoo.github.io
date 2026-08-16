const sections = document.querySelectorAll("header, section");
const sectionCount = sections.length;

let previousSection = 0;
let currentSection = 0;
let isScrolling = false;
let targetSection = 0;   // where we're currently traveling


// For animations.js
export { sections, sectionCount };



// ==============================
// DESKTOP MOUSE WHEEL
// ==============================

window.addEventListener("wheel", function(event){


    const canvas3D = document.getElementById("modelingCanvas");
    const canvasPrint = document.getElementById("printingCanvas");


    const mouseOver3D =
        canvas3D && canvas3D.matches(":hover");


    const mouseOverPrint =
        canvasPrint && canvasPrint.matches(":hover");



    // Allow CTRL + wheel zoom inside canvases
    if(event.ctrlKey){

        return;

    }

    if(mouseOver3D || mouseOverPrint){

        return;

    }



    event.preventDefault();



    if(isScrolling){

        return;

    }

    updatePreviouseSection();
    updateCurrentSection();
    
    
    
    if(event.deltaY > 0){   
        
        currentSection++;
        
    }
    else{
        
        currentSection--;
        
    }
    
    
    clampSection();


    scrollToSection(currentSection);



}, { passive:false });





// ============================== ==============================

// ============================== ==============================
// MOBILE TOUCH 
// ============================== ==============================

// ============================== ==============================


let touchStartY = 0;
let touchEndY = 0;



window.addEventListener("touchstart", function(event){


    if(isScrolling){
        return;
    }


    touchStartY = event.touches[0].clientY;


}, {passive:false});





window.addEventListener("touchmove", function(event){


    event.preventDefault();


}, {passive:false});






window.addEventListener("touchend", function(event){


    if(isScrolling){
        return;
    }



    touchEndY = event.changedTouches[0].clientY;



    const distance = touchStartY - touchEndY;



    // Ignore small touches
    if(Math.abs(distance) < 70){

        return;

    }


    updatePreviouseSection();
    updateCurrentSection();



    if(distance > 0){

        currentSection++;

    }
    else{

        currentSection--;


    }



    clampSection();


    scrollToSection(currentSection);

    designAnimation();



}, {passive:false});




// ==============================
// FIND REAL CURRENT SECTION
// ==============================
const updatePreviouseSection = ()=> {

    previousSection = currentSection
}

const updateCurrentSection = ()=> {

    let closest = 0;
    let smallestDistance = Infinity;

    sections.forEach(function(section,index){



        const distance = Math.abs(
            window.scrollY - section.offsetTop
        );



        if(distance < smallestDistance){

            smallestDistance = distance;

            closest = index;

        }


        currentSection = closest
    
    });


    
}




// ==============================
// LIMIT SECTION NUMBER
// ==============================

function clampSection(){


    if(currentSection < 0){

        currentSection = 0;

    }



    if(currentSection >= sectionCount){

        currentSection = sectionCount - 1;

    }



}







// ==============================
// CUSTOM SMOOTH SCROLL
// ==============================

function scrollToSection(index){

    isScrolling = true;

    const start = window.scrollY;
    const target = sections[index].offsetTop;
    const distance = target - start;
    const duration = 1000;

    let startTime = null;


    function animate(time){



        if(startTime === null){

            startTime = time;

        }



        const elapsed = time - startTime;



        const progress = Math.min(
            elapsed / duration,
            1
        );



        const eased = easeInOut(progress);



        window.scrollTo(
            0,
            start + distance * eased
        );



        if(progress < 1){


            requestAnimationFrame(animate);


        }
        else{


            // Force exact position
            window.scrollTo(
                0,
                target
            );



            isScrolling = false;

            designAnimation();
        }
        
        
    }
    
    
    requestAnimationFrame(animate);
    
}





// ==============================
// SMOOTH CURVE
// ==============================

let easeInOut = (t)=> {
    
    
    return t < 0.5
    
    ? 4 * Math.pow(t, 3)
    
    : 1 - Math.pow(-2 * t + 2,3) / 2;
    
    
}

const logo = document.getElementById("logo")

const designAnimation = ()=> {

    if(currentSection >= previousSection && currentSection === 1) {
        logo.classList.add("active");
    } else if (currentSection <= previousSection && currentSection < 1) {
        logo.classList.remove("active");
    }

};  

gsap.registerPlugin(MorphSVGPlugin);

const path = document.getElementById("little");

console.log(MorphSVGPlugin);
console.log(path);
console.log(path?.tagName);

const shapes = ["M1156.54,487.173c22.678,49.728 10.394,182.748 -22.677,221.488c-33.071,38.741 -134.173,0 -198.425,0l-759.685,0c-58.583,0 -146.457,33.071 -175.748,0c-29.291,-33.07 -1.821,-150.978 -0,-198.425c3.79,-98.782 107.851,-129.887 158.74,-113.386c53.12,17.225 142.466,44.532 147.402,45.355c82.976,13.829 127.58,-6.707 159.977,-39.685c33.831,-34.439 54.349,-82.447 91.351,-119.055c34.657,-34.289 83.043,-58.565 117.176,-56.693c68.02,3.729 117.905,49.909 153.071,85.039c34.455,34.42 109.354,88.891 170.078,98.481c83.346,13.163 137.829,31.026 158.74,76.881Z", "M-1.866,251.334c8.711,-43.557 39.961,-85.441 69.897,-103.932c32.009,-19.771 41.127,-28.192 79.371,-45.355c38.793,-17.409 89.034,-16.963 136.063,0c62.41,22.511 74.68,45.912 102.047,70.821c34.141,31.075 46.992,66.077 63.641,110.597c21.624,57.819 3.035,101.106 28.014,150.985c27.483,54.879 64.275,64.127 107.255,75.786c48.194,13.074 84.208,17.283 172.739,-3.856c44.969,-10.737 105.802,-34.43 118.468,-35.306c7.984,-0.553 47.059,-0.949 79.539,12.931c0.518,0.221 35.401,15.499 55.412,35.074c14.567,14.25 24.52,35.695 24.641,35.935c1.81,3.604 18.089,36.01 21.265,45.713c21.071,64.365 -12.979,178.231 -16.785,179.447c-7.125,2.277 -50.932,6.575 -203.261,-3.085c-70.961,-4.5 -111.277,-8.823 -212.166,-8.583c-142.444,0.339 -142.536,2.356 -337.548,-10.306c-186.236,-12.091 -224.693,-2.241 -285.46,-2.428c-2.542,-0.008 -22.315,-0.069 -31.413,-4.741c-7.403,-3.801 -10.776,-10.881 -11.272,-11.875l39.553,-487.822Z", "M152.303,-8.545c-1.584,1.584 0.997,53.559 15.939,83.442c14.928,29.856 93.659,84.036 120.007,92.818c6.881,2.294 17.696,10.274 96.568,36.565c9.561,3.187 47.033,16.915 58.129,19.689c35.837,8.959 146.769,35.199 217.513,105.944c35.763,35.762 44.449,110.271 9.423,180.323c-37.433,74.867 -99.354,107.66 -85.945,153.071c10.927,37.005 53.754,52.234 68.084,50.066c49.605,-7.503 98.463,27.19 255.016,27.19c39.541,-0 219.683,-29.95 248.452,-116.257c5.06,-15.18 9.319,-13.666 14.064,-46.878c1.413,-9.895 11.241,-32.844 -1.875,-72.192c-31.826,-95.477 -13.338,-97.569 -5.626,-197.825c2.785,-36.202 -3.059,-80.931 2.813,-163.135c9.438,-132.138 -1.56,-139.538 -50.628,-164.072c-88.071,-44.036 -278.306,-21.564 -452.84,-21.564c-206.001,0 -209.441,14.063 -417.213,14.063c-7.502,0 -73.13,0 -91.881,18.752Z", "M726.088,74.897c9.344,28.032 6.165,29.206 33.752,84.38c1.322,2.644 56.046,67.513 67.504,170.636c8.661,77.948 -27.599,111.453 -42.19,140.633c-0.535,1.071 -31.239,38.015 -45.94,47.816c-63.975,42.65 -130.605,42.207 -268.141,-40.315c-3.154,-1.893 -27.085,-16.251 -35.627,-29.065c-13.119,-19.677 -158.389,-115.585 -203.45,-117.194c-117.035,-4.18 -143.135,28.752 -179.074,64.691c-1.296,1.297 -17.038,31.101 -25.314,39.378c-15.001,15 -33.483,70.448 -35.627,76.879c-4.419,13.259 -5.434,95.51 -4.688,109.694c4.816,91.509 7.699,93.671 14.064,98.444c12.842,9.632 26.251,19.689 199.699,19.689c109.006,-0 196.439,-11.356 286.893,-8.438c58.128,1.875 170.784,1.875 185.636,1.875c54.642,-0 54.126,3.75 108.757,3.75c87.643,-0 150.748,-16.53 370.162,-24.409c0.57,-3.83 5.45,-36.668 7.673,-47.783c9.753,-48.766 -2.566,-84.726 15.939,-251.265c17.926,-161.334 -13.621,-288.511 -0.938,-415.338c2.949,-29.492 -10.778,-23.298 -40.315,-26.252c-75.73,-7.573 -164.656,-1.604 -254.078,-4.687c-62.39,-2.152 -155.674,-3.079 -157.509,-0.938c-1.944,2.267 -6.353,80.322 2.812,107.819Z", "M-5.669,294.803c-0,0 111.997,-114.532 250.79,-86.773c33.865,6.773 104.537,38.486 184.699,110.632c8.542,7.688 137.018,95.548 179.074,111.569c185.369,70.617 421.404,-62.967 566.284,118.132c3.149,3.937 33.827,28.764 16.876,96.569c-18.61,74.44 -142.915,69.035 -156.572,68.441c-165.587,-7.199 -277.523,8.672 -482.842,-8.438c-131.766,-10.98 -262.438,5.87 -361.897,-6.562c-123.335,-15.417 -198.042,36.919 -206.262,-20.627c-13.091,-91.632 14.876,-40.831 4.18,-190.573c-0.797,-11.16 -14.211,-172.489 5.67,-192.37Z", "M-15.519,42.083c14.289,7.144 28.259,55.529 106.881,71.254c65.013,13.003 213.292,22.025 252.203,138.758c24.755,74.265 0.922,74.561 0.938,152.822c0.012,64.629 45.512,103.762 109.04,135.027c69.832,34.366 158.715,38.026 199.858,163.048c9.732,29.571 -99.909,20.707 -106.386,21.632c-45.01,6.43 -98.135,-9.792 -226.889,0.938c-117.464,9.788 -117.637,-9.053 -235.327,-0c-59.306,4.562 -118.948,12.154 -110.632,-54.379c1.01,-8.074 22.667,-55.051 19.689,-144.383c-2.636,-79.095 -8.058,-78.823 -2.812,-157.51c7.448,-111.731 6.475,-111.682 -2.813,-223.139c-0.593,-7.11 -3.75,-104.068 -3.75,-104.068Z", "M-2.394,615.868c33.157,5.526 55.989,-9.6 77.818,-16.876c43.87,-14.624 71.829,-77.734 75.004,-103.132c10.003,-80.025 -27.4,-119.374 3.75,-212.825c25.059,-75.175 92.265,-91.977 103.132,-94.693c119.694,-29.924 144.56,6.841 214.7,24.376c81.101,20.275 104.489,19.374 182.824,-39.377c53.294,-39.971 87.934,-120.013 183.761,-163.135c16.752,-7.539 16.319,-7.388 32.815,-15.001c-121.624,-34.772 -237.015,-61.902 -342.467,-79.154c-223.016,-36.485 -401.574,-28.785 -500.597,44.264c-82.989,61.222 -108.811,169.108 -98.287,311.811c7.309,99.11 32.15,215.013 67.547,343.742Z", "M-9.548,260.787c-0,0 115.688,110.021 210.604,62.563c134.251,-67.125 130.188,-98.444 257.828,-98.444c164.256,0 190.666,100.012 389.087,139.696c23.891,4.779 115.866,7.253 153.759,0.938c161.486,-26.915 176.075,-79.32 204.387,-135.946c17.579,-35.156 -22.818,-98.27 -25.314,-170.635c-2.064,-59.883 9.722,-80.704 -49.69,-88.131c-95.562,-11.945 -348.159,-16.437 -518.469,-2.812c-152.353,12.188 -236.316,12.188 -256.891,12.188c-271.827,-0 -272.435,6.641 -343.146,-7.501c-21.493,-4.298 -24.835,2.236 -28.126,38.44c-4.199,46.184 6.732,85.067 -2.813,151.884c-9.258,64.809 13.417,102.394 8.784,97.76Z", ];

let number = 0;

function morph() {
    const nextShape = shapes[(number + 1) % shapes.length];
    gsap.to(path, {
        duration: 1.5,
        ease: "none",
        morphSVG: {
            shape: nextShape,
            shapeIndex: "auto"  
        },
        onComplete: () => {
            number = (number + 1) % shapes.length;
            morph();
        }
    });
}   

morph();