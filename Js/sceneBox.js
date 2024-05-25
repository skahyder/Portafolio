import { SceneBase } from './scenebase.js';
import * as THREE from 'three';

export class SceneBox extends SceneBase {
    constructor(containerId) {
        super(containerId);
    }
    setup() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        this.camera.position.z = 5;

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const mouse = new THREE.Vector2(1, 1);

        let points = 0;
        const pointsElement = document.createElement('div');
        pointsElement.style.position = 'absolute';
        pointsElement.style.top = '100px';
        pointsElement.style.left = '10px';
        pointsElement.style.color = 'white';
        this.doc.appendChild(pointsElement);
        pointsElement.textContent = 'Puntos: ' + points;

        const tituloElement = document.createElement('div');
        tituloElement.style.position = 'absolute';
        tituloElement.style.top = '20%';
        tituloElement.style.left = '50%';
        tituloElement.style.transform = 'translate(-50%, -50%)';
        tituloElement.style.color = 'white';
        tituloElement.style.fontSize = '24px';
        tituloElement.style.fontWeight = 'bold';
        this.doc.appendChild(tituloElement);
        tituloElement.textContent = 'Campo de tiro';


        window.addEventListener('pointermove', (event) => {
            // Calculate pointer position in normalized device coordinates
            // (-1 to +1) for both components
            const rect = event.target.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        });

        const changeCubePositionAndColor = () => {
            // Obtenemos el rango de visión de la cámara
            const cameraViewRangeX = this.camera.position.z * Math.tan(this.camera.fov / 2) * (window.innerWidth / window.innerHeight);
            const cameraViewRangeY = this.camera.position.z * Math.tan(this.camera.fov / 2);
            // Generamos coordenadas aleatorias dentro del rango de visión de la cámara
            const newX = THREE.MathUtils.randFloat(-cameraViewRangeX, cameraViewRangeX);
            const newY = THREE.MathUtils.randFloat(-cameraViewRangeY, cameraViewRangeY);
            cube.position.set(newX, newY, this.camera.position.z - 5); // Mantenemos la misma profundidad de la cámara
            // Cambiamos el color del cubo
            cube.material.color.set(Math.random() * 0xffffff);
        };

        // Cambiamos la posición del cubo y su color cada 3 segundos
        setInterval(changeCubePositionAndColor, 2000);

        // Agregar event listener para detectar clics
        window.addEventListener("click", () => {
            raycaster.setFromCamera(mouse, this.camera);
            const intersects = raycaster.intersectObjects(this.scene.children);
            for (let i = 0; i < intersects.length; i++) {
                if (intersects[i].object === cube) {
                    changeCubePositionAndColor();
                    points++;
                    updatePointsDisplay();
                }
            }
        });

        const updatePointsDisplay = () => {
            pointsElement.textContent = 'Puntos: ' + points;
        };

    }
    render() {
        const animate = () => {
            requestAnimationFrame(animate);

            this.renderer.render(this.scene, this.camera);
        };
        animate();
        console.log("colores raycast");
    }
}