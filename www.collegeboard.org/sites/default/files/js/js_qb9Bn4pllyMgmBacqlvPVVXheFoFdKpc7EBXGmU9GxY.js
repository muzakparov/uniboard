/**
 * Created with JetBrains PhpStorm.
 * User: mhoresh
 * Date: 10/16/13
 * Time: 9:59 AM
 * To change this template use File | Settings | File Templates.
 */


(function ($) {


    /***
     *
     * @param options
     * @returns {fn}
     */
    $.fn.divideLists = function (options) {

        // Merge options
        options = $.extend({
            itemEl: "li"
        }, options);

        // Find the total number of blocks
        var itemCount, wrapperType, maxItems, $listItems;

        wrapperType = this.prop('tagName');
        $listItems = this.children(options.itemEl);
        itemCount = $listItems.length;
        maxItems = parseInt(itemCount / 2);


        // create a new block/list
        $list1 = $( '<' + wrapperType + '/>').addClass('dividedList firstList clearfix');
        $list2 = $('<' + wrapperType + '/>').addClass('dividedList secondList clearfix');

        $.each($listItems, function (index, el) {
            if (index < maxItems) {
                $(this).appendTo($list1);
            } else {
                $(this).appendTo($list2);
            }
        });

        this.append($list1);
        this.append($list2);
        return this;
    };

    /***
     *
     * Built around the bxSlider, but with less functionality.
     * -------------------------------------------------------
     *
     * - Removed auto resize, will check screen site only before
     *   advancing to the next slide to reduce the possibility of
     *   running out of memory on IE.
     *
     * - Improved accessibility.
     *
     *
     * @param userOptions
     */
    $.fn.cbHeroCarousel = function (userOptions) {
        // Slider's name space
        var slider = {},
            el = this,
            sliderEl = $(el).find('ul'),
            slides = sliderEl.find('li'),
            activeViewPort;


        // hide carousel
        sliderEl.hide();

        slider.options = $.extend({}, {

            // Default options
            // Slide options
            speedSpeed: 500,
            pauseDuration: 5000,
            autoAdvance: true,
            pauseOnHover: true,
            pauseOnFocus: true,
            adaptiveSlides: false, // will check if additional images were provided for tablet/mobile

            // Touch Settings
            touchEnabled: true,
            swipeThreshold: 50,
            oneToOneTouch: true,
            preventDefaultSwipeX: true,
            preventDefaultSwipeY: false,

            // Pager
            pager: false,
            pagerNumbers: false,
            slideCount: false, // ie. 1/3 with the following markup: <span sr-only>slide </span> <span class="current-slide">x</span> <span class="sep">/</span> <span class="number-of-slides">y</span>

            // Controls
            controls: true,
            nextText: 'Next',
            prevText: 'Previous',

            // Callbacks
            onSliderLoad: function () {
            },
            onSlideBefore: function () {
            },
            onslideAfter: function () {
            },
            onSlideNext: function () {
            },
            onslidePrev: function () {
            },

            // Debugging Options
            debug: false         // Show debug log message in console

        }, userOptions);


        // Marge Options

        var debugLog = function (msg) {
            if (slider.options.debug == true) {
                for (arg in arguments) {
                    if (window.console != "undefined") {
                        console.log(arguments[arg]);
                    }
                }
            }
        }

        var init = function () {


            debugLog("** Initializing Carousel")
            debugLog("   Current config Options:", slider.options, "");
            // update view port
            activeViewPort = $(window).checkViewport();
            // calculate few things based on current view port.
            slider.options.slideWidth = el.width();
            slider.options.numberOfSlides = slides.length;

            // sets the first slide as the active one.
            slider.active = { index: 1 };
            slider.working = false;
            slider.controls = {};
            slider.numberOfSlides = slides.length;

            slider.viewport = el;

            //  updating slider object with the slides info
            slider.slides = [];
            for (var i = 0; i < slides.length; i++) {
                var slideImage = $('img', slides[i]);
                slider.slides[i] = {
                    el: slides[i],
                    img: $('img', slides[i]),
                    defaultImg: slideImage.attr('src'),
                    alternativeImages: {
                        tabletImg: {
                            enabled: slideImage.data('table-image-src') ? true : false,
                            src: slideImage.data('table-image-src')
                        },
                        mobileImg: {
                            enabled: slideImage.data('mobile-image-src') ? true : false,
                            src: slideImage.data('mobile-image-src')
                        }
                    }


                };

                delete(slideImage);

            }

            domSetup();
            resizeCarousel({'force':true});
            updateControls();

            sliderEl.fadeIn();

            debugLog("** Completed Carousel Initialization\n");

        };

        /***
         * This function creates the controls and pagination.
         */
        var domSetup = function () {

            debugLog("**** DOM Setup");

            // creating and adding carousel controls (next/prev)
            slider.nextBtn = $('<a href="#" class="carousel-next"><span class="sr-only">Next Slide <span class="nextSlide"></span> of ' + slider.numberOfSlides + '</span></a>');
            slider.prevBtn = $('<a href="#" class="carousel-prev"><span class="sr-only">Previous Slide <span class="prevSlide"></span> of ' + slider.numberOfSlides + '</span></a>');
            el.append(slider.prevBtn, slider.nextBtn);

            debugLog("****** Next/Previous buttons added");

            // creating the slide count markup
            if (slider.options.slideCount) {
                slider.slideCount = $('<div class="slideCount"><span class="sr-only">slide </span> <span class="current-slide"></span> <span class="sep">/</span> <span class="number-of-slides">' + slider.numberOfSlides + '</span></div>');
                el.append(slider.slideCount);
                debugLog("****** Slide count added");
            }


            // Creating and adding carousel pager.
            if (slider.options.pager) {
                slider.pager = $('<ul />')
                    .addClass('hero-pager')
                    .appendTo(el);
                debugLog("****** Pager Added");

                slides.each(function (i) {
                    var currSlide = i + 1;

                    var pagerLink = $('<li/>').appendTo(slider.pager).append('<a href="#"/>').find('a');

                    if (slider.options.pagerNumbers) {
                        pagerLink.html('<span class="sr-only">Go to slide number </span>' + currSlide);
                    } else {
                        pagerLink.html('<span class="sr-only">Go to slide number ' + currSlide + '</span>');
                    }

                    pagerLink.on('click', function (e) {
                        e.preventDefault();
                        if (i < slider.active.index) {
                            sliderEl.goToSlide(i, "prev");
                        } else {
                            sliderEl.goToSlide(i, "next");
                        }
                    });
                });
            }

            // remove tab-index from read-more links, script
            // will manually enable the read more link on active slide.

            slides.find('.read-more').attr('tabindex', "-1");

            slider.nextBtn.on('click', function (e) {
                e.preventDefault();

                sliderEl.goToNextSlide();
            });
            slider.prevBtn.on('click', function (e) {
                e.preventDefault();
                sliderEl.goToPrevSlide();
            });

            // Adding data-slider-number attribute to all slides
            slides.each(function (i) {
                $(this).attr('data-slider-number', i + 1);
            });

            // on window resize
            $(window).on('resize', function () {
                setTimeout(resizeCarousel,500);
            });

            if (slider.options.touchEnabled) {
                initTouch();
            }

            debugLog("**** Completed DOM Setup")
            tmpSlider1 = sliderEl;

        };

        var updateControls = function () {

            debugLog("Updating Carousel Controls");

            // Update accessibility text on next/previous buttons
            // first slide
            if (slider.active.index == 1) {
                $('.nextSlide', slider.nextBtn).text(slider.active.index + 1);
                $('.prevSlide', slider.prevBtn).text(slider.numberOfSlides);
            }

            // last slide
            else if (slider.active.index == slider.numberOfSlides) {
                $('.nextSlide', slider.nextBtn).text(1);
                $('.prevSlide', slider.prevBtn).text(slider.active.index - 1);
            }

            // all other instances
            else {
                $('.nextSlide', slider.nextBtn).text(slider.active.index + 1);
                $('.prevSlide', slider.prevBtn).text(slider.active.index - 1);
            }


            pubSlides = slides;

            // Make current read more button tab-able.
            slides.find('.read-more').attr('tabindex', "-1");
            $('li[data-slider-number=' + slider.active.index + '] .read-more').attr('tabindex', 0);

            // assign inactive class to all inactive carousels (prevents AT from reading content)
            slides.addClass('inactive');
            $('li[data-slider-number=' + slider.active.index + ']').removeClass('inactive');
            // Update pager
            if (slider.options.pager) {
                testPager = slider.pager;
                exposedSlider = slider;
                slider.pager.eq(slider.active - 1).addClass('active');
            }

            // Update slides count element
            if (slider.options.slideCount) {
                $('.current-slide', slider.slideCount).text(slider.active.index);
            }

            debugLog("**** Completed updating Carousel Controls\n");
        };

        sliderEl.goToSlide = function (slideIndex, direction) {

            debugLog("Moving Slide");
            debugLog("------------");

            var moveBy = 0,
                infinite = false;

            // if current slide, or currently animating don't change slide
            if (slider.working || slider.active.index == slideIndex) return;

            // start transition
            slider.working = true;

            // get current slider width
            slider.options.slideWidth = getSliderWidth();


            slider.oldIndex = slider.active.index;

            slides.removeClass('inactive');

            debugLog("Active slide: \t\t" + slider.oldIndex);
            debugLog("Next Slide: \t\t" + slideIndex);

            if (slideIndex == 0 || slideIndex > slider.options.numberOfSlides) {

                infinite = true;
                moveBy = slider.options.slideWidth;
            } else {
                moveBy = Math.abs(slideIndex - slider.oldIndex) * slider.options.slideWidth;
            }

            debugLog("Infinite move: \t\t" + infinite);

            debugLog('move by: \t\t\t' + moveBy + "px");
            if (direction == 'next') {
                debugLog("Slide Direction: \tright");

                if (infinite) {
                    // move first item to the last place
                    sliderEl.append($("[data-slider-number=1]", sliderEl).clone());
                }

                sliderEl.animate({'margin-left': "-=" + moveBy + "px"}, 1000, function () {

                    slider.active.index = slideIndex;

                    if (infinite) {
                        slider.active.index = 1;
                        // remove temp item
                        $('li:last-child', sliderEl).remove();
                        // move to last item
                        sliderEl.css({'margin-left': 0});
                    }
                    slider.working = false;

                    updateControls();
                    debugLog(slider.active.index);
                });

            } else {
                debugLog("Slide Direction: \tLeft");

                // Infinite carousel to the left;
                if (infinite) {
                    // move last item to the first place
                    sliderEl.css({'margin-left': "-=" + moveBy + "px"});

                    sliderEl.prepend($("[data-slider-number=" + slider.options.numberOfSlides + "]", sliderEl).clone());
                }

                sliderEl.animate({'margin-left': "+=" + moveBy + "px"}, 1000, function () {
                    slider.active.index = slideIndex;

                    if (infinite) {
                        slider.active.index = slider.options.numberOfSlides;
                        // remove temp item
                        $('li:first-child', sliderEl).remove();
                        // move to last item
                        sliderEl.css({'margin-left': (-1 * (slider.options.numberOfSlides - 1) * slider.options.slideWidth)});

                        updateControls();
                        debugLog("callback from left animation " + slider.active.index);
                    }
                    updateControls();
                    slider.working = false;

                });
            }


        };

        sliderEl.goToNextSlide = function () {

            debugLog("-- Moving to next slide --\n");

            // check which slide should come next
            this.goToSlide(slider.active.index + 1, 'next');
        }

        sliderEl.goToPrevSlide = function () {

            debugLog("-- Moving to previous slide --\n");
            // check which slide is the previous one
            this.goToSlide(slider.active.index - 1, 'prev');

        }


        var resizeCarousel = function (args) {

            debugLog("**** Resizing Carousel");
            var newOffset;
            var forceResize = (typeof(args) != 'undefined' && typeof(args.force) != 'undefined' && args.force == true) ? true : false;
            debugLog("Force Resize? "+forceResize);
            // get view port name,
            var newActiveViewPort = $(window).checkViewport();
            // checks if resized window is different in size from the previous one.
            if ((newActiveViewPort != activeViewPort) || newActiveViewPort == 'mobile' || forceResize) {

                // viewport has changed, update variable.
                activeViewPort = newActiveViewPort;


                debugLog("update carousel sizes, new viewport is "+newActiveViewPort+ ", active viewport is " + activeViewPort);

                // is slider adaptive?
                if (slider.options.adaptiveSlides) {


                    $.each(slides, function (i) {
                        var currentSlide = slider.slides[i];
                        if (activeViewPort == 'desktop' ||
                            (activeViewPort == 'tablet' && !currentSlide.alternativeImages.tabletImg.enabled) ||
                            (activeViewPort == 'mobile' && !currentSlide.alternativeImages.mobileImg.enabled)) {
                            // There are no mobile/tablet specific images, use default
                            currentSlide.img.attr('src', currentSlide.defaultImg);
                        } else {
                            if (activeViewPort == 'mobile' && currentSlide.alternativeImages.mobileImg.enabled) {
                                currentSlide.img.attr('src', currentSlide.alternativeImages.mobileImg.src);
                            }
                            else if (activeViewPort == 'tablet' && currentSlide.alternativeImages.tabletImg.enabled) {
                                currentSlide.img.attr('src', currentSlide.alternativeImages.tabletImg.src);
                            }
                        }

                    });

                }

                // need to update slides width regardless of view port
                // update slides width
                slider.options.slideWidth = getSliderWidth();
                slides.width(slider.options.slideWidth);

                // update slider width, based on number of slides, and their width
                sliderEl.width(slider.options.slideWidth * slides.length + 2000);

                newOffset = (slider.active.index - 1) * slider.options.slideWidth;

                // set focus on active item
                sliderEl.css({"margin-left": "-" + newOffset + "px"});


            }

            debugLog("**** Carousel Resizing Complete \n")

        };


        var getSliderWidth = function () {
            debugLog("Element Width: "+el.width());
            return el.width();
        };


        // Touch Events...
        var initTouch = function () {
            slider.touch = {
                start: {x: 0, y: 0},
                end: {x: 0, y: 0}
            }

            slider.viewport.bind('touchstart', onTouchStart);
        }

        var onTouchStart = function (e) {

            if (slider.working) {
                e.preventDefault();
            } else {
                // record the original position when touch starts
                slider.touch.originalPos = el.position();
                var orig = e.originalEvent;
                // record the starting touch x, y coordinates
                slider.touch.start.x = orig.changedTouches[0].pageX;
                slider.touch.start.y = orig.changedTouches[0].pageY;
                // bind a "touchend" event to the viewport
                slider.viewport.bind('touchend', onTouchEnd);
            }


        }

        var onTouchEnd = function (e) {
            var orig = e.originalEvent;
            var value = 0;
            // record end x, y positions
            slider.touch.end.x = orig.changedTouches[0].pageX;
            slider.touch.end.y = orig.changedTouches[0].pageY;
            // if fade mode, check if absolute x distance clears the threshold

            var distance = 0;
            // calculate distance and el's animate property

            distance = slider.touch.end.x - slider.touch.start.x;
            value = slider.touch.originalPos.left;

            // if not infinite loop and first / last slide, do not attempt a slide transition

            // check if distance clears threshold
            if (Math.abs(distance) >= slider.options.swipeThreshold) {
                distance < 0 ? sliderEl.goToNextSlide() : sliderEl.goToPrevSlide();
            }

            slider.viewport.unbind('touchend', onTouchEnd);
        }


        // Initiate Carousel
        // needs to set a timeout since in IE it takes a little time until the css3 media queries polyfill takes a little itme to respond
        setTimeout(init, 1);
    };

    /***
     *
     * Returns the name of the view port based on bootstrap 3 device dimensions
     * Mobile < 768
     * Table > 768 && < 992
     * Desktop > 992
     *
     * @returns {string}
     */
    $.fn.checkViewport = function () {

        /*
         In order to check the view port width we need to take into account the possibility
         that a scroll bar shows on the right side.  so we will make overflow hidden for a split second
         grab the width, and make overflow visible again.
         */

        $('body').css('overflow', 'hidden');
        var windowWidth = $(window).width();
        $('body').css('overflow', 'visible');

        if (windowWidth < 768) {
            return "mobile"
        } else if ((windowWidth >= 768) && (windowWidth < 1024)) {
            return  "tablet";
        } else if ((windowWidth >= 1024) && (windowWidth < 1250)) {
            return  "desktop";
        } else {
            return  "oversized";
        }

    };
    $.fn.getUrlPara = function (key) {
        key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
        var match = location.search.match(new RegExp(key + "=([^&]+)(&|$)", "g"));
        var results = [];
        if (match) {
            $.each(match, function (i) {
                results.push(decodeURIComponent(match[i].match(new RegExp(key + "=([^&]+)(&|$)"))[1]));

            });
        }
        return results;
    }

    $.fn.getArrayParamsURL = function (key) {
        var str = window.location.href;
        var match = str.match(/[^=&?]+\s*=\s*[^&#]*/g);
        var obj = {};
        if (match != null && match != undefined) {
            for ( var i = match.length; i--; ) {
              var spl = match[i].split("=");
              var name = spl[0].replace(/\[\d+]/i, "");
              var value = spl[1];

              obj[name] = obj[name] || [];
              obj[name].push(value);
            }
        }
        return obj[key];
    }


    $.fn.equalHeight = function(){
        var highestHight = 0;
        $(this).each(function(){
            highestHight = Math.max(highestHight,$(this).height());
        });

        $(this).css('height', highestHight);
    };



    /***
     * Check user input for SPACE, ENTER, or CLICK - Used for accessibility scripts where onClick doesn't cover Enter or Space keypresses
     * Sharkey - 08/27/2014
     *
     * Receives pressed key value {int}
     *
     * Return TRUE Spacebar, Enter, or Mouse Click events
     * Return FALSE for everything else
     *
     * @returns {boolean}
     */
    $.fn.keyTrigger = function (e) { //
        var isTriggered = false;

        if(e.which === 32 || e.which === 1){
            isTriggered = true; // they pressed ENTER, SPACE, or mouse clicked
        }

        return isTriggered;
    };


$(document).ready(function () {

    /*
     * CollegeBoard VideoJS Analytics
     *
     * 2014-02-24
     * Mike Sharkey
     */

    // Initialize the VIDEO JS Analytics
    var cbVideoAnalytics = function (w, techName) {
        var player = this,
            s = w.s;
        isMediaOpen = false, // used to delay the play event to ensure the video is loaded
            cbVideo = {};

        // STORE FOR VIDEO INFORMATION
        cbVideo.currentSrc = player.currentSrc();
        cbVideo.duration = 0;
        cbVideo.techName = techName;
        cbVideo.bigButton = false;
        // Check and see if the big play button is available on load,
        // otherwise, it might be using a mobile player
        if ($('.vjs-big-play-button').is(':visible')) {
            cbVideo.bigButton = true;
        }

        // PLAY EVENT
        player.on("play", function () {
            $('.vjs-big-play-button').hide();
            setTimeout(function () {
                cbVideo.duration = player.duration();
                if (!isMediaOpen) {
                    s.Media.open(cbVideo.currentSrc, cbVideo.duration, cbVideo.techName);
                    isMediaOpen = true;
                }
                //send analytics status
                s.Media.play(cbVideo.currentSrc, player.currentTime());

            }, 1000);
        });
        // END PLAY EVENT

        // PAUSE EVENT
        player.on("pause", function () {
            s.Media.stop(cbVideo.currentSrc, player.currentTime());
        });
        // END PAUSE EVENT

        // WAITING EVENT
        player.on("waiting", function () {
            if (
                (cbVideo.techName === 'Flash') &&
                    (player.currentTime() !== 0) &&
                    (Math.ceil(player.currentTime()) === Math.ceil(cbVideo.duration))
                ) {
                player.currentTime(0);
                player.pause();
                $('.vjs-loading-spinner').hide();
                $('.vjs-big-play-button').show();
            }
        });
        // END WAITING EVENT

        // ENDED EVENT
        player.on("ended", function () {
            s.Media.stop(cbVideo.currentSrc, player.currentTime());
            s.Media.close(cbVideo.currentSrc);

            // For consistency across all browsers
            // please be kind, rewind
            player.currentTime(0);
            player.pause();
            $('.vjs-loading-spinner').hide();
            if (cbVideo.bigButton) {
                // Only show big button if it existed onLoad
                $('.vjs-big-play-button').show();
            }
        });
        // END ENDED EVENT

        // ERROR EVENT
        player.on("error", function () {
            // log errors
        });
        // END ERROR EVENT

    };

    var startAnalytics = function () {
        var player, techName = "Html5"; // placeholder

        // attach the plugin to VideoJS
        videojs.plugin('cbVideoAnalytics', cbVideoAnalytics);

        // Go Through All VideoJS videos
        $('.video-js').each(function () {

            // Pass the ID of the container of the video
            player = videojs($(this).attr("id"));

            // HTML5 will be "video" Flash will be "object"
            if ($('.video-js object')) {
                techName = "Flash";
            }
            // Trigger the plugin for this video
            player.cbVideoAnalytics(window, techName);
        });

    }; // END startAnalytics();

    // If we have a video, start the plugin code
    if (typeof(videojs) != 'undefined') {
        startAnalytics();
    }
    // END VIDEO ANALYTICS CODE

});


/***
 *
 * Min-width - Relocated
 * ---------------------
 * https://github.com/edenspiekermann/minwidth-relocate
 *
 * Syntax
 * ------
 * to relocate:
 * relocate(breakpoint, domObjectToRelocate, domObjectRelocateTo, deskTopFirst)
 *
 * to do something on resize:
 * minwidth(width, forwardCallback, backwardCallback, desktopFirst);
 */
(function (win) {
    var getWindowWidth = function () {
        // Get window width, code adapted from jQuery
        var docwindowProp = doc.documentElement["clientWidth"];
        return doc.compatMode === "CSS1Compat" && docwindowProp
            || doc.body && doc.body["clientWidth"]
            || docwindowProp;
    }

    var doc = win.document,
        instances = [],
        oldWidth = 0,
        windowWidth = getWindowWidth();

    var resizeCallback = function () {
        windowWidth = getWindowWidth();
        var i, instance;
        for (i = 0; i < instances.length; i++) {
            instance = instances[i];
            // Check Forward:
            if (instance.old < instance.wdt &&
                windowWidth >= instance.wdt &&
                instance.fwd) {
                instance.fwd();
            }
            // Check Backward:
            if (instance.old >= instance.wdt &&
                windowWidth < instance.wdt &&
                instance.bck) {
                instance.bck();
            }
            instance.old = windowWidth;
        }
    }

    if (win.addEventListener) {
        win.addEventListener("resize", resizeCallback, false);
    } else {
        win.attachEvent("onresize", resizeCallback);
    }

    // This is the function that is exported into the global namespace
    // The paramaters are:
    // * the width at which the callbacks are called
    // * the callback going from below to above the width, this is
    //   initially called if the screen width is wider that "width"
    // * the callback going back from above the width to below it
    // * if the fourth paramater is passed as "true", the forward callback
    //   is initally not called, but the backward callback is called
    //   if the screenwidth is smaller than width.
    win.minwidth = function (width, forwardCallback, backwardCallback, desktopFirst) {
        instances.push({
            wdt: width,
            old: desktopFirst ? 1E9 : 0,
            fwd: forwardCallback,
            bck: backwardCallback
        });
        resizeCallback();
    }

})(this);
relocate = function (width, elements, destinationElement, desktopFirst) {
    // ensure that we use an array-like argument, NodeList and HTMLCollection work as well
    if (elements.nodeName) elements = [elements];
    var placeHolders = [],
        els = [],
        parentEl, el, i,
        l = elements.length;
    // first, create a non-live copy of the elements
    // this avoids nasty bugs when elements are removed and added again
    for (i = l - 1; i >= 0; i--) {
        els.push(elements[i]);
    }
    var forwardFunction = function () {
        for (i = 0; i < l; i++) {
            parentEl = els[i].parentNode;
            if (placeHolders[i] === undefined) {
                placeHolders[i] = document.createElement("span");
                parentEl.insertBefore(placeHolders[i], els[i]);
            }
            el = parentEl.removeChild(els[i]);
            destinationElement.insertBefore(el, destinationElement.firstChild);
        }
    }
    var backwardFunction = function () {
        for (i = 0; i < l; i++) {
            parentEl = els[i].parentNode;
            el = parentEl.removeChild(els[i]);
            placeHolders[i].parentNode.insertBefore(el, placeHolders[i]);
        }
    }
    // then create a object that operates on it:
    if (!desktopFirst) {
        minwidth(width, forwardFunction, backwardFunction);
    } else {
        minwidth(width, backwardFunction, forwardFunction, desktopFirst);
    }
}




    $.fn.customSelect = function(settings) {

        // Swap Encodings
        var toggleEntities = function(text) {

            var k, tagsList = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;'
            };

            // generate a regex object based on a list of tags, if the flag set
            // to true, it will generate a regex for te the tag, otherwise it
            // will generate a list of entities
            var buildRegex = function(tagFlag) {

                var items = [];
                if (tagFlag) {
                    for (k in tagsList) {
                        items.push(k);
                    }
                } else {
                    for (k in tagsList) {
                        items.push(tagsList[k]);
                    }
                }

                return new RegExp(items.join('|'), 'g');
            };

            var checkRegex = function(pattern, str) {
                return pattern.test(str)
            };

            var replaceToEntity = function(tag) {
                return tagsList[tag] || tag;
            };

            var replaceToTag = function(entity) {
                for (var k in tagsList) {
                    if (tagsList[k] == entity)
                        return k;
                }
                return entity;
            };


            // are do we have html entities?
            if (checkRegex(buildRegex(false), text)) {
                // convert entities to tags
                return (text.replace(buildRegex(false), replaceToTag));

            } else {
                // no entities, convert tags to entities ...
                return (text.replace(buildRegex(true), replaceToEntity));
            }

        };

        var config = {
            replacedClass: 'replaced', // Class name added to replaced selects
            customSelectClass: 'custom-select', // Class name of the (outer) inserted span element
            activeClass: 'active', // Class name assigned to the fake select when the real select is in hover/focus state
            wrapperElement: '<div class="custom-select-container" />' // Element that wraps the select to enable positioning
        };
        if (settings) {
            $.extend(config, settings);
        }
        this.each(function() {
            var select = $(this),
                multiselect = ( !! select.attr("multiple"));
            if (!multiselect) {
                select.addClass(config.replacedClass);
                select.wrap(config.wrapperElement);
                var update = function() {
                    var val = toggleEntities($('option:selected', this).text());
                    span.find('span span').html('<i class="custom-select-arrow"></i>' + val);
                };
                // Update the fake select when the real select's value changes
                select.change(update);
                /* Gecko browsers don't trigger onchange until the select closes, so
                 * changes made by using the arrow keys aren't reflected in the fake select.
                 * See https://bugzilla.mozilla.org/show_bug.cgi?id=126379.
                 * IE normally triggers onchange when you use the arrow keys to change the selected
                 * option of a closed select menu. Unfortunately jQuery doesn't seem able to bind to this.
                 * As a workaround the text is also updated when any key is pressed and then released
                 * in all browsers, not just in Firefox.
                 */
                select.keyup(update);
                /* Create and insert the spans that will be styled as the fake select
                 * To prevent (modern) screen readers from announcing the fake select in addition to the real one,
                 * aria-hidden is used to hide it.
                 */

                // Three nested spans? The only way I could get text-overflow:ellipsis to work in IE7.
                var span = $('<span class="' + config.customSelectClass + '" aria-hidden="true"><span><span><i class="custom-select-arrow"></i>' + toggleEntities($('option:selected', this).text()) + '</span></span></span>');
                select.after(span);

                // Change class names to enable styling of hover/focus states
                select.bind({
                    mouseenter: function() {
                        span.addClass(config.activeClass);
                    },
                    mouseleave: function() {
                        span.removeClass(config.activeClass);
                    },
                    focus: function() {
                        span.addClass(config.activeClass);
                    },
                    blur: function() {
                        span.removeClass(config.activeClass);
                    }
                });
            }

        });
    };

})(jQuery);
;
/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
* Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */(function(t){t.extend(t.fn,{validate:function(e){if(!this.length)return e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."),void 0;var i=t.data(this[0],"validator");return i?i:(this.attr("novalidate","novalidate"),i=new t.validator(e,this[0]),t.data(this[0],"validator",i),i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(e){i.settings.submitHandler&&(i.submitButton=e.target),t(e.target).hasClass("cancel")&&(i.cancelSubmit=!0),void 0!==t(e.target).attr("formnovalidate")&&(i.cancelSubmit=!0)}),this.submit(function(e){function s(){var s;return i.settings.submitHandler?(i.submitButton&&(s=t("<input type='hidden'/>").attr("name",i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),i.settings.submitHandler.call(i,i.currentForm,e),i.submitButton&&s.remove(),!1):!0}return i.settings.debug&&e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,s()):i.form()?i.pendingRequest?(i.formSubmitted=!0,!1):s():(i.focusInvalid(),!1)})),i)},valid:function(){if(t(this[0]).is("form"))return this.validate().form();var e=!0,i=t(this[0].form).validate();return this.each(function(){e=e&&i.element(this)}),e},removeAttrs:function(e){var i={},s=this;return t.each(e.split(/\s/),function(t,e){i[e]=s.attr(e),s.removeAttr(e)}),i},rules:function(e,i){var s=this[0];if(e){var r=t.data(s.form,"validator").settings,n=r.rules,a=t.validator.staticRules(s);switch(e){case"add":t.extend(a,t.validator.normalizeRule(i)),delete a.messages,n[s.name]=a,i.messages&&(r.messages[s.name]=t.extend(r.messages[s.name],i.messages));break;case"remove":if(!i)return delete n[s.name],a;var u={};return t.each(i.split(/\s/),function(t,e){u[e]=a[e],delete a[e]}),u}}var o=t.validator.normalizeRules(t.extend({},t.validator.classRules(s),t.validator.attributeRules(s),t.validator.dataRules(s),t.validator.staticRules(s)),s);if(o.required){var l=o.required;delete o.required,o=t.extend({required:l},o)}return o}}),t.extend(t.expr[":"],{blank:function(e){return!t.trim(""+t(e).val())},filled:function(e){return!!t.trim(""+t(e).val())},unchecked:function(e){return!t(e).prop("checked")}}),t.validator=function(e,i){this.settings=t.extend(!0,{},t.validator.defaults,e),this.currentForm=i,this.init()},t.validator.format=function(e,i){return 1===arguments.length?function(){var i=t.makeArray(arguments);return i.unshift(e),t.validator.format.apply(this,i)}:(arguments.length>2&&i.constructor!==Array&&(i=t.makeArray(arguments).slice(1)),i.constructor!==Array&&(i=[i]),t.each(i,function(t,i){e=e.replace(RegExp("\\{"+t+"\\}","g"),function(){return i})}),e)},t.extend(t.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:t([]),errorLabelContainer:t([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(t)).hide())},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(t,e){(9!==e.which||""!==this.elementValue(t))&&(t.name in this.submitted||t===this.lastElement)&&this.element(t)},onclick:function(t){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).addClass(i).removeClass(s):t(e).addClass(i).removeClass(s)},unhighlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).removeClass(i).addClass(s):t(e).removeClass(i).addClass(s)}},setDefaults:function(e){t.extend(t.validator.defaults,e)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:t.validator.format("Please enter no more than {0} characters."),minlength:t.validator.format("Please enter at least {0} characters."),rangelength:t.validator.format("Please enter a value between {0} and {1} characters long."),range:t.validator.format("Please enter a value between {0} and {1}."),max:t.validator.format("Please enter a value less than or equal to {0}."),min:t.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function e(e){var i=t.data(this[0].form,"validator"),s="on"+e.type.replace(/^validate/,"");i.settings[s]&&i.settings[s].call(i,this[0],e)}this.labelContainer=t(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||t(this.currentForm),this.containers=t(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var i=this.groups={};t.each(this.settings.groups,function(e,s){"string"==typeof s&&(s=s.split(/\s/)),t.each(s,function(t,s){i[s]=e})});var s=this.settings.rules;t.each(s,function(e,i){s[e]=t.validator.normalizeRule(i)}),t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",e).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",e),this.settings.invalidHandler&&t(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),t.extend(this.submitted,this.errorMap),this.invalid=t.extend({},this.errorMap),this.valid()||t(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(e){e=this.validationTargetFor(this.clean(e)),this.lastElement=e,this.prepareElement(e),this.currentElements=t(e);var i=this.check(e)!==!1;return i?delete this.invalid[e.name]:this.invalid[e.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),i},showErrors:function(e){if(e){t.extend(this.errorMap,e),this.errorList=[];for(var i in e)this.errorList.push({message:e[i],element:this.findByName(i)[0]});this.successList=t.grep(this.successList,function(t){return!(t.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){t.fn.resetForm&&t(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e=0;for(var i in t)e++;return e},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{t(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}},findLastActive:function(){var e=this.lastActive;return e&&1===t.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var e=this,i={};return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in i||!e.objectLength(t(this).rules())?!1:(i[this.name]=!0,!0)})},clean:function(e){return t(e)[0]},errors:function(){var e=this.settings.errorClass.replace(" ",".");return t(this.settings.errorElement+"."+e,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=t([]),this.toHide=t([]),this.currentElements=t([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(e){var i=t(e).attr("type"),s=t(e).val();return"radio"===i||"checkbox"===i?t("input[name='"+t(e).attr("name")+"']:checked").val():"string"==typeof s?s.replace(/\r/g,""):s},check:function(e){e=this.validationTargetFor(this.clean(e));var i,s=t(e).rules(),r=!1,n=this.elementValue(e);for(var a in s){var u={method:a,parameters:s[a]};try{if(i=t.validator.methods[a].call(this,n,e,u.parameters),"dependency-mismatch"===i){r=!0;continue}if(r=!1,"pending"===i)return this.toHide=this.toHide.not(this.errorsFor(e)),void 0;if(!i)return this.formatAndAdd(e,u),!1}catch(o){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+u.method+"' method.",o),o}}return r?void 0:(this.objectLength(s)&&this.successList.push(e),!0)},customDataMessage:function(e,i){return t(e).data("msg-"+i.toLowerCase())||e.attributes&&t(e).attr("data-msg-"+i.toLowerCase())},customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor===String?i:i[e])},findDefined:function(){for(var t=0;arguments.length>t;t++)if(void 0!==arguments[t])return arguments[t];return void 0},defaultMessage:function(e,i){return this.findDefined(this.customMessage(e.name,i),this.customDataMessage(e,i),!this.settings.ignoreTitle&&e.title||void 0,t.validator.messages[i],"<strong>Warning: No message defined for "+e.name+"</strong>")},formatAndAdd:function(e,i){var s=this.defaultMessage(e,i.method),r=/\$?\{(\d+)\}/g;"function"==typeof s?s=s.call(this,i.parameters,e):r.test(s)&&(s=t.validator.format(s.replace(r,"{$1}"),i.parameters)),this.errorList.push({message:s,element:e}),this.errorMap[e.name]=s,this.submitted[e.name]=s},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){var t,e;for(t=0;this.errorList[t];t++){var i=this.errorList[t];this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message)}if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return t(this.errorList).map(function(){return this.element})},showLabel:function(e,i){var s=this.errorsFor(e);s.length?(s.removeClass(this.settings.validClass).addClass(this.settings.errorClass),s.html(i)):(s=t("<"+this.settings.errorElement+">").attr("for",this.idOrName(e)).addClass(this.settings.errorClass).html(i||""),this.settings.wrapper&&(s=s.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(s).length||(this.settings.errorPlacement?this.settings.errorPlacement(s,t(e)):s.insertAfter(e))),!i&&this.settings.success&&(s.text(""),"string"==typeof this.settings.success?s.addClass(this.settings.success):this.settings.success(s,e)),this.toShow=this.toShow.add(s)},errorsFor:function(e){var i=this.idOrName(e);return this.errors().filter(function(){return t(this).attr("for")===i})},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},validationTargetFor:function(t){return this.checkable(t)&&(t=this.findByName(t.name).not(this.settings.ignore)[0]),t},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(e){return t(this.currentForm).find("[name='"+e+"']")},getLength:function(e,i){switch(i.nodeName.toLowerCase()){case"select":return t("option:selected",i).length;case"input":if(this.checkable(i))return this.findByName(i.name).filter(":checked").length}return e.length},depend:function(t,e){return this.dependTypes[typeof t]?this.dependTypes[typeof t](t,e):!0},dependTypes:{"boolean":function(t){return t},string:function(e,i){return!!t(e,i.form).length},"function":function(t,e){return t(e)}},optional:function(e){var i=this.elementValue(e);return!t.validator.methods.required.call(this,i,e)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,this.pending[t.name]=!0)},stopRequest:function(e,i){this.pendingRequest--,0>this.pendingRequest&&(this.pendingRequest=0),delete this.pending[e.name],i&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(t(this.currentForm).submit(),this.formSubmitted=!1):!i&&0===this.pendingRequest&&this.formSubmitted&&(t(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(e){return t.data(e,"previousValue")||t.data(e,"previousValue",{old:null,valid:!0,message:this.defaultMessage(e,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(e,i){e.constructor===String?this.classRuleSettings[e]=i:t.extend(this.classRuleSettings,e)},classRules:function(e){var i={},s=t(e).attr("class");return s&&t.each(s.split(" "),function(){this in t.validator.classRuleSettings&&t.extend(i,t.validator.classRuleSettings[this])}),i},attributeRules:function(e){var i={},s=t(e),r=s[0].getAttribute("type");for(var n in t.validator.methods){var a;"required"===n?(a=s.get(0).getAttribute(n),""===a&&(a=!0),a=!!a):a=s.attr(n),/min|max/.test(n)&&(null===r||/number|range|text/.test(r))&&(a=Number(a)),a?i[n]=a:r===n&&"range"!==r&&(i[n]=!0)}return i.maxlength&&/-1|2147483647|524288/.test(i.maxlength)&&delete i.maxlength,i},dataRules:function(e){var i,s,r={},n=t(e);for(i in t.validator.methods)s=n.data("rule-"+i.toLowerCase()),void 0!==s&&(r[i]=s);return r},staticRules:function(e){var i={},s=t.data(e.form,"validator");return s.settings.rules&&(i=t.validator.normalizeRule(s.settings.rules[e.name])||{}),i},normalizeRules:function(e,i){return t.each(e,function(s,r){if(r===!1)return delete e[s],void 0;if(r.param||r.depends){var n=!0;switch(typeof r.depends){case"string":n=!!t(r.depends,i.form).length;break;case"function":n=r.depends.call(i,i)}n?e[s]=void 0!==r.param?r.param:!0:delete e[s]}}),t.each(e,function(s,r){e[s]=t.isFunction(r)?r(i):r}),t.each(["minlength","maxlength"],function(){e[this]&&(e[this]=Number(e[this]))}),t.each(["rangelength","range"],function(){var i;e[this]&&(t.isArray(e[this])?e[this]=[Number(e[this][0]),Number(e[this][1])]:"string"==typeof e[this]&&(i=e[this].split(/[\s,]+/),e[this]=[Number(i[0]),Number(i[1])]))}),t.validator.autoCreateRanges&&(e.min&&e.max&&(e.range=[e.min,e.max],delete e.min,delete e.max),e.minlength&&e.maxlength&&(e.rangelength=[e.minlength,e.maxlength],delete e.minlength,delete e.maxlength)),e},normalizeRule:function(e){if("string"==typeof e){var i={};t.each(e.split(/\s/),function(){i[this]=!0}),e=i}return e},addMethod:function(e,i,s){t.validator.methods[e]=i,t.validator.messages[e]=void 0!==s?s:t.validator.messages[e],3>i.length&&t.validator.addClassRules(e,t.validator.normalizeRule(e))},methods:{required:function(e,i,s){if(!this.depend(s,i))return"dependency-mismatch";if("select"===i.nodeName.toLowerCase()){var r=t(i).val();return r&&r.length>0}return this.checkable(i)?this.getLength(e,i)>0:t.trim(e).length>0},email:function(t,e){return this.optional(e)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)},url:function(t,e){return this.optional(e)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)},date:function(t,e){return this.optional(e)||!/Invalid|NaN/.test(""+new Date(t))},dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)},number:function(t,e){return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},creditcard:function(t,e){if(this.optional(e))return"dependency-mismatch";if(/[^0-9 \-]+/.test(t))return!1;var i=0,s=0,r=!1;t=t.replace(/\D/g,"");for(var n=t.length-1;n>=0;n--){var a=t.charAt(n);s=parseInt(a,10),r&&(s*=2)>9&&(s-=9),i+=s,r=!r}return 0===i%10},minlength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||r>=s},maxlength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||s>=r},rangelength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||r>=s[0]&&s[1]>=r},min:function(t,e,i){return this.optional(e)||t>=i},max:function(t,e,i){return this.optional(e)||i>=t},range:function(t,e,i){return this.optional(e)||t>=i[0]&&i[1]>=t},equalTo:function(e,i,s){var r=t(s);return this.settings.onfocusout&&r.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){t(i).valid()}),e===r.val()},remote:function(e,i,s){if(this.optional(i))return"dependency-mismatch";var r=this.previousValue(i);if(this.settings.messages[i.name]||(this.settings.messages[i.name]={}),r.originalMessage=this.settings.messages[i.name].remote,this.settings.messages[i.name].remote=r.message,s="string"==typeof s&&{url:s}||s,r.old===e)return r.valid;r.old=e;var n=this;this.startRequest(i);var a={};return a[i.name]=e,t.ajax(t.extend(!0,{url:s,mode:"abort",port:"validate"+i.name,dataType:"json",data:a,success:function(s){n.settings.messages[i.name].remote=r.originalMessage;var a=s===!0||"true"===s;if(a){var u=n.formSubmitted;n.prepareElement(i),n.formSubmitted=u,n.successList.push(i),delete n.invalid[i.name],n.showErrors()}else{var o={},l=s||n.defaultMessage(i,"remote");o[i.name]=r.message=t.isFunction(l)?l(e):l,n.invalid[i.name]=!0,n.showErrors(o)}r.valid=a,n.stopRequest(i,a)}},s)),"pending"}}}),t.format=t.validator.format})(jQuery),function(t){var e={};if(t.ajaxPrefilter)t.ajaxPrefilter(function(t,i,s){var r=t.port;"abort"===t.mode&&(e[r]&&e[r].abort(),e[r]=s)});else{var i=t.ajax;t.ajax=function(s){var r=("mode"in s?s:t.ajaxSettings).mode,n=("port"in s?s:t.ajaxSettings).port;return"abort"===r?(e[n]&&e[n].abort(),e[n]=i.apply(this,arguments),e[n]):i.apply(this,arguments)}}}(jQuery),function(t){t.extend(t.fn,{validateDelegate:function(e,i,s){return this.bind(i,function(i){var r=t(i.target);return r.is(e)?s.apply(r,arguments):void 0})}})}(jQuery);;
/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
* Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */(function(){function t(t){return t.replace(/<.[^<>]*?>/g," ").replace(/&nbsp;|&#160;/gi," ").replace(/[.(),;:!?%#$'"_+=\/\-]*/g,"")}jQuery.validator.addMethod("maxWords",function(e,i,a){return this.optional(i)||a>=t(e).match(/\b\w+\b/g).length},jQuery.validator.format("Please enter {0} words or less.")),jQuery.validator.addMethod("minWords",function(e,i,a){return this.optional(i)||t(e).match(/\b\w+\b/g).length>=a},jQuery.validator.format("Please enter at least {0} words.")),jQuery.validator.addMethod("rangeWords",function(e,i,a){var r=t(e),n=/\b\w+\b/g;return this.optional(i)||r.match(n).length>=a[0]&&r.match(n).length<=a[1]},jQuery.validator.format("Please enter between {0} and {1} words."))})(),jQuery.validator.addMethod("letterswithbasicpunc",function(t,e){return this.optional(e)||/^[a-z\-.,()'"\s]+$/i.test(t)},"Letters or punctuation only please"),jQuery.validator.addMethod("alphanumeric",function(t,e){return this.optional(e)||/^\w+$/i.test(t)},"Letters, numbers, and underscores only please"),jQuery.validator.addMethod("lettersonly",function(t,e){return this.optional(e)||/^[a-z]+$/i.test(t)},"Letters only please"),jQuery.validator.addMethod("nowhitespace",function(t,e){return this.optional(e)||/^\S+$/i.test(t)},"No white space please"),jQuery.validator.addMethod("ziprange",function(t,e){return this.optional(e)||/^90[2-5]\d\{2\}-\d{4}$/.test(t)},"Your ZIP-code must be in the range 902xx-xxxx to 905-xx-xxxx"),jQuery.validator.addMethod("zipcodeUS",function(t,e){return this.optional(e)||/\d{5}-\d{4}$|^\d{5}$/.test(t)},"The specified US ZIP Code is invalid"),jQuery.validator.addMethod("integer",function(t,e){return this.optional(e)||/^-?\d+$/.test(t)},"A positive or negative non-decimal number please"),jQuery.validator.addMethod("vinUS",function(t){if(17!==t.length)return!1;var e,i,a,r,n,s,u=["A","B","C","D","E","F","G","H","J","K","L","M","N","P","R","S","T","U","V","W","X","Y","Z"],d=[1,2,3,4,5,6,7,8,1,2,3,4,5,7,9,2,3,4,5,6,7,8,9],o=[8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2],l=0;for(e=0;17>e;e++){if(r=o[e],a=t.slice(e,e+1),8===e&&(s=a),isNaN(a)){for(i=0;u.length>i;i++)if(a.toUpperCase()===u[i]){a=d[i],a*=r,isNaN(s)&&8===i&&(s=u[i]);break}}else a*=r;l+=a}return n=l%11,10===n&&(n="X"),n===s?!0:!1},"The specified vehicle identification number (VIN) is invalid."),jQuery.validator.addMethod("dateITA",function(t,e){var i=!1,a=/^\d{1,2}\/\d{1,2}\/\d{4}$/;if(a.test(t)){var r=t.split("/"),n=parseInt(r[0],10),s=parseInt(r[1],10),u=parseInt(r[2],10),d=new Date(u,s-1,n);i=d.getFullYear()===u&&d.getMonth()===s-1&&d.getDate()===n?!0:!1}else i=!1;return this.optional(e)||i},"Please enter a correct date"),jQuery.validator.addMethod("iban",function(t,e){if(this.optional(e))return!0;if(!/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(t))return!1;var i=t.replace(/ /g,"").toUpperCase(),a=i.substring(0,2),r={AL:"\\d{8}[\\dA-Z]{16}",AD:"\\d{8}[\\dA-Z]{12}",AT:"\\d{16}",AZ:"[\\dA-Z]{4}\\d{20}",BE:"\\d{12}",BH:"[A-Z]{4}[\\dA-Z]{14}",BA:"\\d{16}",BR:"\\d{23}[A-Z][\\dA-Z]",BG:"[A-Z]{4}\\d{6}[\\dA-Z]{8}",CR:"\\d{17}",HR:"\\d{17}",CY:"\\d{8}[\\dA-Z]{16}",CZ:"\\d{20}",DK:"\\d{14}",DO:"[A-Z]{4}\\d{20}",EE:"\\d{16}",FO:"\\d{14}",FI:"\\d{14}",FR:"\\d{10}[\\dA-Z]{11}\\d{2}",GE:"[\\dA-Z]{2}\\d{16}",DE:"\\d{18}",GI:"[A-Z]{4}[\\dA-Z]{15}",GR:"\\d{7}[\\dA-Z]{16}",GL:"\\d{14}",GT:"[\\dA-Z]{4}[\\dA-Z]{20}",HU:"\\d{24}",IS:"\\d{22}",IE:"[\\dA-Z]{4}\\d{14}",IL:"\\d{19}",IT:"[A-Z]\\d{10}[\\dA-Z]{12}",KZ:"\\d{3}[\\dA-Z]{13}",KW:"[A-Z]{4}[\\dA-Z]{22}",LV:"[A-Z]{4}[\\dA-Z]{13}",LB:"\\d{4}[\\dA-Z]{20}",LI:"\\d{5}[\\dA-Z]{12}",LT:"\\d{16}",LU:"\\d{3}[\\dA-Z]{13}",MK:"\\d{3}[\\dA-Z]{10}\\d{2}",MT:"[A-Z]{4}\\d{5}[\\dA-Z]{18}",MR:"\\d{23}",MU:"[A-Z]{4}\\d{19}[A-Z]{3}",MC:"\\d{10}[\\dA-Z]{11}\\d{2}",MD:"[\\dA-Z]{2}\\d{18}",ME:"\\d{18}",NL:"[A-Z]{4}\\d{10}",NO:"\\d{11}",PK:"[\\dA-Z]{4}\\d{16}",PS:"[\\dA-Z]{4}\\d{21}",PL:"\\d{24}",PT:"\\d{21}",RO:"[A-Z]{4}[\\dA-Z]{16}",SM:"[A-Z]\\d{10}[\\dA-Z]{12}",SA:"\\d{2}[\\dA-Z]{18}",RS:"\\d{18}",SK:"\\d{20}",SI:"\\d{15}",ES:"\\d{20}",SE:"\\d{20}",CH:"\\d{5}[\\dA-Z]{12}",TN:"\\d{20}",TR:"\\d{5}[\\dA-Z]{17}",AE:"\\d{3}\\d{16}",GB:"[A-Z]{4}\\d{14}",VG:"[\\dA-Z]{4}\\d{16}"},n=r[a];if(n!==void 0){var s=RegExp("^[A-Z]{2}\\d{2}"+n+"$","");if(!s.test(i))return!1}for(var u,d=i.substring(4,i.length)+i.substring(0,4),o="",l=!0,h=0;d.length>h;h++)u=d.charAt(h),"0"!==u&&(l=!1),l||(o+="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(u));for(var F="",c="",m=0;o.length>m;m++){var f=o.charAt(m);c=""+F+f,F=c%97}return 1===F},"Please specify a valid IBAN"),jQuery.validator.addMethod("dateNL",function(t,e){return this.optional(e)||/^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test(t)},"Please enter a correct date"),jQuery.validator.addMethod("phoneNL",function(t,e){return this.optional(e)||/^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9]){8}$/.test(t)},"Please specify a valid phone number."),jQuery.validator.addMethod("mobileNL",function(t,e){return this.optional(e)||/^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)6((\s|\s?\-\s?)?[0-9]){8}$/.test(t)},"Please specify a valid mobile number"),jQuery.validator.addMethod("postalcodeNL",function(t,e){return this.optional(e)||/^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(t)},"Please specify a valid postal code"),jQuery.validator.addMethod("bankaccountNL",function(t,e){if(this.optional(e))return!0;if(!/^[0-9]{9}|([0-9]{2} ){3}[0-9]{3}$/.test(t))return!1;for(var i=t.replace(/ /g,""),a=0,r=i.length,n=0;r>n;n++){var s=r-n,u=i.substring(n,n+1);a+=s*u}return 0===a%11},"Please specify a valid bank account number"),jQuery.validator.addMethod("giroaccountNL",function(t,e){return this.optional(e)||/^[0-9]{1,7}$/.test(t)},"Please specify a valid giro account number"),jQuery.validator.addMethod("bankorgiroaccountNL",function(t,e){return this.optional(e)||$.validator.methods.bankaccountNL.call(this,t,e)||$.validator.methods.giroaccountNL.call(this,t,e)},"Please specify a valid bank or giro account number"),jQuery.validator.addMethod("time",function(t,e){return this.optional(e)||/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/.test(t)},"Please enter a valid time, between 00:00 and 23:59"),jQuery.validator.addMethod("time12h",function(t,e){return this.optional(e)||/^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test(t)},"Please enter a valid time in 12-hour am/pm format"),jQuery.validator.addMethod("phoneUS",function(t,e){return t=t.replace(/\s+/g,""),this.optional(e)||t.length>9&&t.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)},"Please specify a valid phone number"),jQuery.validator.addMethod("phoneUK",function(t,e){return t=t.replace(/\(|\)|\s+|-/g,""),this.optional(e)||t.length>9&&t.match(/^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/)},"Please specify a valid phone number"),jQuery.validator.addMethod("mobileUK",function(t,e){return t=t.replace(/\(|\)|\s+|-/g,""),this.optional(e)||t.length>9&&t.match(/^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[45789]\d{2}|624)\s?\d{3}\s?\d{3})$/)},"Please specify a valid mobile number"),jQuery.validator.addMethod("phonesUK",function(t,e){return t=t.replace(/\(|\)|\s+|-/g,""),this.optional(e)||t.length>9&&t.match(/^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[45789]\d{8}|624\d{6})))$/)},"Please specify a valid uk phone number"),jQuery.validator.addMethod("postcodeUK",function(t,e){return this.optional(e)||/^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test(t)},"Please specify a valid UK postcode"),jQuery.validator.addMethod("strippedminlength",function(t,e,i){return jQuery(t).text().length>=i},jQuery.validator.format("Please enter at least {0} characters")),jQuery.validator.addMethod("email2",function(t,e){return this.optional(e)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(t)},jQuery.validator.messages.email),jQuery.validator.addMethod("url2",function(t,e){return this.optional(e)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)},jQuery.validator.messages.url),jQuery.validator.addMethod("creditcardtypes",function(t,e,i){if(/[^0-9\-]+/.test(t))return!1;t=t.replace(/\D/g,"");var a=0;return i.mastercard&&(a|=1),i.visa&&(a|=2),i.amex&&(a|=4),i.dinersclub&&(a|=8),i.enroute&&(a|=16),i.discover&&(a|=32),i.jcb&&(a|=64),i.unknown&&(a|=128),i.all&&(a=255),1&a&&/^(5[12345])/.test(t)?16===t.length:2&a&&/^(4)/.test(t)?16===t.length:4&a&&/^(3[47])/.test(t)?15===t.length:8&a&&/^(3(0[012345]|[68]))/.test(t)?14===t.length:16&a&&/^(2(014|149))/.test(t)?15===t.length:32&a&&/^(6011)/.test(t)?16===t.length:64&a&&/^(3)/.test(t)?16===t.length:64&a&&/^(2131|1800)/.test(t)?15===t.length:128&a?!0:!1},"Please enter a valid credit card number."),jQuery.validator.addMethod("ipv4",function(t,e){return this.optional(e)||/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(t)},"Please enter a valid IP v4 address."),jQuery.validator.addMethod("ipv6",function(t,e){return this.optional(e)||/^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(t)},"Please enter a valid IP v6 address."),jQuery.validator.addMethod("pattern",function(t,e,i){return this.optional(e)?!0:("string"==typeof i&&(i=RegExp("^(?:"+i+")$")),i.test(t))},"Invalid format."),jQuery.validator.addMethod("require_from_group",function(t,e,i){var a=this,r=i[1],n=$(r,e.form).filter(function(){return a.elementValue(this)}).length>=i[0];if(!$(e).data("being_validated")){var s=$(r,e.form);s.data("being_validated",!0),s.valid(),s.data("being_validated",!1)}return n},jQuery.format("Please fill at least {0} of these fields.")),jQuery.validator.addMethod("skip_or_fill_minimum",function(t,e,i){var a=this,r=i[0],n=i[1],s=$(n,e.form).filter(function(){return a.elementValue(this)}).length,u=s>=r||0===s;if(!$(e).data("being_validated")){var d=$(n,e.form);d.data("being_validated",!0),d.valid(),d.data("being_validated",!1)}return u},jQuery.format("Please either skip these fields or fill at least {0} of them.")),jQuery.validator.addMethod("accept",function(t,e,i){var a,r,n="string"==typeof i?i.replace(/\s/g,"").replace(/,/g,"|"):"image/*",s=this.optional(e);if(s)return s;if("file"===$(e).attr("type")&&(n=n.replace(/\*/g,".*"),e.files&&e.files.length))for(a=0;e.files.length>a;a++)if(r=e.files[a],!r.type.match(RegExp(".?("+n+")$","i")))return!1;return!0},jQuery.format("Please enter a value with a valid mimetype.")),jQuery.validator.addMethod("extension",function(t,e,i){return i="string"==typeof i?i.replace(/,/g,"|"):"png|jpe?g|gif",this.optional(e)||t.match(RegExp(".("+i+")$","i"))},jQuery.format("Please enter a value with a valid extension."));;
/* Placeholders.js v3.0.2 */
(function(t){"use strict";function e(t,e,r){return t.addEventListener?t.addEventListener(e,r,!1):t.attachEvent?t.attachEvent("on"+e,r):void 0}function r(t,e){var r,n;for(r=0,n=t.length;n>r;r++)if(t[r]===e)return!0;return!1}function n(t,e){var r;t.createTextRange?(r=t.createTextRange(),r.move("character",e),r.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))}function a(t,e){try{return t.type=e,!0}catch(r){return!1}}t.Placeholders={Utils:{addEventListener:e,inArray:r,moveCaret:n,changeType:a}}})(this),function(t){"use strict";function e(){}function r(){try{return document.activeElement}catch(t){}}function n(t,e){var r,n,a=!!e&&t.value!==e,u=t.value===t.getAttribute(V);return(a||u)&&"true"===t.getAttribute(P)?(t.removeAttribute(P),t.value=t.value.replace(t.getAttribute(V),""),t.className=t.className.replace(R,""),n=t.getAttribute(z),parseInt(n,10)>=0&&(t.setAttribute("maxLength",n),t.removeAttribute(z)),r=t.getAttribute(D),r&&(t.type=r),!0):!1}function a(t){var e,r,n=t.getAttribute(V);return""===t.value&&n?(t.setAttribute(P,"true"),t.value=n,t.className+=" "+I,r=t.getAttribute(z),r||(t.setAttribute(z,t.maxLength),t.removeAttribute("maxLength")),e=t.getAttribute(D),e?t.type="text":"password"===t.type&&K.changeType(t,"text")&&t.setAttribute(D,"password"),!0):!1}function u(t,e){var r,n,a,u,i,l,o;if(t&&t.getAttribute(V))e(t);else for(a=t?t.getElementsByTagName("input"):f,u=t?t.getElementsByTagName("textarea"):h,r=a?a.length:0,n=u?u.length:0,o=0,l=r+n;l>o;o++)i=r>o?a[o]:u[o-r],e(i)}function i(t){u(t,n)}function l(t){u(t,a)}function o(t){return function(){b&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(P)?K.moveCaret(t,0):n(t)}}function c(t){return function(){a(t)}}function s(t){return function(e){return A=t.value,"true"===t.getAttribute(P)&&A===t.getAttribute(V)&&K.inArray(C,e.keyCode)?(e.preventDefault&&e.preventDefault(),!1):void 0}}function d(t){return function(){n(t,A),""===t.value&&(t.blur(),K.moveCaret(t,0))}}function v(t){return function(){t===r()&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(P)&&K.moveCaret(t,0)}}function g(t){return function(){i(t)}}function p(t){t.form&&(T=t.form,"string"==typeof T&&(T=document.getElementById(T)),T.getAttribute(U)||(K.addEventListener(T,"submit",g(T)),T.setAttribute(U,"true"))),K.addEventListener(t,"focus",o(t)),K.addEventListener(t,"blur",c(t)),b&&(K.addEventListener(t,"keydown",s(t)),K.addEventListener(t,"keyup",d(t)),K.addEventListener(t,"click",v(t))),t.setAttribute(j,"true"),t.setAttribute(V,x),(b||t!==r())&&a(t)}var f,h,b,m,A,y,E,x,L,T,S,N,w,B=["text","search","url","tel","email","password","number","textarea"],C=[27,33,34,35,36,37,38,39,40,8,46],k="#ccc",I="placeholdersjs",R=RegExp("(?:^|\\s)"+I+"(?!\\S)"),V="data-placeholder-value",P="data-placeholder-active",D="data-placeholder-type",U="data-placeholder-submit",j="data-placeholder-bound",q="data-placeholder-focus",Q="data-placeholder-live",z="data-placeholder-maxlength",F=document.createElement("input"),G=document.getElementsByTagName("head")[0],H=document.documentElement,J=t.Placeholders,K=J.Utils;if(J.nativeSupport=void 0!==F.placeholder,!J.nativeSupport){for(f=document.getElementsByTagName("input"),h=document.getElementsByTagName("textarea"),b="false"===H.getAttribute(q),m="false"!==H.getAttribute(Q),y=document.createElement("style"),y.type="text/css",E=document.createTextNode("."+I+" { color:"+k+"; }"),y.styleSheet?y.styleSheet.cssText=E.nodeValue:y.appendChild(E),G.insertBefore(y,G.firstChild),w=0,N=f.length+h.length;N>w;w++)S=f.length>w?f[w]:h[w-f.length],x=S.attributes.placeholder,x&&(x=x.nodeValue,x&&K.inArray(B,S.type)&&p(S));L=setInterval(function(){for(w=0,N=f.length+h.length;N>w;w++)S=f.length>w?f[w]:h[w-f.length],x=S.attributes.placeholder,x?(x=x.nodeValue,x&&K.inArray(B,S.type)&&(S.getAttribute(j)||p(S),(x!==S.getAttribute(V)||"password"===S.type&&!S.getAttribute(D))&&("password"===S.type&&!S.getAttribute(D)&&K.changeType(S,"text")&&S.setAttribute(D,"password"),S.value===S.getAttribute(V)&&(S.value=x),S.setAttribute(V,x)))):S.getAttribute(P)&&(n(S),S.removeAttribute(V));m||clearInterval(L)},100)}K.addEventListener(t,"beforeunload",function(){J.disable()}),J.disable=J.nativeSupport?e:i,J.enable=J.nativeSupport?e:l}(this),function(t){"use strict";var e=t.fn.val,r=t.fn.prop;Placeholders.nativeSupport||(t.fn.val=function(t){var r=e.apply(this,arguments),n=this.eq(0).data("placeholder-value");return void 0===t&&this.eq(0).data("placeholder-active")&&r===n?"":r},t.fn.prop=function(t,e){return void 0===e&&this.eq(0).data("placeholder-active")&&"value"===t?"":r.apply(this,arguments)})}(jQuery);;
(function ($) {
    $(function () {
        //All Access Author Search: List Page
        $('.page-membership-all-access').on('click', '.views-field-field-author', function(e){
          e.preventDefault();
          var allAccessAuthor = $(this).text();
          allAccessAuthor = allAccessAuthor.substring(0, allAccessAuthor.indexOf(','));
          $('#views-exposed-form-all-access-page #edit-search').val(allAccessAuthor);
          $('#all-access-search-button').click();
        });

        $('.node-type-newsletter').on('click', '.author-click', function(e){
          e.preventDefault();
          var allAccessAuthor = $(this).text();
          allAccessAuthor = allAccessAuthor.substring(0, allAccessAuthor.indexOf(','));
          $('#views-exposed-form-all-access-page #edit-search').val(allAccessAuthor);
          $('#all-access-search-button').click();
        });
        //Scroll on pageload if there is a search term entered
        if ($('.page-membership-all-access').length) {
          if ($('#edit-search').val() != "") {
            $('html, body').animate({
                scrollTop: $("#main-content").offset().top
            }, 1000);
          }
        }

        //Video Player Stuff
        //Focus Player on big play button hit.
        $('.vjs-big-play-button').click(function(){
            setTimeout(function(){
                $('.vjs-play-control').focus();
            }, 500);
        });
        $('.vjs-big-play-button').keypress(function(e){
            if(e.which == 13){//Enter key pressed
                $('.vjs-big-play-button').click();
            }
        });

        //On Fullscreen click refocus fullscreen btn
        $('.vjs-fullscreen-control').click(function(){
            setTimeout(function(){
                $('.vjs-fullscreen-control').focus();
            }, 500);
        });

        //On Fullscreen Forced Tab Trap
        $('.video-js').on('keydown', '.vjs-subtitles-button', function(e) {
            if ((e.which == 9) && !(e.shiftKey))  { //if tab without shift, goto play button
                if ( $( ".vjs-fullscreen" ).length ) {
                    e.preventDefault();
                    $('.video-js').find('.vjs-play-control').focus();
                }
            }
        });

        $('.video-js').on('keydown', '.vjs-play-control', function(e) {
            if ((e.which == 9) && (e.shiftKey))  {  //if tab with shift, goto caption button
                if ( $( ".vjs-fullscreen" ).length ) {
                    e.preventDefault();
                    $('.video-js').find('.vjs-subtitles-button').focus();
                }
            }
        });

        // remove empty title tags:
        $('*[title= ]').removeAttr('title');


        $('.not-front .region-sidebar-right').divideLists({itemEl: "div"});

        if ($('.all-programs').length > 0) {
            $('.all-programs ul').divideLists({});
        }

        $('.section-menu h3').on('click', function () {
            var self = $(this);

            self.parents('div').find('.menu').slideToggle(function () {
                self.parents('div').toggleClass('open');
            });
        });


        // Break list into two columns
        // TODO: widigize
        inTheNewsList = $('.press.in-the-news .node .content ul');
        totalListItems = inTheNewsList.find('li').length;
        if (totalListItems > 1) {
            maxItemsPerList = Math.ceil(totalListItems / 2);
            list1 = $jq('<ul class="col-sm-6"/>');
            list2 = $jq('<ul class="col-sm-6"/>');
            inTheNewsList.find('li').each(function (i) {
                if (i < (maxItemsPerList)) {
                    list1.append(this);
                } else {
                    list2.append(this);
                }
            });

            $('.press.in-the-news .node .content').html(list1).append(list2);
        }


        $('.block.regional-map .tab-list>li').on('keydown', function (e) {
            var nextItem = "";
            var $list = $('.block.regional-map .tab-list>li');

            if ((e.keyCode) == 39) {
                // move to the next slide
                nextItem = $(this).next('li');
                if (nextItem.length < 1) {
                    // go to first item....
                    $list.first().find('a').focus();
                } else {
                    $('a', nextItem).focus();
                }


            }

            if ((e.keyCode) == 37) {
                // move to the previous slide

                nextItem = $(this).prev('li');
                if (nextItem.length < 1) {

                    $list.last().find('a').focus();
                } else {
                    $('a', nextItem).focus();
                }
            }

        });

        // when tab is loaded, focus into it....
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $('#' + $(this).parent('li').attr('aria-controls')).attr('tab-index', '0').focus();
        });

        $('a[target=_blank]').each(function () {
            var titleText = (typeof($(this).attr('title')) == 'undefined') ? "" : $(this).attr('title');
            $(this).attr('title', '[Opens in New Window] ' + titleText);

            // Add <span class="sr-only">[Opens in New Window]</span> for screen readers.
            if(!$(this).is(':contains("Opens in New Window")')){
                $(this).html('<span class="sr-only">[Opens in New Window]</span>' + $(this).html());
            }
        });

        // Scroll to top
        $('a.back-to-top').click(function (e) {
            e.preventDefault();

            $(window).scrollTop($('#top').position().top - $('#cbHeader').height() - 10);
            $('#top').attr('tabindex', 0).focus();
        });

        // Home page carousel
        $('.hp-hero .view-content').cbHeroCarousel();


        // Menus accessible aria label
        // ---------------------------
        // Check if both menus are shown on the page, if they are, check which item is active
        // and based on the active item, assign a aria-label to the secondary left side '
        // navigation.

        var topTabbedNavigation = $('.menu-block-1'),
            leftHandNavigation = $('.menu-block-2');

        if (topTabbedNavigation.length > 0 && leftHandNavigation.length > 0) {

            // Get current active menu item
            var activeTabbedNavItem = $('li.active', topTabbedNavigation);
            if (activeTabbedNavItem.length > 0) {
                leftHandNavigation.attr('aria-label', activeTabbedNavItem.text() + " Section Navigation");
            }

        }

        // add "Active Page" text for screen readers to indicate the active page
        $('a.active-trail.active').prepend('<span class="sr-only">Active Page: </span>');

        // add aria labels for other navigation blocks
        $('.menu-block-16').attr('aria-label', 'Students with Disabilities Menu');
        $('.menu-block-17').attr('aria-label', 'Students with Disabilities Tools Menu');

        //  Adding leaf class to menu items that don't have sub items.
        $('.menu li').each(function () {
            if ($(this).children('ul').length == 0) {
                $(this).addClass('leaf');
            }
        });

        // Equal Heights
        $('.equal-heights li').equalHeight();

//        $('.togglePushNav, .pull-side-menu .header .back-button').click(function(){
//            $("body").toggleClass('open-side-nav');
//        });


        //  Video Transcript Modals
        $('.transcript-link').click(function(e){
            e.preventDefault();
            var modal = $(this).next('.modal');
            var link = $(this).find('a');
            modal.modal();
            modal.on('shown.bs.modal', function(){
                modal.find('.modal-ajax-content').load(link.attr('href') +' .node.node-video-transcript .field-name-body');
            });
        });

    }); // end document ready;

    // Press Section Scripts
    $(function () {

        // check if the page has the press release table, if
        // it doesn't, then it's not the press releases page,
        // don't run any related scripts
        if ($('.press-releases-table').length > 0) {

            // Get selected TIDs
            $pager = $('.pager');
            var tids = $().getArrayParamsURL('tid');
            if(typeof tids === "undefined"){
                tids = $().getUrlPara('tid%5B%5D');
            }

            // Highlight selected filter
            if (tids) {
                $.each(tids, function (i) {
                    $('.view-press-filters a[data-tid=' + tids[i] + ']')
                        .parents('li')
                        .addClass('active-filter')

                        .find('a')
                        .append('<span class="sr-only"> Active filter, press return to remove filter</span>');
                });
            }

            $('.view-press-filters li').on('click', function (e) {

                e.preventDefault();
                var linkTag = $('a', this);

                if (!tids) {
                    tids = [];
                }

                var clickedTid = linkTag.data('tid').toString(),
                    tidIndex = $.inArray(clickedTid, tids);

                // check if the item is already in the tids array, if it is remove it, if not add it.
                if (tidIndex == -1) {
                    tids.push(clickedTid);
                } else {

                    // already in there... remove it
                    tids.splice(tidIndex, 1);
                }

                // rewrite URL
                var newQueryString = "",
                    tidLength = tids.length;

                $.each(tids, function (i) {
                    // for first item use "?"
                    if (i == 0) {
                        newQueryString += "?tid["+i+"]=" + tids[i];
                    } else {
                        newQueryString += "&tid["+i+"]=" + tids[i];
                    }

                });

                var refreshUrl = window.location.pathname + newQueryString;
                if (tids.length == 0) refreshUrl = window.location.pathname;

                window.location = (refreshUrl);
            });


            // Pagination hidden text for accessibility.
            // next link
            $('.pager-next a', $pager).append('<span class="sr-only">Next set of results</span>');

            // previous link
            $('.pager-previous a', $pager).append('<span class="sr-only">Previous set of results</span>');

            // in between links (Page # results)
            $('.pager-item a', $pager).prepend('<span class="sr-only">Page</span> ').append('<span class="sr-only"> results</span>').removeAttr('title');


        }  // End Press section specific scripts.
    }); // End Doc ready for press page

    // Social Media Section Scripts
    $(function () {
        if ($('body').hasClass('page-node-800')) {//$('.press-releases-table').length > 0) {

            // Twitter Init Script, initiate all twitter links
            !function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, "script", "twitter-wjs");

            // Custom CollegeBoard Twitter Widget
            // Used with /socialmedia right sidebar
            // Putting this here because the block was loading it twice
            $('.tweetbox').append('<script src="//cb.collegeboard.org/twitter-widget-v2.js" type="text/javascript"></script>');


            // Linked in
            $('.collegeboard-linkedin').append('<script src="//platform.linkedin.com/in.js" type="text/javascript"></script><script type="IN/FollowCompany" data-id="166361" data-counter="none"></script>');

            // Youtube
            $.getScript("https://apis.google.com/js/platform.js");

        }  // End Social Media Section specific scripts.
    }); // End Doc ready for Social Media Section


    // Tools Submenu
    $(function () {
        var toolsMenu = $('.uw-side-menu.tools, .uw-left-menu.tools');
        if (toolsMenu.length > 0) {
            toolsMenu.find('.menu li > a').each(function () {
                var linkTitle = $.trim($(this).text());
                switch (linkTitle) {
                    case ('Calendar'):
                        $(this).parent().addClass("calendar-icon");
                        break;

                    case ("Forms"):
                        $(this).parent().addClass("forms-icon");
                        break;

                    case ("SSD Online"):
                        $(this).parent().addClass("ssd-icon");
                        break;

                    case ("Tips & FAQs"):
                        $(this).parent().addClass("faqs-icon");
                        break;
                }
            });
        }
    });

    // zebra striping for tables
    $(function () {
        var zebraTables = $('table');
        if (zebraTables.length > 0) {
            zebraTables.each(function () {
                if ($(this).find('tr.odd').length < 1 ||  ($(this).find('tr.even').length < 1)) {
                    $(this).find('tbody').find('tr:odd').addClass("even");
                    $(this).find('tbody').find('tr:even').addClass("odd");
                }
            });
        }
    });

    $(function () {
        /**
         * Mollom module uses a JS behavior to add target="_blank"
         * The result is the accessibility code isn't appropriately adding '[Opens in a New Window]' correctly.
         *
         * This bit of script adds it if it is not already there.
         *
         * Sharkey - 12/18/2014
         */
        var $target = $('.mollom-target');
        var accessibleText = '[Opens in a New Window]';
        var anchor = '', title = '', space = '';

        // If a title already exists, we want to have a space between that and our new text.
        if($target.attr('title') !== undefined){
            title = $target.attr('title');
        }

        // Check to see if Title already has accessibility text
        if(title.toLowerCase().indexOf(accessibleText.toLowerCase()) === -1){
            // Accessibility text not found, add it
            $target.attr('title', title + space + accessibleText);
        }

        // Check the anchor link itself to see if it has the accessibility text.
        anchor = $target.text();
        if(anchor.toLowerCase().indexOf(accessibleText.toLowerCase()) === -1){
            // Accessibility text not found, add it
            $target.html(anchor + '<span class="sr-only"> ' + accessibleText + '</span>');
        }

    });
    // END Mollom fix

    $(function () {
        /**
         * Mollom module uses a JS behavior to add target="_blank"
         * The result is the accessibility code isn't appropriately adding '[Opens in a New Window]' correctly.
         *
         * This bit of script adds it if it is not already there.
         *
         * Sharkey - 12/18/2014
         */
        var $target = $('.mollom-target');
        var accessibleText = '[Opens in a New Window]';
        var anchor = '', title = '', space = '';

        // If a title already exists, we want to have a space between that and our new text.
        if($target.attr('title') !== undefined){
            title = $target.attr('title');
        }

        // Check to see if Title already has accessibility text
        if(title.toLowerCase().indexOf(accessibleText.toLowerCase()) === -1){
            // Accessibility text not found, add it
            $target.attr('title', title + space + accessibleText);
        }

        // Check the anchor link itself to see if it has the accessibility text.
        anchor = $target.text();
        if(anchor.toLowerCase().indexOf(accessibleText.toLowerCase()) === -1){
            // Accessibility text not found, add it
            $target.html(anchor + '<span class="sr-only"> ' + accessibleText + '</span>');
        }

    });
    // END Mollom fix

    $(function () {

        // Sharkey - 05/14/2014 - Add accordion triggers
        $( ".cbAccordion" ).accordion({
            active: false,
            collapsible: true,
            heightStyle: "content",
            create: function(event, ui) {
                $(this).find($(this)
                    .accordion('option', 'header'))
                    .attr('aria-expanded', 'false');
            },
            activate: function(event, ui) {
                if (ui.newHeader && ui.newHeader.length) {
                    ui.newHeader.attr('aria-expanded', 'true');
                } else if (ui.oldHeader && ui.oldHeader.length) {
                    ui.oldHeader.attr('aria-expanded', 'false');
                }
            }
        });

        // Add global expand/collapse anytime we have an accordion
        var expandCollapseHTML = '<div class="expandCollapseAccordion"><a href="#" class="jsExpandAll">Expand All</a> | <a href="#" class="jsCollapseAll">Collapse All</a></div>';
        $( ".cbAccordion:first" ).before( expandCollapseHTML );

        /* Event handler for the user interacting with the nav tabs */
        $(".jsExpandAll, .jsCollapseAll").on("keypress click", (function(e) {
            if($(window).keyTrigger(e)){  // Check if they clicked enter, space, or mouse clicked
                e.preventDefault();

                if ($(this).hasClass('jsCollapseAll')){
                    $( ".cbAccordion" ).accordion({ active: false }); // collapse all
                }
                else{
                    $( ".cbAccordion" ).accordion({ active: 0 }); // expand all
                }
            }
        }));

    }); // End Accordion triggers


    // Accessibility - Add "Important" span to icons in callouts
    $(function () {
        $( ".icon-title.megaphone > h2" ).prepend( $( '<span class="sr-only">Important: </span>' ) );
    }); // End Accordion triggers


    /* ** Bootstrap - Custom Modal Windows **
     *    Sharkey - 07-02-2014
     *
     *    The modals themselves are content managed, and stored as a block in the database
     *    This function simply enables the "do not show me again" checkbox functionality
     *    as well as adding the HREF to the Call to Action button in the modal itself
     */
    $(function () {

        //Change cookie.modalhide boolean value when #modalhide checkbox is checked or unchecked
        $("#modalhide").on("change", function (e) {      //On value of #modalhide html form change
          var checkedValue = $('#modalhide').is(':checked');    //Get checkbox boolean value
          $.cookie("modalhide", checkedValue, { expires: 30 }); //Set cookie.modalhide to checkbox value
        });


        //Refocus clicked link on exit
        $('.modal').on("hidden.bs.modal", function () {
          $('.clicked').focus();
          $('.clicked').removeClass('clicked');
        })

        //If tab out of modal window then be brought back: accessibility
        $('.modal-dialog').on('keydown', '#modal-dl-btn', function(e) {
          if ((e.which == 9) && !(e.shiftKey))  { //if tab without shift
            e.preventDefault();
            $('.modal-dialog').find('.close').focus();
          }
        });

        $('.modal-dialog').on('keydown', '.close', function(e) {
          if ((e.which == 9) && (e.shiftKey))  {  //if tab with shift
            e.preventDefault();
            $('.modal-dialog').find('#modal-dl-btn').focus();
          }
        });


        /**  SPECIFIC MODAL CLICK EVENTS
         *   This should dynamically find any classes that start with:  jsModal-
         *
         *  For example:
         *      class="jsModal-inaccessible" will trigger the Drupal CMS block that has a modal with ID="jsModal-inaccessible"
         */

        $("a[class^='jsModal-'],a[class*=' jsModal-']").on("click", function (e) {

            // define variables
            var visible_modal = "";
            var strClass = $(this).attr('class'); // get the actual class this has, use it to find the modal with that ID
            var strClassArr = strClass.split(" "); //in case we have multiple classes

            // Gives the ability to find a partial match in an array,
            // and returns the index where that element resides
            // From here: http://stackoverflow.com/questions/5440275/search-an-array-return-partial-matches

            Array.prototype.searchFor = function(candid) {
                for (var i=0; i<this.length; i++)
                    if (this[i].indexOf(candid) == 0)
                        return i;
                return -1;
            };

            var index = strClassArr.searchFor('jsModal-'); // use our custom Array function to find our matching element ID

            var myModal = "#" + strClassArr[index]; // i.e. "#jsModal-inaccessible"
            var href = $(this).attr("href");


            /* check to see if the user opted out of seeing checkboxes (info saved in cookie)
             * this checks the following:
             *
             *  -- The cookie has not been set to hide modals
             *  -- AND the modal reference is not blank
             *  -- AND the div containing the modal actually exists on the page
             *
             *  Otherwise, just run the link as per normal and don't break the user experience
             */

            if($.cookie("modalhide") !== "true" && myModal !== "" && $(myModal).length > 0) {

                e.preventDefault(); // do not open the link normally

                $(this).addClass('clicked'); // a means to store which <a> they clicked

                // see if there are any modals currently open, and close them
                visible_modal = $('.modal.in').attr('id'); // modalID or undefined
                if (visible_modal !== "") { // modal is active
                    $('#' + visible_modal).modal('hide'); // close modal
                }

                if(href !== "" && href !== null){
                    $("#modal-dl-btn").attr("href", href);   //Put clicked href value
                }


                $(myModal).modal('show'); // show the modal based on the ID that was sent to it

            } // END $.cookie "modalhide"

            // ELSE the link will simply open as normal and we won't mess with it


        }); // END CLICK event


    });
    /* ============================= */
    /* -- END Sharkey modal popup -- */
    /* ============================= */


    $(function () {
        $('.breadcrumb a').removeClass('active-trail');
        $('.breadcrumb a:not(:first)').addClass('active-trail');
    });


    // APSO Form move textarea description on top.
    $(function() {
        $('form.webform-client-form[action="/about/governance/advisory-student/apply"] .webform-component--part-student .description')
            .insertAfter('form.webform-client-form[action="/about/governance/advisory-student/apply"] .webform-component--part-student > label');
    });
})(jQuery);

//Analytics Code
function resultClicked(a) {
  var s = s_gi(s_account);
  s.linkTrackVars = 'events,eVar55,prop46';
  s.linkTrackEvents = 'event10';
  s.events = 'event10';
  s.prop46 = a.href;
  s.eVar55 = a.href;
  s.tl(a, 'o', 'Search Result Click');
}
;
