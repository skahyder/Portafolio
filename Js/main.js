import { SceneBox } from "./sceneBox.js";
import { SceneBoxRed } from "./sceneBoxRed.js";
import { SceneVR } from "./sceneVR.js"; 

const scene1 = new SceneBox('containerScene1')
const scene2 = new SceneBoxRed('containerScene2')
const scene3 = new SceneVR('containerScene3')


function changeScene(sceneId){
    document.getElementById('containerScene1').style.display=sceneId === 'scene1' ?'block':'None';
    document.getElementById('containerScene2').style.display=sceneId === 'scene2' ?'block':'None';
    document.getElementById('containerScene3').style.display=sceneId === 'scene3' ?'block':'None';
    document.getElementById('containerScene4').style.display=sceneId === 'scene4' ?'block':'None';
}


document.getElementById('btnScene1').addEventListener('click', () => {
    changeScene('scene1');
})

document.getElementById('btnScene2').addEventListener('click',()=>{
    changeScene('scene2');
});
document.getElementById('btnScene3').addEventListener('click',()=>{
    changeScene('scene3');
});
document.getElementById('btnScene4').addEventListener('click',()=>{
    changeScene('scene4');
});

