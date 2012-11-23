/*
 * jQuery Scribd Rotate 0.1
 * https://github.com/kernity/jquery-scribd-rotate
 *
 * It's NOT an official scribd.com plugin
 *
 * Copyright 2012, Khalid Yagoubi
 * http://www.khalidyagoubi.be
 *
 * Licensed under the MIT license:
 * http://creativecommons.org/licenses/MIT/
 */

(function ($) {
    'use strict';

    $.fn.scribdRotate = function(options) {

        var settings = $.extend({
            container: undefined,
            scribd_doc: undefined,
        }, options);

        var rotation = 0;
        var $this;

        var doRotation = function(value) {
            rotation += value;
            $('.outer_page').rotate(rotation);
            return false;
        }

        var onDocReady = function(e){
            $('#pager_rotate .rotate_right').live('click', function(){
                return doRotation(-90);
            });
            $('#pager_rotate .rotate_left').live('click', function(){
                return doRotation(+90);
            });

            var setupRotateButton = function(){
                $('#scribd_pager').append("<div class='pager_bottom' id='pager_rotate'>"+
                            "<div class='rotate_right'><span class='rotate_right_icon'></span></div>"+
                            "<div class='rotate_left'><span class='rotate_left_icon'></span></div>"+
                    "</div>");
                $(settings.container || settings.scribd_doc.getElement()).unbind('mouseover');
            }

            $(settings.container || settings.scribd_doc.getElement()).mouseover(function(){
                if ($('#scribd_pager') && $this.find("#pager_rotate").length == 0){
                    setupRotateButton();
                }
            });
        };

        return this.each(function(){
            // Do nothing when IE using jQuery.support
            // It will be fixed in future version. It can work on IE
            // as explained in jQueryRotate plugin by using VML or Canvas
            if (!$.support.cssFloat) return;

            $this = $(this);
            settings.scribd_doc.addParam('mode', 'list');
            settings.scribd_doc.seamless($this.attr('id'));
            settings.scribd_doc.addEventListener('docReady', onDocReady);
        });
    }
}(jQuery));