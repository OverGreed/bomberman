define([
    'glm'
], function(glm) {
    'use strict';

    function light(position, color) {
        if(!position){
            position = glm.vec3.create();
        }
        if(!color) {
            color = glm.vec3.create();
        }

        this.position = position;
        this.color = color;
    }

    return light;
});
