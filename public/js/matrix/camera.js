define([
	'helpers/gl',
	'glm'
], function(gl, glm) {
    'use strict';
    var matrix = glm.mat4.create();

    glm.mat4.translate(matrix, matrix,  [0, 0, -15]);
    glm.mat4.rotate(matrix, matrix, 45*Math.PI/180, [1, 0, 0]);

    return matrix;
});
