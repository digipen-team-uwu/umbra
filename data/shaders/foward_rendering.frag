#version 450 core

layout (location=0) in vec4 vClrCoord;
layout (location=1) in vec2 vTexCoord;
layout (location=2) flat in uint layer;

layout (location=0) out vec4 fFragClr;

uniform sampler2DArray myTexture;

// main
void main () {
  vec4 texel = texture(myTexture, vec3(vTexCoord, layer));

  if (texel.a < 0.05)
    discard;

  texel.rgb *= texel.a;
  fFragClr = texel * vClrCoord;
}