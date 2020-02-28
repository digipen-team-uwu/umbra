#version 450 core
layout (location=0) in vec2 uv;

layout (location=0) out vec4 fFragClr;

uniform sampler2D gColorSpec;
uniform vec3 ambientClr;

void main()
{
  fFragClr = vec4(ambientClr, 1) * vec4(texture(gColorSpec, uv).rgb, 1);
}
