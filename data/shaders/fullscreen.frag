#version 450 core
layout (location=0) in vec2 uv;

layout (location=0) out vec4 fFragClr;

uniform sampler2D screenTexture;

void main()
{
  fFragClr = texture(screenTexture, uv);
}
