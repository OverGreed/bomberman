define([
    'world/objects/floor',
    'world/objects/metal',
    'glm',
    'matrix/camera',
    'helpers/timer',
    'world/stores/lights',
    'world/objects/light'
], function(floor, wall, glm, camera, timer, lights, light) {
    'use strict';
    var objects = [];
  
    for(var x=-20.0;x<=20;x+=2){

        for(var z=-20.0;z<=20;z+=2){
            var obj = new floor();
            glm.mat4.translate(obj.mMatrix, obj.mMatrix, [x, -1.0, z]);
            objects.push(obj);
        }
    }
    var is_rotate = false;

    for(var x=-20.0;x<=20;x+=4){
        for(var z=-20.0;z<=20;z+=4){
            var obj = new wall();
            if(is_rotate){
                obj.rotate = true
                is_rotate = false;
            } else {
                is_rotate = true;
            }
            glm.mat4.translate(obj.mMatrix, obj.mMatrix, [x, 0.0, z]);
            objects.push(obj);
        }
    }


    var l = new light();
    l.position[0] = 1;
    l.position[1] = 1;
    l.position[2] = 0;
    l.color[0] = 1.0;
    l.color[1] = 1.0;
    l.color[2] = 1.0;
    lights.add(l);
    var l = new light();
    l.position[0] = 10;
    l.position[1] = 1;
    l.position[2] = 10;
    l.color[0] = 1.0;
    l.color[1] = 1.0;
    l.color[2] = 1.0;
    lights.add(l);
    /*
    var obj = new wall();
    glm.mat4.translate(obj.mMatrix, obj.mMatrix, [-1.0, 0.0, -1.0]);
    objects.push(obj);
    */
    var world = {
        step: function(){
            glm.mat4.rotate(camera, camera, (timer.elapsed*45)/1000.0*Math.PI/180.0, [0, 1, 0]);
            objects.forEach(function(obj){
                /*
                if(obj.rotate) {
                    glm.mat4.rotate(obj.mMatrix, obj.mMatrix, (timer.elapsed*45)/1000.0*Math.PI/180.0, [0, 1, 0]);
                }
                */
                obj.draw();
            });
        }
    };

    return world;
});
