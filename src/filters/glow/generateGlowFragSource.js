var fragTemplate = [
    'precision mediump float;',
    'varying vec2 vTextureCoord;',
    'uniform sampler2D uSampler;',
    'uniform float t;',
    'void main(void)',
    '{',
    '   float shine = 1. - smoothstep(0.15, 0.35, abs(t - vTextureCoord.x));',
    // '   vec4 color = texture2D(uSampler, vTextureCoord) * shine;',
    '   gl_FragColor = texture2D(uSampler, vTextureCoord) + texture2D(uSampler, vTextureCoord) * shine;',
    '   float average = 1.;',
    '   float intensity = 0.5;',
    '}'

].join('\n');

var generateFragGlowSource = function () {
    var fragSource = fragTemplate;

    return fragSource;
};

module.exports = generateFragGlowSource;
