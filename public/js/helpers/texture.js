define(['helpers/gl'], function(gl, filter) {
    'use strict';
    var cache = [];

    function handle(texture){
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);

        if(filter){
            filter();
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); //NEAREST
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);//NEAREST_MIPMAP_LINEAR); //NEAREST
            //gl.generateMipmap(gl.TEXTURE_2D);
        }

        gl.bindTexture(gl.TEXTURE_2D, texture);
    }

    function loadTexture(url) {
        var texture;

        if(!cache[url]) {
            texture = gl.createTexture();
            texture.image = new Image();
            texture.image.onload = function(){
                handle(texture);
            }
            texture.image.src = url;
        } else {
            texture = cache[url];
        }
        return texture;
    }

    return loadTexture;
});
