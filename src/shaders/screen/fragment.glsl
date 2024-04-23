#include  "../includes/simplexNoise4d.glsl"

varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

void main()
{
    float pixelSize = 300.;
    float scanLineFrequency = 100.0; // Adjust this value to increase or decrease the density of scan lines
    float scanLineIntensity = 0.2; // Adjust this value to control the visibility of scan lines

    vec3 color = vec3(0., 0., 0.);
    vec3 pixelColor = vec3(0.6, 0., 0.1);
    vec2 pictureUv = vUv;
    pictureUv = vec2(
        floor(vUv.x * pixelSize) / pixelSize,
        floor(vUv.y * pixelSize) / pixelSize
    );
    pictureUv.x += 0.28;
    vec4 textureImage = texture(uTexture, pictureUv);
    color = textureImage.xyz * 0.3;
    color = mix(vec3(0.), color, textureImage.a);

    float scanLine = sin(vUv.y * scanLineFrequency + uTime);
    color *= 1.0 + scanLine * scanLineIntensity;
    color *= 1.8 + sin(uTime * 2.) * 0.5;


    gl_FragColor = vec4(color, 1.0);


}