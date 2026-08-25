import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.getElementById("modelingCanvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    0.05,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

renderer.setSize(
    canvas.clientWidth,
    canvas.clientHeight
);


const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.z = 5;



// LoGo-Model
const loader = new GLTFLoader();

let model;


loader.load(
    "/3Dmodels/crewModule.glb",
    function(gltf) {

        model = gltf.scene;

        scene.add(model);

        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);

    },
    undefined,
    function(error) {
        console.error(error);
    }
);


// Render loop
function animate() {
    requestAnimationFrame(animate);

    orbit.update();

    renderer.render(scene, camera);
}

animate();