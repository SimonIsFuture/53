/**
 * Created by Administrator on 2017/2/18.
 *
 */

//Get the random position of the tube
var rand_position = [
    [2.03,0,0],[-2.03,0,0],
    [0,2.03,0],[0,-2.03,0],
    [0,0,2.03],[0,0,-2.03]
]

//The array that holds the
var camera_position = {
    'front' : [0,0,25],
    'back' : [0,0,-25],
    'left' : [-25,0,0],
    'right' : [25,0,0],
    'top' : [0,25,0],
    'bottom' : [0,-25,0]
}


$('.canvas_obj_main').each(function () {
   var main_id=$(this).attr('id')
    $(this).css('width','264px');
    $(this).css('height','200px');
   genObj($(this).get(0),main_id);
});



function genObj(obj,main_id) {
    var renderer = new THREE.WebGLRenderer({
        canvas: obj
    });
    renderer.setClearColor(0xf5f5f5);
    var scene = new THREE.Scene();

// camera
    var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
    camera.position.set(25, 25, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene.add(camera);


    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(100, 150, 50);
   // scene.add(light);

// draw axes to help you understand the coordinate
//drawCube(scene,material);

    var material = new THREE.MeshLambertMaterial({
        emissive: 0x9BCD9B
    });

    drawCube(scene, material,true);
    var rand_num1 = genRandomNum(-1,0,6);
    var rand_num2 = genRandomNum(rand_num1,0,6);
    drawCube(scene,material,true,rand_position[rand_num1][0],rand_position[rand_num1][1],rand_position[rand_num1][2]);
    drawCube(scene,material,true,rand_position[rand_num2][0],rand_position[rand_num2][1],rand_position[rand_num2][2]);

//Went through all the objects
    $('.canvas_obj_child').each(function(){
       if($(this).attr('parentCanvas')==main_id){
           $(this).css('width','120px');
           $(this).css('height','90px');
           renderCanvas(scene,$(this).get(0),$(this).attr('direction'));
       }
    });
    renderer.render(scene, camera);
    }


//获取随机函数的方法，渲染对应角度的canvas
function renderCanvas(scene,canvas,direction){
    var renderer = new THREE.WebGLRenderer({
        canvas : canvas
    });
    renderer.setClearColor(0xf5f5f5);
    var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
    //Get the position of the camera
    var tmp_camera_pos = camera_position[direction];
    camera.position.set(tmp_camera_pos[0],tmp_camera_pos[1],tmp_camera_pos[2]);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);
    renderer.render(scene,camera);
}

//获取随机数的方法
function genRandomNum(pre_num,min,max){
    var num =Math.floor(Math.random()*6+0);
    if(num==pre_num) return genRandomNum(num,max,min);
    else return num;
}


function drawCube(scene, material , is_border , x , y , z) {
    var cube = new THREE.CubeGeometry(2,2,2);
    var mesh = new THREE.Mesh(cube,material);
    //First, set the position
    mesh=setPosition(mesh,x,y,z);
    if(is_border){
        var border = new THREE.BoxHelper( mesh,	000000);//设置边框，这个边框不会旋转
        scene.add(border);
    }
    scene.add(mesh);
}
//Set the position of the tube
function setPosition(mesh,x,y,z){
    var tmp_param_array=[x,y,z];
    for(var i in tmp_param_array){
        if(tmp_param_array[i]!=null){
            switch (i){
                case '0' :
                    mesh.position.x=x;
                    break;
                case '1':
                    mesh.position.y=y;
                    break;
                case '2':
                    mesh.position.z=z;
                    break;
                default:
                    break;
            }
        }
    }
    return mesh;



}
