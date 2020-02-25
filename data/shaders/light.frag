#version 450 core

layout (location=0) in vec4 vClrCoord;
layout (location=1) in float Radius;
layout (location=2) in vec2 uv;

layout (location=0) out vec4 gLight;

layout (std140, binding = 0) uniform Light
{
  vec3 lightPosition;
  vec3 viewPosition;
  vec3 lightAmbient;
  vec3 lightDiffuse;
  vec3 lightSpecular;
};

uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform sampler2D gColorSpec;

void main () {
  vec4 preMultLightClr = vec4(vClrCoord.rgb * vClrCoord.a, vClrCoord.a);
  vec3 FragPos = texture(gPosition, uv).rgb;
  vec3 vNormal = texture(gNormal, uv).rgb;
  vec3 Diffuse = texture(gColorSpec, uv).rgb;
  float Specular = texture(gColorSpec, uv).a;
  
  vec3 viewDirection = normalize(viewPosition - FragPos);
  vec3 lightRay = normalize(lightPosition - FragPos);
  
  // ambient
  vec3 ambient = lightAmbient * Diffuse;
  
  // diffuse
  vec3 diffuseLight = max(dot(vNormal,lightRay), 0.0) * Diffuse * vClrCoord.rgb;
  vec3 halfwayDir = normalize(lightRay + viewDirection);
  float specularStrength = pow(max(dot(vNormal, halfwayDir), 0.0), 16.0);
  vec3 specularLight = vClrCoord.rgb * specularStrength * Specular;
    
  // compute light result
  vec3 resultLight = (ambient + diffuseLight + specularLight);
  
  gLight = vec4(resultLight, 1.0);
}