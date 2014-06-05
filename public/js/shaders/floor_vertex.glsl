uniform mat4 u_mvMatrix;
uniform mat4 u_pMatrix;
uniform mat3 u_nMatrix;
uniform mat4 u_mMatrix;
uniform vec3 u_DirectionLight;

attribute vec3 a_Vertex;
attribute vec3 a_Normal;
attribute vec2 a_TexturePosition;

varying vec2 v_TexturePosition;
varying float v_Weight;
varying vec3 v_Vertex;
varying vec3 v_Normal;

void main() {
    vec4 position = u_mvMatrix * vec4(a_Vertex, 1.0);
    gl_Position = u_pMatrix * position;
    vec4 tmp_vert = u_mMatrix * vec4(a_Vertex, 1.0);
    v_Vertex = tmp_vert.xyz;
    v_Normal = u_nMatrix * a_Normal;
    v_Weight = max(dot(v_Normal, u_DirectionLight), 0.0);
    v_TexturePosition = a_TexturePosition;


}
