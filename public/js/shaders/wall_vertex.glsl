uniform mat4 u_mvMatrix;
uniform mat4 u_pMatrix;

attribute vec3 a_Vertex;
attribute vec2 a_TexturePosition;

varying vec2 v_TexturePosition;

void main() {
    v_TexturePosition = a_TexturePosition;
    gl_Position = u_pMatrix * u_mvMatrix * vec4(a_Vertex, 1.0);
}
