/*!
 *  Apricot v3.0.0
 *  By:             The College Board
 *  App:            apricot
 *  Build Time:     2017-07-26 [12:54:16 PM] EDT
 *  Build Number:   unknown
 *  SVN Revision:   unknown
 *  Jenkins Job:    unknown
 *  This version of Apricot includes Bootstrap v3.7.0
 */

/* ========================================================================
 * Program Band
 * ========================================================================
 *
 * Style and behaivior adjustment for Program Band Element
 * ======================================================================== */

+function ($, cb) {
  'use strict';

  // ----- Activate on page load
  $(window).on('load', function () {
    // Progran Band
    $('.cb-program-brand-3-0-0.cb-program-offerings a[class$="-black-b"]').each(function () {
      var
        self = $(this),
        className = self.attr('class'),
        hoverClass= className.replace('-black','');

      self.on('mouseover.cb-program-brand-3-0-0', function() {
        self.addClass(hoverClass)
          .removeClass(className);
      });

      self.on('mouseleave.cb-program-brand-3-0-0', function() {
        self.addClass(className)
          .removeClass(hoverClass);
      });
    });

    // for accessibility, removed color
    $('.cb-program-brand-3-0-0.cb-program-offerings li').each(function () {
      var self =$(this),
      $a = $('a', self);

      if ($a.css('color') !== 'rgb(0, 119, 200)') {
        self.css('background', 'none')
          .addClass('cb-no-color');

        $a.css('background', 'none');
        $('span', $a).removeClass('sr-only');
      }
    });
  });
}(jQuery, cb);
