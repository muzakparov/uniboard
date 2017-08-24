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
(function(c){c.extend(c.fn,{validate:function(a){if(this.length){var b=c.data(this[0],"validator");if(b)return b;this.attr("novalidate","novalidate");b=new c.validator(a,this[0]);c.data(this[0],"validator",b);b.settings.onsubmit&&(this.validateDelegate(":submit","click",function(a){b.settings.submitHandler&&(b.submitButton=a.target);c(a.target).hasClass("cancel")&&(b.cancelSubmit=!0)}),this.submit(function(a){function e(){var e;return b.settings.submitHandler?(b.submitButton&&(e=c("<input type='hidden'/>").attr("name",
b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm)),b.settings.submitHandler.call(b,b.currentForm,a),b.submitButton&&e.remove(),!1):!0}b.settings.debug&&a.preventDefault();if(b.cancelSubmit)return b.cancelSubmit=!1,e();if(b.form())return b.pendingRequest?(b.formSubmitted=!0,!1):e();b.focusInvalid();return!1}));return b}a&&(a.debug&&window.console)&&console.warn("nothing selected, can't validate, returning nothing")},valid:function(){if(c(this[0]).is("form"))return this.validate().form();
var a=!0,b=c(this[0].form).validate();this.each(function(){a&=b.element(this)});return a},removeAttrs:function(a){var b={},d=this;c.each(a.split(/\s/),function(a,c){b[c]=d.attr(c);d.removeAttr(c)});return b},rules:function(a,b){var d=this[0];if(a){var e=c.data(d.form,"validator").settings,f=e.rules,g=c.validator.staticRules(d);switch(a){case "add":c.extend(g,c.validator.normalizeRule(b));f[d.name]=g;b.messages&&(e.messages[d.name]=c.extend(e.messages[d.name],b.messages));break;case "remove":if(!b)return delete f[d.name],
g;var h={};c.each(b.split(/\s/),function(a,b){h[b]=g[b];delete g[b]});return h}}d=c.validator.normalizeRules(c.extend({},c.validator.classRules(d),c.validator.attributeRules(d),c.validator.dataRules(d),c.validator.staticRules(d)),d);d.required&&(e=d.required,delete d.required,d=c.extend({required:e},d));return d}});c.extend(c.expr[":"],{blank:function(a){return!c.trim(""+a.value)},filled:function(a){return!!c.trim(""+a.value)},unchecked:function(a){return!a.checked}});c.validator=function(a,b){this.settings=
c.extend(!0,{},c.validator.defaults,a);this.currentForm=b;this.init()};c.validator.format=function(a,b){if(1===arguments.length)return function(){var b=c.makeArray(arguments);b.unshift(a);return c.validator.format.apply(this,b)};2<arguments.length&&b.constructor!==Array&&(b=c.makeArray(arguments).slice(1));b.constructor!==Array&&(b=[b]);c.each(b,function(b,c){a=a.replace(RegExp("\\{"+b+"\\}","g"),c)});return a};c.extend(c.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",
errorElement:"label",focusInvalid:!0,errorContainer:c([]),errorLabelContainer:c([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a;this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(a)).hide())},onfocusout:function(a){!this.checkable(a)&&(a.name in this.submitted||!this.optional(a))&&this.element(a)},onkeyup:function(a,
b){9===b.which&&""===this.elementValue(a)||(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(a,b,d){"radio"===a.type?this.findByName(a.name).addClass(b).removeClass(d):c(a).addClass(b).removeClass(d)},unhighlight:function(a,b,d){"radio"===a.type?this.findByName(a.name).removeClass(b).addClass(d):c(a).removeClass(b).addClass(d)}},setDefaults:function(a){c.extend(c.validator.defaults,
a)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:c.validator.format("Please enter no more than {0} characters."),minlength:c.validator.format("Please enter at least {0} characters."),
rangelength:c.validator.format("Please enter a value between {0} and {1} characters long."),range:c.validator.format("Please enter a value between {0} and {1}."),max:c.validator.format("Please enter a value less than or equal to {0}."),min:c.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function a(a){var b=c.data(this[0].form,"validator"),d="on"+a.type.replace(/^validate/,"");b.settings[d]&&b.settings[d].call(b,this[0],a)}this.labelContainer=
c(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||c(this.currentForm);this.containers=c(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=this.groups={};c.each(this.settings.groups,function(a,d){"string"===typeof d&&(d=d.split(/\s/));c.each(d,function(c,d){b[d]=a})});var d=this.settings.rules;c.each(d,function(a,b){d[a]=
c.validator.normalizeRule(b)});c(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",a).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",a);this.settings.invalidHandler&&c(this.currentForm).bind("invalid-form.validate",
this.settings.invalidHandler)},form:function(){this.checkForm();c.extend(this.submitted,this.errorMap);this.invalid=c.extend({},this.errorMap);this.valid()||c(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(a){this.lastElement=a=this.validationTargetFor(this.clean(a));this.prepareElement(a);this.currentElements=
c(a);var b=!1!==this.check(a);b?delete this.invalid[a.name]:this.invalid[a.name]=!0;this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers));this.showErrors();return b},showErrors:function(a){if(a){c.extend(this.errorMap,a);this.errorList=[];for(var b in a)this.errorList.push({message:a[b],element:this.findByName(b)[0]});this.successList=c.grep(this.successList,function(b){return!(b.name in a)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):
this.defaultShowErrors()},resetForm:function(){c.fn.resetForm&&c(this.currentForm).resetForm();this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b=0,c;for(c in a)b++;return b},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},
focusInvalid:function(){if(this.settings.focusInvalid)try{c(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},findLastActive:function(){var a=this.lastActive;return a&&1===c.grep(this.errorList,function(b){return b.element.name===a.name}).length&&a},elements:function(){var a=this,b={};return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&
(a.settings.debug&&window.console)&&console.error("%o has no name assigned",this);return this.name in b||!a.objectLength(c(this).rules())?!1:b[this.name]=!0})},clean:function(a){return c(a)[0]},errors:function(){var a=this.settings.errorClass.replace(" ",".");return c(this.settings.errorElement+"."+a,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=c([]);this.toHide=c([]);this.currentElements=c([])},prepareForm:function(){this.reset();this.toHide=
this.errors().add(this.containers)},prepareElement:function(a){this.reset();this.toHide=this.errorsFor(a)},elementValue:function(a){var b=c(a).attr("type"),d=c(a).val();return"radio"===b||"checkbox"===b?c('input[name="'+c(a).attr("name")+'"]:checked').val():"string"===typeof d?d.replace(/\r/g,""):d},check:function(a){a=this.validationTargetFor(this.clean(a));var b=c(a).rules(),d=!1,e=this.elementValue(a),f,g;for(g in b){var h={method:g,parameters:b[g]};try{if(f=c.validator.methods[g].call(this,e,
a,h.parameters),"dependency-mismatch"===f)d=!0;else{d=!1;if("pending"===f){this.toHide=this.toHide.not(this.errorsFor(a));return}if(!f)return this.formatAndAdd(a,h),!1}}catch(k){throw this.settings.debug&&window.console&&console.log("exception occured when checking element "+a.id+", check the '"+h.method+"' method",k),k;}}if(!d)return this.objectLength(b)&&this.successList.push(a),!0},customDataMessage:function(a,b){return c(a).data("msg-"+b.toLowerCase())||a.attributes&&c(a).attr("data-msg-"+b.toLowerCase())},
customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(a,b){return this.findDefined(this.customMessage(a.name,b),this.customDataMessage(a,b),!this.settings.ignoreTitle&&a.title||void 0,c.validator.messages[b],"<strong>Warning: No message defined for "+a.name+"</strong>")},formatAndAdd:function(a,b){var d=this.defaultMessage(a,
b.method),e=/\$?\{(\d+)\}/g;"function"===typeof d?d=d.call(this,b.parameters,a):e.test(d)&&(d=c.validator.format(d.replace(e,"{$1}"),b.parameters));this.errorList.push({message:d,element:a});this.errorMap[a.name]=d;this.submitted[a.name]=d},addWrapper:function(a){this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper)));return a},defaultShowErrors:function(){var a,b;for(a=0;this.errorList[a];a++)b=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,
this.settings.validClass),this.showLabel(b.element,b.message);this.errorList.length&&(this.toShow=this.toShow.add(this.containers));if(this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight){a=0;for(b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass)}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},
invalidElements:function(){return c(this.errorList).map(function(){return this.element})},showLabel:function(a,b){var d=this.errorsFor(a);d.length?(d.removeClass(this.settings.validClass).addClass(this.settings.errorClass),d.attr("generated")&&d.html(b)):(d=c("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(a),generated:!0}).addClass(this.settings.errorClass).html(b||""),this.settings.wrapper&&(d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(d).length||
(this.settings.errorPlacement?this.settings.errorPlacement(d,c(a)):d.insertAfter(a)));!b&&this.settings.success&&(d.text(""),"string"===typeof this.settings.success?d.addClass(this.settings.success):this.settings.success(d,a));this.toShow=this.toShow.add(d)},errorsFor:function(a){var b=this.idOrName(a);return this.errors().filter(function(){return c(this).attr("for")===b})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){this.checkable(a)&&
(a=this.findByName(a.name).not(this.settings.ignore)[0]);return a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(a){return c(this.currentForm).find('[name="'+a+'"]')},getLength:function(a,b){switch(b.nodeName.toLowerCase()){case "select":return c("option:selected",b).length;case "input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return a.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,
b):!0},dependTypes:{"boolean":function(a){return a},string:function(a,b){return!!c(a,b.form).length},"function":function(a,b){return a(b)}},optional:function(a){var b=this.elementValue(a);return!c.validator.methods.required.call(this,b,a)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(a,b){this.pendingRequest--;0>this.pendingRequest&&(this.pendingRequest=0);delete this.pending[a.name];b&&0===this.pendingRequest&&
this.formSubmitted&&this.form()?(c(this.currentForm).submit(),this.formSubmitted=!1):!b&&(0===this.pendingRequest&&this.formSubmitted)&&(c(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(a){return c.data(a,"previousValue")||c.data(a,"previousValue",{old:null,valid:!0,message:this.defaultMessage(a,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},
creditcard:{creditcard:!0}},addClassRules:function(a,b){a.constructor===String?this.classRuleSettings[a]=b:c.extend(this.classRuleSettings,a)},classRules:function(a){var b={};(a=c(a).attr("class"))&&c.each(a.split(" "),function(){this in c.validator.classRuleSettings&&c.extend(b,c.validator.classRuleSettings[this])});return b},attributeRules:function(a){var b={};a=c(a);for(var d in c.validator.methods){var e;"required"===d?(e=a.get(0).getAttribute(d),""===e&&(e=!0),e=!!e):e=a.attr(d);e?b[d]=e:a[0].getAttribute("type")===
d&&(b[d]=!0)}b.maxlength&&/-1|2147483647|524288/.test(b.maxlength)&&delete b.maxlength;return b},dataRules:function(a){var b,d={},e=c(a);for(b in c.validator.methods)a=e.data("rule-"+b.toLowerCase()),void 0!==a&&(d[b]=a);return d},staticRules:function(a){var b={},d=c.data(a.form,"validator");d.settings.rules&&(b=c.validator.normalizeRule(d.settings.rules[a.name])||{});return b},normalizeRules:function(a,b){c.each(a,function(d,e){if(!1===e)delete a[d];else if(e.param||e.depends){var f=!0;switch(typeof e.depends){case "string":f=
!!c(e.depends,b.form).length;break;case "function":f=e.depends.call(b,b)}f?a[d]=void 0!==e.param?e.param:!0:delete a[d]}});c.each(a,function(d,e){a[d]=c.isFunction(e)?e(b):e});c.each(["minlength","maxlength","min","max"],function(){a[this]&&(a[this]=Number(a[this]))});c.each(["rangelength","range"],function(){var b;a[this]&&(c.isArray(a[this])?a[this]=[Number(a[this][0]),Number(a[this][1])]:"string"===typeof a[this]&&(b=a[this].split(/[\s,]+/),a[this]=[Number(b[0]),Number(b[1])]))});c.validator.autoCreateRanges&&
(a.min&&a.max&&(a.range=[a.min,a.max],delete a.min,delete a.max),a.minlength&&a.maxlength&&(a.rangelength=[a.minlength,a.maxlength],delete a.minlength,delete a.maxlength));return a},normalizeRule:function(a){if("string"===typeof a){var b={};c.each(a.split(/\s/),function(){b[this]=!0});a=b}return a},addMethod:function(a,b,d){c.validator.methods[a]=b;c.validator.messages[a]=void 0!==d?d:c.validator.messages[a];3>b.length&&c.validator.addClassRules(a,c.validator.normalizeRule(a))},methods:{required:function(a,
b,d){return!this.depend(d,b)?"dependency-mismatch":"select"===b.nodeName.toLowerCase()?(a=c(b).val())&&0<a.length:this.checkable(b)?0<this.getLength(a,b):0<c.trim(a).length},remote:function(a,b,d){if(this.optional(b))return"dependency-mismatch";var e=this.previousValue(b);this.settings.messages[b.name]||(this.settings.messages[b.name]={});e.originalMessage=this.settings.messages[b.name].remote;this.settings.messages[b.name].remote=e.message;d="string"===typeof d&&{url:d}||d;if(e.old===a)return e.valid;
e.old=a;var f=this;this.startRequest(b);var g={};g[b.name]=a;c.ajax(c.extend(!0,{url:d,mode:"abort",port:"validate"+b.name,dataType:"json",data:g,success:function(d){f.settings.messages[b.name].remote=e.originalMessage;var g=!0===d||"true"===d;if(g){var j=f.formSubmitted;f.prepareElement(b);f.formSubmitted=j;f.successList.push(b);delete f.invalid[b.name];f.showErrors()}else j={},d=d||f.defaultMessage(b,"remote"),j[b.name]=e.message=c.isFunction(d)?d(a):d,f.invalid[b.name]=!0,f.showErrors(j);e.valid=
g;f.stopRequest(b,g)}},d));return"pending"},minlength:function(a,b,d){a=c.isArray(a)?a.length:this.getLength(c.trim(a),b);return this.optional(b)||a>=d},maxlength:function(a,b,d){a=c.isArray(a)?a.length:this.getLength(c.trim(a),b);return this.optional(b)||a<=d},rangelength:function(a,b,d){a=c.isArray(a)?a.length:this.getLength(c.trim(a),b);return this.optional(b)||a>=d[0]&&a<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,
b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)},
url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},
date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test((new Date(a)).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c=0,e=0,f=!1;a=a.replace(/\D/g,"");for(var g=a.length-
1;0<=g;g--){e=a.charAt(g);e=parseInt(e,10);if(f&&9<(e*=2))e-=9;c+=e;f=!f}return 0===c%10},equalTo:function(a,b,d){d=c(d);this.settings.onfocusout&&d.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){c(b).valid()});return a===d.val()}}});c.format=c.validator.format})(jQuery);
(function(c){var a={};if(c.ajaxPrefilter)c.ajaxPrefilter(function(b,c,f){c=b.port;"abort"===b.mode&&(a[c]&&a[c].abort(),a[c]=f)});else{var b=c.ajax;c.ajax=function(d){var e=("port"in d?d:c.ajaxSettings).port;return"abort"===("mode"in d?d:c.ajaxSettings).mode?(a[e]&&a[e].abort(),a[e]=b.apply(this,arguments)):b.apply(this,arguments)}}})(jQuery);(function(c){c.extend(c.fn,{validateDelegate:function(a,b,d){return this.bind(b,function(b){var f=c(b.target);if(f.is(a))return d.apply(f,arguments)})}})})(jQuery);;
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
