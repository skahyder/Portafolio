import { SceneBase } from './scenebase.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export class SceneVR extends SceneBase {
    constructor(containerId) {
        super(containerId);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.target.set(0, 100, 0);
        controls.update();
    }
    setup() {

        this.scene.background = new THREE.Color(0xa0a0a0);
        this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 2000);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
        hemiLight.position.set(0, 200, 0);
        this.scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 5);
        dirLight.position.set(0, 200, 100);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 180;
        dirLight.shadow.camera.bottom = - 100;
        dirLight.shadow.camera.left = - 120;
        dirLight.shadow.camera.right = 120;
        this.scene.add(dirLight);

        // ground
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);

        const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        this.scene.add(grid);

        // model
        const loader = new FBXLoader();
        let base = new THREE.Group();
        loader.load('../Two Handed Sword Death.fbx', function (object) {
            // loader.load('../model.fbx', function (object) {

            // mixer = new THREE.AnimationMixer(object);

            // const action = mixer.clipAction(object.animations[0]);
            // action.play();

            object.traverse(function (child) {

                if (child.isMesh) {

                    child.castShadow = true;
                    child.receiveShadow = true;

                }

            });

            base.add(object);
        });

        this.scene.add(base);
    }
    render() {
        const animate = () => {
            requestAnimationFrame(animate);


            this.renderer.render(this.scene, this.camera);
        };
        animate();
        console.log("colores raycast");
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}