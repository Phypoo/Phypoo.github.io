import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


const canvas = document.getElementById("printingCanvas");


// ======================
// SCENE
// ======================

const scene = new THREE.Scene();


// ======================
// CAMERA
// ======================

const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
);

camera.position.set(0, -20, 100);


// ======================
// RENDERER
// ======================

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(
    window.devicePixelRatio
);

renderer.setSize(
    canvas.clientWidth,
    canvas.clientHeight
);


// ======================
// CONTROLS
// ======================

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;


// ======================
// LIGHTS
// ======================

// ======================
// LOAD MODEL
// ======================

const loader = new GLTFLoader();

let mixer = null;


loader.load(
    "/3Dmodels/logoAnimated.glb",

    (gltf)=>{


        const model = gltf.scene;
        scene.add(model);
        
        model.rotation.x = Math.PI / 2.2;
        model.rotation.y = Math.PI;
        model.rotation.z = Math.PI / 5;
        model.position.y = 4;





        console.log("===== OBJECTS =====");

        model.traverse((child)=>{

            console.log(
                child.name,
                child.type
            );

        });



        console.log("===== ANIMATIONS =====");


        gltf.animations.forEach(
            (clip,index)=>{

                console.log(
                    index,
                    clip.name,
                    "duration:",
                    clip.duration,
                    "tracks:",
                    clip.tracks.length
                );

            }
        );



        // ======================
        // MIXER
        // ======================

        mixer = new THREE.AnimationMixer(
            model
        );



        console.log(
            "Animation count:",
            gltf.animations.length
        );



        // ======================
        // PLAY ANIMATIONS
        // ======================

        gltf.animations.forEach(
            (clip)=>{


                // Ignore empty clips

                if(clip.duration <= 0){

                    console.warn(
                        "Skipped empty clip:",
                        clip.name
                    );

                    return;

                }



                console.log(
                    "Playing:",
                    clip.name
                );



                const action =
                    mixer.clipAction(
                        clip
                    );


                action.reset();


                action.setEffectiveTimeScale(
                    1
                );


                action.setLoop(
                    THREE.LoopRepeat
                );


                action.play();


            }
        );
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
// LOOP
// ======================

const clock = new THREE.Clock();


function animate(){


    requestAnimationFrame(
        animate
    );


    const delta =
        clock.getDelta();



    if(mixer){

        mixer.update(
            delta
        );

    }


    controls.update();


    renderer.render(
        scene,
        camera
    );

}


animate();



// ======================
// RESIZE
// ======================

window.addEventListener(
    "resize",
    ()=>{


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
