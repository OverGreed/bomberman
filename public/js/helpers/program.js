define([
    'helpers/gl', 
    'helpers/shader',
    'matrix/projection',
    'matrix/camera',
    'glm',
    'config',
    'world/stores/lights'
    
], function(gl, shader, pMatrix, vMatrix, glm, config, lights) {
    'use strict';

    var mvMatrix = glm.mat4.create();
    var uniform = config.uniform;
    var nMatrix = glm.mat3.create();

    function bindMatrix(mMatrix) {
        glm.mat4.multiply(mvMatrix, vMatrix, mMatrix);
        
        gl.uniformMatrix4fv(this.u_mvMatrix, false, mvMatrix);
        gl.uniformMatrix4fv(this.u_pMatrix, false, pMatrix);
        gl.uniformMatrix4fv(this.u_mMatrix, false, mMatrix);
        if(this.u_nMatrix) {
            glm.mat3.normalFromMat4(nMatrix,mMatrix)
            gl.uniformMatrix3fv(this.u_nMatrix, false, nMatrix);
        }
    }
    
    function bindUniforms(){
        if(this.u_AmbientColor){
           gl.uniform3f(this.u_AmbientColor, uniform.ambientColor[0], uniform.ambientColor[1] , uniform.ambientColor[2]);
        }
        if(this.u_DirectionLight){
           gl.uniform3f(this.u_DirectionLight, uniform.directionLight[0], uniform.directionLight[1] , uniform.directionLight[2]);
        }
        if(this.u_DirectionLightColor){
           gl.uniform3f(this.u_DirectionLightColor, uniform.directionLightColor[0], uniform.directionLightColor[1] , uniform.directionLightColor[2]);
        }
    }

    function bindLights() {
        gl.uniform3fv(this.u_LightPosition, lights.getPosition());
        gl.uniform3fv(this.u_LightColor, lights.getColor());
    }

    function createProgram(vertexSource, fragmentSource, attributes, uniforms) {
        var vertex = shader(vertexSource, 'vertex');
        var fragment = shader(fragmentSource, 'fragment');

        if(vertex && fragment) {
            var program = gl.createProgram();

            gl.attachShader(program, vertex);
            gl.attachShader(program, fragment);
            gl.linkProgram(program);

            if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.log("Could not link shaders to the pragram.")
            }
            if(attributes) {
                attributes.forEach(function(attribute){
                    program[attribute] = gl.getAttribLocation(program, attribute);
                    gl.enableVertexAttribArray(program[attribute]);
                });
            }

            if(uniforms) {
                uniforms.forEach(function(uniform){
                    program[uniform] = gl.getUniformLocation(program, uniform);
                });
            }

            program.bindMatrix = bindMatrix;
            program.bindUniforms = bindUniforms;
            program.bindLights = bindLights;
            return program;
        }
        return null;
    }

    return createProgram;
});
