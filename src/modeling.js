import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.getElementById("modelingCanvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
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


// Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(-1, 1, 1);
directionalLight.rotation.set(1, 3, 3);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
directionalLight2.position.set(-1, 1, 4);
directionalLight2.rotation.set(1, -3, 1);
scene.add(directionalLight2);


// LoGo-Model
const loader = new GLTFLoader();

let model;


loader.load(
    "/3Dmodels/LoGo.glb",
    function(gltf) {

        model = gltf.scene;

        scene.add(model);

        model.scale.set(0.1, 0.1, 0.1);
        model.position.set(0, 0, 0);
        model.rotation.set(-0.3, 0.5 ,3.14)

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