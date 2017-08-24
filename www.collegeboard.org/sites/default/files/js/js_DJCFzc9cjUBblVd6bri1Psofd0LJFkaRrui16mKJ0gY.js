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
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

Drupal.Views = {};

/**
 * jQuery UI tabs, Views integration component
 */
Drupal.behaviors.viewsTabs = {
  attach: function (context) {
    if ($.viewsUi && $.viewsUi.tabs) {
      $('#views-tabset').once('views-processed').viewsTabs({
        selectedClass: 'active'
      });
    }

    $('a.views-remove-link').once('views-processed').click(function(event) {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      event.preventDefault();
   });
  /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row)
    */
  $('a.display-remove-link')
    .addClass('display-processed')
    .click(function() {
      var id = $(this).attr('id').replace('display-remove-link-', '');
      $('#display-row-' + id).hide();
      $('#display-removed-' + id).attr('checked', true);
      return false;
  });
  }
};

/**
 * Helper function to parse a querystring.
 */
Drupal.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pairs = query.split('&');
  for(var i in pairs) {
    if (typeof(pairs[i]) == 'string') {
      var pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Drupal.Views.parseViewArgs = function (href, viewPath) {

  // Provide language prefix.
  if (Drupal.settings.pathPrefix) {
    var viewPath = Drupal.settings.pathPrefix + viewPath;
  }
  var returnObj = {};
  var path = Drupal.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Drupal.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Drupal path portion of an href.
 */
Drupal.Views.getPath = function (href) {
  href = Drupal.Views.pathPortion(href);
  href = href.substring(Drupal.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (var i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

/**
 * Attaches the AJAX behavior to Views exposed filter forms and key View links.
 */
Drupal.behaviors.ViewsAjaxView = {};
Drupal.behaviors.ViewsAjaxView.attach = function() {
  if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
    $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
      Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
    });
  }
};

Drupal.views = {};
Drupal.views.instances = {};

/**
 * Javascript object for a certain view.
 */
Drupal.views.ajaxView = function(settings) {
  var selector = '.view-dom-id-' + settings.view_dom_id;
  this.$view = $(selector);

  // Retrieve the path to use for views' ajax.
  var ajax_path = Drupal.settings.views.ajax_path;

  // If there are multiple views this might've ended up showing up multiple times.
  if (ajax_path.constructor.toString().indexOf("Array") != -1) {
    ajax_path = ajax_path[0];
  }

  // Check if there are any GET parameters to send to views.
  var queryString = window.location.search || '';
  if (queryString !== '') {
    // Remove the question mark and Drupal path component if any.
    var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
    if (queryString !== '') {
      // If there is a '?' in ajax_path, clean url are on and & should be used to add parameters.
      queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
    }
  }

  this.element_settings = {
    url: ajax_path + queryString,
    submit: settings,
    setClick: true,
    event: 'click',
    selector: selector,
    progress: { type: 'throbber' }
  };

  this.settings = settings;

  // Add the ajax to exposed forms.
  this.$exposed_form = $('#views-exposed-form-'+ settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
  this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

  // Store Drupal.ajax objects here for all pager links.
  this.links = [];

  // Add the ajax to pagers.
  this.$view
    // Don't attach to nested views. Doing so would attach multiple behaviors
    // to a given element.
    .filter(jQuery.proxy(this.filterNestedViews, this))
    .once(jQuery.proxy(this.attachPagerAjax, this));

  // Add a trigger to update this view specifically. In order to trigger a
  // refresh use the following code.
  //
  // @code
  // jQuery('.view-name').trigger('RefreshView');
  // @endcode
  // Add a trigger to update this view specifically.
  var self_settings = this.element_settings;
  self_settings.event = 'RefreshView';
  this.refreshViewAjax = new Drupal.ajax(this.selector, this.$view, self_settings);
};

Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
  var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
  button = button[0];

  this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
};

Drupal.views.ajaxView.prototype.filterNestedViews= function() {
  // If there is at least one parent with a view class, this view
  // is nested (e.g., an attachment). Bail.
  return !this.$view.parents('.view').size();
};

/**
 * Attach the ajax behavior to each link.
 */
Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
  this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
  .each(jQuery.proxy(this.attachPagerLinkAjax, this));
};

/**
 * Attach the ajax behavior to a singe link.
 */
Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
  var $link = $(link);
  var viewData = {};
  var href = $link.attr('href');
  // Construct an object using the settings defaults and then overriding
  // with data specific to the link.
  $.extend(
    viewData,
    this.settings,
    Drupal.Views.parseQueryString(href),
    // Extract argument data from the URL.
    Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
  );

  // For anchor tags, these will go to the target of the anchor rather
  // than the usual location.
  $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

  this.element_settings.submit = viewData;
  this.pagerAjax = new Drupal.ajax(false, $link, this.element_settings);
  this.links.push(this.pagerAjax);
};

Drupal.ajax.prototype.commands.viewsScrollTop = function (ajax, response, status) {
  // Scroll to the top of the view. This will allow users
  // to browse newly loaded content after e.g. clicking a pager
  // link.
  var offset = $(response.selector).offset();
  // We can't guarantee that the scrollable object should be
  // the body, as the view could be embedded in something
  // more complex such as a modal popup. Recurse up the DOM
  // and scroll the first element that has a non-zero top.
  var scrollTarget = response.selector;
  while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
    scrollTarget = $(scrollTarget).parent();
  }
  // Only scroll upward
  if (offset.top - 10 < $(scrollTarget).scrollTop()) {
    $(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
  }
};

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
/* jshint strict: true */
/* global Drupal, jQuery: false */

/*
 *  CB Practice Questions
 *
 *  @Author: Mike Sharkey
 *  @Date  : 07/17/2014
 */
(function($) {
  "use strict";

  Drupal.behaviors.cb_practiceAnswerValidation = {

    attach: function(context) {
      // The Answer buttons under each question
      var answerButton = $(".practiceQuestion_btnAnswer", context);

      // Only run this once. Prevents multiple declarations.
      answerButton.once("cb_practiceAnswerValidation", function() {
        $(this).on("keypress click", function(e) {

          // Check if they clicked enter, space, or mouse clicked
          if($(window).keyTrigger(e)){
            e.preventDefault();
            // Pass whatever they clicked on to the validation function
            validateAnswer($(this));
          }

        });
      });

      var validateAnswer = function(obj) {
        /* ================================================== */
        // Variables

        // The answer button's parent, which is the Tab pane the question is currently in.
        var parentQuestion  = obj.parent();

        // The current active pane.
        var currentPane     = $(".tab-pane.active");

        // The ID of the current tab, such as "3"
        var currentTab      = currentPane.attr("id");

        // Get all radio buttons in this question.
        var radioGroup      = parentQuestion.find(":radio");

        // Get information regarding the correct answer vs. which radio button the user clicked.
        var correct         = parentQuestion.find(":radio[value=1]");
        var selected        = parentQuestion.find(":radio:checked");

        var explanation     = parentQuestion.find(".practiceQuestion_explanation");

        // An icon array, checkmark or x that can be used later to replace the answer choices.
        var buttonTemplates = [
          "<i id=\"" + currentTab + "_cb_practice_incorrect\" class=\"glyphicon glyphicon-remove\"><span class=\"sr-only\">Incorrect Answer</span></i>", // 0 - if incorrect
          "<i id=\"" + currentTab + "_cb_practice_correct\" class=\"glyphicon glyphicon-ok\"><span class=\"sr-only\">Correct Answer</span></i>" // 1 - if correct
        ];

        // Variable declarations to be used later.
        var correctResponse, radioCorrectIndex, practiceQuestion_correctAnswer;

        // This one is an exception... Student-Produced Response doesn't have an answer group,
        // so it should be treated without validating anything and just show the answer.
        if(currentPane.find("span.practiceQuestion_questionType").text() === "Student-Produced Response"){

          // The lettering has been added, (A), (B), (C), etc. So we will just break those up -> ["(A"] ["Blah Blah Answer"]
          // And there is going to only be 1 answer since this isn't technically Multiple Choice, so index 1 will be "Blah Blah Answer."
          correctResponse = currentPane.find(".practiceQuestion_txtAnswers p").text().split(") ");

          // Show the explanation if it isn't already there
          // The Explanation: set tab index so it can be focusable, prepend the answer, fade in, and then finally focus on it
          if(!(explanation.is(":visible"))){
            explanation.attr("tabindex", 0).prepend("<p><strong>Correct Answer:</strong><br />" + correctResponse[1] + "</p>").fadeIn("fast", function() {
                $(this).focus();
              });
            // Determine if there is another question in the list, and either show or hide the button
            goNextValue(obj);

          }
          // Abort the rest of the code, we don't want to validate anything else, we're done.
          return false;
        } // END IF Student-Produced Response exception

        if (selected.length < 1) {
          // They did not select an answer, abort the rest of the code.
          // @TODO Throw an error (?)
          // Right now it just ignores the click on the answer button if they didn't select anything.
          return false;
        }

        // Get the index of the correct answer so we can assign it a Letter
        radioCorrectIndex = $("input[type=radio][name='" + correct.attr("name") + "']").index(correct);

        // Correct answer letter. fromCharCode 65 starts with capital "A", plus the index of the correct answer.
        // 65 + 0 = The answer is "A"
        // 65 + 1 = The answer is "B" etc.
        practiceQuestion_correctAnswer = String.fromCharCode(65 + radioCorrectIndex);

        // User picked the wrong answer
        if (correct.attr("value") !== selected.attr("value")) {
          // Put a WRONG mark next to their answer, replacing the radio button.
          selected.replaceWith(buttonTemplates[0]);
        }

        // Put a RIGHT checkmark next to the right answer regardless if they got it wrong or not.
        correct.replaceWith(buttonTemplates[1]);

        // Disable all other radio buttons on this group
        radioGroup.attr("disabled", true);

        // The Explanation: set tab index so it can be focusable, pre-pend the answer, fade in, and then finally focus on it
        parentQuestion.find(".practiceQuestion_explanation").attr("tabindex", 0).prepend("<p>The correct answer is <span class=\"practiceQuestion_correctAnswer\">" + practiceQuestion_correctAnswer + "</span></p>").fadeIn("fast", function() {
                $(this).focus();
              });

        // Determine if there is another question in the list, and either show or hide the button
        goNextValue(obj);
      };

      // Logic to show certain buttons which depends on if there is another question after this one.
      var goNextValue = function(obj) {
        // If there is another tab after this one, show the Next button.
        if ($(".practiceQuestionsMaster .nav-tabs > .active").next("li").find("a").length > 0) {

          // We have to add a bind to the new button since is has been dynamically generated.
          obj.html("<span class=\"sr-only\">Proceed to </span>Next Question").removeClass("practiceQuestion_btnAnswer").addClass("practiceQuestion_btnNext").bind("keypress click", function(e) {
                // Check if they clicked enter, space, or mouse clicked
                if($(window).keyTrigger(e)){
                  // Click the next bootstrap tab, and focus on it.
                  $(".practiceQuestionsMaster .nav-tabs > .active").next("li").find("a").trigger("click").focus();

                  // Scroll to top of page because Firefox can't handle focus correctly
                  $(document).scrollTop($(".practiceQuestionsMaster").offset().top - 120);
                }

            });
        } else {
          // Just hide the button if there are no more questions/tabs.
          obj.remove();
        }
      };
    } // END attach: function
  }; // END Drupal.behaviors.cb_practiceAnswerValidation

  // Dynamic line numbers
  Drupal.behaviors.cb_practiceLineNumbering = {

    attach: function(context) {

      /* ================================================== */
      // Variables

      var currentViewPort   = "mobile"; // fallback assumes mobile first

      var pagination        = $(".practiceQuestionsMaster .nav-tabs", context);
      var passages          = $(".practiceQuestionsMaster .practiceQuestion_txtPassage", context); // all passages on the page
      var answerGroups      = $(".practiceQuestionsMaster .practiceQuestion_txtAnswers", context); // all groups of answers on the page

      var currentPassageHeight;

      // For some reason, sometimes his function does not exist when in the Admin section, make sure it exists before trying to use it
      if ($.isFunction($(window).checkViewport)) {
        currentViewPort = $(window).checkViewport(); // returns 'mobile', 'tablet', etc. Default is "mobile" defined above
      }

      /* ========================================================
       * FUNCTION DECLARATIONS
       *  Helper functions, used in our main ones
       * ======================================================== */

      // Line height in IE is using EM instead of PX. Convert to PX.
      var ieLineHeight = function(obj){
        var x = parseInt(obj.css("font-size")); // 14
        var y = obj.css("line-height");         // 1.4285
        return Math.ceil(x*y);                  // should be "20"
      };

      // Get the total number of lines in a jQuery object e.g. a passage
      var getPassageLines = function(obj) {
        var lineHeight = parseInt(obj.css("line-height")),
            fontSize   =  parseInt(obj.css("font-size"));

        // If the browser is using EM instead of PX, results in too many lines. Fix by converting to PX (above).
        if (lineHeight < 3){
          lineHeight = ieLineHeight(obj);
        }

        // Override styles to be more specific to ensure a consistent experience across all browsers.
        $("p",passages).addClass("passage-paragraph").css({"line-height": lineHeight + "px", "margin-bottom":lineHeight + "px", "font-size": fontSize + "px"});
        $(".practiceQuestion_lineContainer span").css("line-height", lineHeight + "px");

        return Math.ceil(obj.outerHeight() / lineHeight); // INT
      };

      // Returns the line number an anchor is currently on
      var getLineOffset = function(anchorName, currentPassage, offsetToggle) {

        // Find the passage based on the name passed
        var anchorInPassage = currentPassage.find("a[name=" + anchorName + "]");

        var lineHeight = parseInt(currentPassage.css("line-height"));

        var passageOffset = 0, anchorPosition = 0;

        // Fixed offsets to add due to fixed headers
        var fixedHeadersOffset  = $("#cbHeader").outerHeight();

        // Set default 0 if does not exist
        var fixedAdminOffset  = $("#admin-menu").length > 0 ? $("#admin-menu").outerHeight() : 0;

        var totalFixedOffset  = fixedHeadersOffset + fixedAdminOffset;

        // Make sure the anchor you are looking for exists first.
        if (anchorInPassage.length > 0) {

          // Distance from top of page to top of passage.
          passageOffset  = currentPassage.offset().top;

          // Distance from anchor position to top of page.
          anchorPosition = anchorInPassage.position().top + anchorInPassage.parent().position().top;

          // It's using EM instead of PX, results in too many lines, convert to PX
          if (lineHeight < 3){
            lineHeight = ieLineHeight(currentPassage);
          }

          switch(offsetToggle){
            case true: // return absolute px offset
              anchorPosition = Math.ceil(anchorPosition + passageOffset - totalFixedOffset);
              break;
            case false: // return line number
              anchorPosition = Math.ceil((anchorPosition + 1) / lineHeight); // added 1 to deal with chrome's lack of sub-pixels
              break;
          }

        } // end IF anchor exists

        return anchorPosition;
      };
      // End getLineOffset();

      /* ==================================================
       *  Main functions, called by Event handlers
       * ================================================== */

      // Used to add the line numbers on the left side of the passage
      var renderSideLines = function(activePane) {

        // string : Hidden text that indicates this is "Passage Based Reading Lined Paragraph"
        var passageType = activePane.find(".practiceQuestion_passageType").text();

        // object : Passage to be used for the current question/answers
        var tempPassage = activePane.find(".practiceQuestion_txtPassage");

        // object : Container that will be dynamically filled with line numbers
        var lineHolder  = activePane.find(".practiceQuestion_lineContainer");

        // int  : The number of lines in this passage
        var passageLines = getPassageLines(tempPassage);

        // Counter var
        var i;

        // Exception, the line numbers should only appear if this is Passage Based Reading and the length is > 0
        if (passageType === "Passage Based Reading Lined Paragraph" && lineHolder.length > 0) {

          // Loop through and add Line Numbers or empty blocks, the empty blocks maintain proper spacing between Lines.
          // Typical template: "Line" on the first line, and then show line number every 5 lines (5, 10, 15, etc.)

          for (i = 1; i <= passageLines; i++) {

            // If at the top, just say "Line" instead of 1
            if (i === 1) {
              lineHolder.empty().append("<span>Line</span>");
            }
            // Change 5 to something else if you want to show the line numbers more or less often
            else if (i % 5 === 0) {
              lineHolder.append("<span>" + i + "</span>");
            }
            // Add empty block to maintain correct spacing
            else {
              lineHolder.append("<span>&nbsp;</span>");
            }

            // Double check passage height constantly. As you add lines, it is bumping the text of the passage inward,
            //   which makes the passage longer as we loop through and requires more line numbers
            passageLines = getPassageLines(tempPassage);

          } // END FOR LOOP

          // Wrap the whole thing in a <P> for css formatting to match the passage
          lineHolder.wrapInner("<p></p>");

        } // END IF PASSAGETYPE === Lined Paragraph

        // ELSE DO NOTHING, we don't line number

      };

      // Updates line numbers in the question to reflect where these references exist in the passages if they move
      var renderAnchorLinks = function(activePane) {
        var anchor              = "";
        var current_passage     = activePane.find(".practiceQuestion_txtPassage");
        var anchorCollection    = activePane.find(".practiceQuestion_txtQuestion, .practiceQuestion_txtAnswers, .practiceQuestion_explanation");
        var anchor_position, start, end, ix;

        // Loop through all anchor tags in our question
        anchorCollection.find("a").each(function() {

          // Get "myAnchor" instead of "#myAnchor"
          anchor = $(this).attr("href").substring(1);

          // <SPAN> tags in our question's anchors indicate a range of line numbers, e.g. Line <span>1</span> - <span>10</span>
          if ($(this).find("span").length > 1) {

            // We should have 2 entries in the Passage: start-myAnchor and end-myAnchor
            // We need to grab the line numbers for both of these positions

            // The anchor at this point is start-myAnchor
            // Adding the "false" argument means we want line number, not px offset
            start  = getLineOffset(anchor, current_passage, false);

            // Look for end-myAnchor now
            anchor = anchor.replace("start", "end");

            // False argument means we want line number, not px offset
            end    = getLineOffset(anchor, current_passage, false);

            // Update the spans with the correct Line numbers
            $(this).find("span").each(function(index) {
              // ix will be either 0 or 1
              ix = index % 2;

              // Check if this is 0 or 1
              switch (ix) {
                // Alternates between start and end; ALWAYS have paired "start" and "end" tags
                case 0:
                  // Replace the text in the SPAN with the line number from the start
                  $(this).text(start);
                  break;
                case 1:
                  // Replace the text in the SPAN with the line number from the end
                  $(this).text(end);
                  break;
              }
            });

          } // END ("span").length > 1
          else {
            // We only have 1 line reference, WHEW!
            // Get the line number by passing the "false" argument. Otherwise it would return PX value, and we don't want that.
            anchor_position = getLineOffset(anchor, current_passage, false);

            // Update the line number in the span inside of the question
            $(this).find("span").text(anchor_position);

          } // END ELSE ONLY HAVE SINGLE LINE NUMBER REFERENCE

        }); // END (.current_question a) EACH

      }; // END renderAnchorLinks


      /* ==================================================
       * EVENT HANDLERS
       * ================================================== */
      pagination.once("cbPracticeNavTabs", function() {

        // Event handler for the "Start" button.
        $(".practiceQuestionsMaster .practiceQuestion_btnStart").on("keypress click", function(e) {

          // Check if they clicked enter, space, or mouse clicked
          if($(window).keyTrigger(e)){
            e.preventDefault();

            // Trigger the next tab if available
            $(".practiceQuestionsMaster .nav-tabs > .active").next("li").find("a").trigger("click").focus();

            // Scroll to top of page because Firefox can't handle focus correctly
            $(document).scrollTop($(".practiceQuestionsMaster").offset().top - 120);
          }

        });


        $(window).on("load", function() {

          // Go through all the passages on this page, and add line numbers if required
          $.each(passages, function() {

            if ($(this).find("span.practiceQuestion_passageType").text() === "Passage Based Reading Lined Paragraph") {

              // Add the container that will house the line numbers
              $(this).prepend(
                $("<div/>", {
                  "class": "practiceQuestion_lineContainer",
                  "aria-hidden": "true" // Hide this from screen readers because it would sound odd, "LINE 5 10 15", etc...
                })

              );

            } // END IF PASSAGE BASED READING - LINED PARAGRAPH

          }); // END EACH()


          // Go through each answer group and add appropriate letters: (A)(B)(C) and Aria labels..
          $.each(answerGroups, function() {

            var answerGroupings = $(this); // store all in a separate variable to avoid confusion

            // Add letters to each answer
            $.each(answerGroupings.find(".AnswerGroupWrapper p"), function(i) {
              // fromCharCode 65 starts with capital "A"
              $(this).prepend("<strong>(" + String.fromCharCode(65 + i) + ")</strong> ");
            });

            // Find all radio answers in this group and assign their aria labels
            $.each(answerGroupings.find(".AnswerGroupWrapper input[type=radio]"), function(i) {

              var inputID   = $(this).attr("id") + "_" + $(this).closest(".tab-pane").attr("id") + "_" + i;
              var inputName   = $(this).attr("id") + "_" + $(this).closest(".tab-pane").attr("id");
              var labelID   = $(this).next("label").attr("id") + "_" + $(this).closest(".tab-pane").attr("id") + "_" + i;

              var answer    = $(this); // this answer
              var label     = $(this).next("label"); // this answer's label

              // Update radio input attributes
              answer.attr("id", inputID);         // AnswerGroupInput_1_0
              answer.attr("name", inputName);       // AnswerGroupInput_1_0
              answer.attr("aria-labelledby", labelID);  // aria-labelledby = "AnswerGroupLabel_1_0"


              label.attr("id", labelID);  // AnswerGroupLabel_1_0
              label.attr("for", inputID);  // AnswerGroupInput_1_0

              // Reset radio buttons if the browser cached their "disabled" state
              answer.attr("disabled", false).prop("checked", false);
            });

          }); // END EACH() answergroups

        }); //END WINDOW.ON("READY")

        // Run the line number update when the current active pane is updated
        // Bootstrap tabs classes
        $("a[data-toggle=\"tab\"]", pagination).on("shown.bs.tab", function() {
          var activePane = $(".practiceQuestionsMaster .tab-pane.active"); // get the current active pane
          var passageType = activePane.find(".practiceQuestion_passageType").text();      // string

          // Only update the side line numbers if the question type needs it
          if (passageType === "Passage Based Reading Lined Paragraph") {
            renderSideLines(activePane); // Refreshes the lines for the current active tab
            renderAnchorLinks(activePane); // Refreshes the line numbers referenced in the questions
          }

        }); //END TOGGLE BOOTSTRAP TAB


        // Run line number check when the window is resized
        // Thrown inside of a timeout because it was updating too quickly
        $(window).on("resize", function() {
          var activePane = $(".practiceQuestionsMaster .tab-pane.active"); // Get the current active pane
          var passageType = activePane.find(".practiceQuestion_passageType").text();      // string
          var current_passage = activePane.find(".practiceQuestion_txtPassage");       // object

          if (currentViewPort !== $(window).checkViewport() || currentPassageHeight !== current_passage.height()) {
            // window was resized and text would have shifted.

            // only update the side line numbers if the question type needs it
            if (passageType === "Passage Based Reading Lined Paragraph") {
              renderSideLines(activePane); // Refreshes the lines for the current active tab
              renderAnchorLinks(activePane); // Refreshes the line numbers referenced in the questions
            }

          }

          currentViewPort = $(window).checkViewport();
          currentPassageHeight = current_passage.height();

        }); // END WINDOW.ON("RESIZE")

        // Assign click event for line references in both Questions and Answers
        $(".practiceQuestion_txtQuestion a, .practiceQuestion_txtAnswers a, .practiceQuestion_explanation a").bind("keypress click", function(e) {

          // Check if they clicked enter, space, or mouse clicked
          if($(window).keyTrigger(e)){
            e.preventDefault();

            // Get the current active pane
            var activePane = $(".practiceQuestionsMaster .tab-pane.active");
            var current_passage = activePane.find(".practiceQuestion_txtPassage");

            // returns "myAnchor" instead of "#myAnchor"
            var anchor = $(this).attr("href").substring(1);

            // true means we want px offset
            var anchor_position = getLineOffset(anchor, current_passage, true);

            $("html,body").animate({
              scrollTop: anchor_position
            }, 1000);

          }
        });
      }); // END ONCE
    } // END attach: function
  }; // END Drupal.behaviors.cb_practiceLineNumbering

  Drupal.behaviors.cbCustomQuestions = {
    attach: function(context) {

      /* ================================================== */
      // Variables
      var passages = $(".practiceQuestionsMaster .tab-pane", context); // all tabs
      var passageAnchorLinks, questionType, answerGroup, questionLabel, questionId;

      $(window).on("load", function() {
        // Loop through all questions
        $.each(passages, function() {
          questionType  = $(this).find(".practiceQuestion_questionType").text();
          questionLabel = $(this).find(".practiceQuestionsLabel:contains('Question')");
          questionId    = $(this).attr("id");

          // Add the question number to the H2 tag
          if(questionLabel.text() === "Question"){
            questionLabel.html( questionLabel.text() + " " + questionId );
          }

          if (questionType === "Identifying Sentence Errors"){

            passageAnchorLinks = $(this).find(".practiceQuestion_txtQuestion a");

            $(this).find(".practiceQuestion_txtQuestion").addClass("sentenceErrorQuestion");

            if(passageAnchorLinks.length > 0){ // check for anchors
              $.each(passageAnchorLinks, function(i) {
                // loop through all anchors and do stuff
                $(this).addClass("sentenceError");
                $(this).append("<span aria-hidden=\"true\">" + String.fromCharCode(65 + i) + "</span>");
              });
            }

          } // END IF PASSAGETYPE === Identifying Sentence Errors

          if (questionType === "Student-Produced Response"){
            answerGroup = $(this).find(".practiceQuestion_txtAnswers").attr("aria-hidden", true).hide();
            $(".practiceQuestion_btnAnswer").html("Show Answer");
          } // END IF PASSAGETYPE === Student-Produced Response

        }); // END EACH PASSAGES
      }); // END WINDOW.ON LOAD
    } // END ATTACH
  }; // END cb_practiceIdentifyingSentenceErrors

})(jQuery); // END function($)
;
