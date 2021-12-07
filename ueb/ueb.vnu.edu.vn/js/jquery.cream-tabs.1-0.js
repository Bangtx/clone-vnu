;
(function ($, window, document, undefined) {
    var pluginName = 'creamTabs',
        defaults = {
            menuType: 'horizontal',
            xPosition: 'left',
            xCoor: 0,
            yPosition: 'top',
            yCoor: 0,
            autosizeAnimation: 'on',
            mainColor: '#22aabe',
            borderLight: '#27c7de',
            borderDark: '#187481',
            btnHeight: 60,
            btnWidth: 60,
            iconSize: 16,
            iconColor: '#ffffff',
            iconActiveColor: '#22aabe',
            btnActiveColor: '#fbfbfb',
            hoverSwitch: 'on',
            btnHoverColor: '#ffffff',
            btnHoverTime: 500,
            btnHoverOpacityLevel: 0.2,
            panelHeight: 35,
            leftIcon: 'icon-chevron-up',
            rightIcon: 'icon-chevron-down',
            piconSize: 12,
            piconColor: '#ffffff',
            conBoxWidth: 500,
            conBoxHeight: 300,
            conBoxFadeSpeed: 800,
            slideDownSpeed: 500,
            slideUpSpeed: 500,
            autoPlay: 'on',
            autoPlayTime: 2000,
            iconPause: 'icon-pause',
            iconPauseColor: '#22aabe',
            iconPauseSize: '18px',
            iconPauseInSpeed: 500,
            iconPauseOutSpeed: 500
        };

    function CreamTabs(element, options) {
        this.element = $(element);
        var ele = this;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.current = 0;
        this.timer_slides = true;
        this.init(ele)
    };
    CreamTabs.prototype.variables = function (ele) {
        this.disNone = {
            'display': 'none'
        };
        (this.options.menuType === 'vertical') ? this.z = 1 : this.z =
            0;
        (this.options.xPosition === 'left') ? this.x = 1 : this.x = 0;
        (this.options.yPosition === 'top') ? this.y = 1 : this.y = 0;
        this.li = this.element.children();
        this.liLen = this.element.children()
            .length;
        this.btn = this.li.children('a');
        this.btn.css({
            'width': this.options.btnWidth,
            'height': this.options.btnHeight,
            'line-height': this.options.btnHeight + 'px',
            'background-color': this.options.mainColor,
            'color': this.options.iconColor,
            'font-size': this.options.iconSize
        });
        this.btnH = this.btn.innerHeight();
        this.btnW = this.btn.innerWidth();
        this.ulContent = this.li.children('ul');
        this.ulContent.css({
            'width': this.options.conBoxWidth,
            'height': this.options.conBoxHeight
        });
        this.liSlides = this.ulContent.children('li');
        this.createElements(ele);
        this.panelM = this.ulContent.find('.zl_panel');
        this.panelChild = this.panelM.children();
        this.panelChild.css({
            'font-size': this.options.piconSize,
            'line-height': this.options.panelHeight + 'px',
            'height': this.options.panelHeight,
            'color': this.options.piconColor
        });
        this.panelM.children('span')
            .each(function () {
            var amount_li = $(this)
                .parent()
                .siblings('li')
                .length;
            $(this)
                .children('.zl_am_col')
                .html(' / ' + amount_li)
        });
        this.hands = this.panelM.children('.zl_btn_nav');
        this.panelM.children('[data-zlhands = zl_left_hand]')
            .css('border-right-color', this.options.borderDark)
            .end()
            .children('[data-zlhands = zl_right_hand]')
            .css('border-left-color', this.options.borderLight)
    };
    CreamTabs.prototype.createElements = function (ele) {
        this.panel = $(
            '<div class="zl_panel"><div class="zl_btn_nav" data-zlhands="zl_left_hand"><i class="' +
            this.options.leftIcon +
            '"></i></div><div class="zl_btn_nav" data-zlhands="zl_right_hand"><i class="' +
            this.options.rightIcon +
            '"></i></div><span class="zl_count_li"><span class="zl_ac_col"></span><span class="zl_am_col"></span></span></div>');
        //this.pauseIcon = $('<div class="zl_pause_icon" style="color:' +
        //    this.options.iconPauseColor + ';font-size:' + this.options
        //    .iconPauseSize + ';"><i class="' + this.options.iconPause +
        //    '"></i></div>');
        this.ulContent.append(this.panel, this.pauseIcon)
            .children('.zl_panel')
            .css({
            'height': this.options.panelHeight,
            'background-color': this.options.mainColor
        });
        if (this.options.hoverSwitch === 'on') {
            this.overlayBtn = $('<div class="zl_overlay_btn"></div>');
            this.btn.prepend(this.overlayBtn)
                .children('.zl_overlay_btn')
                .css({
                'width': this.btnW,
                'height': this.btnH,
                'background-color': this.options.btnHoverColor
            })
        }
    };
    CreamTabs.prototype.eleCenter = function () {
        this.eleObj = {};
        this.winH = $(window)
            .height();
        this.winW = $(window)
            .width();
        this.h = this.element.innerHeight();
        this.w = this.element.innerWidth();
        this.xCal = this.winW / 2 - this.w / 2;
        this.yCal = this.winH / 2 - this.h / 2;
        this.eleObj[this.options.xPosition] = (typeof (this.options.xCoor) ===
            'number') ? this.options.xCoor : this.xCal;
        this.eleObj[this.options.yPosition] = (typeof (this.options.yCoor) ===
            'number') ? this.options.yCoor : this.yCal;
        (this.options.autosizeAnimation === 'on') ? this.element.stop(
            true)
            .animate(this.eleObj, 200) : this.element.css(this.eleObj)
    };
    CreamTabs.prototype.startPosition = function (ele) {
        this.ulContent.css(this.disNone);
        this.panelM.css({
            'bottom': '0',
            'border-top-color': this.options.borderDark,
            'border-top-style': 'solid',
            'border-top-width': '1px'
        });
        if (this.z === 1) {
            this.li.css('float', 'none');
            this.btn.css({
                'border-top-color': this.options.borderDark,
                'border-top-style': 'solid',
                'border-top-width': '1px',
                'border-bottom-color': this.options.borderLight,
                'border-bottom-style': 'solid',
                'border-bottom-width': '1px'
            });
            (this.y === 0) ? this.ulContent.css('bottom', '0') : this
                .ulContent.css('top', '0');
            if (this.x === 1) {
                this.ulContent.css('left', this.btnW)
            } else if (this.x === 0) {
                this.ulContent.css('right', this.btnW)
            }
        } else if (this.z === 0) {
            this.li.css('float', 'left');
            if (this.x === 1) {
                this.ulContent.css('left', '0')
            } else if (this.x === 0) {
                this.ulContent.css('right', '0')
            };
            this.btn.css({
                'border-left-color': this.options.borderDark,
                'border-left-style': 'solid',
                'border-left-width': '1px',
                'border-right-color': this.options.borderLight,
                'border-right-style': 'solid',
                'border-right-width': '1px'
            });
            if (this.y === 0) {
                this.ulContent.css('bottom', this.btnH)
            } else if (this.y === 1) {
                this.ulContent.css('top', this.btnH)
            }
        };
        this.ulH = this.ulContent.innerHeight();
        this.ulW = this.ulContent.innerWidth()
    };
    CreamTabs.prototype.hoverBtn = function (ele) {
        this.btn.on('mouseenter.CreamHover', function (event) {
            var himself = $(this),
                overlay = himself.find('.zl_overlay_btn');
            if (event.type === 'mouseenter') {
                overlay.stop(true)
                    .fadeTo(ele.options.btnHoverTime, ele.options.btnHoverOpacityLevel, function () {
                    $(this)
                        .css(ele.disNone)
                })
            }
        })
    };
    CreamTabs.prototype.clickBtn = function (ele) {
        this.btn.on('click.CreamClick', function (e) {
            var a = $(this),
                ul = a.siblings('ul'),
                li_len = ul.children('li')
                    .length;
            ele.current = 0;
            ele.liSlides.css('margin-top', '');
            ul.find('.zl_ac_col')
                .html('1');
            if (a.data('zl_active')) {
                a.css({
                    'background-color': ele.options.mainColor,
                    'color': ele.options.iconColor
                })
                    .siblings('ul')
                    .css(ele.disNone);
                if (ele.options.autoPlay === 'on') {
                    clearInterval(ele.timer_slides)
                };
                a.data('zl_active', false)
            } else {
                a.css({
                    'background-color': ele.options.btnActiveColor,
                    'color': ele.options.iconActiveColor
                });
                ul.stop(true, true)
                    .fadeTo(ele.options.conBoxFadeSpeed, 1)
                    .parent('li')
                    .siblings('li')
                    .children('ul')
                    .css(ele.disNone)
                    .siblings('a')
                    .css({
                    'background-color': ele.options.mainColor,
                    'color': ele.options.iconColor
                })
                    .data('zl_active', false);
                if (ele.options.autoPlay === 'on') {
                    clearInterval(ele.timer_slides);
                    ele.timer_slides = setInterval(function () {
                        ul.find('[data-zlhands = zl_right_hand]')
                            .trigger('click.CreamHands')
                    }, ele.options.autoPlayTime)
                };
                a.data('zl_active', true)
            };
            e.preventDefault()
        })
    };
    CreamTabs.prototype.slider = function (data, li_len) {
        var current = this.current;
        current += (~~(data === 'zl_right_hand') || -1);
        this.current = (current < 0) ? li_len - 1 : current % li_len;
        return current
    };
    CreamTabs.prototype.init = function (ele) {
        this.variables(ele);
        this.startPosition(ele);
        $(window)
            .on('resize.CreamResize', function () {
            clearTimeout(timer_resize);
            var timer_resize = setTimeout(function () {
                ele.eleCenter()
            }, 300)
        });
        this.eleCenter();
        this.hands.on('click.CreamHands', function (e) {
            var hand = $(this),
                li_len = hand.parent()
                    .siblings('li')
                    .length;
            ele.slider(hand.data('zlhands'), li_len);
            hand.parent()
                .find('.zl_ac_col')
                .html(ele.current + 1)
                .end()
                .siblings('li')
                .eq(0)
                .stop(true)
                .animate({
                'margin-top': -ele.options.conBoxHeight * ele.current
            }, 500)
        });
        this.clickBtn(ele);
        if (ele.options.autoPlay === 'on') {
            this.ulContent.on('mouseenter mouseleave.CreamPause', function (
                event) {
                var himself = $(this),
                    this_pause = himself.find('.zl_pause_icon');
                if (event.type === 'mouseenter') {
                    this_pause.stop(true)
                        .fadeTo(ele.options.iconPauseInSpeed, 1);
                    clearInterval(ele.timer_slides)
                } else if (event.type === 'mouseleave') {
                    this_pause.stop(true)
                        .fadeTo(ele.options.iconPauseOutSpeed, 0);
                    ele.timer_slides = setInterval(function () {
                        himself.find('[data-zlhands = zl_right_hand]')
                            .trigger('click.CreamHands')
                    }, ele.options.autoPlayTime)
                }
            })
        };
        if (this.options.hoverSwitch === 'on') {
            this.hoverBtn(ele)
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new CreamTabs(
                    this, options))
            }
        })
    }
})(jQuery, window, document);