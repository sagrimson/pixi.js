var core = require('../../core'),
    BlurXFilter = require('../blur/BlurXFilter'),
    BlurYFilter = require('../blur/BlurYFilter'),
    VoidFilter = require('../void/VoidFilter');

//var glslify  = require('glslify');

/**
 * The DropShadowFilter applies a Gaussian blur to an object.
 * The strength of the blur can be set for x- and y-axis separately.
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 */
function DropShadowFilter()
{
    core.Filter.call(this);

    this.blurXFilter = new BlurXFilter();
    this.blurYFilter = new BlurYFilter();

    this.defaultFilter = new VoidFilter();

    this.padding = 10;

    this._dirtyPosition = true;
    this._angle = 45 * Math.PI / 180;
    this._distance = 0;
    this.alpha = 0.75;
    this.hideObject = false;
    this.blendMode = core.BLEND_MODES.MULTIPLY;
}

DropShadowFilter.prototype = Object.create(core.Filter.prototype);
DropShadowFilter.prototype.constructor = DropShadowFilter;
module.exports = DropShadowFilter;

DropShadowFilter.prototype.apply = function (filterManager, input, output)
{
    var renderTarget = filterManager.getRenderTarget(true);

    //TODO - copyTexSubImage2D could be used here?
    if(this._dirtyPosition)
    {
        this._dirtyPosition = false;

        // this.blurYFilter.uniforms.offset.value[0] = Math.sin(this._angle) * this._distance;
        // this.blurYFilter.uniforms.offset.value[1] = Math.cos(this._angle) * this._distance;
    }

    this.blurXFilter.apply(filterManager, input, renderTarget, true);

   // filterManager.renderer.blendModeManager.setBlendMode(this.blendMode);

    this.blurYFilter.apply(filterManager, renderTarget, output);

   // filterManager.renderer.blendModeManager.setBlendMode(core.BLEND_MODES.NORMAL);

    if(!this.hideObject)
    {
       this.defaultFilter.apply(filterManager, input, output);
    }


    filterManager.returnRenderTarget(renderTarget);
};

Object.defineProperties(DropShadowFilter.prototype, {
    /**
     * Sets the strength of both the blurX and blurY properties simultaneously
     *
     * @member {number}
     * @memberOf PIXI.filters.DropShadowFilter#
     * @default 2
     */
    blur: {
        get: function ()
        {
            return this.blurXFilter.blur;
        },
        set: function (value)
        {
            this.blurXFilter.blur = this.blurYFilter.blur = value;
        }
    },

    /**
     * Sets the strength of the blurX property
     *
     * @member {number}
     * @memberOf PIXI.filters.DropShadowFilter#
     * @default 2
     */
    blurX: {
        get: function ()
        {
            return this.blurXFilter.blur;
        },
        set: function (value)
        {
            this.blurXFilter.blur = value;
        }
    },

    /**
     * Sets the strength of the blurY property
     *
     * @member {number}
     * @memberOf PIXI.filters.DropShadowFilter#
     * @default 2
     */
    blurY: {
        get: function ()
        {
            return this.blurYFilter.blur;
        },
        set: function (value)
        {
            this.blurYFilter.blur = value;
        }
    },

    /**
     * Sets the color of the shadow
     *
     * @member {number}
     * @memberOf PIXI.filters.DropShadowFilter#
     */
    color: {
        get: function ()
        {
            return  core.utils.rgb2hex( this.blurYFilter.uniforms.color.value );
        },
        set: function (value)
        {
        //    this.blurYFilter.uniforms.color.value = core.utils.hex2rgb(value);
        }
    },

    /**
     * Sets the alpha of the shadow
     *
     * @member {number}
     * @memberOf PIXI.filters.DropShadowFilter#
     */
    alpha: {
        get: function ()
        {
            return  this.blurYFilter.uniforms.alpha.value;
        },
        set: function (value)
        {
        //    this.blurYFilter.uniforms.alpha.value = value;
        }
    },

    /**
     * Sets the distance of the shadow
     *
     * @member {number}
     * @memberOf PIXI.filters.DropShadowFilter#
     */
    distance: {
        get: function ()
        {
            return  this._distance;
        },
        set: function (value)
        {
            this._dirtyPosition = true;
            this._distance = value;
        }
    },

    /**
     * Sets the angle of the shadow
     *
     * @member {number}
     * @memberOf PIXI.filters.DropShadowFilter#
     */
    angle: {
        get: function ()
        {
            return  this._angle;
        },
        set: function (value)
        {
            this._dirtyPosition = true;
            this._angle = value;
        }
    }
});