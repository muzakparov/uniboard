Drupal.behaviors.privacyPolicyTheme = {
  attach: function (context, settings) {
    $('.section-box', context).click(function () {
      window.location = $(this).find('.learn-more-button a').attr('href');
    });
    $('a.new-window', context).click(function (){
      window.open(this.href);
      return false;
    });
  }
};
;
