/*  
    Slide Down 2000 for jQuery
    http://github.com/judas-christ/slide-down-2000
    MIT License
*/
(function (global, $) {
    'use strict';
    var _display = 'display',
        _position = 'position',
        _relative = 'relative',
        _static = 'static',
        _absolute = 'absolute',
        _empty = '',
        _none = 'none';
    var defaults = {

    };

    var setRelativeMaybe = function (index, elements) {
        var $els = $(elements);
        if ($els.css(_position) === _static) {
            $els.css(_position, _relative);
        }
    };

    var slideDown2000 = function (options) {
        if (this.length === 0) return this;

        options = $.extend({}, defaults, options);

        //hide elements initially
        var $elements = this.css(_display, _none);
        var $siblings = $elements.siblings();
        var $wrapper = $elements.parent();
        //check if we need to set position: relative on wrapper and siblings
        setRelativeMaybe(null, $wrapper);
        $siblings.each(setRelativeMaybe);

        var height = $wrapper.height();
        var totalHeight = 0;

        //get total height of all elements and set them to absolute
        $($elements.get().reverse()).each(function (i, el) {
            var $this = $(this);
            totalHeight += $this.css({
                display: _empty,
                position: _absolute,
                bottom: totalHeight,
                zIndex: -1,
                left: 0,
                right: 0
            }).outerHeight();
        });

        //animate wrapper
        options = $.extend(options, { height: height + totalHeight });
        $wrapper
            .height(height)
            .animate(options, function () {
                $elements.css({
                    position: _empty,
                    bottom: _empty,
                    zIndex: _empty,
                    left: _empty,
                    right: _empty
                });
                $wrapper.css({
                    height: _empty,
                    position: _empty
                });
            });

        return this;
    };
    $.fn.slideDown2000 = slideDown2000;
}(this, jQuery));