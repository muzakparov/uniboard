/**
 * @file better_exposed_filters.js
 *
 * Provides some client-side functionality for the Better Exposed Filters module
 */
(function ($) {
  Drupal.behaviors.betterExposedFilters = {
    attach: function(context) {
      // Add highlight class to checked checkboxes for better theming
      $('.bef-tree input[type=checkbox], .bef-checkboxes input[type=checkbox]')
        // Highlight newly selected checkboxes
        .change(function() {
          _bef_highlight(this, context);
        })
        .filter(':checked').closest('.form-item', context).addClass('highlight')
      ;
    }
  };

  Drupal.behaviors.betterExposedFiltersSelectAllNone = {
    attach: function(context) {

      /*
       * Add Select all/none links to specified checkboxes
       */
      var selected = $('.form-checkboxes.bef-select-all-none:not(.bef-processed)');
      if (selected.length) {
        var selAll = Drupal.t('Select All');
        var selNone = Drupal.t('Select None');

        // Set up a prototype link and event handlers
        var link = $('<a class="bef-toggle" href="#">'+ selAll +'</a>')
        link.click(function(event) {
          // Don't actually follow the link...
          event.preventDefault();
          event.stopPropagation();

          if (selAll == $(this).text()) {
            // Select all the checkboxes
            $(this)
              .html(selNone)
              .siblings('.bef-checkboxes, .bef-tree')
                .find('.form-item input:checkbox').each(function() {
                  $(this).attr('checked', true);
                  _bef_highlight(this, context);
                })
              .end()

              // attr() doesn't trigger a change event, so we do it ourselves. But just on
              // one checkbox otherwise we have many spinning cursors
              .find('input[type=checkbox]:first').change()
            ;
          }
          else {
            // Unselect all the checkboxes
            $(this)
              .html(selAll)
              .siblings('.bef-checkboxes, .bef-tree')
                .find('.form-item input:checkbox').each(function() {
                  $(this).attr('checked', false);
                  _bef_highlight(this, context);
                })
              .end()

              // attr() doesn't trigger a change event, so we do it ourselves. But just on
              // one checkbox otherwise we have many spinning cursors
              .find('input[type=checkbox]:first').change()
            ;
          }
        });

        // Add link to the page for each set of checkboxes.
        selected
          .addClass('bef-processed')
          .each(function(index) {
            // Clone the link prototype and insert into the DOM
            var newLink = link.clone(true);

            newLink.insertBefore($('.bef-checkboxes, .bef-tree', this));

            // If all checkboxes are already checked by default then switch to Select None
            if ($('input:checkbox:checked', this).length == $('input:checkbox', this).length) {
              newLink.click();
            }
          })
        ;
      }

      // Check for and initialize datepickers
      var befSettings = Drupal.settings.better_exposed_filters;
      if (befSettings && befSettings.datepicker && befSettings.datepicker_options && $.fn.datepicker) {
        var opt = [];
        $.each(befSettings.datepicker_options, function(key, val) {
          if (key && val) {
            opt[key] = JSON.parse(val);
          }
        });
        $('.bef-datepicker').datepicker(opt);
      }

    }                   // attach: function() {
  };                    // Drupal.behaviors.better_exposed_filters = {

  Drupal.behaviors.betterExposedFiltersAllNoneNested = {
    attach:function (context, settings) {
      $('.form-checkboxes.bef-select-all-none-nested li').has('ul').once('bef-all-none-nested', function () {
        $(this)
          // To respect term depth, check/uncheck child term checkboxes.
          .find('input.form-checkboxes:first')
          .click(function() {
            var checkedParent = $(this).attr('checked');
            if (!checkedParent) {
              // Uncheck all children if parent is unchecked.
              $(this).parents('li:first').find('ul input.form-checkboxes').removeAttr('checked');
            }
            else {
              // Check all children if parent is checked.
              $(this).parents('li:first').find('ul input.form-checkboxes').attr('checked', $(this).attr('checked'));
            }
          })
          .end()
          // When a child term is checked or unchecked, set the parent term's
          // status.
          .find('ul input.form-checkboxes')
          .click(function() {
            var checked = $(this).attr('checked');

            // Determine the number of unchecked sibling checkboxes.
            var ct = $(this).parents('ul:first').find('input.form-checkboxes:not(:checked)').size();

            // If the child term is unchecked, uncheck the parent.
            if (!checked) {
              // Uncheck parent if any of the childres is unchecked.
              $(this).parents('li:first').parents('li:first').find('input.form-checkboxes:first').removeAttr('checked');
            }

            // If all sibling terms are checked, check the parent.
            if (!ct) {
              // Check the parent if all the children are checked.
              $(this).parents('li:first').parents('li:first').find('input.form-checkboxes:first').attr('checked', checked);
            }
          });
      });
    }
  };

  Drupal.behaviors.better_exposed_filters_slider = {
    attach: function(context, settings) {
      var befSettings = settings.better_exposed_filters;
      if (befSettings && befSettings.slider && befSettings.slider_options) {
        $.each(befSettings.slider_options, function(i, sliderOptions) {
          var containing_parent = "#" + sliderOptions.viewId + " #edit-" + sliderOptions.id + "-wrapper .views-widget";
          var $filter = $(containing_parent);

          // If the filter is placed in a secondary fieldset, we may not have
          // the usual wrapper element.
          if (!$filter.length) {
            containing_parent = "#" + sliderOptions.viewId + " .bef-slider-wrapper";
            $filter = $(containing_parent);
          }

          // Only make one slider per filter.
          $filter.once('slider-filter', function() {
            var $input = $(this).find('input[type=text]');

            // This is a "between" or "not between" filter with two values.
            if ($input.length == 2) {
              var $min = $input.parent().find('input#edit-' + sliderOptions.id + '-min'),
                  $max = $input.parent().find('input#edit-' + sliderOptions.id + '-max'),
                  default_min,
                  default_max;

              if (!$min.length || !$max.length) {
                return;
              }

              // Get the default values.
              // We use slider min & max if there are no defaults.
              default_min = parseFloat(($min.val() == '') ? sliderOptions.min : $min.val(), 10);
              default_max = parseFloat(($max.val() == '') ? sliderOptions.max : $max.val(), 10);
              // Set the element value in case we are using the slider min & max.
              $min.val(default_min);
              $max.val(default_max);

              $min.parents(containing_parent).after(
                $('<div class="bef-slider"></div>').slider({
                  range: true,
                  min: parseFloat(sliderOptions.min, 10),
                  max: parseFloat(sliderOptions.max, 10),
                  step: parseFloat(sliderOptions.step, 10),
                  animate: sliderOptions.animate ? sliderOptions.animate : false,
                  orientation: sliderOptions.orientation,
                  values: [default_min, default_max],
                  // Update the textfields as the sliders are moved
                  slide: function (event, ui) {
                    $min.val(ui.values[0]);
                    $max.val(ui.values[1]);
                  },
                  // This fires when the value is set programmatically or the
                  // stop event fires.
                  // This takes care of the case that a user enters a value
                  // into the text field that is not a valid step of the slider.
                  // In that case the slider will go to the nearest step and
                  // this change event will update the text area.
                  change: function (event, ui) {
                    $min.val(ui.values[0]);
                    $max.val(ui.values[1]);
                  },
                  // Attach stop listeners.
                  stop: function(event, ui) {
                    // Click the auto submit button.
                    $(this).parents('form').find('.ctools-auto-submit-click').click();
                  }
                })
              );

              // Update the slider when the fields are updated.
              $min.blur(function() {
                befUpdateSlider($(this), 0, sliderOptions);
              });
              $max.blur(function() {
                befUpdateSlider($(this), 1, sliderOptions);
              });
            }
            // This is single value filter.
            else if ($input.length == 1) {
              if ($input.attr('id') != 'edit-' + sliderOptions.id) {
                return;
              }

              // Get the default value. We use slider min if there is no default.
              var default_value = parseFloat(($input.val() == '') ? sliderOptions.min : $input.val(), 10);
              // Set the element value in case we are using the slider min.
              $input.val(default_value);

              $input.parents(containing_parent).after(
                $('<div class="bef-slider"></div>').slider({
                  min: parseFloat(sliderOptions.min, 10),
                  max: parseFloat(sliderOptions.max, 10),
                  step: parseFloat(sliderOptions.step, 10),
                  animate: sliderOptions.animate ? sliderOptions.animate : false,
                  orientation: sliderOptions.orientation,
                  value: default_value,
                  // Update the textfields as the sliders are moved.
                  slide: function (event, ui) {
                    $input.val(ui.value);
                  },
                  // This fires when the value is set programmatically or the
                  // stop event fires.
                  // This takes care of the case that a user enters a value
                  // into the text field that is not a valid step of the slider.
                  // In that case the slider will go to the nearest step and
                  // this change event will update the text area.
                  change: function (event, ui) {
                    $input.val(ui.value);
                  },
                  // Attach stop listeners.
                  stop: function(event, ui) {
                    // Click the auto submit button.
                    $(this).parents('form').find('.ctools-auto-submit-click').click();
                  }
                })
              );

              // Update the slider when the field is updated.
              $input.blur(function() {
                befUpdateSlider($(this), null, sliderOptions);
              });
            }
            else {
              return;
            }
          })
        });
      }
    }
  };

  // This is only needed to provide ajax functionality
  Drupal.behaviors.better_exposed_filters_select_as_links = {
    attach: function(context, settings) {

      $('.bef-select-as-links', context).once(function() {
        var $element = $(this);

        // Check if ajax submission is enabled. If it's not enabled then we
        // don't need to attach our custom submission handling, because the
        // links are already properly built.

        // First check if any ajax views are contained in the current page.
        if (typeof settings.views == 'undefined' || typeof settings.views.ajaxViews == 'undefined') {
          return;
        }

        // Now check that the view for which the current filter block is used,
        // is part of the configured ajax views.
        var $uses_ajax = false;
        $.each(settings.views.ajaxViews, function(i, item) {
          var $view_name = item.view_name.replace(/_/g, '-');
          var $view_display_id = item.view_display_id.replace(/_/g, '-');
          var $id = 'views-exposed-form-' + $view_name + '-' + $view_display_id;
          var $form_id = $element.parents('form').attr('id');
          if ($form_id == $id) {
            $uses_ajax = true;
            return;
          }
        });

        // If no ajax is used for form submission, we quit here.
        if (!$uses_ajax) {
          return;
        }

        // Attach selection toggle and form submit on click to each link.
        $(this).find('a').click(function(event) {
          var $wrapper = $(this).parents('.bef-select-as-links');
          var $options = $wrapper.find('select option');
          // We have to prevent the page load triggered by the links.
          event.preventDefault();
          event.stopPropagation();
          // Un select old select value.
          $wrapper.find('select option').removeAttr('selected');

          // Set the corresponding option inside the select element as selected.
          var link_text = $(this).text();
          $selected = $options.filter(function() {
            return $(this).text() == link_text;
          });
          $selected.attr('selected', 'selected');
          $wrapper.find('.bef-new-value').val($selected.val());
          $wrapper.find('a').removeClass('active');
          $(this).addClass('active');
          // Submit the form.
          $wrapper.parents('form').find('.views-submit-button *[type=submit]').click();
        });
      });
    }
  };

  Drupal.behaviors.betterExposedFiltersRequiredFilter = {
    attach: function(context, settings) {
      // Required checkboxes should re-check all inputs if a user un-checks
      // them all.
      $('.bef-select-as-checkboxes', context).once('bef-required-filter').ajaxComplete(function (e, xhr, s) {
        var $element = $(this);

        if (typeof settings.views == 'undefined' || typeof settings.views.ajaxViews == 'undefined') {
          return;
        }

        // Now check that the view for which the current filter block is used,
        // is part of the configured ajax views.
        var $view_name;
        var $view_display_id;
        var $uses_ajax = false;
        $.each(settings.views.ajaxViews, function(i, item) {
          $view_name = item.view_name;
          $view_display_id = item.view_display_id;
          var $id = 'views-exposed-form-' + $view_name.replace(/_/g, '-') + '-' + $view_display_id.replace(/_/g, '-');
          var $form_id = $element.parents('form').attr('id');
          if ($form_id == $id) {
            $uses_ajax = true;
            return false;
          }
        });

        //Check if we have any filters at all because of Views Selective Filter
        if($('input', this).length > 0) {
          var $filter_name = $('input', this).attr('name').slice(0, -2);
          if (Drupal.settings.better_exposed_filters.views[$view_name].displays[$view_display_id].filters[$filter_name].required && $('input:checked', this).length == 0) {
            $('input', this).prop('checked', true);
          }
        }
      });
    }
  }

  /*
   * Helper functions
   */

  /**
   * Adds/Removes the highlight class from the form-item div as appropriate
   */
  function _bef_highlight(elem, context) {
    $elem = $(elem, context);
    $elem.attr('checked')
      ? $elem.closest('.form-item', context).addClass('highlight')
      : $elem.closest('.form-item', context).removeClass('highlight');
  }

  /**
   * Update a slider when a related input element is changed.
   *
   * We don't need to check whether the new value is valid based on slider min,
   * max, and step because the slider will do that automatically and then we
   * update the textfield on the slider's change event.
   *
   * We still have to make sure that the min & max values of a range slider
   * don't pass each other though, however once this jQuery UI bug is fixed we
   * won't have to. - http://bugs.jqueryui.com/ticket/3762
   *
   * @param $el
   *   A jQuery object of the updated element.
   * @param valIndex
   *   The index of the value for a range slider or null for a non-range slider.
   * @param sliderOptions
   *   The options for the current slider.
   */
  function befUpdateSlider($el, valIndex, sliderOptions) {
    var val = parseFloat($el.val(), 10),
        currentMin = $el.parents('div.views-widget').next('.bef-slider').slider('values', 0),
        currentMax = $el.parents('div.views-widget').next('.bef-slider').slider('values', 1);
    // If we have a range slider.
    if (valIndex != null) {
      // Make sure the min is not more than the current max value.
      if (valIndex == 0 && val > currentMax) {
        val = currentMax;
      }
      // Make sure the max is not more than the current max value.
      if (valIndex == 1 && val < currentMin) {
        val = currentMin;
      }
      // If the number is invalid, go back to the last value.
      if (isNaN(val)) {
        val = $el.parents('div.views-widget').next('.bef-slider').slider('values', valIndex);
      }
    }
    else {
      // If the number is invalid, go back to the last value.
      if (isNaN(val)) {
        val = $el.parents('div.views-widget').next('.bef-slider').slider('value');
      }
    }
    // Make sure we are a number again.
    val = parseFloat(val, 10);
    // Set the slider to the new value.
    // The slider's change event will then update the textfield again so that
    // they both have the same value.
    if (valIndex != null) {
      $el.parents('div.views-widget').next('.bef-slider').slider('values', valIndex, val);
    }
    else {
      $el.parents('div.views-widget').next('.bef-slider').slider('value', val);
    }
  }

}) (jQuery);
;
/* jshint strict: true */
/* global Drupal, jQuery: false */

/*
 *  Given to us by WIRIS, converted to jQuery to fix IE8/9
 *
 *  @Author: Mike Sharkey
 *  @Date  : 07/17/2014
 */
(function($) {
    "use strict";

    Drupal.behaviors.cb_wiris_fixBaseline = {

        attach: function() {
          $(window).on("load", function() {
            var images = $("img.Wirisformula");

            $.each(images, function() {
              //Get the height of the image, because onLoad, it's hidden in a tab
              var tmp = new Image();
              tmp.src = $(this).attr('src');

              // offset the image and push it down a bit
              $(this).show().css("vertical-align", "-" + tmp.height / 2 + "px");
            });

          });
        }
    };
})(jQuery); // END function($)
;
/*
 * This file contains Javascript for the All Access blog. It is referenced in page--all-access.tpl.php and node--newsletter.tpl.php.
 */
(function($){
  Drupal.behaviors.allaccess = {
    attach: function(context, settings) {
      $(document).ready(function() {

        // Add placeholder text to input fields
        $('#views-exposed-form-all-access-page .form-item-search input').attr('placeholder','Search articles');
        $('#views-exposed-form-all-access-page .form-item-date-min input').attr('placeholder','From:');
        $('#views-exposed-form-all-access-page .form-item-date-max input').attr('placeholder','Through:');

        // Since Views exposed filters can only be separated into a single block, use jQuery
        // to position the tag cloud block
        // $('#block-views-all-access-tag-cloud-block').insertAfter('.views-widget-filter-combine');

        // Only on All-Access page, not on node pages:
        // Clone the Topic and Region filter dropdowns, position them, and attach their functionality to the real (hidden) dropdowns
        $('.page-membership-all-access #edit-region-wrapper').once(function() {
          $(this).clone().attr('id','edit-region-wrapper-clone').prependTo('.all-access-region-submit').find('select').attr('id','edit-region-clone').change(function(e) {
            $('#edit-region').val($(this).val());
            $('#edit-submit-all-access').click();
          });
        });

        // Rename "- Any -" option for usability
        $('#edit-region option:first-child,#edit-region-clone option:first-child').text('All Regions');
        $('.views-widget-filter-field_newsletter_topic_value option:first-child').text('All Topics');


        // Change "for" attribute of label to link the cloned select element
        $('#edit-region-wrapper-clone > label').attr('for', 'edit-region-clone');

        $('.page-membership-all-access #edit-topic-wrapper').once(function() {
          $(this).clone().attr('id','edit-topic-wrapper-clone').prependTo('.all-access-region-submit').find('select').attr('id','edit-topic-clone').change(function(e) {
            $('#edit-topic').val($(this).val());
            $('#edit-submit-all-access').click();
          });
        });

        // Change "for" attribute of label to link the cloned select element
        $('#edit-topic-wrapper-clone > label').attr('for', 'edit-topic-clone');

        // Highlight active tab for topic in main View.
        var activeTabText = location.pathname.split('/').reverse()[0];

        $('#filter-topic a[href^="/membership/all-access/' + activeTabText + '"]').addClass('active');
        if (activeTabText == 'all-access') {
          $('#filter-topic a:first').addClass('active');
        };

        // Functionality for tag cloud - upon clicking a tag, filter the view by submitting the exposed filter with the tag value
        currentTag = $('#edit-tag').val();
        $('.view-all-access-tag-cloud .views-row a, .views-field-field-newsletter-tags .field-content a, .node-type-newsletter #block-system-main .tags .field-item a')
          .attr('href','#')
          .each(function() {
            $(this).attr('title', $(this).text()); // Add titles for each tag cloud links for accessibility
            if ($(this).text().indexOf('Tag:') == -1) {
              $(this).prepend('<span class="element-invisible">Tag: </span>')  // Prepend hidden label 'Tag: ' for each tag cloud links for accessibility
            }
            $(this).click(function(e) {
              newTag = $(this).text().substring(5);
              if (currentTag == newTag) {
                $('#edit-tag').val('');
                $('.view-all-access-tag-cloud .views-row a, .views-field-field-newsletter-tags .field-content a, .node-type-newsletter #block-system-main .tags .field-item a, .all-access-selected-tag').removeClass('active');
              }
              else {
                $('#edit-tag').val(newTag);
                $('.view-all-access-tag-cloud .views-row a').removeClass('active');
                $('.all-access-selected-tag').addClass('active');
                $('.view-all-access-tag-cloud .views-row a').each(function() {
                  if ($(this).text() == newTag) {
                    $(this).addClass('active');
                  }
                });
                $(this).addClass('active');
                $('.all-access-selected-tag a').text('Articles tagged with \'' + newTag + '\'');
              }
              $('#edit-submit-all-access').click();
              e.preventDefault();
            });
          });
        $('.all-access-selected-tag a').each(function() {
          $(this).click(function(e) {
            $('.view-all-access-tag-cloud .views-row a.active,.all-access-selected-tag').removeClass('active');
            $('#edit-tag').val('');
            $('#edit-submit-all-access').click();
            e.preventDefault();
          });
        });
        // If getting to this page by clicking a tag from an article page, check to see if any tags are selected and apply filters
        if ($('#edit-tag').val() != '') {
          currentTag = $('#edit-tag').val();
          if (currentTag.indexOf('Tag:') != -1) {
            currentTag = currentTag.substring(5);
          }
          $('.all-access-selected-tag').addClass('active');
          $('.view-all-access-tag-cloud .views-row a').each(function() {
            if ($(this).text() == currentTag) {
              alert($(this).text() + '==' + currentTag);
              $(this).addClass('active');
            }
          });
          $('.all-access-selected-tag a').text('Articles tagged with \'' + currentTag + '\'');
        }

        // Add fake submit button for article search
        $('#views-exposed-form-all-access-page .form-item-search').once(function() {
          $(this).append('<button type="button" id="all-access-search-button">Search</button>');
          $('#all-access-search-button').click(function(e) {
            $('#edit-submit-all-access').click();
          });
        });

        // Add "clear" buttons to free-text search and date search input fields
        $('#edit-date-wrapper,#edit-search-wrapper').once(function() {
          $(this).append('<a href="#" class="clear-link">clear <span class="element-invisible"></span></a>');
        });
        $('.clear-link').click(function(e) {
          $(this).parent().find('input[type="text"]').val('');
          $('#edit-submit-all-access').click();
          e.preventDefault();
        });

        // Add Clear Link titles and hidden text for accessibility
        $('#edit-search-wrapper a.clear-link').attr('title', 'Clear Search Term').children('span.element-invisible').text('search term');
        $('#edit-date-wrapper a.clear-link').attr('title', 'Clear Selected Dates').children('span.element-invisible').text('selected dates');

        // Submit on region selection
        $('#edit-region').change(function() {
          $('#edit-submit-all-access').click();
        });

        // Functionality for the 'Back' button - Go back one step in history. If no previous history, 2nd statement will execute. If no Javascript, link will fallback to
        // its HREF attribute which is also set to /all-access.
        $('.all-access-back').click(function(e) {
          window.history.go(-1);
          window.location = "/membership/all-access";
          e.preventDefault();
        });

        // Hide label for free-text search field
        $('#edit-search-wrapper > label').addClass('element-invisible');

        // Replace orphaned label with H3
        $('.page-membership-all-access #edit-region-wrapper').once(function() {
            $('<h3>')
                .attr('id', 'edit-date-wrapper-label')
                .text($('#edit-date-wrapper > label').remove().text())
                .prependTo('#edit-date-wrapper');
        });

        // Add accessibility to date fields wrapper
        $('#edit-date-wrapper')
            .attr('role', 'group')
            .attr('aria-labelledby', 'edit-date-wrapper-label');

        // Correction of date field labels
        $('.form-type-date-popup').each(function() {
            $(this).children('label').attr('for', $(this).find('input[type="text"]').attr('id'));
        });

        // Fix Website field label in comment form
        $('#edit-field-website .form-type-link-field > label').each(function() {
            var label = $(this).attr('for') + '-url';
            $('label[for=' + label + ']').remove();
            $(this).attr('for', label);
        });

        // Add missing Alt text for images on home page
        $('.view-all-access .view-content .views-row').each(function() {
            var img = $(this).find('.views-field-field-image .field-content img');
            if (img.length && !img.attr('alt')) {
                var alt = img.attr('alt') || '';
                img.attr('alt', $(this).find('.views-field-title .field-content').text());
            }
        });

        // Add missing Alt text for images on article page
        $('.node-newsletter .content .newsletter-fields').each(function() {
            var img = $(this).find('.field-name-field-image img');
            if (img.length && !img.attr('alt')) {
                img.attr('alt', $(this).find('h3').text());
            }
        });
      });
    }
  };
})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.mollom = Drupal.mollom || {};

/**
 * Open links to Mollom.com in a new window.
 *
 * Required for valid XHTML Strict markup.
 */
Drupal.behaviors.mollomTarget = {
  attach: function (context) {
    $(context).find('.mollom-target').click(function () {
      this.target = '_blank';
    });
  }
};

/**
 * Retrieve and attach the form behavior analysis tracking image if it has not
 * yet been added for the form.
 */
Drupal.behaviors.mollomFBA = {
  attach: function (context, settings) {
    $(':input[name="mollom[fba]"][value=""]', context).once().each(function() {
      $input = $(this);
      $.ajax({
        url: Drupal.settings.basePath + Drupal.settings.pathPrefix + 'mollom/fba',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
          if (!data.tracking_id || !data.tracking_url) {
            return;
          }
          // Save the tracking id in the hidden field.
          $input.val(data.tracking_id);
          // Attach the tracking image.
          $('<img src="' + data.tracking_url + '" width="1" height="1" alt="" />').appendTo('body');
        }
      })
    });
  }
};

 /**
 * Attach click event handlers for CAPTCHA links.
 */
Drupal.behaviors.mollomCaptcha = {
  attach: function (context, settings) {
    $('a.mollom-switch-captcha', context).click(function (e) {
      var $mollomForm = $(this).parents('form');
      var newCaptchaType = $(this).hasClass('mollom-audio-captcha') ? 'audio' : 'image';
      Drupal.mollom.getMollomCaptcha(newCaptchaType, $mollomForm);
    });
    $('a.mollom-refresh-captcha', context).click(function (e) {
      var $mollomForm = $(this).parents('form');
      var currentCaptchaType = $(this).hasClass('mollom-refresh-audio') ? 'audio' : 'image';
      Drupal.mollom.getMollomCaptcha(currentCaptchaType, $mollomForm);
    });
  }
};

/**
 * Fetch a Mollom CAPTCHA and output the image or audio into the form.
 *
 * @param captchaType
 *   The type of CAPTCHA to retrieve; one of "audio" or "image".
 * @param context
 *   The form context for this retrieval.
 */
Drupal.mollom.getMollomCaptcha = function (captchaType, context) {
  var formBuildId = $('input[name="form_build_id"]', context).val();
  var mollomContentId = $('input.mollom-content-id', context).val();

  var path = 'mollom/captcha/' + captchaType + '/' + formBuildId;
  if (mollomContentId) {
    path += '/' + mollomContentId;
  }
  path += '?cb=' + new Date().getTime();

  // Retrieve a new CAPTCHA.
  $.ajax({
    url: Drupal.settings.basePath + Drupal.settings.pathPrefix + path,
    type: 'POST',
    dataType: 'json',
    success: function (data) {
      if (!(data && data.content)) {
        return;
      }
      // Inject new CAPTCHA.
      $('.mollom-captcha-content', context).parent().replaceWith(data.content);
      // Update CAPTCHA ID.
      $('input.mollom-captcha-id', context).val(data.captchaId);
      // Add an onclick-event handler for the new link.
      Drupal.attachBehaviors(context);
      // Focus on the CAPTCHA input.
      if (captchaType == 'image') {
          $('input[name="mollom[captcha]"]', context).focus();
      } else {
         // Focus on audio player.
         // Fallback player code is responsible for setting focus upon embed.
         if ($('#mollom_captcha_audio').is(":visible")) {
             $('#mollom_captcha_audio').focus();
         }
      }
    }
  });
  return false;
}

})(jQuery);
;
(function ($) {
  'use strict';
  Drupal.behaviors.forma11y = {
    attach: function (context, settings) {
      $('.form-managed-file').each(function () {
        var field_container = $(this)
          .parents('div[id$=-ajax-wrapper]');
        var error_container = field_container.siblings('.messages.error');
        var error_container_id = $(this).attr('id') + '-error';

        if (error_container.length) {
          error_container.attr('id', error_container_id)
            .appendTo(field_container
              .find('fieldset.composite-wrapper'));

          $(this).find('input[type=file]')
            .attr('aria-labelledby', error_container_id)
            .change(function () {
              error_container.remove();
            });
          error_container.clone();
        }
      });
    }
  };

  $(document).bind('clientsideValidationInitialized', function () {
    Drupal.myClientsideValidation.forma11yError = function (error, element) {
      var errorId = element.attr('id') + '-error';
      var parents;

      error.attr('id', errorId);

      if (element.is(':radio') || element.is(':checkbox') || element.is(':file')) {
        parents = [
          element.closest('fieldset'),
          element.parents('.form-type-checkbox-tree'),
          element.parents('.composite-wrapper').find('.fieldset-wrapper'),
          element.parents('.form-item:eq(0)'),
          element
        ];

        for (var p in parents) {
          if (parents[p].length) {
            error.insertAfter(parents[p]);
            break;
          }
        }
      }
      else if (element.parents('.webform-component-date').length) {
        error.insertAfter(element.parents('.composite-wrapper').find('.fieldset-wrapper'));
      }
      else {
        if (element.next('div.grippie').length) {
          error.insertAfter(element.next('div.grippie'));
        }
        else {
          error.insertAfter(element);
        }
      }
      element.attr('aria-describedby', function (i, old) {
        return old ? old + ' ' + errorId : errorId;
      });
    };
  });

  $(document).bind('clientsideValidationValid', function (e) {
    var _target = e.target;

    if (typeof _target.attributes !== 'undefined' && _target.attributes !== null) {
      if (typeof _target.attributes['aria-invalid'] !== 'undefined' && _target.attributes['aria-invalid'] !== null) {
        _target.setAttribute('aria-invalid', 'false');
      }
    }
  });

  $(document).bind('clientsideValidationInvalid', function (e) {
    var _target = e.target;

    if (typeof _target.attributes !== 'undefined' && _target.attributes !== null) {
      if (typeof _target.attributes['aria-invalid'] !== 'undefined' && _target.attributes['aria-invalid'] !== null) {
        _target.setAttribute('aria-invalid', 'true');
      }
    }
  });

  // Override the function to remove last active element focus
  if (typeof $.validator !== 'undefined') {
    $.validator.prototype.focusInvalid = function () {
      if (this.settings.focusInvalid) {
        try {
          $(this.errorList.length && this.errorList[0].element || [])
            .filter(':visible')
            .focus()
            // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
            .trigger('focusin');
        }
        catch (e) {
          // ignore IE throwing errors when focusing hidden elements
        }
      }
    };
  }

  $(document).bind('state:required', function (e) {
    if (e.trigger) {
      if (e.value) {
        $(e.target).attr('aria-required', 'true');
      }
      else {
        $(e.target).removeAttr('aria-required');
      }
    }
  });
})(jQuery);
;
