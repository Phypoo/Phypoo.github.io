import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Canvas
const canvas = document.getElementById("3Dcontainer");

// Scene
const scene = new THREE.Scene();
scene.background = null;

// Camera
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Loader
const loader = new GLTFLoader();

loader.load(
    "3Dmodels/LoGo.glb",

    function (gltf) {

        const model = gltf.scene;

        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);

        scene.add(model);

        console.log("Model loaded!");

    },

    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + "% loaded");

    },

    function (error) {

        console.error("Error loading model:", error);

    }
);

// Resize
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});

// Animation loop
function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

animate();