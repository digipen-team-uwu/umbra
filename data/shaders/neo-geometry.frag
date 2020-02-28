#version 450 core
layout (location = 0) out vec4 gPosition;
layout (location = 1) out vec4 gNormal;
layout (location = 2) out vec4 gColorSpec;

layout (location=0) in vec4 vClrCoord;
layout (location=1) in vec2 vTexCoord;
layout (location=2) in vec3 vNormal;
layout (location=3) in vec3 FragPos;
layout (location=4) flat in uint layer;

uniform sampler2DArray myTexture;

void main()
{    
  vec4 texel = texture(myTexture, vec3(vTexCoord, layer));
  vec4 normalMap = texture(myTexture, vec3(vTexCoord, layer + 1));
  vec3 premultipliedClrCoord = vClrCoord.rgb * vClrCoord.a;
  
  if (texel.a < 0.05)
    discard;
    
  // store the fragment position vector in the first gbuffer texture
  gPosition = vec4(FragPos.xyz, 1.0);
  // also store the per-fragment normals into the gbuffer
  gNormal = normalMap;
  // and the diffuse per-fragment color
  gColorSpec.rgb = texel.rgb * premultipliedClrCoord;
  // store specular intensity in gColorSpec's alpha component
  gColorSpec.a = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
  
}
