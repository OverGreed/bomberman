define(['helpers/gl', 'glm', 'config'], function(gl, glm, config) {
    'use strict';
    var fov = 45*Math.PI/180;
    var matrix = glm.mat4.create();
    var canvas = document.getElementById(config.id);

    var width;
    var height;

    function resize(event) {
        if(width != canvas.clientWidth || height != canvas.clientHeight){
            width = parseInt(canvas.clientWidth);
            height = parseInt(canvas.clientHeight);

            canvas.width = width;
            canvas.height = height;
        
            glm.mat4.perspective(matrix, fov, width / height, 0.1, 100.0);
            gl.viewport(0, 0, width, height);
        }
    }

    resize();
    window.onresize = resize;

    return matrix;
});
