import * as THREE from 'three';

export class SceneBase {
    constructor(containerId){
        this.containerId=containerId;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.doc = document.getElementById(containerId);
        this.doc.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.camera.position.z = 5;
        this.setup();
        this.render();
    }
    setup(){}
    render(){}
    onWindowResize(){
        const aspctRatio = window.innerWidth/window.innerHeight;
        this.camera.aspect = aspctRatio;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}