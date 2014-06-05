define([
	'helpers/program',
	'text!shaders/wall_vertex.glsl',
	'text!shaders/wall_fragment.glsl',
	'buffer/array',
	'helpers/gl',
    'glm',
    'helpers/texture',
    'helpers/timer'
], function(createProgram, vertex, fragment, createBuffer, gl, glm, tex, timer) {
    'use strict';

	var program =  createProgram(vertex, fragment, [
		'a_Vertex'
	],[
		'u_mvMatrix',
		'u_pMatrix',
        'u_Texture'
	]);

	var vertices = createBuffer([
	   -1.0,  1.0, -1.0, 
        1.0,  1.0,  1.0, 
       -1.0,  1.0,  1.0,
        1.0,  1.0,  1.0, 
       -1.0,  1.0, -1.0, 
        1.0,  1.0, -1.0, 
                
        -1.0, -1.0,  1.0,
        -1.0,  1.0, -1.0, 
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0, 
        -1.0, -1.0,  1.0,
        -1.0, -1.0, -1.0,
        
        1.0,  1.0,  1.0,
        1.0,  1.0, -1.0, 
        1.0, -1.0,  1.0,
        1.0, -1.0, -1.0,         
        1.0, -1.0,  1.0,
        1.0,  1.0, -1.0,
        
		1.0, -1.0, -1.0, 
        1.0,  1.0, -1.0, 
       -1.0,  1.0, -1.0, 

		1.0, -1.0, -1.0, 
       -1.0,  1.0, -1.0, 
       -1.0, -1.0, -1.0, 
       
       -1.0,  1.0,  1.0, 
        1.0,  1.0,  1.0, 
		1.0, -1.0,  1.0, 
		
	   -1.0,  1.0,  1.0, 
		1.0, -1.0,  1.0, 
	   -1.0, -1.0,  1.0, 
	], 3);

    var texture = tex('images/wall.png');

	function floor() {
		this.mMatrix = glm.mat4.create();
		this.draw = function() {
			gl.useProgram(program);
			program.bindMatrix(this.mMatrix);

			gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
			gl.vertexAttribPointer(program.a_Vertex, vertices.itemSize, gl.FLOAT, false, 0, 0);
			
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(program.u_Texure, 0);
            
			gl.drawArrays(gl.TRIANGLES, 0, vertices.numItems);
		}
	}

	return floor;
});
