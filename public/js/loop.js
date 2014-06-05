define([
    'helpers/gl',
    'world',
    'world/objects/floor',
    'helpers/timer',
    'world/stores/lights'
], function(gl, world, floor, timer, lights) {
    'use strict';

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
//    gl.enable(gl.CULL_FACE );


    function loop(){
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        timer.tick();
        lights.step();
        world.step();
        window.requestAnimationFrame(loop);
    }

    return loop;
});
