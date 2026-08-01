import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


// ======================
// CANVAS
// ======================

const canvas = document.getElementById("printingCanvas");



// ======================
// SCENE
// ======================

const scene = new THREE.Scene();



// ======================
// RENDERER
// ======================

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
});


renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);


renderer.setSize(
    canvas.clientWidth,
    canvas.clientHeight
);





// ======================
// VARIABLES
// ======================

let camera;
let controls;

let model;

let display;
let selectButton;


let displayMaterials = [];

let materialIndex = 0;





// ======================
// LIGHTS
// ======================

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        2
    )
);


const light =
    new THREE.DirectionalLight(
        0xffffff,
        3
    );


light.position.set(
    5,
    5,
    5
);


scene.add(light);







// ======================
// LOAD GLB
// ======================

const loader =
    new GLTFLoader();



loader.load(

    "/3Dmodels/miniDevice.glb",


    (gltf)=>{


        console.log(
            "GLB LOADED"
        );


        model =
            gltf.scene;


        scene.add(model);





        // ======================
        // FIND OBJECTS
        // ======================

        display =
            model.getObjectByName(
                "display"
            );


        selectButton =
            model.getObjectByName(
                "buttomSelect"
            );



        console.log(
            "DISPLAY:",
            display
        );


        console.log(
            "BUTTON:",
            selectButton
        );







        // ======================
        // GET REAL MATERIALS
        // ======================


        model.traverse(
            (child)=>{


                if(child.isMesh){



                    console.log(
                        "MESH:",
                        child.name
                    );



                    if(child.material){


                        let mat =
                            child.material;



                        console.log(
                            "MATERIAL:",
                            mat.name
                        );




                        if(
                            mat.name.includes("index")
                        ){


                            displayMaterials.push(
                                mat
                            );


                            console.log(
                                "ADDED:",
                                mat.name
                            );


                        }


                    }


                }


            }
        );





        displayMaterials.sort(
            (a,b)=>
            a.name.localeCompare(
                b.name
            )
        );



        console.log(
            "TEXTURED MATERIALS:",
            displayMaterials
        );





        // ======================
        // CAMERA
        // ======================


        camera =
            model.getObjectByName(
                "Camera"
            );



        if(!camera){


            camera =
                new THREE.PerspectiveCamera(
                    45,
                    canvas.clientWidth /
                    canvas.clientHeight,
                    0.1,
                    1000
                );


            camera.position.set(
                0,
                0,
                5
            );


            camera.lookAt(
                model.position
            );

        }



        camera.aspect =
            canvas.clientWidth /
            canvas.clientHeight;


        camera.updateProjectionMatrix();






        // ======================
        // CONTROLS
        // ======================


        controls =
            new OrbitControls(
                camera,
                renderer.domElement
            );


        controls.enableDamping = true;



    },



    undefined,



    (error)=>{


        console.error(
            "GLB ERROR:",
            error
        );


    }

);









// ======================
// CLICK
// ======================

const raycaster =
    new THREE.Raycaster();


const mouse =
    new THREE.Vector2();




window.addEventListener(
    "click",
    (event)=>{


        if(
            !model ||
            !camera ||
            !display ||
            displayMaterials.length === 0
        )
        return;




        mouse.x =
            (event.clientX /
            window.innerWidth) * 2 - 1;



        mouse.y =
            -(event.clientY /
            window.innerHeight) * 2 + 1;




        raycaster.setFromCamera(
            mouse,
            camera
        );





        const intersects =
            raycaster.intersectObject(
                model,
                true
            );





        if(intersects.length > 0){


            let clicked =
                intersects[0].object;





            if(
                clicked === selectButton ||
                clicked.parent === selectButton
            ){



                materialIndex++;



                // 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 1
                if(
                    materialIndex >= displayMaterials.length
                ){

                    materialIndex = 1;

                }





                display.material =
                    displayMaterials[materialIndex];




                console.log(
                    "SELECTED:",
                    displayMaterials[materialIndex].name
                );



            }


        }



    }

);









// ======================
// RESIZE
// ======================

window.addEventListener(
    "resize",
    ()=>{


        if(!camera)
            return;



        camera.aspect =
            canvas.clientWidth /
            canvas.clientHeight;



        camera.updateProjectionMatrix();



        renderer.setSize(
            canvas.clientWidth,
            canvas.clientHeight
        );


    }

);







// ======================
// LOOP
// ======================

function animate(){


    requestAnimationFrame(
        animate
    );



    if(controls)
        controls.update();



    if(camera){

        renderer.render(
            scene,
            camera
        );

    }


}



animate();