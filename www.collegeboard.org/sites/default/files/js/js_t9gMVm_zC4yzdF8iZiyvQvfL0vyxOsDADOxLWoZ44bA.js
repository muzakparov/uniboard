// Jquery 1.8.2
(function ($) {

    // Findability Section Scripts
    $(function () {

        // Add left nav header
        $('#sidebar-left .region-sidebar-left').prepend('<div class="header"><a class="back-button" tabindex="0" aria-role="button">Back</a></div>');

        // Attach events to open/close sliding pull menu
        $('.region-sidebar-left .header .back-button,.pull-menu-button').click(function (e) {
            e.preventDefault();

            var footerPosition = $('#footer-region').position();

            if (footerPosition && footerPosition.top) {
                $('body, html').animate({
                    scrollTop: footerPosition.top - 30
                }, 1000);
            }


            // if we ever decide we want to re-activate the
            // slideout menu, uncomment the code below:
            // ----------------------------------------

            // $('body').toggleClass("open-side-nav");

            // // handle tab panic
            // if( $('body').hasClass('open-side-nav') ){
            //    // The side bar has just opened, place focus on first list item.
            //    console.log("open nav", $('#sidebar-left .region-sidebar-left li').first());
            //    $('#sidebar-left .region-sidebar-left li').first().find('a').focus();
            // } else  {
            //    $('.pull-menu-button').first().focus();
            // }

            // End of slideout code.

        });
    });

    $(function () {
        /* PSAT - Bootstrap tabs mod
         * Prevent tabs from wrapping, and add a slider > arrow to move back and forth
         *
         * Mike Sharkey - 08/13/2014
         */

        var currentViewPort = "mobile"; // fallback assumes mobile first

        // For some reason, sometimes his function does not exist when in the Admin section, make sure it exists before trying to use it
        if ($.isFunction($(window).checkViewport)) {
            currentViewPort = $(window).checkViewport(); // returns 'mobile', 'tablet', etc. Default is "mobile" defined above
        }
        else {
            currentViewPort = "mobile";
        }

        var showChevy = function (obj) {
            // Logic to show certain buttons
            var chevrons = [
                "<a href=\"#\" class=\"cb-bootstrap-arrow-left\" tabindex=\"-1\" title=\"Show previous tabs | Disabled\"><i class=\"cb-icon-icn_arrow-left\"><span class=\"sr-only\">Show previous tabs</span></i></a>",   // 0 - left
                "<a href=\"#\" class=\"cb-bootstrap-arrow-right\" tabindex=\"-1\" title=\"Show more tabs | Disabled\"><i class=\"cb-icon-icn_arrow-right\"><span class=\"sr-only\">Show more tabs</span></i></a>"  // 1 - right
            ];

            obj.before(chevrons.join("")); // add some margin and add the arrows

        }; // end Chevy

        var ariaEnabled = function (obj, turnOn) {
            var currentTitle = obj.attr("title").split(" | "); // used | delimiter, so now we got: [View More Tabs][Enabled]

            switch(turnOn){

                case true:
                    currentTitle[1] = "Enabled";
                    obj.addClass("aria-active");
                    break;

                default:
                    currentTitle[1] = "Disabled";
                    obj.removeClass("aria-active");
                    break;
            }

            obj.attr("aria-disabled", !turnOn);
            obj.attr("title", currentTitle.join(" | "));

        }; // end ariaEnabled

        var updateChevy = function (obj) {
            var sumListItems = 0;
            var parentDiv = obj.parent().parent(); // Top wrapper DIV
            var rightArrow = parentDiv.find(".cb-bootstrap-arrow-right");
            var leftArrow = parentDiv.find(".cb-bootstrap-arrow-left");

            // check to see if the width of the tabs exceed the container they are in
            $.each(obj.find("li"), function () {
                sumListItems += $(this).outerWidth() + 5;
            });

            if (sumListItems > obj.outerWidth()) { // we need arrows, otherwise we don't

                // hide the chevrons
                rightArrow.show();
                leftArrow.show();
                obj.addClass("chevronMargins"); // add side margins

                ariaEnabled(rightArrow, true); // enable this arrow

                if (obj.find(".active").next("li").length === 0 || obj.find(".nav.nav-tabs li:last-child").is(":focus")) {
                    // they are on the last question or focused on it, hide the arrow
                    ariaEnabled(rightArrow, false); // disable this arrow
                }

                if( ( obj.scrollLeft() + parentDiv.outerWidth() ) > sumListItems){
                    // They are going to the right, see if they are up to the end
                    ariaEnabled(rightArrow, false); // disable this arrow
                }

                // if the nav-tab is scrolled already to the left, don't show the left arrow

                if(obj.scrollLeft() > 0){
                    ariaEnabled(leftArrow, true); // enable this arrow
                }
                else{
                    ariaEnabled(leftArrow, false); // disable this arrow
                }


            }
            else {
                // hide the chevrons
                rightArrow.hide();
                leftArrow.hide();
                obj.removeClass("chevronMargins"); // get rid of side margins
            }


        }; // end Chevy


        $(window).on("load", function () {

            var tabs = $(".nav.nav-tabs");
            var tempActive;

            $.each(tabs, function () {
                $(this).parent().scrollLeft(0);
                showChevy($(this)); // when document first loads
                updateChevy($(this));
            }); // end Each


            // check the scroll distance to see if we need to show the left arrow when the user is tabbing through
            $(".nav.nav-tabs li a").focus(function(){
                updateChevy($(this).parent().parent());
            });


            $('body').on('click', '.cb-bootstrap-arrow-left, .cb-bootstrap-arrow-right', function(e) {
                var nextNav = $(this).siblings(".nav.nav-tabs");
                var parentNav = $(this).parent().parent();

                e.preventDefault();  // don't let them click these otherwise

                if($(this).hasClass("aria-active")){
                    // this is active and we need to do something

                    if($(this).hasClass("cb-bootstrap-arrow-left")){
                        // do left stuff
                        if(nextNav.scrollLeft() > parentNav.outerWidth()){
                            nextNav.scrollLeft(nextNav.scrollLeft()-parentNav.outerWidth());
                        }
                        else{
                            nextNav.scrollLeft(0);
                        }
                    }
                    else if($(this).hasClass("cb-bootstrap-arrow-right")){
                        // do right stuff
                        nextNav.scrollLeft(parentNav.outerWidth());
                    }
                    updateChevy(nextNav);

                } // end IF .hasClass("aria-active")
            });


            $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
                updateChevy($(this).parent().parent());
            });

            /* Event handler for the user interacting with the nav tabs */
            $(".nav.nav-tabs > li a").keypress(function(e) {

                if($(window).keyTrigger(e)){  // Check if they clicked enter, space, or mouse clicked
                    e.preventDefault();
                    $(this).click();
                }

            });

        }); // END WINDOW LOAD

        $(window).on("resize", function () {
            var tabs = $('.nav.nav-tabs');

            if (currentViewPort !== $(window).checkViewport() || currentViewPort === "mobile") {
                if (tabs.length > 0) {
                    // window was resized and text would have shifted.
                    $.each(tabs, function () {
                        updateChevy($(this)); // when document first loads
                    }); // end Each
                }
            }
            currentViewPort = $(window).checkViewport();
        }); // END WINDOW.ON("RESIZE")

    }); // END SHARKEY BOOTSTRAP TABS MODS

    // PSAT CHANGES
    $(function () {

        if ($('.node-type-home-page').length > 0) {
            var $landingPageHeroWrapper = $('#node-home-page-full-group-hero');
            if ($landingPageHeroWrapper.length > 0) {
                $('.field-name-field-body', $landingPageHeroWrapper).clone().appendTo($('#node-home-page-full-group-here-text'));
            }


            // Affix & Scroll spy for sections right nav.

            $('.cb-tags-sidebar a').each(function () {
                var textTitle = $(this).text();
                var $section = $('.hp-section h2:contains(' + textTitle + ')').parent('section.hp-section');

                $section.attr('id', $(this).attr('href').substring(1));

            });

            $('.cb-tags-sidebar li').first().addClass('active');

            $('.cb-tags-sidebar li a').on('click', function (e) {
                e.preventDefault();

                $('body, html').animate({
                    scrollTop: $($(e.target).attr('href')).offset().top - 50
                }, 1000);


            });

            $('body').scrollspy({
                target: '.landing-page-side-navigation-wrapper',
                offset: 60
            });

            $('.landing-page-side-navigation-wrapper').affix({
                offset: {
                    top: function () {
                        return (this.top = $('.landing-page-side-navigation-wrapper').offset().top)
                    },
                    bottom: 600
                }
            });
        }


        // top navigation modifications.
        var $top_section_navigation = $('.top-section-navigation .content .menu').first();
        var tmp_label_txt = "";
        if ($top_section_navigation.length > 0) {

            // hide the navigation while manipulating the dom to prevent funny flickering
            $top_section_navigation.hide();

            var $first_nav_item = $("li>a", $top_section_navigation).first();
            if ($first_nav_item.text().toLowerCase().indexOf('home') >= 0) {

                // check if we have a sr-only span within the menu item
                $first_nav_item.addClass('home-link');
                tmp_label_txt = $($first_nav_item).text();


                $first_nav_item.html('<span class="sr-only">' + tmp_label_txt + '</span><span class="cb-icon-home"></span>');

            }

            // fading in the navigation while manipulating the dom to prevent funny flickering
            $top_section_navigation.show();
        }

        var $top_section_utilities = $('.top-section-utilities .content .menu').first();
        if ($top_section_utilities.length > 0) {

            $top_section_utilities.hide();

            $('a', $top_section_utilities).each(function () {
                $(this)
                    .addClass('cb-icon-icn_' + $(this).attr('title').toLowerCase())
                    .html('<span class="sr-only">' + $(this).text() + '</span>')
                    .attr('data-toggle', 'tooltip');
            });


            $top_section_utilities.tooltip({selector: '[data-toggle="tooltip"]', container: ".top-section-utilities .content", placement: 'bottom'});

            $top_section_utilities.fadeIn();

        }

        // Mobile Navigation
        // Utilities
        var $mobile_menu_utilities = $('.mobile.utilities .content .menu').first();
        if ($mobile_menu_utilities.length > 0) {
            $('a', $mobile_menu_utilities).each(function () {
                $(this)
                    .prepend('<i class="cb-icon-icn_'+ $(this).attr('title').toLowerCase()+'"></i>');
            });
        }


        // Filters to be used on psat/nmsqt, or anywhere with filters.
        if ($('.filters-title').length > 0) {
            $('#sidebar-left').addClass('filters');

            // Construct mobile filter triggers
            var $mobileFiltersMenu = $('<ul/>').addClass('filter-menu');
            var $activeFilters = $('<ul/>').addClass('active-filters');
            var $mobileFilters = $('<div/>').addClass('mobile-filters');

            // Populate mobile filter menu
            $mobileFiltersMenu.append('<li class="show-filter"><a href="#"><span class="sr-only">Show filters</span><i class="cb-icon-icn_filter"></i></a></li>');
            if($('.filter-by-list').length > 0) {

                // generate select list
                var $tmpSelectList = $('<select/>').addClass('filters-sort-by-select-list');
                $('.filter-by-list ul li').each(function(){

                    $tmpSelectList.append('<option value="'+($('a',$(this)).attr("href") || '#')+'">'+$(this).text()+'</option>');
                });
                $mobileFiltersMenu.append('<li class="sort-filter"><a href="#"><span class="sr-only">Sort By</span><i class="cb-icon-icn_sort"></i></a></li>');
                $('li.sort-filter a',$mobileFiltersMenu).prepend($tmpSelectList);

            }


            $mobileFilters.append($mobileFiltersMenu);

            // Populate active filters
            if ($('.block-facetapi .content a.facetapi-active').length > 0) {
                $activeFilters.append('<li><a href="'+window.location.pathname+'"><i class="glyphicon glyphicon-remove-sign"></i> Clear All</a></li>');

                $('.block-facetapi .content a.facetapi-active').each(function () {
                    var tmpListItem = $('<li/>').append($(this).clone().prepend('<i class="glyphicon glyphicon-remove-sign"></i> '));
                    $activeFilters.append(tmpListItem);
                });

                $mobileFilters.append($activeFilters);
            }

            $('h1.title').after($mobileFilters);

            $('.block-facetapi').each(function(){
                var numberOfActiveFilters = $('.facetapi-active',this).length || false ;
                var filterGroupHeader = $('h2,h3',this);

                if(numberOfActiveFilters) {
                    filterGroupHeader.append('<span class="number-of-active-filters">'+numberOfActiveFilters+'</span>');
                }
            });

            // create collapsible content.
            $('.block-facetapi').removeClass('mobile-open').addClass('mobile-close').first().addClass('mobile-open');
            $('.block-facetapi .content').addClass('collapse out').first().removeClass('out').addClass('in');

            $('.block-facetapi h3, .block-facetapi h2').on('click', function (e) {
                if ($(window).checkViewport() === 'mobile') {

                    $('.block-facetapi .content').removeClass('in').addClass('out');
                    $('.block-facetapi').removeClass('mobile-open').addClass('mobile-close');
                    $(this).next('div').removeClass('out').addClass('in');
                    $(this).parent('.block-facetapi').addClass('mobile-open').removeClass('mobile-close');
                }
            });

            // add close button to title.
            $('.filters-title').append('<a href="#" class="filters-close"><span class="sr-only">Close filter menu</span><i class="glyphicon glyphicon-remove"></i></a>');


            $('.mobile-filters .show-filter a').on('click',function(e){
                if ($(window).checkViewport() === 'mobile') {
                    $('body').css('overflow', 'hidden');
                    $('#sidebar-left.filters').show();
                }
            });


//            $('.filters-sort-by-select-list').customSelect();
            $('.filters-sort-by-select-list').on('change', function(){

                window.location.href = window.location.origin + $(this).val();
            });



            $('.filters .filters-close').on('click',function(e){
                if ($(window).checkViewport() === 'mobile') {
                    $('body').css('overflow', 'visible');
                    $('#sidebar-left.filters').hide();
                }
            });

            $('.filters-sort-by-select-list').find('option[value=#]').attr('selected','selected');

        }



        // Menus accessible aria label
        // ---------------------------
        // Check if both menus are shown on the page, if they are, check which item is active
        // and based on the active item, assign a aria-label to the secondary left side '
        // navigation.


        var topTabbedNavigation = $('.top-navigation_wrapper .content'),
            leftHandNavigation = $('.menu-block-23'),

            allTopNavLinks = $('a',topTabbedNavigation),
            activeTopNavLink = $('.active',allTopNavLinks);

        // remove double navigation roles
        topTabbedNavigation
            .find('div[role=navigation]').removeAttr('role');
        $('a',topTabbedNavigation).attr('aria-selected', 'false');


        allTopNavLinks.each(function(){
            if($(this).hasClass('active')) {
                $(this).attr('aria-selected', 'true');
            }
        });
        if (topTabbedNavigation.length > 0 && leftHandNavigation.length > 0) {

            // Get current active menu item
            var activeTabbedNavItem = $('li.active', topTabbedNavigation);
            if (activeTabbedNavItem.length > 0) {
                leftHandNavigation.attr('aria-label', activeTabbedNavItem.text() + " Section Navigation");
            }

        }

        // Add "aria-selected=true" to left sidebar menu items that are currently active
        $("#sidebar-left ul.menu li.active-trail.active").attr("aria-selected", "true");

    });

    $(function () {
        // Call to Action Accessibility Text for APRN, migrate SR-Only text into the cta link
        // Sharkey - 10/06/2014
        var ctaLink = $(".cta-link");

        if (ctaLink.length > 0){
            $.each(ctaLink, function(){
                hiddenText = $(this).parent().parent().parent().next().find(".field-item").text();

                // Only add the sr-only class if the text is not empty
                if(hiddenText.length > 0){
                    $(this).html($(this).text() + "<span class=\"sr-only\">" + hiddenText + "</span>");
                }

            });
        }
        // Remove the text so it's not read twice
        $(".group-screen-reader-only.field-group-html-element.sr-only").remove();
    });


    // keeping window resize/load even out of doc ready... causing issues in IE...
    $(window).on('load resize', function () {

        // check view port, and based on view port apply
        // the pull-side-menu class to the left sidebar.
        var currentViewPort = $(window).checkViewport();
        if (currentViewPort === 'mobile') {
            // $('#sidebar-left').addClass('pull-side-menu');
        } else {
            // $('#sidebar-left').removeClass('pull-side-menu');

            // remove the open-side-nav class from the menu just in case the
            // the user resize to a larger browser size, which cause the blocks
            // in the menu to disappear.
            // $('body').removeClass('open-side-nav');
        }
        if ($('.node-type-home-page').length > 0) {
            $('body').scrollspy('refresh');
        }


    });


})(jQuery);
;
/* jshint strict: true */
/* global Drupal, jQuery: false */

/*
 *  APRN / CBS specific JS Code
 *
 *  @Author: Mike Sharkey
 *  @Date  : 09/25/2014
 */

 (function($) {
'use strict';

    // Add a buffer above footnote hyperlinks to compensate for fixed header
    Drupal.behaviors.cb_footnotes = {
        attach: function(context) {
            var footnotes = $('.footnote', context);
            var pageTopMargin, anchorTarget;

            if (footnotes.length > 0){
                $.each(footnotes, function() {
                    $(this).on('keypress click', function(e) {
                        // Check if they clicked enter, space, or mouse clicked.
                        if ($(window).keyTrigger(e)){
                            e.preventDefault();

                            anchorTarget = $(e.target.getAttribute('href'));
                            pageTopMargin = parseInt($('.region-pre-page').css('margin-top'));

                            anchorTarget.focus();
                            $(document).scrollTop(anchorTarget.offset().top - pageTopMargin - 20); // scroll to top of page because Firefox can't handle focus correctly
                        }
                    });
                });
            }
        }
    };
    // End behavior.


    // Mega Menu functionality - Block goes into Sub-Menu.
    Drupal.behaviors.cb_megaMenu = {

        attach: function(context) {

            var menuTriggerName = 'Mega Menu'; // Just set your Menu Item to have this text, and it will make it a mega menu.
            var mainMenu = $('.top-section-navigation .menu', context);
            var mobileMenu = $('#footer-region a:contains("' + menuTriggerName + '")');

            // Get the current viewport
            var currentViewPort = ($(window).checkViewport() ? $(window).checkViewport() : 'mobile');

            var megaMenuTrigger = mainMenu.find('a:contains(' + menuTriggerName + ')'); // returns ul > li > a with this text.
            var linkPlaceholder, menuText;

            // Rewrite Mega Menu verbiage in mobile navigation
            if (mobileMenu.length > 0){
                $.each(mobileMenu, function(){
                    menuText = $(this).text();
                    menuText = menuText.replace(menuTriggerName + '-', '');
                    $(this).text(menuText);
                });
            }

            mainMenu.once('top-section-navigation-menu', function() {
                if (megaMenuTrigger.length > 0){
                    $.each(megaMenuTrigger, function() {

                        // If this is somehow active and has extraneous accessibility in it, we need to kill that first.
                        $(this).find('span').remove();

                        linkPlaceholder = $(this).text().split('-')[1]; // Splits the link to an array like this: ['Mega Menu']['Results by State']

                        $(this).text('').append('<span class="sr-only">Click to control a sub-menu for </span>' + linkPlaceholder + ' <i class="cb-icon-icn_arrow-down"><span class="sr-only"> Expand</span></i>');

                        $(this).on('keypress click', function(e) {

                            var subNav = $('.sub_navigation_wrapper');

                            // Check if they clicked enter, space, or mouse clicked.
                            if ($(window).keyTrigger(e)){

                                // ALWAYS PREVENT DEFAULT
                                e.preventDefault();

                                if(currentViewPort !== 'mobile'){

                                    if ($(this).parent().hasClass('active')){
                                        $(this).parent().removeClass('active');
                                        $(this).find('i').removeClass('cb-icon-icn_arrow-up').addClass('cb-icon-icn_arrow-down');
                                        $(this).find('i > span').text('Expand');
                                    }
                                    else{
                                        $(this).parent().addClass('active');
                                        $(this).find('i').removeClass('cb-icon-icn_arrow-down').addClass('cb-icon-icn_arrow-up');
                                        $(this).find('i > span').text('Collapse');
                                    }

                                    if(!(subNav.is(':visible'))){
                                        subNav.addClass('subNavActive');
                                    }
                                    else{
                                        subNav.removeClass('subNavActive');
                                    }

                                    // Our submenu will have a class like: megamenu-Results-by-State.
                                    subNav.slideToggle(500);
                                }
                                // End if.
                            }
                        });
                        // End keypress click event.
                    });
                    // End Each.

                    $(window).on('resize', function () {
                        var subNav = $('.sub_navigation_wrapper');
                        var currentViewPort = $(window).checkViewport();

                        // if mobile view. hide... otherwise do nothing...

                        if (currentViewPort === 'mobile') {
                            subNav.removeClass('subNavActive');
                            subNav.slideUp();
                        } else if(megaMenuTrigger.parent('li').hasClass('active')) {
                            // if the menu is active, and we've just swithced back
                            // from mobile to larger view, make sure to restore state.

                            subNav.addClass('subNavActive');
                            subNav.slideDown();
                        }


                    }); // End Window resize event.
                }
                // End IF.
            });
            // End ONCE.
        }
        // End attach.
    };
    // End behavior.

    // Used to add little icons for each state next to their title on the state pages.
    Drupal.behaviors.cb_stateIcons = {

        attach: function(context) {

            var stateView   = $('.aprn-state-page', context);
            var stateTitle  = $('.main-content h1.title', context);

            var usStates    = [
                            {'name':'Alabama',        'abbreviation':'AL'},
                            {'name':'Alaska',         'abbreviation':'AK'},
                            {'name':'Arizona',        'abbreviation':'AZ'},
                            {'name':'Arkansas',       'abbreviation':'AR'},
                            {'name':'California',     'abbreviation':'CA'},
                            {'name':'Colorado',       'abbreviation':'CO'},
                            {'name':'Connecticut',    'abbreviation':'CT'},
                            {'name':'Washington D.C.','abbreviation':'DC'},
                            {'name':'Delaware',       'abbreviation':'DE'},
                            {'name':'Florida',        'abbreviation':'FL'},
                            {'name':'Georgia',        'abbreviation':'GA'},
                            {'name':'Hawaii',         'abbreviation':'HI'},
                            {'name':'Idaho',          'abbreviation':'ID'},
                            {'name':'Illinois',       'abbreviation':'IL'},
                            {'name':'Indiana',        'abbreviation':'IN'},
                            {'name':'Iowa',           'abbreviation':'IA'},
                            {'name':'Kansas',         'abbreviation':'KS'},
                            {'name':'Kentucky',       'abbreviation':'KY'},
                            {'name':'Louisiana',      'abbreviation':'LA'},
                            {'name':'Maine',          'abbreviation':'ME'},
                            {'name':'Maryland',       'abbreviation':'MD'},
                            {'name':'Massachusetts',  'abbreviation':'MA'},
                            {'name':'Michigan',       'abbreviation':'MI'},
                            {'name':'Minnesota',      'abbreviation':'MN'},
                            {'name':'Mississippi',    'abbreviation':'MS'},
                            {'name':'Missouri',       'abbreviation':'MO'},
                            {'name':'Montana',        'abbreviation':'MT'},
                            {'name':'Nebraska',       'abbreviation':'NE'},
                            {'name':'Nevada',         'abbreviation':'NV'},
                            {'name':'New Hampshire',  'abbreviation':'NH'},
                            {'name':'New Jersey',     'abbreviation':'NJ'},
                            {'name':'New Mexico',     'abbreviation':'NM'},
                            {'name':'New York',       'abbreviation':'NY'},
                            {'name':'North Carolina', 'abbreviation':'NC'},
                            {'name':'North Dakota',   'abbreviation':'ND'},
                            {'name':'Ohio',           'abbreviation':'OH'},
                            {'name':'Oklahoma',       'abbreviation':'OK'},
                            {'name':'Oregon',         'abbreviation':'OR'},
                            {'name':'Pennsylvania',   'abbreviation':'PA'},
                            {'name':'Rhode Island',   'abbreviation':'RI'},
                            {'name':'South Carolina', 'abbreviation':'SC'},
                            {'name':'South Dakota',   'abbreviation':'SD'},
                            {'name':'Tennessee',      'abbreviation':'TN'},
                            {'name':'Texas',          'abbreviation':'TX'},
                            {'name':'Utah',           'abbreviation':'UT'},
                            {'name':'Vermont',        'abbreviation':'VT'},
                            {'name':'Virginia',       'abbreviation':'VA'},
                            {'name':'Washington',     'abbreviation':'WA'},
                            {'name':'West Virginia',  'abbreviation':'WV'},
                            {'name':'Wisconsin',      'abbreviation':'WI'},
                            {'name':'Wyoming',        'abbreviation':'WY'}
            ];

            if (stateView.length > 0){ // make sure we are actually on a State View page
                stateTitle.once('main-content-h1-title', function() {
                    $.each(usStates, function(i, v) {
                        if (stateTitle.text().indexOf(v.name) === 0) { // greater than 0 produced false matches
                            stateTitle.prepend('<i class="cb-iconState-' + v.abbreviation.toLowerCase() + '"></i>');
                            return false; // stops the loop
                        }
                    });
                });
                // End ONCE.
            }
            // End IF State View.
        }
        // End attach.
    };
    // End behavior.

    // Use URL to auto-show Bootstrap Tabs based on Tab value if it exists
    Drupal.behaviors.cb_bootstrapTabAliases = {
        attach: function() {

            var path = window.location.pathname.split('/');
            var activeTab = path[path.length-1];

            // specific use cases where the tab doesn't match the url - e.g. #psatnmsqt -> /psat
            switch(activeTab){
                case 'psat':
                    activeTab = 'psatnmsqt';
                break;
            }
            // show the active tab if we have one
            if (activeTab !== '' && $('.nav-tabs a[href="#' + activeTab + '"]').length > 0){
                $('.nav-tabs a[href="#' + activeTab + '"]').tab('show');
            }
        }
        // End attach.
    };
    // End behavior.

    Drupal.behaviors.cb_stateSelectBox = {
        attach: function() {
            var aprnNav = $('.megamenu-Results-by-State-select');
            var selectBox, theState, blockStates;

            // Convert the divs into a select box
            selectBox = '<form class="aprn-state-select" action="#" method="post" enctype="multipart/form-data">';
            selectBox += '<h3>View SAT, AP, and PSAT Results by State</h3>';

            selectBox += '<div class="aprn-state-select-wrapper">';
            selectBox += '<select class="aprnSelectNav">';
            selectBox += '<option value="#" style="display:none;">Choose a State</option>';

            if (aprnNav.length > 0){ // make sure we are actually on a State View page
                aprnNav.once('main-content-h1-title', function() {
                    $.each(aprnNav, function() {
                        // Loop through each instance of this navigation block
                        blockStates = $(this).find('.view-content > div');

                        $.each(blockStates, function() {
                            // Loop through each state that exists in this particular block
                            theState = $.trim($(this).text());

                            selectBox += '<option value="/program-results/2014/' + theState.replace(' ','-').toLowerCase() + '">' + theState + '</option>';
                        });

                    });
                });
                // End ONCE.
            }
            // End IF State View.

            selectBox += '</select>';

            selectBox += '<span class="button btn btn-primary" href="">Choose a State<i class="cb-icon-icn_arrow-down">';
            selectBox += '<span class="sr-only"> by clicking this button.</span>';
            selectBox += '</i></span>';

            selectBox += '</div></form>';

            // Replace the Divs with the Select Box
            aprnNav.replaceWith(selectBox);


            $('.aprnSelectNav').change(function(){
                if ($(this).val() !== '') {
                    window.location.href = $(this).val();
                }
            });
        }
        // End attach.
    };
    // End behavior.



})(jQuery);
;
