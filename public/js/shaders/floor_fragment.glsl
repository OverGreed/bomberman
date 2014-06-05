precision highp float;

uniform sampler2D u_Texture;

uniform vec3 u_AmbientColor;
uniform vec3 u_DirectionLight;
uniform vec3 u_DirectionLightColor;
uniform mat4 u_vMatrix;
uniform vec3 u_LightPosition[2];
uniform vec3 u_LightColor[2];

varying vec2 v_TexturePosition;
varying float v_Weight;
varying vec3 v_Vertex;
varying vec3 v_Normal;

void main() {
    vec4 texture_color = texture2D(u_Texture, v_TexturePosition);
    vec3 result_color = vec3(0.0,0.0,0.0);
    for(int i=0;i<2;i++){
        vec3 point = u_LightPosition[i];
        vec3 point_color = u_LightColor[i];
        
        vec3 light_direction = normalize(point - v_Vertex);
        float weight = max(dot(normalize(v_Normal), light_direction), 0.2);
        result_color += point_color * weight;
    }
    result_color /= 2.0;
    gl_FragColor =  vec4(texture_color.rgb * result_color, texture_color.a);
}
