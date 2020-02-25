#version 450 core
layout (location=0) out vec2 uv;

/* to use, bind an empty VAO and send a draw call for 4 vertices with TRIANGLE_STRIP */
/* from https://stackoverflow.com/a/51625078 */
void main()
{
    const vec2 positions[4] = vec2[](
        vec2(-1, -1),
        vec2(+1, -1),
        vec2(-1, +1),
        vec2(+1, +1)
    );
    const vec2 uvs[4] = vec2[](
        vec2(0, 0),
        vec2(1, 0),
        vec2(0, 1),
        vec2(1, 1)
    );

    uv = uvs[gl_VertexID];
    gl_Position = vec4(positions[gl_VertexID], 0.0, 1.0);
}
