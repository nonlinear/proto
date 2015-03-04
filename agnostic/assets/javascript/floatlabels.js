/**
 * FloatLabels
 * Version: 1.0
 * URL: http://clubdesign.github.io/floatlabels.js/
 * Description:
 * Author: Marcus Pohorely ( http://www.clubdesign.at )
 * Copyright: Copyright 2013 / 2014 http://www.clubdesign.at
 */

;(function ( $, window, document, undefined ) {

        var pluginName = "floatlabel",
            defaults = {
                slideInput                      : false,
                labelStartTop                   : '0px',
                labelEndTop                     : '2px',
                transitionDuration              : 0.2,
                transitionEasing                : 'ease-out',
                labelClass                      : '',
                typeMatches                     : /text|password|email|number|search|url/
            };

        function Plugin ( element, options ) {

            this.$element       = $(element);
            this.settings       = $.extend( {}, defaults, options );

            this.init();

        }

        Plugin.prototype = {

            init: function () {

                var self          = this,
                    settings      = this.settings,
                    transDuration = settings.transitionDuration,
                    transEasing   = settings.transitionEasing,
                    thisElement   = this.$element;

                var animationCss = {
                    '-webkit-transition'            : 'all ' + transDuration + 's ' + transEasing,
                    '-moz-transition'               : 'all ' + transDuration + 's ' + transEasing,
                    '-o-transition'                 : 'all ' + transDuration + 's ' + transEasing,
                    '-ms-transition'                : 'all ' + transDuration + 's ' + transEasing,
                    'transition'                    : 'all ' + transDuration + 's ' + transEasing
                };

                if( thisElement.prop('tagName').toUpperCase() !== 'INPUT' ) { return; }

                if( !settings.typeMatches.test( thisElement.attr('type') ) ) { return; }



                var elementID = thisElement.attr('id');

                if( !elementID ) {
                    elementID = Math.floor( Math.random() * 100 ) + 1;
                    thisElement.attr('id', elementID);
                }

                var placeholderText     = thisElement.attr('placeholder');
                var floatingText        = thisElement.data('label');
                var extraClasses        = thisElement.data('class');

                if( !extraClasses ) { extraClasses = ''; }

                if( !placeholderText || placeholderText === '' ) { placeholderText = "You forgot to add placeholder attribute!"; }
                if( !floatingText || floatingText === '' ) { floatingText = placeholderText; }

                this.inputPaddingTop    = parseFloat( thisElement.css('padding-top') ) + 10;

                // changed "before" to "after" so we can use blue labels
                thisElement.wrap('<div class="floatlabel-wrapper" style="position:relative"></div>');
                thisElement.after('<label for="' + elementID + '" class="label-floatlabel ' + settings.labelClass + ' ' + extraClasses + '">' + floatingText + '</label>');

                // changed "prev" to "next" so it will position more easily
                this.$label = thisElement.next('label');
                this.$label.css({
                    'position'                      : 'absolute',
                    'top'                           : settings.labelStartTop,
                    //'left'                          : thisElement.css('padding-left'),
                    'display'                       : 'none',
                    '-moz-opacity'                  : '0',
                    '-khtml-opacity'                : '0',
                    '-webkit-opacity'               : '0',
                    'opacity'                       : '0'
                });

                if( !settings.slideInput ) {

                    thisElement.css({
                        'padding-top'                   : this.inputPaddingTop,
                    });

                }

                thisElement.on('keyup blur change', function( e ) {
                    self.checkValue( e );
                });


                window.setTimeout( function() {

                    self.$label.css( animationCss );
                    self.$element.css( animationCss );

                }, 100);

                this.checkValue();

            },

            checkValue: function( e ) {

                if( e ) {

                    var keyCode         = e.keyCode || e.which;
                    if( keyCode === 9 ) { return; }

                }

                var thisElement = this.$element,
                    currentFloat = thisElement.data('float');

                if( thisElement.val() !== "" ) {
                  thisElement.data('float', '1');
                }
                if( thisElement.val() === "" ) {
                  thisElement.data('float', '0');
                }

                if( thisElement.data('float') === '1' && currentFloat !== '1' ) {
                    this.showLabel();
                }

                if( thisElement.data('float') === '0' && currentFloat !== '0' ) {
                  if($(".mce_inline_error").length > 0)
                    {
                      // error is showing
                      // so we don't hide the label
                    }
                  else
                    {
                      // error is not showing
                      this.hideLabel();
                    }
                }

            },
            showLabel: function() {

                var self = this;

                self.$label.css({
                    'display'                       : 'block'
                });

                window.setTimeout(function() {

                    self.$label.css({
                        'top'                           : self.settings.labelEndTop,
                        '-moz-opacity'                  : '1',
                        '-khtml-opacity'                : '1',
                        '-webkit-opacity'               : '1',
                        'opacity'                       : '1'
                    });

                    if( self.settings.slideInput ) {

                        self.$element.css({
                            'padding-top'               : self.inputPaddingTop
                        });

                    }

                }, 50);

            },

            hideLabel: function() {

                var self = this;

                self.$label.css({
                    'top'                           : self.settings.labelStartTop,
                    '-moz-opacity'                  : '0',
                    '-khtml-opacity'                : '0',
                    '-webkit-opacity'               : '0',
                    'opacity'                       : '0'
                });

                if( self.settings.slideInput ) {

                    self.$element.css({
                        'padding-top'               : parseFloat( self.inputPaddingTop ) - 10
                    });

                }

                window.setTimeout(function() {
                    self.$label.css({
                        'display'                       : 'none'
                    });
                }, self.settings.transitionDuration * 1000);

            }
        };

        $.fn[ pluginName ] = function ( options ) {
            return this.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                }
            });
        };

})( jQuery, window, document );





