define(['helpers/gl'], function(gl){
    'use strict';

    function compile(source, type) {
		var shader = null;
		if(type==='vertex') {
			shader = gl.createShader(gl.VERTEX_SHADER);
		} else if(type==='fragment') {
			shader = gl.createShader(gl.FRAGMENT_SHADER);
		} else {
			return null;
		}

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
			console.log(gl.getShaderInfoLog(shader));
            console.log(source);
			return null
		}
		return shader;
	}
	
	return compile;
});
