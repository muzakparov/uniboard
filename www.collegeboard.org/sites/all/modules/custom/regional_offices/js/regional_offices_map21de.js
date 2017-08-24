(function ($) {

    if (typeof CB === 'undefined' || !CB) {
        var CB = {};
    }

    CB.aboutUsMap = (function (CB) {
        $(function () {
            init();
        });

        var _activeOverlay, _showTimeout, _effectActive = false, _overImgId = '#mapOverImg',

            init = function () {
                $('#aboutUsMap .mapComponent').css('display', 'block');
                $('#aboutUsMap div.mapRegion').addClass('mapBubble');

                var regionsArr = [
                    'western_regional_office',
                    'midwestern_regional_office',
                    'southwestern_regional_office',
                    'middle_states_regional_office',
                    'new_england_regional_office',
                    'southern_regional_office'
                ];

                for (var i = 0; i < regionsArr.length; i++) {
                    $('#' + regionsArr[i] + '_bubble')
                        .addClass(regionsArr[i] + '_bubble');
                    $('#' + regionsArr[i] + '_bubble')
                        .css('top', (parseInt($('#' + regionsArr[i] + '_point').css('top')) - $('#' + regionsArr[i] + '_bubble').height() - 47) + 'px');
                }

                $('#mapCoords').mouseover(onMouseOver);
                $('#mapCoords').mouseout(onMouseOut);
                $('#mapCoords').click(onClick);

                $('.mapBubble').addClass('vhidden');

                $('#mapCoords area').focus(function (e) {
                    CB.mapTabPlaceHolder = $(this).attr('id');
                    $(this).mouseover();

                });
                $('.mapBubble a:contains(Visit our page)').blur(function (e) {
                    if ($('#' + CB.mapTabPlaceHolder).next().length > 0) {
                        $('#' + CB.mapTabPlaceHolder).next().focus();
                    } else {
                        $('#' + CB.mapTabPlaceHolder + '_bubble').addClass('vhidden').mouseout();

                        if (CB.mapTabPlaceHolder && $('#' + CB.mapTabPlaceHolder + '_bubble').css('visibility') == 'visible') {
                            _activeOverlay = CB.mapTabPlaceHolder;
                            removeBubble();
                        }
                        $('#block-regional-offices-regional-map-block').next('div').find('.content a:first').focus();
                    }
                });
            },

            onMouseOver = function (e) {
                $('.mapBubble a').removeClass('vhidden');

                if (e.target.id != _activeOverlay) {
                    if (_showTimeout) {
                        clearTimeout(_showTimeout);
                        _showTimeout = undefined;
                    }

                    if (_effectActive) {
                        $('.ui-effects-transfer').remove().stop(true, true);
                        $('#' + _activeOverlay + '_point').dequeue();
                        $('#' + _activeOverlay + '_bubble').css('visibility', 'visible');
                        removeBubble();

                        _effectActive = false;
                    }

                    if (_activeOverlay && $('#' + _activeOverlay + '_bubble').css('visibility') == 'visible') {
                        removeBubble();
                    }
                    _activeOverlay = e.target.id;

                    if ($('#' + _activeOverlay + '_bubble').css('visibility') != 'visible') {
                        _showTimeout = setTimeout(showBubble, 500);
                    }


                }
                $(_overImgId).removeClass().addClass(e.target.id + '_img');
            },

            showBubble = function () {

                if ($('#' + _activeOverlay + '_bubble').css('visibility') != 'visible') {
                    _effectActive = true;
                    $('#' + _activeOverlay + '_point').effect('transfer', { to: '#' + _activeOverlay + '_bubble', className: 'mapTransfer' }, 250, onBubbleShow);
                    var activeBubble = '#' + _activeOverlay + '_bubble a:first';
                }

                _showTimeout = undefined;
            },

            onMouseOut = function (e) {
                if (_activeOverlay
                    &&
                    e.target.id.match('_bubble') == null
                    &&
                    (e.relatedTarget && e.relatedTarget.parentNode != $('#' + _activeOverlay + '_bubble')[0])
                    &&
                    (!e.toElement || e.toElement.id.match('_bubble') == null)
                    &&
                    (!e.relatedTarget || e.relatedTarget.id.match('_bubble') == null)
                    &&
                    ((e.toElement && e.toElement.className) || (e.relatedTarget && e.relatedTarget.className)).match('mapTransfer') == null
                    ) {
                    if (_showTimeout) {
                        clearTimeout(_showTimeout);
                        _showTimeout = undefined;
                    }

                    if (($('#' + _activeOverlay + '_bubble').css('visibility') == 'visible')) removeBubble();
                    if ($(_overImgId).hasClass(_activeOverlay + '_img')) $(_overImgId).removeClass();
                    _activeOverlay = undefined;
                }


            },

            removeBubble = function () {
                $('#mapPoint')
                    .css('visibility', 'hidden');

                $('#' + _activeOverlay + '_bubble')
                    .effect('transfer', { to: '#' + _activeOverlay + '_point', className: 'mapTransfer' }, 250)
                    .css('visibility', 'hidden');

                $('#' + _activeOverlay + '_bubble p').removeAttr("tabindex");


            },

            onClick = function (e) {
                return false;
            },

            onBubbleShow = function () {
                _effectActive = false;
                if (_activeOverlay) {
                    $('#' + _activeOverlay + '_bubble').css('visibility', 'visible');

                    var point = $('#' + _activeOverlay + '_point');

                    $('#mapPoint')
                        .css('left', parseInt(point.css('left')) - 12)
                        .css('top', parseInt(point.css('top')) - 18)
                        .css('visibility', 'visible');

                    point = undefined;

                    $('#' + CB.mapTabPlaceHolder + '_bubble p').attr("tabindex", "0");
                    $('#' + CB.mapTabPlaceHolder + '_bubble p:first').focus();

                }
            };

        return {

        };

    })(CB);


    // Document ready stuff... like form validation etc....
    $(function () {
        // Form validation
        var $regionalContactForm = $('.regional-office-contact-form')
        if ($regionalContactForm.length > 0) {

            // Cancel Button, just go back in history to previous page
            $('button.cancel-button', $regionalContactForm).click(function (e) {
                e.preventDefault();
                window.history.go(-1);
            });

            // form validation
            $('form', $regionalContactForm).validate({



                errorLabelContainer: "#messageBox",
                wrapper: "li",

                invalidHandler: function (event, validator) {

                    // 'this' refers to the form
                    var errors = validator.numberOfInvalids();
                    if (errors) {
                        var message = errors == 1
                            ? 'You missed 1 field. It has been highlighted'
                            : 'You missed ' + errors + ' fields. They have been highlighted';
                        $("div.error span").html(message);
                        $("div.error").show();
                    } else {
                        $("div.error").hide();
                    }

                    // set focus for first invalid form item.
                    $('input.error, select.error, textarea.error').first().focus();

                },

                'rules': {
                    'sender_email_validation': {
                        equalTo: '#edit-sender'
                    }
                },

                'messages': {
                    'sender': {
                        'required': '<span class="sr-only">Error: </span>The email field is required',
                        'email': '<span class="sr-only">Error: </span>The email field must be a valid email address'
                    },

                    'sender_email_validation': {
                        'required': '<span class="sr-only">Error: </span>The confirm email field is required',
                        'email': '<span class="sr-only">Error: </span>The confirm email field must be a valid email address',
                        'equalTo': '<span class="sr-only">Error: </span>The email addresses above do not match.'
                    },
                    'customertype': {
                        'required': '<span class="sr-only">Error: </span>This field is required'
                    },
                    'inquiry': {
                        'required':  '<span class="sr-only">Error: </span>The topic field is required'
                    },
                    'comments': {
                        'required':  '<span class="sr-only">Error: </span>The comments field is required'
                    }
                }

            });


        }


    });

	

})(jQuery);