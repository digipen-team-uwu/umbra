#version 450 core

layout (location=0) in vec4 vClrCoord;
layout (location=1) in float Radius;
layout (location=2) in vec4 lightPos;
layout (location=3) in vec4 viewPos;

layout (location=0) out vec4 gLight;

uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform sampler2D gColorSpec;

layout (std140, binding = 0) uniform Window
{
  vec4 viewPosition1;
  vec2 window;
};

void main () {
  vec2 uv = gl_FragCoord.xy / vec2(window.x, window.y);
  vec3 preMultLightClr = vClrCoord.rgb * vClrCoord.a;
  vec3 FragPos = texture(gPosition, uv).rgb;
  vec3 vNormal = texture(gNormal, uv).rgb;
  vec3 Diffuse = texture(gColorSpec, uv).rgb;
  float Specular = texture(gColorSpec, uv).a;
  
  vec3 viewDirection = normalize(viewPosition1.xyz - FragPos);
  vec3 lightRay = normalize(lightPos.xyz - FragPos);
  
  //float alpha = 15;
  //
  //vec3 I_a = vec3(0.1,0.1,0.1);
  //vec3 ambient = I_a * Diffuse;
  //vec3 H = normalize(lightRay + viewDirection);
  //vec3 I = vec3(5.0,5.0,5.0);
  //vec3 N = vNormal;
  //vec3 L = lightRay;
  //vec3 K_s = vec3(0.01,0.01,0.01);
  //vec3 F_L_H = K_s + (vec3(1,1,1) - K_s)* pow((1 - max(dot(L, H), 0)),5);
  //float _1_over_L_H = 1.0f / pow(max(dot(L,H),0), 2);
  //float D_H = ((alpha + 2) / (2 * 3.1415926))*(pow(max(dot(N, H),0), alpha));
  //
  //vec3 BRDF = (Diffuse / 3.1415926) + (F_L_H * _1_over_L_H * D_H) / 4;
  //
  //BRDF *= I * max(dot(N,L),0);
  //
  //I = ambient + BRDF;

  // diffuse
  vec3 diffuseLight = max(dot(vNormal,lightRay), 0.0) * Diffuse * preMultLightClr;
  vec3 reflectedLight = 2 * max(dot(vNormal, lightRay), 0) * vNormal - lightRay;
  vec3 spec = Specular * pow(max(dot(reflectedLight, viewDirection), 0.0), 16.f) * preMultLightClr;
  //vec3 halfwayDir = normalize(lightRay + viewDirection);
  //float specularStrength = pow(max(dot(vNormal, halfwayDir), 0.0), 16.0);
  //vec3 specularLight = preMultLightClr * spec * Specular;
    
  // compute light result
  vec3 resultLight = (diffuseLight + spec);
  
  gLight = vec4(resultLight, 1);
}
