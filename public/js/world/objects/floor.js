define([
    'helpers/program',
    'text!shaders/floor_vertex.glsl',
    'text!shaders/floor_fragment.glsl',
    'buffer/array',
    'buffer/indices',
    'helpers/gl',
    'glm',
    'helpers/texture',
    'helpers/timer'
], function(createProgram, vertex, fragment, arrayBuffer, indicesBuffer, gl, glm, tex, timer) {
    'use strict';

    var program =  createProgram(vertex, fragment, [
        'a_Vertex',
        'a_Normal',
        'a_TexturePosition'
    ],[
        'u_mvMatrix',
        'u_pMatrix',
        'u_nMatrix',
        'u_mMatrix',
        'u_Texture',

        //'u_AmbientColor',
      //  'u_DirectionLight',
      //  'u_DirectionLightColor',

        'u_LightPosition',
        'u_LightColor'
    ]);
    console.log(program);
    var vertices = arrayBuffer([
        // Top face
        -1.0,  0.0, -1.0,
        -1.0,  0.0,  1.0,
         1.0,  0.0,  1.0,
         1.0,  0.0, -1.0,
    ], 3);

    var normals = arrayBuffer([
        // Top face
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
    ], 3);

    var texturePosition = arrayBuffer([
        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
    ], 2);

    var indices  = indicesBuffer([
        0, 1, 2,      0, 2, 3,    // Front face
    ]);

    var texture = tex('images/floor.png');

    function floor() {
        this.mMatrix = glm.mat4.create();
        this.draw = function() {
            gl.useProgram(program);
            program.bindMatrix(this.mMatrix);
            program.bindUniforms();
            program.bindLights();
            
            gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
            gl.vertexAttribPointer(program.a_Vertex, vertices.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, normals);
            gl.vertexAttribPointer(program.a_Normal, normals.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, texturePosition);
            gl.vertexAttribPointer(program.a_TexturePosition, texturePosition.itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(program.u_Texure, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
            gl.drawElements(gl.TRIANGLES, indices.numItems, gl.UNSIGNED_SHORT, 0);
        }
    }

    return floor;
});
