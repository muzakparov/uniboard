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
