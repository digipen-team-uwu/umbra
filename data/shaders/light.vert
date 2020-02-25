#version 450 core

layout (location=0) in vec3 vVertexPosition;

// instancing data
layout (location=4) in float rotation;
layout (location=5) in vec4 translation;
layout (location=6) in vec3 scale;
layout (location=13) in float lightRadius;
layout (location=14) in vec4 lightClr;

layout (location=0) out vec4 vClrCoord;
layout (location=1) out float Radius;
layout (location=2) out vec2 uv;

layout (std140, binding = 1) uniform Camera
{
  mat4 projection;
  mat4 view;
};

void main() {
    const vec2 uvs[4] = vec2[](
        vec2(0, 0),
        vec2(1, 0),
        vec2(0, 1),
        vec2(1, 1)
    );
    uv = uvs[gl_VertexID];
    
  // construct position matrix
  mat4 translatemat = mat4(1.0);
  vec3 trans = translation.xyz; //+ abs(scale / 2);
  translatemat[3].xyz = trans;
  
  // construct rotation matrix
  mat4 rotatemat = mat4(1.0);
  rotatemat[0].xy = vec2(cos(rotation),sin(rotation));
  rotatemat[1].xy = vec2(-sin(rotation),cos(rotation));

  // construct scale matrix
  mat4 scalemat = mat4(1.0);
  scalemat[0].x = scale.x;
  scalemat[1].y = scale.y;
  scalemat[2].z = scale.z;
  
  // construct model matrix
  mat4 model = translatemat * rotatemat * scalemat;
  
  // output color
  vClrCoord = lightClr;
  
  Radius = lightRadius;
  
  gl_Position = projection * view * model * vec4(vVertexPosition, 1.0);
}
