const shape = document.querySelector("#currentShape");

const shape2 = document.querySelector("#target2");
const shape3 = document.querySelector("#target3");


let timeline = gsap.timeline({
    repeat:-1,
    yoyo:true,
    repeatDelay:0.5
});


timeline.to(shape,{
    duration:2,
    attr:{
        d: shape2.getAttribute("d")
    },
    ease:"power2.inOut"
});


timeline.to(shape,{
    duration:2,
    attr:{
        d: shape3.getAttribute("d")
    },
    ease:"power2.inOut"
});