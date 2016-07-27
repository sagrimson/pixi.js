var core = require('../../core');

var generateGlowVertSource  = require('./generateGlowVertSource');
var generateGlowFragSource  = require('./generateGlowFragSource');

// @see https://github.com/substack/brfs/issues/25
var glslify  = require('glslify');

/**
 * The GlowFilter class lets you apply a 5x4 matrix transformation on the RGBA
 * color and alpha values of every pixel on your displayObject to produce a result
 * with a new set of RGBA color and alpha values. It's pretty powerful!
 *
 * ```js
 *  var glow = new PIXI.GlowFilter();
 *  container.filters = [glow];
 *  glow.contrast(2);
 * ```
 * @author Clément Chenebault <clement@goodboydigital.com>
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 */
function GlowFilter(gl)
{
    // this.vertexSrc = generateGlowVertSource(kernelSize, true);
    // this.fragmentSrc = generateGlowFragSource(kernelSize, true);

    core.Filter.call(this,
        // vertex shader
        generateGlowVertSource(),
        // fragment shader
        generateGlowFragSource()
    );

    this.passes = 2;
    this.strength = 10;
    this.uniforms.t = 0;
    this.padding = 30;
}

GlowFilter.prototype = Object.create(core.Filter.prototype);
GlowFilter.prototype.constructor = GlowFilter;
module.exports = GlowFilter;

GlowFilter.prototype.apply = function (filterManager, input, output, clear)
{
    // this.uniforms.strength = (1/output.size.width) * (output.size.width/input.size.width); /// // *  2 //4//this.strength / 4 / this.passes * (input.frame.width / input.size.width);

    // screen space!
    // this.uniforms.strength *= this.strength;
    // this.uniforms.strength /= this.passes;

    filterManager.applyFilter(this, input, output, clear);
};

Object.defineProperties(GlowFilter.prototype, {
    /**
     * Sets the matrix of the color matrix filter
     *
     * @member {number[]}
     * @memberof PIXI.filters.GlowFilter#
     * @default [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
     */
    // matrix: {
    //     get: function ()
    //     {
    //         return this.uniforms.m;
    //     },
    //     set: function (value)
    //     {
    //         this.uniforms.m = value;
    //     }
    // },
    // color: {
    //     get: function ()
    //     {
    //         return this.uniforms.u_color;
    //     },
    //     set: function (value)
    //     {
    //         this.uniforms.u_color = value;
    //     }
    // }
});
