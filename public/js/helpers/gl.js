define(['config'], function(config){
    'use strict';
    var gl = null;
    var canvas = document.getElementById(config.id);

    try {
        gl = canvas.getContext('experimental-webgl');
    } catch(e) {
        console.log(e);
    }

    if(!gl){
        alert('Could not initialize WebGL!');
        return null;
    }

    return gl;
});
