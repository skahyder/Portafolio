export class BoxPhysic {
    constructor(sceneIn){
        this.scene=sceneIn;
        this.createCube();
        this.a=[0,-0.001,0]
        this.v=[0,0,0]
    }
    createCube(){
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );
    }
    renderCube(){
        this.v[1]+=this.a[1]
        this.cube.position.y+=this.v[1]
        if(this.cube.position.y<-5){
            this.cube.position.x=Math.random()*10-5
            this.cube.position.y=5
            this.v[1]=0
        }
    }
}