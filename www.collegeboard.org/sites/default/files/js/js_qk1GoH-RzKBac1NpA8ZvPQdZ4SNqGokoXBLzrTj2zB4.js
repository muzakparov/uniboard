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
/**
 * @file select_or_other.js
 */

(function ($) {

  function select_or_other_check_and_show(ele, page_init) {
    var speed;
    if (page_init) {
      speed = 0;
    }
    else {
      speed = 200;
      ele = jQuery(ele).parents(".select-or-other")[0];
    }
    var $other_element = jQuery(ele).find(".select-or-other-other").parents("div.form-item").first();
    var $other_input = $other_element.find('input');
    if (jQuery(ele).find(".select-or-other-select option:selected[value=select_or_other], .select-or-other-select:checked[value=select_or_other]").length) {
      $.fn.prop ? $other_input.prop('required', true) : $other_input.attr('required', true)
      $other_element.show(speed, function() {
        if(!page_init) {
          $(this).find(".select-or-other-other").focus();
        }
      });
    }
    else {
      $other_element.hide(speed);
      $.fn.prop ? $other_input.prop('required', false) : $other_input.removeAttr('required');
      if (page_init)
      {
        // Special case, when the page is loaded, also apply 'display: none' in case it is
        // nested inside an element also hidden by jquery - such as a collapsed fieldset.
        jQuery(ele).find(".select-or-other-other").parents("div.form-item").first().css("display", "none");
      }
    }
  }

  /**
   * The Drupal behaviors for the Select (or other) field.
   */
  Drupal.behaviors.select_or_other = {
    attach: function(context) {
      jQuery(".select-or-other:not('.select-or-other-processed')", context)
        .addClass('select-or-other-processed')
        .each(function () {
          select_or_other_check_and_show(this, true);
        });
      jQuery(".select-or-other-select", context)
        .not("select")
        .click(function () {
          select_or_other_check_and_show(this, false);
        });
      jQuery("select.select-or-other-select", context)
        .change(function () {
          select_or_other_check_and_show(this, false);
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
/**
 * @file
 * JavaScript behaviors for the front-end display of webforms.
 */

(function ($) {

  "use strict";

  Drupal.behaviors.webform = Drupal.behaviors.webform || {};

  Drupal.behaviors.webform.attach = function (context) {
    // Calendar datepicker behavior.
    Drupal.webform.datepicker(context);

    // Conditional logic.
    if (Drupal.settings.webform && Drupal.settings.webform.conditionals) {
      Drupal.webform.conditional(context);
    }
  };

  Drupal.webform = Drupal.webform || {};

  Drupal.webform.datepicker = function (context) {
    $('div.webform-datepicker').each(function () {
      var $webformDatepicker = $(this);
      var $calendar = $webformDatepicker.find('input.webform-calendar');

      // Ensure the page we're on actually contains a datepicker.
      if ($calendar.length == 0) {
        return;
      }

      var startDate = $calendar[0].className.replace(/.*webform-calendar-start-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
      var endDate = $calendar[0].className.replace(/.*webform-calendar-end-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
      var firstDay = $calendar[0].className.replace(/.*webform-calendar-day-(\d).*/, '$1');
      // Convert date strings into actual Date objects.
      startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
      endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);

      // Ensure that start comes before end for datepicker.
      if (startDate > endDate) {
        var laterDate = startDate;
        startDate = endDate;
        endDate = laterDate;
      }

      var startYear = startDate.getFullYear();
      var endYear = endDate.getFullYear();

      // Set up the jQuery datepicker element.
      $calendar.datepicker({
        dateFormat: 'yy-mm-dd',
        yearRange: startYear + ':' + endYear,
        firstDay: parseInt(firstDay),
        minDate: startDate,
        maxDate: endDate,
        onSelect: function (dateText, inst) {
          var date = dateText.split('-');
          $webformDatepicker.find('select.year, input.year').val(+date[0]).trigger('change');
          $webformDatepicker.find('select.month').val(+date[1]).trigger('change');
          $webformDatepicker.find('select.day').val(+date[2]).trigger('change');
        },
        beforeShow: function (input, inst) {
          // Get the select list values.
          var year = $webformDatepicker.find('select.year, input.year').val();
          var month = $webformDatepicker.find('select.month').val();
          var day = $webformDatepicker.find('select.day').val();

          // If empty, default to the current year/month/day in the popup.
          var today = new Date();
          year = year ? year : today.getFullYear();
          month = month ? month : today.getMonth() + 1;
          day = day ? day : today.getDate();

          // Make sure that the default year fits in the available options.
          year = (year < startYear || year > endYear) ? startYear : year;

          // jQuery UI Datepicker will read the input field and base its date off
          // of that, even though in our case the input field is a button.
          $(input).val(year + '-' + month + '-' + day);
        }
      });

      // Prevent the calendar button from submitting the form.
      $calendar.click(function (event) {
        $(this).focus();
        event.preventDefault();
      });
    });
  };

  Drupal.webform.conditional = function (context) {
    // Add the bindings to each webform on the page.
    $.each(Drupal.settings.webform.conditionals, function (formKey, settings) {
      var $form = $('.' + formKey + ':not(.webform-conditional-processed)');
      $form.each(function (index, currentForm) {
        var $currentForm = $(currentForm);
        $currentForm.addClass('webform-conditional-processed');
        $currentForm.bind('change', {'settings': settings}, Drupal.webform.conditionalCheck);

        // Trigger all the elements that cause conditionals on this form.
        Drupal.webform.doConditions($currentForm, settings);
      });
    });
  };

  /**
   * Event handler to respond to field changes in a form.
   *
   * This event is bound to the entire form, not individual fields.
   */
  Drupal.webform.conditionalCheck = function (e) {
    var $triggerElement = $(e.target).closest('.webform-component');
    var $form = $triggerElement.closest('form');
    var triggerElementKey = $triggerElement.attr('class').match(/webform-component--[^ ]+/)[0];
    var settings = e.data.settings;
    if (settings.sourceMap[triggerElementKey]) {
      Drupal.webform.doConditions($form, settings);
    }
  };

  /**
   * Processes all conditional.
   */
  Drupal.webform.doConditions = function ($form, settings) {

    var stackPointer;
    var resultStack;

    /**
     * Initializes an execution stack for a conditional group's rules and
     * sub-conditional rules.
     */
    function executionStackInitialize(andor) {
      stackPointer = -1;
      resultStack = [];
      executionStackPush(andor);
    }

    /**
     * Starts a new subconditional for the given and/or operator.
     */
    function executionStackPush(andor) {
      resultStack[++stackPointer] = {
        results: [],
        andor: andor,
      };
    }

    /**
     * Adds a rule's result to the current sub-condtional.
     */
    function executionStackAccumulate(result) {
      resultStack[stackPointer]['results'].push(result);
    }

    /**
     * Finishes a sub-conditional and adds the result to the parent stack frame.
     */
    function executionStackPop() {
      // Calculate the and/or result.
      var stackFrame = resultStack[stackPointer];
      // Pop stack and protect against stack underflow.
      stackPointer = Math.max(0, stackPointer - 1);
      var $conditionalResults = stackFrame['results'];
      var filteredResults = $.map($conditionalResults, function(val) {
        return val ? val : null;
      });
      return stackFrame['andor'] === 'or'
                ? filteredResults.length > 0
                : filteredResults.length === $conditionalResults.length;
    }

    // Track what has be set/shown for each target component.
    var targetLocked = [];

    $.each(settings.ruleGroups, function (rgid_key, rule_group) {
      var ruleGroup = settings.ruleGroups[rgid_key];

      // Perform the comparison callback and build the results for this group.
      executionStackInitialize(ruleGroup['andor']);
      $.each(ruleGroup['rules'], function (m, rule) {
        switch (rule['source_type']) {
          case 'component':
            var elementKey = rule['source'];
            var element = $form.find('.' + elementKey)[0];
            var existingValue = settings.values[elementKey] ? settings.values[elementKey] : null;
            executionStackAccumulate(window['Drupal']['webform'][rule.callback](element, existingValue, rule['value']));
            break;
          case 'conditional_start':
            executionStackPush(rule['andor']);
            break;
          case 'conditional_end':
            executionStackAccumulate(executionStackPop());
            break;
        }
      });
      var conditionalResult = executionStackPop();

      $.each(ruleGroup['actions'], function (aid, action) {
        var $target = $form.find('.' + action['target']);
        var actionResult = action['invert'] ? !conditionalResult : conditionalResult;
        switch (action['action']) {
          case 'show':
            if (actionResult != Drupal.webform.isVisible($target)) {
              var $targetElements = actionResult
                                      ? $target.find('.webform-conditional-disabled').removeClass('webform-conditional-disabled')
                                      : $target.find(':input').addClass('webform-conditional-disabled');
              $targetElements.webformProp('disabled', !actionResult);
              $target.toggleClass('webform-conditional-hidden', !actionResult);
              if (actionResult) {
                $target.show();
              }
              else {
                $target.hide();
                // Record that the target was hidden.
                targetLocked[action['target']] = 'hide';
              }
              if ($target.is('tr')) {
                Drupal.webform.restripeTable($target.closest('table').first());
              }
            }
            break;
          case 'require':
            var $requiredSpan = $target.find('.form-required, .form-optional').first();
            if (actionResult != $requiredSpan.hasClass('form-required')) {
              var $targetInputElements = $target.find("input:text,textarea,input[type='email'],select,input:radio,input:file");
              // Rather than hide the required tag, remove it so that other jQuery can respond via Drupal behaviors.
              Drupal.detachBehaviors($requiredSpan);
              $targetInputElements
                .webformProp('required', actionResult)
                .toggleClass('required', actionResult);
              if (actionResult) {
                $requiredSpan.replaceWith('<span class="form-required" title="' + Drupal.t('This field is required.') + '">*</span>');
              }
              else {
                $requiredSpan.replaceWith('<span class="form-optional"></span>');
              }
              Drupal.attachBehaviors($requiredSpan);
            }
            break;
          case 'set':
            var isLocked = targetLocked[action['target']];
            var $texts = $target.find("input:text,textarea,input[type='email']");
            var $selects = $target.find('select,select option,input:radio,input:checkbox');
            var $markups = $target.filter('.webform-component-markup');
            if (actionResult) {
              var multiple = $.map(action['argument'].split(','), $.trim);
              $selects.webformVal(multiple);
              $texts.val([action['argument']]);
              // A special case is made for markup. It is sanitized with filter_xss_admin on the server.
              // otherwise text() should be used to avoid an XSS vulnerability. text() however would
              // preclude the use of tags like <strong> or <a>
              $markups.html(action['argument']);
            }
            else {
              // Markup not set? Then restore original markup as provided in
              // the attribute data-webform-markup.
              $markups.each(function() {
                var $this = $(this);
                var original = $this.data('webform-markup');
                if (original !== undefined) {
                  $this.html(original);
                }
              });
            }
            if (!isLocked) {
              // If not previously hidden or set, disable the element readonly or readonly-like behavior.
              $selects.webformProp('disabled', actionResult);
              $texts.webformProp('readonly', actionResult);
              targetLocked[action['target']] = actionResult ? 'set' : false;
            }
            break;
        }
      }); // End look on each action for one conditional
    }); // End loop on each conditional
  };

  /**
   * Event handler to prevent propogation of events, typically click for disabling
   * radio and checkboxes.
   */
  Drupal.webform.stopEvent = function () {
    return false;
  };

  Drupal.webform.conditionalOperatorStringEqual = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase() === ruleValue.toLowerCase()) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringNotEqual = function (element, existingValue, ruleValue) {
    var found = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase() === ruleValue.toLowerCase()) {
        found = true;
      }
    });
    return !found;
  };

  Drupal.webform.conditionalOperatorStringContains = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) > -1) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringDoesNotContain = function (element, existingValue, ruleValue) {
    var found = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) > -1) {
        found = true;
      }
    });
    return !found;
  };

  Drupal.webform.conditionalOperatorStringBeginsWith = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) === 0) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringEndsWith = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().lastIndexOf(ruleValue.toLowerCase()) === value.length - ruleValue.length) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringEmpty = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var returnValue = true;
    $.each(currentValue, function (n, value) {
      if (value !== '') {
        returnValue = false;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringNotEmpty = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorStringEmpty(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorSelectGreaterThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return Drupal.webform.compare_select(currentValue[0], ruleValue, element) > 0;
  };

  Drupal.webform.conditionalOperatorSelectGreaterThanEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var comparison = Drupal.webform.compare_select(currentValue[0], ruleValue, element);
    return comparison > 0 || comparison === 0;
  };

  Drupal.webform.conditionalOperatorSelectLessThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return Drupal.webform.compare_select(currentValue[0], ruleValue, element) < 0;
  };

  Drupal.webform.conditionalOperatorSelectLessThanEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var comparison = Drupal.webform.compare_select(currentValue[0], ruleValue, element);
    return comparison < 0 || comparison === 0;
  };

  Drupal.webform.conditionalOperatorNumericEqual = function (element, existingValue, ruleValue) {
    // See float comparison: http://php.net/manual/en/language.types.float.php
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var epsilon = 0.000001;
    // An empty string does not match any number.
    return currentValue[0] === '' ? false : (Math.abs(parseFloat(currentValue[0]) - parseFloat(ruleValue)) < epsilon);
  };

  Drupal.webform.conditionalOperatorNumericNotEqual = function (element, existingValue, ruleValue) {
    // See float comparison: http://php.net/manual/en/language.types.float.php
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var epsilon = 0.000001;
    // An empty string does not match any number.
    return currentValue[0] === '' ? true : (Math.abs(parseFloat(currentValue[0]) - parseFloat(ruleValue)) >= epsilon);
  };

  Drupal.webform.conditionalOperatorNumericGreaterThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return parseFloat(currentValue[0]) > parseFloat(ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericGreaterThanEqual = function (element, existingValue, ruleValue) {
    return Drupal.webform.conditionalOperatorNumericGreaterThan(element, existingValue, ruleValue) ||
           Drupal.webform.conditionalOperatorNumericEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericLessThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return parseFloat(currentValue[0]) < parseFloat(ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericLessThanEqual = function (element, existingValue, ruleValue) {
    return Drupal.webform.conditionalOperatorNumericLessThan(element, existingValue, ruleValue) ||
           Drupal.webform.conditionalOperatorNumericEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorDateEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return currentValue === ruleValue;
  };

  Drupal.webform.conditionalOperatorDateNotEqual = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorDateEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorDateBefore = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && currentValue < ruleValue;
  };

  Drupal.webform.conditionalOperatorDateBeforeEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorDateAfter = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && currentValue > ruleValue;
  };

  Drupal.webform.conditionalOperatorDateAfterEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return currentValue === ruleValue;
  };

  Drupal.webform.conditionalOperatorTimeNotEqual = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorTimeEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeBefore = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally exclusive for "before".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeBeforeEqual = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally exclusive for "before".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeAfter = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally inclusive for "after".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeAfterEqual = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally inclusive for "after".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue || currentValue === ruleValue);
  };

  /**
   * Utility function to compare values of a select component.
   * @param string a
   *   First select option key to compare
   * @param string b
   *   Second select option key to compare
   * @param array options
   *   Associative array where the a and b are within the keys
   * @return integer based upon position of $a and $b in $options
   *   -N if $a above (<) $b
   *   0 if $a = $b
   *   +N if $a is below (>) $b
   */
  Drupal.webform.compare_select = function (a, b, element) {
    var optionList = [];
    $('option,input:radio,input:checkbox', element).each(function () {
      optionList.push($(this).val());
    });
    var a_position = optionList.indexOf(a);
    var b_position = optionList.indexOf(b);
    return (a_position < 0 || b_position < 0) ? null : a_position - b_position;
  };

  /**
   * Utility to return current visibility. Uses actual visibility, except for
   * hidden components which use the applied disabled class.
   */
  Drupal.webform.isVisible = function ($element) {
    return $element.hasClass('webform-component-hidden')
              ? !$element.find('input').first().hasClass('webform-conditional-disabled')
              : $element.closest('.webform-conditional-hidden').length == 0;
  };

  /**
   * Utility function to get a string value from a select/radios/text/etc. field.
   */
  Drupal.webform.stringValue = function (element, existingValue) {
    var value = [];
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        // Checkboxes and radios.
        $element.find('input[type=checkbox]:checked,input[type=radio]:checked').each(function () {
          value.push(this.value);
        });
        // Select lists.
        if (!value.length) {
          var selectValue = $element.find('select').val();
          if (selectValue) {
            if ($.isArray(selectValue)) {
              value = selectValue;
            }
            else {
              value.push(selectValue);
            }
          }
        }
        // Simple text fields. This check is done last so that the select list in
        // select-or-other fields comes before the "other" text field.
        if (!value.length) {
          $element.find('input:not([type=checkbox],[type=radio]),textarea').each(function () {
            value.push(this.value);
          });
        }
      }
    }
    else {
      switch ($.type(existingValue)) {
        case 'array':
          value = existingValue;
          break;
        case 'string':
          value.push(existingValue);
          break;
      }
    }
    return value;
  };

  /**
   * Utility function to calculate a second-based timestamp from a time field.
   */
  Drupal.webform.dateValue = function (element, existingValue) {
    var value = false;
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        var day = $element.find('[name*=day]').val();
        var month = $element.find('[name*=month]').val();
        var year = $element.find('[name*=year]').val();
        // Months are 0 indexed in JavaScript.
        if (month) {
          month--;
        }
        if (year !== '' && month !== '' && day !== '') {
          value = Date.UTC(year, month, day) / 1000;
        }
      }
    }
    else {
      if ($.type(existingValue) === 'array' && existingValue.length) {
        existingValue = existingValue[0];
      }
      if ($.type(existingValue) === 'string') {
        existingValue = existingValue.split('-');
      }
      if (existingValue.length === 3) {
        value = Date.UTC(existingValue[0], existingValue[1], existingValue[2]) / 1000;
      }
    }
    return value;
  };

  /**
   * Utility function to calculate a millisecond timestamp from a time field.
   */
  Drupal.webform.timeValue = function (element, existingValue) {
    var value = false;
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        var hour = $element.find('[name*=hour]').val();
        var minute = $element.find('[name*=minute]').val();
        var ampm = $element.find('[name*=ampm]:checked').val();

        // Convert to integers if set.
        hour = (hour === '') ? hour : parseInt(hour);
        minute = (minute === '') ? minute : parseInt(minute);

        if (hour !== '') {
          hour = (hour < 12 && ampm == 'pm') ? hour + 12 : hour;
          hour = (hour === 12 && ampm == 'am') ? 0 : hour;
        }
        if (hour !== '' && minute !== '') {
          value = Date.UTC(1970, 0, 1, hour, minute) / 1000;
        }
      }
    }
    else {
      if ($.type(existingValue) === 'array' && existingValue.length) {
        existingValue = existingValue[0];
      }
      if ($.type(existingValue) === 'string') {
        existingValue = existingValue.split(':');
      }
      if (existingValue.length >= 2) {
        value = Date.UTC(1970, 0, 1, existingValue[0], existingValue[1]) / 1000;
      }
    }
    return value;
  };

  /**
   * Make a prop shim for jQuery < 1.9.
   */
  $.fn.webformProp = $.fn.webformProp || function (name, value) {
    if (value) {
      return $.fn.prop ? this.prop(name, true) : this.attr(name, true);
    }
    else {
      return $.fn.prop ? this.prop(name, false) : this.removeAttr(name);
    }
  };

  /**
   * Make a multi-valued val() function for setting checkboxes, radios, and select
   * elements.
   */
  $.fn.webformVal = function (values) {
    this.each(function () {
      var $this = $(this);
      var value = $this.val();
      var on = $.inArray($this.val(), values) != -1;
      if (this.nodeName == 'OPTION') {
        $this.webformProp('selected', on ? value : false);
      }
      else {
        $this.val(on ? [value] : false);
      }
    });
    return this;
  };

  /**
   * Given a table's DOM element, restripe the odd/even classes.
   */
  Drupal.webform.restripeTable = function (table) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr, > tr', table)
      .filter(':visible:odd').filter('.odd')
        .removeClass('odd').addClass('even')
      .end().end()
      .filter(':visible:even').filter('.even')
        .removeClass('even').addClass('odd');
  };

})(jQuery);
;
/*!
 *  Apricot v0.7.0
 *  By:             The College Board
 *  App:            homeorg
 *  Build Time:     2015-05-19 [2:15:41 PM] EDT
 *  Build Number:   26
 *  SVN Revision:   33056
 *  Jenkins Job:    apricot-clients
 *  This version of Apricot includes Bootstrap v3.3.0
 */
this.cb=this.cb||{},cb.apricot=cb.apricot||{},+function(a,b){"use strict";function c(b){return"object"==typeof b&&a.extend(!0,h,b),h}function d(a){var b={mode:"auto",selector:[]};return h[a]&&(b=h[a]),b}function e(a){return"auto"===d(a).mode?!0:!1}function f(a){return d(a).selector.length>0?!0:!1}function g(a){return d(a).selector}var h={checkbox:{mode:"auto",selector:[]},fileUpload:{mode:"auto",selector:[]},placeholder:{mode:"auto",selector:[]},radio:{mode:"auto",selector:[]},select:{mode:"auto",selector:[]},table:{mode:"auto",selector:[]},responsiveImage:{mode:"auto",selector:[]}},i={behavior:c,selector:g,isCb:e,hasSelector:f};b.apricot.setup=i}(jQuery,cb),cb.apricot.data={monthshort:[{value:0,name:"Month"},{value:1,name:"Jan"},{value:2,name:"Feb"},{value:3,name:"Mar"},{value:4,name:"Apr"},{value:5,name:"May"},{value:6,name:"Jun"},{value:7,name:"Jul"},{value:8,name:"Aug"},{value:9,name:"Sep"},{value:10,name:"Oct"},{value:11,name:"Nov"},{value:12,name:"Dec"}],monthlong:[{value:0,name:"Month"},{value:1,name:"January"},{value:2,name:"February"},{value:3,name:"March"},{value:4,name:"April"},{value:5,name:"May"},{value:6,name:"June"},{value:7,name:"July"},{value:8,name:"August"},{value:9,name:"September"},{value:10,name:"October"},{value:11,name:"November"},{value:12,name:"December"}],states:[{name:"Choose a State",value:""},{name:"Alabama",value:"AL"},{name:"Alaska",value:"AK"},{name:"American Samoa",value:"AS"},{name:"Arizona",value:"AZ"},{name:"Arkansas",value:"AR"},{name:"California",value:"CA"},{name:"Colorado",value:"CO"},{name:"Connecticut",value:"CT"},{name:"Delaware",value:"DE"},{name:"District Of Columbia",value:"DC"},{name:"Federated States Of Micronesia",value:"FM"},{name:"Florida",value:"FL"},{name:"Georgia",value:"GA"},{name:"Guam",value:"GU"},{name:"Hawaii",value:"HI"},{name:"Idaho",value:"ID"},{name:"Illinois",value:"IL"},{name:"Indiana",value:"IN"},{name:"Iowa",value:"IA"},{name:"Kansas",value:"KS"},{name:"Kentucky",value:"KY"},{name:"Louisiana",value:"LA"},{name:"Maine",value:"ME"},{name:"Marshall Islands",value:"MH"},{name:"Maryland",value:"MD"},{name:"Massachusetts",value:"MA"},{name:"Michigan",value:"MI"},{name:"Minnesota",value:"MN"},{name:"Mississippi",value:"MS"},{name:"Missouri",value:"MO"},{name:"Montana",value:"MT"},{name:"Nebraska",value:"NE"},{name:"Nevada",value:"NV"},{name:"New Hampshire",value:"NH"},{name:"New Jersey",value:"NJ"},{name:"New Mexico",value:"NM"},{name:"New York",value:"NY"},{name:"North Carolina",value:"NC"},{name:"North Dakota",value:"ND"},{name:"Northern Mariana Islands",value:"MP"},{name:"Ohio",value:"OH"},{name:"Oklahoma",value:"OK"},{name:"Oregon",value:"OR"},{name:"Palau",value:"PW"},{name:"Pennsylvania",value:"PA"},{name:"Puerto Rico",value:"PR"},{name:"Rhode Island",value:"RI"},{name:"South Carolina",value:"SC"},{name:"South Dakota",value:"SD"},{name:"Tennessee",value:"TN"},{name:"Texas",value:"TX"},{name:"Utah",value:"UT"},{name:"Vermont",value:"VT"},{name:"Virgin Islands",value:"VI"},{name:"Virginia",value:"VA"},{name:"Washington",value:"WA"},{name:"West Virginia",value:"WV"},{name:"Wisconsin",value:"WI"},{name:"Wyoming",value:"WY"}],countries:[{name:"Afghanistan",iso:"af",dialCode:"93"},{name:"Albania",iso:"al",dialCode:"355"},{name:"Algeria",iso:"dz",dialCode:"213"},{name:"Andorra",iso:"ad",dialCode:"376"},{name:"Angola",iso:"ao",dialCode:"244"},{name:"Antigua and Barbuda",iso:"ag",dialCode:"1268"},{name:"Argentina",iso:"ar",dialCode:"54"},{name:"Armenia",iso:"am",dialCode:"374"},{name:"Australia",iso:"au",dialCode:"61"},{name:"Austria",iso:"at",dialCode:"43"},{name:"Azerbaijan",iso:"az",dialCode:"994"},{name:"Bahamas",iso:"bs",dialCode:"1242"},{name:"Bahrain",iso:"bh",dialCode:"973"},{name:"Bangladesh",iso:"bd",dialCode:"880"},{name:"Barbados",iso:"bb",dialCode:"1246"},{name:"Belarus",iso:"by",dialCode:"375"},{name:"Belgium",iso:"be",dialCode:"32"},{name:"Belize",iso:"bz",dialCode:"501"},{name:"Benin",iso:"bj",dialCode:"229"},{name:"Bhutan",iso:"bt",dialCode:"975"},{name:"Bolivia",iso:"bo",dialCode:"591"},{name:"Bosnia and Herzegovina",iso:"ba",dialCode:"387"},{name:"Botswana",iso:"bw",dialCode:"267"},{name:"Brazil",iso:"br",dialCode:"55"},{name:"Brunei",iso:"bn",dialCode:"673"},{name:"Bulgaria",iso:"bg",dialCode:"359"},{name:"Burkina Faso",iso:"bf",dialCode:"226"},{name:"Burma",iso:"mm",dialCode:"95"},{name:"Burundi",iso:"bi",dialCode:"257"},{name:"Cape Verde",iso:"cv",dialCode:"238"},{name:"Cambodia",iso:"kh",dialCode:"855"},{name:"Cameroon",iso:"cm",dialCode:"237"},{name:"Canada",iso:"ca",dialCode:"1"},{name:"Central African Republic",iso:"cf",dialCode:"236"},{name:"Chad",iso:"td",dialCode:"235"},{name:"Chile",iso:"cl",dialCode:"56"},{name:"China",iso:"cn",dialCode:"86"},{name:"Colombia",iso:"co",dialCode:"57"},{name:"Comoros",iso:"km",dialCode:"269"},{name:"Congo (Brazzaville)",iso:"cd",dialCode:"243"},{name:"Congo (Kinshasa)",iso:"cg",dialCode:"242"},{name:"Costa Rica",iso:"cr",dialCode:"506"},{name:"Côte d’Ivoire",iso:"ci",dialCode:"225"},{name:"Croatia",iso:"hr",dialCode:"385"},{name:"Cuba",iso:"cu",dialCode:"53"},{name:"Cyprus",iso:"cy",dialCode:"357"},{name:"Czech Republic",iso:"cz",dialCode:"420"},{name:"Denmark",iso:"dk",dialCode:"45"},{name:"Djibouti",iso:"dj",dialCode:"253"},{name:"Dominica",iso:"dm",dialCode:"1767"},{name:"Dominican Republic",iso:"do",dialCode:"1"},{name:"Ecuador",iso:"ec",dialCode:"593"},{name:"Egypt",iso:"eg",dialCode:"20"},{name:"El Salvador",iso:"sv",dialCode:"503"},{name:"Equatorial Guinea",iso:"gq",dialCode:"240"},{name:"Eritrea",iso:"er",dialCode:"291"},{name:"Estonia",iso:"ee",dialCode:"372"},{name:"Ethiopia",iso:"et",dialCode:"251"},{name:"Fiji",iso:"fj",dialCode:"679"},{name:"Finland",iso:"fi",dialCode:"358"},{name:"France",iso:"fr",dialCode:"33"},{name:"Gabon",iso:"ga",dialCode:"241"},{name:"Gambia",iso:"gm",dialCode:"220"},{name:"Georgia",iso:"ge",dialCode:"995"},{name:"Germany",iso:"de",dialCode:"49"},{name:"Ghana",iso:"gh",dialCode:"233"},{name:"Greece",iso:"gr",dialCode:"30"},{name:"Grenada",iso:"gd",dialCode:"1473"},{name:"Guatemala",iso:"gt",dialCode:"502"},{name:"Guinea",iso:"gn",dialCode:"224"},{name:"Guinea-Bissau",iso:"gw",dialCode:"245"},{name:"Guyana",iso:"gy",dialCode:"592"},{name:"Haiti",iso:"ht",dialCode:"509"},{name:"Holy See",iso:"va",dialCode:"39"},{name:"Honduras",iso:"hn",dialCode:"504"},{name:"Hungary",iso:"hu",dialCode:"36"},{name:"Iceland",iso:"is",dialCode:"354"},{name:"India",iso:"in",dialCode:"91"},{name:"Indonesia",iso:"id",dialCode:"62"},{name:"Iran",iso:"ir",dialCode:"98"},{name:"Iraq",iso:"iq",dialCode:"964"},{name:"Ireland",iso:"ie",dialCode:"353"},{name:"Israel",iso:"il",dialCode:"972"},{name:"Italy",iso:"it",dialCode:"39"},{name:"Jamaica",iso:"jm",dialCode:"1876"},{name:"Japan",iso:"jp",dialCode:"81"},{name:"Jordan",iso:"jo",dialCode:"962"},{name:"Kazakhstan",iso:"kz",dialCode:"7"},{name:"Kenya",iso:"ke",dialCode:"254"},{name:"Kiribati",iso:"ki",dialCode:"686"},{name:"Korea, North",iso:"kp",dialCode:"850"},{name:"Korea, South",iso:"kr",dialCode:"82"},{name:"Kosovo",iso:"xk",dialCode:"381"},{name:"Kuwait",iso:"kw",dialCode:"965"},{name:"Kyrgyzstan",iso:"kg",dialCode:"996"},{name:"Laos",iso:"la",dialCode:"856"},{name:"Latvia",iso:"lv",dialCode:"371"},{name:"Lebanon",iso:"lb",dialCode:"961"},{name:"Lesotho",iso:"ls",dialCode:"266"},{name:"Liberia",iso:"lr",dialCode:"231"},{name:"Libya",iso:"ly",dialCode:"218"},{name:"Liechtenstein",iso:"li",dialCode:"423"},{name:"Lithuania",iso:"lt",dialCode:"370"},{name:"Luxembourg",iso:"lu",dialCode:"352"},{name:"Macedonia",iso:"mk",dialCode:"389"},{name:"Madagascar",iso:"mg",dialCode:"261"},{name:"Malawi",iso:"mw",dialCode:"265"},{name:"Malaysia",iso:"my",dialCode:"60"},{name:"Maldives",iso:"mv",dialCode:"960"},{name:"Mali",iso:"ml",dialCode:"223"},{name:"Malta",iso:"mt",dialCode:"356"},{name:"Marshall Islands",iso:"mh",dialCode:"692"},{name:"Mauritania",iso:"mr",dialCode:"222"},{name:"Mauritius",iso:"mu",dialCode:"230"},{name:"Mexico",iso:"mx",dialCode:"52"},{name:"Micronesia",iso:"fm",dialCode:"691"},{name:"Moldova",iso:"md",dialCode:"373"},{name:"Monaco",iso:"mc",dialCode:"377"},{name:"Mongolia",iso:"mn",dialCode:"976"},{name:"Montenegro",iso:"me",dialCode:"382"},{name:"Morocco",iso:"ma",dialCode:"212"},{name:"Mozambique",iso:"mz",dialCode:"258"},{name:"Namibia",iso:"na",dialCode:"264"},{name:"Nauru",iso:"nr",dialCode:"674"},{name:"Nepal",iso:"np",dialCode:"977"},{name:"Netherlands",iso:"nl",dialCode:"31"},{name:"New Zealand",iso:"nz",dialCode:"64"},{name:"Nicaragua",iso:"ni",dialCode:"505"},{name:"Niger",iso:"ne",dialCode:"227"},{name:"Nigeria",iso:"ng",dialCode:"234"},{name:"Norway",iso:"no",dialCode:"47"},{name:"Oman",iso:"om",dialCode:"968"},{name:"Pakistan",iso:"pk",dialCode:"92"},{name:"Palau",iso:"pw",dialCode:"680"},{name:"Panama",iso:"pa",dialCode:"507"},{name:"Papua New Guinea",iso:"pg",dialCode:"675"},{name:"Paraguay",iso:"py",dialCode:"595"},{name:"Peru",iso:"pe",dialCode:"51"},{name:"Philippines",iso:"ph",dialCode:"63"},{name:"Poland",iso:"pl",dialCode:"48"},{name:"Portugal",iso:"pt",dialCode:"351"},{name:"Qatar",iso:"qa",dialCode:"974"},{name:"Romania",iso:"ro",dialCode:"40"},{name:"Russia",iso:"ru",dialCode:"7"},{name:"Rwanda",iso:"rw",dialCode:"250"},{name:"Saint Kitts and Nevis",iso:"kn",dialCode:"1869"},{name:"Saint Lucia",iso:"lc",dialCode:"1758"},{name:"Saint Vincent and the Grenadines",iso:"vc",dialCode:"1784"},{name:"Samoa",iso:"ws",dialCode:"685"},{name:"San Marino",iso:"sm",dialCode:"378"},{name:"Sao Tome and Principe",iso:"st",dialCode:"239"},{name:"Saudi Arabia",iso:"sa",dialCode:"966"},{name:"Senegal",iso:"sn",dialCode:"221"},{name:"Serbia",iso:"rs",dialCode:"381"},{name:"Seychelles",iso:"sc",dialCode:"248"},{name:"Sierra Leone",iso:"sl",dialCode:"232"},{name:"Singapore",iso:"sg",dialCode:"65"},{name:"Slovakia",iso:"sk",dialCode:"421"},{name:"Slovenia",iso:"si",dialCode:"386"},{name:"Solomon Islands",iso:"sb",dialCode:"677"},{name:"Somalia",iso:"so",dialCode:"252"},{name:"South Africa",iso:"za",dialCode:"27"},{name:"South Sudan",iso:"ss",dialCode:"211"},{name:"Spain",iso:"es",dialCode:"34"},{name:"Sri Lanka",iso:"lk",dialCode:"94"},{name:"Sudan",iso:"sd",dialCode:"249"},{name:"Suriname",iso:"sr",dialCode:"597"},{name:"Swaziland",iso:"sz",dialCode:"268"},{name:"Sweden",iso:"se",dialCode:"46"},{name:"Switzerland",iso:"ch",dialCode:"41"},{name:"Syria",iso:"sy",dialCode:"963"},{name:"Tajikistan",iso:"tj",dialCode:"992"},{name:"Tanzania",iso:"tz",dialCode:"255"},{name:"Thailand",iso:"th",dialCode:"66"},{name:"Timor-Leste",iso:"tl",dialCode:"670"},{name:"Togo",iso:"tg",dialCode:"228"},{name:"Tonga",iso:"to",dialCode:"676"},{name:"Trinidad and Tobago",iso:"tt",dialCode:"1868"},{name:"Tunisia",iso:"tn",dialCode:"216"},{name:"Turkey",iso:"tr",dialCode:"90"},{name:"Turkmenistan",iso:"tm",dialCode:"993"},{name:"Tuvalu",iso:"tv",dialCode:"688"},{name:"Uganda",iso:"ug",dialCode:"256"},{name:"Ukraine",iso:"ua",dialCode:"380"},{name:"United Arab Emirates",iso:"ae",dialCode:"971"},{name:"United Kingdom",iso:"gb",dialCode:"44"},{name:"United States",iso:"us",dialCode:"1"},{name:"Uruguay",iso:"uy",dialCode:"598"},{name:"Uzbekistan",iso:"uz",dialCode:"998"},{name:"Vanuatu",iso:"vu",dialCode:"678"},{name:"Venezuela",iso:"ve",dialCode:"58"},{name:"Vietnam",iso:"vn",dialCode:"84"},{name:"Yemen",iso:"ye",dialCode:"967"},{name:"Zambia",iso:"zm",dialCode:"260"},{name:"Zimbabwe",iso:"zw",dialCode:"263"}],creditCards:[{name:"Visa",className:"visa",regExp:"^4[0-9]{0,15}$"},{name:"Master Card",className:"mastercard",regExp:"^5$|^5[1-5][0-9]{0,14}$"},{name:"American Express",className:"amex",regExp:"^3$|^3[47][0-9]{0,13}$"},{name:"Discover",className:"discover",regExp:"^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$"},{name:"Diners Club",className:"diners",regExp:"^3$|^3[068]$|^3(?:0[0-5]|[68][0-9])[0-9]{0,11}$"},{name:"JCB",className:"jcb",regExp:"^2[1]?$|^21[3]?$|^1[8]?$|^18[0]?$|^(?:2131|1800)[0-9]{0,11}$|^3[5]?$|^35[0-9]{0,14}$"}],viewports:{mobile:{min:0,max:767},tablet:{min:768,max:1023},desktop:{min:1024,max:1249},oversize:{min:1250,max:99999}}},+function(a,b){"use strict";function c(a,b){return k[b]===a.which?!0:!1}function d(a){for(var b in k)if(k[b]===a.which)return b;return"not found"}function e(){var a,b=!0,c={};return a=function(a){function c(b){var c=a.match(b);return c&&c.length>1&&c[1]||""}var d=c(/version\/(\d+(\.\d+)?)/i),e={};return e=/opera|opr/i.test(a)?{name:"Opera",opera:b,version:d||c(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)}:/msie|trident/i.test(a)?{name:"Internet Explorer",msie:b,version:c(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:/chrome|crios|crmo/i.test(a)?{name:"Chrome",chrome:b,version:c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel/i.test(a)?{name:"Firefox",firefox:b,version:c(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)}:/safari/i.test(a)?{name:"Safari",safari:b,version:d}:{}},c=a("undefined"!=typeof navigator?navigator.userAgent:"")}function f(a){var b=e();b.msie&&a.addClass("ie"+parseInt(b.version,10))}function g(a){return a||(a=""),/^\s*$/.test(a)}function h(){var c,d={};return c=function(b){var c={name:"",prefix:"",width:0},d=a("body"),e=0;return d.css("overflow","hidden"),e=a(window).width(),d.css("overflow","visible"),a.isEmptyObject(b)?c:(c=e<b.mobile.max?{name:"mobile",prefix:"xs"}:e>=b.tablet.min&&e<b.tablet.max?{name:"tablet",prefix:"sm"}:e>=b.desktop.min&&e<b.desktop.max?{name:"desktop",prefix:"md"}:{name:"oversize",prefix:"lg"},c.width=e,c)},d=c(a.isEmptyObject(b.apricot.data.viewports)?{}:b.apricot.data.viewports)}function i(c){if(a(document).data("_cbBreakpoints"))return!1;var d=b.apricot.utils.viewport();c=c?!0:!1,a(document).data("_cbViewport",d),c&&a(window).on("load",function(){a(document).trigger("breakpoint_change",d)}),a(window).on("resize",function(){var c=b.apricot.utils.viewport(),d=a(document).data("_cbViewport");d.name!==c.name&&(a(document).trigger("breakpoint_change",c),a(document).data("_cbViewport",c))}),a(document).data("_cbBreakpoints",!0)}function j(a,b,c,d){if("last"===c)a=a.substr(0,b-d.length)+d;else if("first"===c)a=d+a.substr(a.length-(b-d.length));else{var e=Math.floor(b/2)-d.length;a=a.substr(0,e)+d+a.substr(a.length-e,a.length)}return a}var k={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,PREV:37,NEXT:39,DOWN:40,PLUS:43,DEL:46,A:65,Z:90,ZERO:48,NINE:57},l={keys:k,isKey:c,whichKey:d,browser:e,addClassIE:f,isBlank:g,viewport:h,breakpoints:i,textTruncate:j};b.apricot.utils=l}(jQuery,cb),+function(a,b){"use strict";function c(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=0,g=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),g=e,void 0!==c.axis&&c.axis===c.HORIZONTAL_AXIS&&(g=0,f=e),void 0!==c.wheelDeltaY&&(g=c.wheelDeltaY/120),void 0!==c.wheelDeltaX&&(f=c.wheelDeltaX/120),d.unshift(b,e,f,g),(a.event.dispatch||a.event.handle).apply(this,d)}b.apricot.customScrollbar=function(c,d){var e={scrollableClass:"cb-scrollbar-container",scrollbarClass:"cb-scrollbar",scrollbarTopClass:"top",scrollbarBottomClass:"bottom",scrollbarThumbClass:"cb-scrollbar-thumb",scrollbarTop:!0,scrollbarBottom:!0},f=this;f.$el=a(c),f.$parent=f.$el.parent(),f.$container={},f.init=function(){return f.options=a.extend({},e,d),f.$el.is("table")?void((f.options.scrollbarTop||f.options.scrollbarBottom)&&(h(),f.hScrollbars=[],f.options.scrollbarTop&&(f.hScrollbarTop=new j(f,new k,"top"),f.hScrollbars.push(g("top",f.hScrollbarTop)),f.hScrollbarTop.resize()),f.options.scrollbarBottom&&(f.hScrollbarBottom=new j(f,new k,"bottom"),f.hScrollbars.push(g("bottom",f.hScrollbarBottom)),f.hScrollbarBottom.resize()),i())):!1};var g=function(a,b){return{position:a,bar:b}},h=function(){var b=a("<div>",{"class":f.options.scrollableClass}),c=a("<div>",{"class":f.options.scrollbarClass}),d=a("<div>",{"class":f.options.scrollbarClass});f.$parent.wrap(b),f.$container=f.$parent.parent(),f.options.scrollbarTop&&(c.addClass(f.options.scrollbarTopClass),c.append(a("<div>",{"class":f.options.scrollbarThumbClass})),c.insertBefore(f.$parent)),f.options.scrollbarBottom&&(d.addClass(f.options.scrollbarBottomClass),d.append(a("<div>",{"class":f.options.scrollbarThumbClass})),f.$container.append(d))},i=function(){var a=f,c=b.apricot.utils.browser();f.elementKeydown=function(b){var d={};if(c.msie)for(d in f.hScrollbars)a.hScrollbars[d].bar.keyScroll(b);else if(document.activeElement===a.$container[0])for(d in f.hScrollbars)a.hScrollbars[d].bar.keyScroll(b)},f.$container.attr("tabindex","-1").keydown(f.elementKeydown)},j=function(a,b,c){this.scrollable=a,this.sizing=b,this.position=c,this.$scrollbar=this.sizing.scrollbar(this.scrollable,c),this.$thumb=this.$scrollbar.find("."+this.scrollable.options.scrollbarThumbClass),this.setScrollPosition(0,0),this.resize(),this.initMouseMoveScrolling(),this.initMouseWheelScrolling(),this.initTouchScrolling(),this.initMouseClickScrolling(),this.initWindowResize()};j.prototype={resize:function(a){var c=b.apricot.utils.browser(),d=this.scrollable.$el.height()+2;c.firefox&&this.scrollable.$el.find("caption").length>0&&(d+=this.scrollable.$el.find("caption").outerHeight()),this.scrollable.$parent.height(d),this.sizing.size(this.scrollable.$parent,this.sizing.size(this.scrollable.$container)),this.viewPortSize=this.sizing.size(this.scrollable.$parent),this.overviewSize=this.sizing.size(this.scrollable.$el),parseInt(this.calculateTableWidth()-this.overviewSize)>10&&(this.overviewSize=this.calculateTableWidth()),this.overviewSize+=2,this.ratio=this.viewPortSize/this.overviewSize,this.sizing.size(this.scrollable.$parent,this.viewPortSize),this.ratio=this.viewPortSize/this.overviewSize,this.sizing.size(this.$scrollbar,this.viewPortSize),this.thumbSize=this.calculateThumbSize(),this.sizing.size(this.$thumb,this.thumbSize),this.maxThumbPosition=this.calculateMaxThumbPosition(),this.maxOverviewPosition=this.calculateMaxOverviewPosition(),this.enabled=this.overviewSize>this.viewPortSize,void 0===this.scrollPercent&&(this.scrollPercent=0),this.enabled?this.rescroll(a):this.setScrollPosition(0,0),this.$scrollbar.toggle(this.enabled),this.scrollable.$container.toggleClass("active",this.enabled)},calculateViewPortSize:function(){var a=this.sizing.size(this.scrollable.$container);if(a>0&&!this.maxSizeUsed)this.viewPortSize=a,this.maxSizeUsed=!1;else{var b=this.sizing.maxSize(this.scrollable.$container);this.viewPortSize=Math.min(b,this.overviewSize),this.maxSizeUsed=!0}},calculateTableWidth:function(){var b=0,c=0,d=[];return a("tr",this.scrollable.$el).each(function(){c=0,a(this).find("th, td").each(function(){c+=parseInt(a(this).outerWidth(),10)}),d.push(c)}),b=Math.max.apply(Math,d)},adjustCaption:function(b,c){a("caption",this.scrollable.$el)&&(b?a("caption",this.scrollable.$el).css("width",c+1+"px"):a("caption",this.scrollable.$el).css("width","auto"))},calculateThumbSize:function(){var a=this.ratio*this.viewPortSize;return Math.max(a,this.sizing.minSize(this.$thumb))},initMouseMoveScrolling:function(){var b=this;this.$thumb.mousedown(function(a){b.enabled&&b.startMouseMoveScrolling(a)}),this.documentMouseup=function(a){b.stopMouseMoveScrolling(a)},a(document).mouseup(this.documentMouseup),this.documentMousemove=function(a){b.mouseMoveScroll(a)},a(document).mousemove(this.documentMousemove),this.$thumb.click(function(a){a.stopPropagation()})},initMouseWheelScrolling:function(){var a=this;this.scrollable.$container.mousewheel(function(b,c,d,e){a.enabled&&a.mouseWheelScroll(d,e)&&(b.stopPropagation(),b.preventDefault())})},initTouchScrolling:function(){if(document.addEventListener){var a=this;this.elementTouchstart=function(b){a.enabled&&a.startTouchScrolling(b)},this.scrollable.$container[0].addEventListener("touchstart",this.elementTouchstart),this.documentTouchmove=function(b){a.touchScroll(b)},document.addEventListener("touchmove",this.documentTouchmove),this.elementTouchend=function(b){a.stopTouchScrolling(b)},this.scrollable.$container[0].addEventListener("touchend",this.elementTouchend)}},initMouseClickScrolling:function(){var a=this;this.scrollbarClick=function(b){a.mouseClickScroll(b)},this.$scrollbar.click(this.scrollbarClick)},initWindowResize:function(){var b=this;this.windowResize=function(){b.resize()},a(window).resize(this.windowResize)},isKeyScrolling:function(a){return null!==this.keyScrollDelta(a)},keyScrollDelta:function(a){for(var b in this.sizing.scrollingKeys)if(b==a)return this.sizing.scrollingKeys[a](this.viewPortSize);return null},startMouseMoveScrolling:function(b){this.mouseMoveScrolling=!0,a("html").addClass("not-selectable"),this.setUnselectable(a("html"),"on"),this.setScrollEvent(b)},stopMouseMoveScrolling:function(){this.mouseMoveScrolling=!1,a("html").removeClass("not-selectable"),this.setUnselectable(a("html"),null)},setUnselectable:function(a,b){a.attr("unselectable")!=b&&(a.attr("unselectable",b),a.find(":not(input)").attr("unselectable",b))},mouseMoveScroll:function(b){if(this.mouseMoveScrolling){var c=this.sizing.mouseDelta(this.scrollEvent,b);if(this.scrollThumbBy(c),this.setScrollEvent(b),this.hasOtherScrollbarObj){var d=this.otherScrollableObj();a.isEmptyObject(d)||(d.scrollThumbBy(c),d.setScrollEvent(b))}}},hasOtherScrollbarObj:function(){return this.scrollable.hScrollbars.length>1?!0:!1},otherScrollableObj:function(){for(var a in this.scrollable.hScrollbars)if(this.scrollable.hScrollbars[a].position!==this.position)return this.scrollable.hScrollbars[a].bar;return{}},startTouchScrolling:function(a){a.touches&&1==a.touches.length&&(this.setScrollEvent(a.touches[0]),this.touchScrolling=!0,a.stopPropagation())},touchScroll:function(a){if(this.touchScrolling&&a.touches&&1==a.touches.length){var b=-this.sizing.mouseDelta(this.scrollEvent,a.touches[0]),c=this.scrollOverviewBy(b);c&&(a.stopPropagation(),a.preventDefault(),this.setScrollEvent(a.touches[0]))}},stopTouchScrolling:function(a){this.touchScrolling=!1,a.stopPropagation()},mouseWheelScroll:function(a,b){b=0;var c=40*-this.sizing.wheelDelta(a);return 0!==c?this.scrollOverviewBy(c):void 0},mouseClickScroll:function(b){var c=this.viewPortSize-20;if(b["page"+this.sizing.scrollAxis()]<this.$thumb.offset()[this.sizing.offsetComponent()]&&(c=-c),this.scrollOverviewBy(c),this.hasOtherScrollbarObj){var d=this.otherScrollableObj();a.isEmptyObject(d)||d.scrollOverviewBy(c)}},keyScroll:function(a){var b=a.which;this.enabled&&this.isKeyScrolling(b)&&this.scrollOverviewBy(this.keyScrollDelta(b))&&a.preventDefault()},scrollThumbBy:function(a){var b=this.thumbPosition();b+=a,b=this.positionOrMax(b,this.maxThumbPosition);var c=this.scrollPercent;this.scrollPercent=b/this.maxThumbPosition;var d=b*this.maxOverviewPosition/this.maxThumbPosition;return this.setScrollPosition(d,b),c!=this.scrollPercent?(this.triggerCustomScroll(c),!0):!1},scrollOverviewTo:function(a){a=this.positionOrMax(a,this.maxOverviewPosition);var b=this.scrollPercent;this.scrollPercent=a/this.maxOverviewPosition;var c=this.scrollPercent*this.maxThumbPosition;return this.setScrollPosition(a,c),b!=this.scrollPercent?(this.triggerCustomScroll(b),!0):!1},thumbPosition:function(){return this.$thumb.position()[this.sizing.offsetComponent()]},scrollOverviewBy:function(a){var b=this.overviewPosition()+a;return this.scrollOverviewTo(b)},overviewPosition:function(){return-this.scrollable.$el.position()[this.sizing.offsetComponent()]},positionOrMax:function(a,b){return 0>a?0:a>b?b:a},triggerCustomScroll:function(a){this.scrollable.$container.trigger("customScroll",{scrollAxis:this.sizing.scrollAxis(),direction:this.sizing.scrollDirection(a,this.scrollPercent),scrollPercent:100*this.scrollPercent})},rescroll:function(a){var b=0,c=0;a?(b=this.positionOrMax(this.overviewPosition(),this.maxOverviewPosition),this.scrollPercent=b/this.maxOverviewPosition,c=this.scrollPercent*this.maxThumbPosition,this.setScrollPosition(b,c)):(c=this.scrollPercent*this.maxThumbPosition,b=this.scrollPercent*this.maxOverviewPosition,this.setScrollPosition(b,c))},setScrollPosition:function(a,b){this.$thumb.css(this.sizing.offsetComponent(),b+"px"),this.scrollable.$el.css(this.sizing.offsetComponent(),-a+"px")},setScrollPositionWithAnimation:function(a,b){var c={},d={};c[this.sizing.offsetComponent()]=b+"px",this.$thumb.animate(c,300),d[this.sizing.offsetComponent()]=-a+"px",this.scrollable.$el.animate(d,300)},calculateMaxThumbPosition:function(){return this.sizing.size(this.$scrollbar)-this.thumbSize},calculateMaxOverviewPosition:function(){var a=this.calculateTableWidth(),b=this.sizing.size(this.scrollable.$el),c=0;return parseInt(a-b)>10?(c=a-this.sizing.size(this.scrollable.$parent),this.adjustCaption(!0,a)):(c=this.sizing.size(this.scrollable.$el)-this.sizing.size(this.scrollable.$parent),this.adjustCaption(!1)),c},setScrollEvent:function(a){var b="page"+this.sizing.scrollAxis();this.scrollEvent&&this.scrollEvent[b]==a[b]||(this.scrollEvent={pageX:a.pageX,pageY:a.pageY})}};var k=function(){};k.prototype={scrollingKeys:{37:function(){return-10},39:function(){return 10}},size:function(a,b){return b?a.width(b):a.width()},minSize:function(a){return parseInt(a.css("min-width"))||0},scrollbar:function(a,b){return a.$container.find("."+a.options.scrollbarClass+"."+b)},mouseDelta:function(a,b){return b.pageX-a.pageX},offsetComponent:function(){return"left"},wheelDelta:function(a){return a},scrollAxis:function(){return"X"},scrollDirection:function(a,b){return b>a?"right":"left"}},f.adjustTable=function(){f.$el.data("cbCustomScrollbar")&&(f.options.scrollbarTop&&f.hScrollbarTop.resize(),f.options.scrollbarBottom&&f.hScrollbarBottom.resize())},f.init()},a.fn.cbCustomScrollbar=function(c){var d=arguments;return void 0===c||"object"==typeof c?this.each(function(){a(this).data("cbCustomScrollbar")||a(this).data("cbCustomScrollbar",new b.apricot.customScrollbar(this,c))}):"string"==typeof c?this.each(function(){var e=a.data(this,"cbCustomScrollbar");e instanceof b.apricot.customScrollbar&&"function"==typeof e[c]&&e[c].apply(e,Array.prototype.slice.call(d,1))}):void 0};var d=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var e=d.length;e;)a.event.fixHooks[d[--e]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=d.length;a;)this.addEventListener(d[--a],c,!1);else this.onmousewheel=c},teardown:function(){if(this.removeEventListener)for(var a=d.length;a;)this.removeEventListener(d[--a],c,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}}),a(window).on("load",function(){b.apricot.setup.isCb("table")?a(".table").length>0&&(a(".table").each(function(){a(this).parent().hasClass("table-responsive")&&a(this).cbCustomScrollbar()}),a(document).trigger("cb_table_finished")):b.apricot.setup.hasSelector("table")&&(a.each(b.apricot.setup.selector("table"),function(b,c){a(c).parent().hasClass("table-responsive")&&a(c).cbCustomScrollbar()}),a(document).trigger("cb_table_finished"))})}(jQuery,cb),/*!
 *  Bootstrap v3.3.0
 *  Copyright 2011-2014 Twitter, Inc.
 *  Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b,g=f&&f.selector;(e||"destroy"!=b)&&(g?(e||d.data("bs.tooltip",e={}),e[g]||(e[g]=new c(this,f))):e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.0",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=this.tip(),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),/*!
 *  Apricot v0.7.0
 *  By:             The College Board
 *  App:            homeorg
 *  Build Time:     2015-05-19 [2:15:41 PM] EDT
 *  Build Number:   26
 *  SVN Revision:   33056
 *  Jenkins Job:    apricot-clients
 *  This version of Apricot includes Bootstrap v3.3.0
 */
+function(a){"use strict";if(!a.fn.tooltip)throw new Error("tooltip-extension requires tooltip.js");a.fn.tooltip.Constructor.prototype.getCalculatedOffset=function(a,b,c,d){var e=0,f=0,g=b.height,h=this.$element.clone().css({position:"absolute",left:"-9999px"});return h.appendTo("body"),e=h.outerHeight(),f=h.outerWidth(),h.remove(),g!==e&&(b.width=f,isNaN(b.right)||(b.left=b.right-f)),"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}}}(jQuery),+function(a,b){"use strict";b.apricot.populateDropDown=function(c,d){var e={type:"",data:{},disableByIndex:1,selectByIndex:1,selectByValue:""},f=this;f.$el=a(c);var g=function(a){f.$el.empty();for(var b in a)f.$el.append('<option value="'+a[b].value+'">'+a[b].name+"</option>");h(f.$el)},h=function(b){f.options.disableByIndex>0&&a("option:nth-child("+f.options.disableByIndex+")",b).attr("disabled","disabled"),f.options.select>0&&a("option:nth-child("+f.options.selectByIndex+")",b).attr("selected",!0),f.options.selectByValue&&b.val(f.options.selectByValue)};f.init=function(){f.options=a.extend({},e,d);var c=f.$el.attr("data-cb-populate")?f.$el.attr("data-cb-populate"):f.options.type,h=a.isEmptyObject(f.options.data)?b.apricot.data[c]:f.options.data;return h?void(h.length&&g(h)):!1},f.init()},a.fn.cbPopulateDropDown=function(c){var d=arguments;return void 0===c||"object"==typeof c?this.each(function(){a(this).data("cbPopulateDropDown")||a(this).data("cbPopulateDropDown",new b.apricot.populateDropDown(this,c))}):"string"==typeof c?this.each(function(){var e=a.data(this,"cbPopulateDropDown");e instanceof b.apricot.populateDropDown&&"function"==typeof e[c]&&e[c].apply(e,Array.prototype.slice.call(d,1))}):void 0},b.apricot.cardTypeDetector=function(c,d){var e={data:{}},f=this;f.$el=a(c);var g=function(c){var d=a("<span>",{"class":"sr-only"}),e=f.$el.attr("id")?f.$el.attr("id"):"cbCreditCardNum";f.$el.attr("id",e),d.attr("id",e+"help").html("Enter Credit Card Number"),f.$el.addClass("cb-credit-card").attr("aria-describedby",e+"help").attr("aria-live","assertive").after(d),f.$el.attr("title","Enter credit card number"),f.$el.on("keyup",function(){for(var e=a(this).val().replace(/ /g,"").replace(/-/g,""),g=a(this),h="",i=0;i<c.length;i++)e.match(new RegExp(c[i].regExp))?(g.addClass(c[i].className),h=c[i].name):g.removeClass(c[i].className);b.apricot.utils.isBlank(h)?(f.$el.attr("title","Enter valid credit card number"),d.html("Enter valid credit card number")):(g.attr("title","Credit card type is "+h),d.html("Credit card type is "+h))})};f.init=function(){f.options=a.extend({},e,d);var c=a.isEmptyObject(f.options.data)?b.apricot.data.creditCards:f.options.data;return c?void(c.length&&g(c)):!1},f.init()},a.fn.cbCreditCardTypeDetector=function(c){return this.each(function(){a(this).data("cbCreditCardTypeDetector")||a(this).data("cbCreditCardTypeDetector",new b.apricot.cardTypeDetector(this,c))})},b.apricot.intPhoneDetector=function(c,d){var e={defaultCountry:"us",onlyCountries:[],preferredCountries:["us"],data:{},wrapperClass:"cb-int-phone-container",elmClass:"cb-int-phone",dropDownWrapperClass:"flag-dropdown",ieVersion:8},f=this,g=b.apricot.utils.keys,h={},i={},j={},k={},l={},m={},n=Boolean(a(c).attr("placeholder"));f.$el=a(c),f.countries=[],f.countryCodes={},f.filterCode="",f.filterType="",f.countryCode="",f.init=function(){var c=b.apricot.utils.browser();if(f.options=a.extend({},e,d),c.msie&&parseInt(c.version,10)<f.options.ieVersion)return f.$el.addClass("no-cb"),!1;var g=a.isEmptyObject(f.options.data)?b.apricot.data.countries:f.options.data;return g?void(g.length&&(f.$el.attr("aria-live","assertive"),o(g))):!1};var o=function(b){var c=0;if(f.options.onlyCountries.length>0)for(f.countries=[],c=0;c<b.length;c++)-1!=a.inArray(b[c].iso,f.options.onlyCountries)&&(f.countries.push(b[c]),p(b[c].iso,b[c].dialCode));else if(f.options.preferredCountries.length>0){for(c=0;c<b.length;c++)-1!=a.inArray(b[c].iso,f.options.preferredCountries)&&(f.countries.push(b[c]),p(b[c].iso,b[c].dialCode));for(c=0;c<b.length;c++)-1===a.inArray(b[c].iso,f.options.preferredCountries)&&(f.countries.push(b[c]),p(b[c].iso,b[c].dialCode))}else for(f.countries=b,c=0;c<b.length;c++)p(b[c].iso,b[c].dialCode);q()},p=function(a,b){b in f.countryCodes||(f.countryCodes[b]=[]),f.countryCodes[b][0]=a},q=function(){f.$el.addClass(f.options.elmClass),h=a("<div>",{"class":f.options.wrapperClass}),f.$el.wrap(h),i=a("<div>",{"class":f.options.dropDownWrapperClass}).insertAfter(f.$el),j=a("<a>",{"class":"selected-flag"}).attr("tabindex","-1").appendTo(i),k=a("<span>",{"class":"flag"}).appendTo(j),m=a("<span>",{"class":"sr-only"}).appendTo(k),a("<span>",{"class":"arrow"}).appendTo(k),l=a("<ul>",{"class":"country-list"}).insertAfter(j),r(),v(f.options.defaultCountry),A(),B()},r=function(){for(var a={},b="",c=0;c<f.countries.length;c++)a=f.countries[c],b="",b+='<li class="country">',b+='<a href= "#" data-cb-dial-code="'+a.dialCode+'" data-cb-country-code="'+a.iso+'" title="'+a.name+'">',b+='<span class="sr-only">'+a.name+"</span>",b+='<span class="flag '+a.iso+'"></span>',b+="</a>",b+="</li>",l.append(b);D(),F(),G()},s=function(){var b=f.$el.offset().top,c=a(window).scrollTop(),d=l.outerHeight(),e=b+f.$el.outerHeight()+d<c+a(window).height(),g=b-d>c,h=!e&&g?"-"+(d-1)+"px":"";!e&&g?f.$el.parent().removeClass("slide-down").addClass("slide-up"):f.$el.parent().removeClass("slide-up").addClass("slide-down"),l.css("top",h)},t=function(a){for(var b=0;b<f.countries.length;b++)if(f.countries[b].iso==a)return f.countries[b]},u=function(a){for(var b=0;b<f.countries.length;b++)if(f.countries[b].dialCode==a)return f.countries[b]},v=function(b){var c;c=a.isNumeric(b)?u(b):""!==b?t(b):{name:"",iso:"",dialCode:""},k.removeClass().addClass("flag").addClass(c.iso),j.attr("data-cb-country-code",c.iso).attr("data-cb-dial-code",c.dialCode),m.html(c.name),f.$el.attr("title",c.name),B()},w=function(b){var c=a('[data-cb-country-code^="'+b+'"]',l).first();y(c),c.focus()},x=function(b,c){var d,e=a(".active",l),g="";b=b.toLowerCase(),e?""!==f.filterCode?(g="country"===c?f.filterCode.length>=2?b:f.filterCode+b:a("[data-cb-"+c+'-code^="'+f.filterCode+b+'"]',l)?f.filterCode+b:b,d=a("[data-cb-"+c+'-code^="'+g+'"]',l).first(),d?(d.focus(),f.filterCode=g):f.filterCode=""):(f.filterCode="",d=a("[data-cb-"+c+'-code^="'+b+'"]',l).first(),d&&(d.focus(),f.filterCode=b)):d=a("[data-cb-"+c+'-code^="'+b+'"]',l).first()},y=function(b){a(".active",l).removeClass("active"),b.addClass("active")},z=function(){l.toggle(),l.is(":visible")?f.$el.addClass("active-flag"):f.$el.removeClass("active-flag")},A=function(a){a=a?a:j.attr("data-cb-dial-code"),f.$el.val("+"+j.attr("data-cb-dial-code"))},B=function(){if(n){var a=j.attr("data-cb-dial-code"),b="+"+a;f.$el.attr("placeholder",b)}},C=function(b){var c="";if("+"==b.charAt(0))for(var d="",e=0;e<b.length;e++){var g=b.charAt(e);if(a.isNumeric(g)&&(d+=g,f.countryCodes[d]&&(c=b.substr(0,e+1)),4==d.length))break}return c.slice(1,c.length)},D=function(){f.$el.on("keydown",function(a){b.apricot.utils.isKey(a,"PREV")?(a.preventDefault(),j.focus()):(b.apricot.utils.isKey(a,"DOWN")||b.apricot.utils.isKey(a,"UP"))&&(a.preventDefault(),j.click())}),f.$el.on("keyup",function(c){var d=f.$el.val(),e="";""===d?(f.$el.val("+"),E()):"+"===d?E():c.which>=g.SPACE&&!c.metaKey&&(d=d.slice(1,d.length),e=d.replace(/\s+/g,""),a.isNumeric(e)||b.apricot.utils.isKey(c,"SPACE")||(d=d.slice(0,-1),f.$el.val("+"+d)),d=C(f.$el.val()),a.isNumeric(d)?d!==f.countryCode&&(v(d),A(d),f.countryCode=d):(v(""),m.html(""),f.$el.removeAttr("title")))}),f.$el.on("click",function(a){a.preventDefault(),a.stopPropagation(),l.is(":visible")&&z()})},E=function(){var a=f.$el.val();(""===a||"+"===a)&&""!==j.attr("data-cb-country-code")&&(k.removeClass(j.attr("data-cb-country-code")),j.attr("data-cb-country-code",""))},F=function(){j.keydown(function(c){var d=a(this);b.apricot.utils.isKey(c,"ENTER")?(c.preventDefault(),d.click()):b.apricot.utils.isKey(c,"TAB")&&!c.shiftKey?(c.preventDefault(),f.$el.focus()):b.apricot.utils.isKey(c,"DOWN")?(c.preventDefault(),d.click()):b.apricot.utils.isKey(c,"NEXT")&&(c.preventDefault(),f.$el.focus())}),j.on("click",function(a){a.preventDefault(),a.stopPropagation(),l.is(":visible")||s(),z(),""!==j.attr("data-cb-country-code")?w(j.attr("data-cb-country-code")):l.find("a:first").focus(),f.filterCode=""})},G=function(){a("a",l).each(function(){a(this).on("keydown",function(c){var d=a(this);c.which>=g.ZERO&&c.which<=g.NINE?(f.filterCode="number"===f.filterType?f.filterCode:"",f.filterType="number",x(String.fromCharCode(c.which),"dial")):c.which>=g.A&&c.which<=g.Z?(f.filterCode="string"===f.filterType?f.filterCode:"",f.filterType="string",x(String.fromCharCode(c.which),"country")):b.apricot.utils.isKey(c,"DOWN")?(c.preventDefault(),d.parent().next().find("a").focus()):b.apricot.utils.isKey(c,"UP")?(c.preventDefault(),d.parent().prev().find("a").focus()):b.apricot.utils.isKey(c,"ESC")&&(c.preventDefault(),z(),f.$el.focus())}),a(this).on("click",function(b){b.preventDefault(),b.stopPropagation(),v(a(this).attr("data-cb-country-code")),A(),z(),f.$el.focus()})}),l.find("a:first").keydown(function(a){b.apricot.utils.isKey(a,"TAB")&&a.shiftKey&&(a.preventDefault(),z(),f.$el.focus())}),l.find("a:last").keydown(function(a){b.apricot.utils.isKey(a,"TAB")&&!a.shiftKey&&(a.preventDefault(),z(),f.$el.focus())}),a("html").on("click",function(){l.is(":visible")&&z()})};f.init()},a.fn.cbIntPhoneDetector=function(c){return this.each(function(){a(this).data("cbIntPhoneDetector")||a(this).data("cbIntPhoneDetector",new b.apricot.intPhoneDetector(this,c))})},a(window).on("load",function(){a('[data-cb-element="credit-card"]').length>0&&(a('[data-cb-element="credit-card"]').each(function(){a(this).cbCreditCardTypeDetector()}),a(document).trigger("cb_creditCard_finished")),a('[data-cb-element="int-phone"]').length>0&&(a('[data-cb-element="int-phone"]').each(function(){a(this).cbIntPhoneDetector()}),a(document).trigger("cb_intPhone_finished"))})}(jQuery,cb),+function(a,b){"use strict";b.apricot.customSelect=function(c,d){var e={replacedClass:"replaced",selectClass:"cb-select",activeClass:"active",wrapperElement:"<div>",wrapperClass:"cb-select-container",truncate:!0,hiddenParent:!1,parentElm:{},ieVersion:9},f={},g=this;g.$el=a(c);var h=function(a){var b,c={"&":"&amp;","<":"&lt;",">":"&gt;"},d=function(a){var d=[];if(a)for(b in c)d.push(b);else for(b in c)d.push(c[b]);return new RegExp(d.join("|"),"g")},e=function(a,b){return a.test(b)},f=function(a){return c[a]||a},g=function(a){for(var b in c)if(c[b]==a)return b;return a};return e(d(!1),a)?a.replace(d(!1),g):a.replace(d(!0),f)},i=function(){var b=h(a("option:selected",g.$el).text());b=g.options.truncate?l(b):b,f.find("span span").html('<i class="cb-select-arrow"></i>'+b)},j=function(){g.$el.parent().find("."+g.options.selectClass).addClass("disabled")},k=function(){g.$el.parent().find("."+g.options.selectClass).removeClass("disabled")},l=function(c){var d=m(f),e=f.find("i").outerWidth(!0),g=0,h=0,i=0,j=c,k=a("<span>",{"class":"tmp-element"});if(a("body").append(k),k.html(c),g=k.outerWidth(!0),h=parseInt(d-e,10),g>=h){for(;k.outerWidth(!0)>h;)j=k.html(),j=j.substring(0,j.length-1),k.html(j);i=j.length,c=b.apricot.utils.textTruncate(c,i,"last","...")}return k.remove(),c},m=function(a){var b=0,c=!1;return g.options.hiddenParent?g.options.parentElm.length>0&&(c="none"==g.options.parentElm.css("display")?!0:!1,c?(g.options.parentElm.show(),b=a.outerWidth(),g.options.parentElm.hide()):b=a.outerWidth()):b=a.outerWidth(),b};g.init=function(){var c=b.apricot.utils.browser();if(g.options=a.extend({},e,d),f=a('<span class="'+g.options.selectClass+'" aria-hidden="true"><span><span><i class="cb-select-arrow"></i>'+h(a("option:selected",g.$el).text())+"</span></span></span>"),c.msie&&parseInt(c.version,10)<g.options.ieVersion)return g.$el.addClass("no-cb"),!1;var l=!!g.$el.attr("multiple"),m=a(g.options.wrapperElement,{"class":g.options.wrapperClass});l||(g.$el.addClass(g.options.replacedClass),g.$el.wrap(m),g.$el.after(f),g.$el.on("change",function(){i()}),g.$el.on("keyup",function(){i()}),(g.$el.is(":disabled")||g.$el.hasClass("disabled"))&&j(),g.$el.bind({mouseenter:function(){f.addClass(g.options.activeClass)},mouseleave:function(){f.removeClass(g.options.activeClass).removeClass("mouseover")},focus:function(){f.addClass(g.options.activeClass).addClass("focus")},mouseover:function(){f.addClass(g.options.activeClass).addClass("mouseover")},blur:function(){f.removeClass(g.options.activeClass).removeClass("focus")}}),a(window).resize(function(){i()}),g.$el.on("value_changed",function(){i()}),g.$el.on("disable",function(){j()}),g.$el.on("enable",function(){k()}),g.$el.trigger("value_changed"))},g.destroy=function(){g.$el.data("cbCustomSelect")&&(g.$el.unwrap(),g.$el.removeClass(g.options.replacedClass),g.$el.siblings("."+g.options.selectClass).remove(),g.$el.addClass("no-cb"))},g.init()},a.fn.cbCustomSelect=function(c){var d=arguments;return void 0===c||"object"==typeof c?this.each(function(){a(this).data("cbCustomSelect")||a(this).data("cbCustomSelect",new b.apricot.customSelect(this,c))}):"string"==typeof c?this.each(function(){var e=a.data(this,"cbCustomSelect");e instanceof b.apricot.customSelect&&"function"==typeof e[c]&&e[c].apply(e,Array.prototype.slice.call(d,1))}):void 0},b.apricot.customElement=function(c,d){var e={type:"",classPrefix:"cb-",spanClass:"cb-span",elmClass:"",ieVersion:9},f=this;f.$el=a(c),f.el=c,f.init=function(){var c=b.apricot.utils.browser(),g={};return f.options=a.extend({},e,d),g=a("<span>",{"class":f.options.spanClass}),c.msie&&parseInt(c.version,10)<f.options.ieVersion?(f.$el.addClass("no-cb"),!1):(f.options.type=f.options.type?f.options.type:f.$el.attr("type"),f.options.elmClass=f.options.elmClass?f.options.elmClass:f.options.classPrefix+f.options.type,f.$el.hasClass(f.options.elmClass)||(f.$el.addClass(f.options.elmClass),f.$el.after(g)),g.click(function(a){var b=f.$el.is(":checked")?!1:!0,c=f.$el.prop("disabled")?!0:!1;c||(f.$el.prop("checked",b),f.$el.change())}),void f.$el.keydown(function(c){var d=a(this);if(b.apricot.utils.isKey(c,"ENTER")&&(c.preventDefault(),"checkbox"===f.$el.attr("type"))){var e=d.is(":checked")?!1:!0;d.prop("checked",e),d.change()}}))},f.destroy=function(){f.$el.data("cbCustomElement")&&(f.$el.siblings("."+f.options.spanClass).remove(),f.$el.removeClass(f.options.elmClass).addClass("no-cb"))},f.init()},a.fn.cbCustomElement=function(c){var d=arguments;return void 0===c||"object"==typeof c?this.each(function(){a(this).data("cbCustomElement")||a(this).data("cbCustomElement",new b.apricot.customElement(this,c))}):"string"==typeof c?this.each(function(){var e=a.data(this,"cbCustomElement");e instanceof b.apricot.customElement&&"function"==typeof e[c]&&e[c].apply(e,Array.prototype.slice.call(d,1))}):void 0},b.apricot.FileUpload=function(c,d){var e={label:"Choose File",btnType:"secondary",btnSize:"sm",btnClass:"cb-file-button",wrapperClass:"cb-file-upload",fdbk:!0,fdbkElement:"<span>",fdbkClass:"cb-file-element",fdbkPath:!0,fdbkMsg:"No file selected...",fdbkTruncate:!0,fdbkMaxChars:"auto",fdbkPosition:"middle",ellipseText:"...",popover:!0,popoverPlacement:"top",ieVersion:9},f=this,g=null,h=null,i=null;f.$el=a(c),f.file="";var j=function(c){var d=f.options.fdbkPosition?f.options.fdbkPosition:"middle",e=f.options.ellipseText?f.options.ellipseText:"...";if(!f.options.fdbk)return c;if(isNaN(f.options.fdbkMaxChars)){var i=g.outerWidth(),j=h.outerWidth(!0),k=0,l=0,m=0,n=c,o=a(f.options.fdbkElement,{"class":f.options.fdbkClass,id:"tmpFileValue"});if(o.addClass("tmp-element"),a("body").append(o),o.html(c),k=o.outerWidth(!0),l=parseInt(i-j,10),k>=l){for(;o.outerWidth(!0)>l;)n=o.html(),n=n.substring(0,n.length-1),o.html(n);m=n.length,o.remove(),c=b.apricot.utils.textTruncate(c,m,d,e)}}else c.length>f.options.fdbkMaxChars&&(c=b.apricot.utils.textTruncate(c,f.options.fdbkMaxChars,d,e));return c},k=function(){var b=f.options.popoverPlacement?f.options.popoverPlacement:"top";return a.fn.popover?(i.attr("data-toggle","popover"),void i.dblclick(function(){i.popover("destroy"),void 0!==h.attr("data-cb-file")&&(i.popover({html:!0,title:"",placement:b,trigger:"manual",content:'<p class="cb-file-name">'+h.attr("data-cb-file")+"</p>",container:"body"}),i.popover("show"))})):!1};f.init=function(){var c=b.apricot.utils.browser();return f.options=a.extend({},e,d),c.msie&&parseInt(c.version,10)<f.options.ieVersion?(f.$el.addClass("no-cb"),!1):(g=a("<div>",{"class":f.options.wrapperClass}),f.options.fdbk&&(i=a(f.options.fdbkElement,{"class":f.options.fdbkClass})),f.$el.wrap(g),g=f.$el.parent("."+f.options.wrapperClass),h=a("<button>",{"class":f.options.btnClass}),h.addClass("btn").addClass("btn-"+f.options.btnType).addClass("btn-"+f.options.btnSize).html(f.options.label),f.options.fdbk&&f.$el.after(i),f.$el.after(h),h.on("click",function(a){a.preventDefault(),f.$el.click()}),f.$el.on("change",function(){var b=a(this).val(),c="";f.options.fdbk&&(c=f.options.fdbkMsg,f.options.fdbkPath||(b=b.split(/\\/).pop()),b&&(c=b,f.file=b),i.html(j(c))),b?(h.attr("data-cb-file",b),h.attr("title",b),f.options.popover&&f.options.fdbk&&k()):h.removeAttr("data-cb-file")}),void(f.options.fdbk&&a(window).resize(function(){i.html()&&i.html(j(f.file))})))},f.init()},a.fn.cbFileUpload=function(c){return this.each(function(){a(this).data("cbFileUpload")||a(this).data("cbFileUpload",new b.apricot.FileUpload(this,c))})},b.apricot.inputPlaceholder=function(c,d){var e={placeholderClass:"cb-placeholder",placeholderText:"",handlePassword:!0,passwordClass:"cb-password"},f=this;f.$el=a(c);var g=function(){var c=b.apricot.utils.isBlank(f.$el.attr("placeholder"))?b.apricot.utils.isBlank(f.options.placeholderText)?"":f.options.placeholderText:f.$el.attr("placeholder"),d="password"==f.$el.attr("type")&&f.options.handlePassword,e=b.apricot.utils.browser();return b.apricot.utils.isBlank(c)?!1:e.msie&&parseInt(e.version,10)<9&&d?!1:(f.$el.val(f.$el.attr("placeholder")).addClass(f.options.placeholderClass),d&&(f.$el.attr("type","text"),f.$el.addClass(f.options.passwordClass)),void f.$el.focus(function(){var b=a(this),e=b.val();e===c&&(b.val("").removeClass(f.options.placeholderClass),d&&(b.removeClass(f.options.passwordClass),b.attr("type","password")))}).blur(function(){var e=a(this),g=e.val();(b.apricot.utils.isBlank(g)||g===c)&&(d&&(e.addClass(f.options.placeholderClass),e.attr("type","text")),e.addClass(f.options.placeholderClass).val(c))}).blur().parents("form").submit(function(){a(this).find("."+f.options.placeholderClass).each(function(){var b=a(this);b.val()===b.attr(f.options.placeholderClass)&&b.val("")})}))},h=function(){return"placeholder"in document.createElement("input")};f.init=function(){f.options=a.extend({},e,d),h()||g()},f.init()},a.fn.cbInputPlaceholder=function(c){return this.each(function(){a(this).data("cbInputPlaceholder")||a(this).data("cbInputPlaceholder",new b.apricot.inputPlaceholder(this,c))})},a(window).on("load",function(){b.apricot.setup.isCb("select")?a("select").length>0&&(a("select").each(function(){"no-cb"!==a(this).data("cb-element")&&a(this).cbCustomSelect()}),a(document).trigger("cb_select_finished")):b.apricot.setup.hasSelector("select")&&(a.each(b.apricot.setup.selector("select"),function(b,c){a(c).cbCustomSelect()}),a(document).trigger("cb_select_finished")),b.apricot.setup.isCb("checkbox")?a("[type=checkbox]").length>0&&(a("[type=checkbox]").each(function(){"no-cb"!==a(this).data("cb-element")&&a(this).cbCustomElement({type:"checkbox"})}),a(document).trigger("cb_checkbox_finished")):b.apricot.setup.hasSelector("checkbox")&&(a.each(b.apricot.setup.selector("checkbox"),function(b,c){a(c).cbCustomElement({type:"checkbox"})}),a(document).trigger("cb_checkbox_finished")),b.apricot.setup.isCb("radio")?a("[type=radio]").length>0&&(a("[type=radio]").each(function(){"no-cb"!==a(this).data("cb-element")&&a(this).cbCustomElement({type:"radio"})}),a(document).trigger("cb_radio_finished")):b.apricot.setup.hasSelector("radio")&&(a.each(b.apricot.setup.selector("radio"),function(b,c){a(c).cbCustomElement({type:"radio"})}),a(document).trigger("cb_radio_finished")),b.apricot.setup.isCb("fileUpload")?a("[type=file]").length>0&&(a("[type=file]").each(function(){"no-cb"!==a(this).data("cb-element")&&a(this).cbFileUpload()}),a(document).trigger("cb_fileUpload_finished")):b.apricot.setup.hasSelector("fileUpload")&&(a.each(b.apricot.setup.selector("fileUpload"),function(b,c){a(c).cbFileUpload()}),a(document).trigger("cb_fileUpload_finished")),b.apricot.setup.isCb("placeholder")?a("[type=text]").length>0&&(a("[type=text]").each(function(){"no-cb"!==a(this).data("cb-element")&&a(this).cbInputPlaceholder()}),a(document).trigger("cb_placeholder_finished")):b.apricot.setup.hasSelector("placeholder")&&(a.each(b.apricot.setup.selector("placeholder"),function(b,c){a(c).cbInputPlaceholder()}),a(document).trigger("cb_placeholder_finished"))})}(jQuery,cb),/*!
 *  Bootstrap v3.3.0
 *  Copyright 2011-2014 Twitter, Inc.
 *  Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.0",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.0",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),/*!
 *  Apricot v0.7.0
 *  By:             The College Board
 *  App:            homeorg
 *  Build Time:     2015-05-19 [2:15:41 PM] EDT
 *  Build Number:   26
 *  SVN Revision:   33056
 *  Jenkins Job:    apricot-clients
 *  This version of Apricot includes Bootstrap v3.3.0
 */
+function(a,b){"use strict";b.apricot.localNav=function(c,d){var e={desktopClass:"cb-desktop-navigation",mobileClass:"cb-mobile-navigation",mobileHeaderClass:"cb-mobile-local-header",panelClass:"cb-menu-panel",iconClass:"cb-has-icon",addDesktopParentLabel:!0,addMobileParentLabel:!0,desktopHomeLabel:"Home",desktopLabelPrefix:!0,mobileHomeLabel:"Home",mobieLabelPrefix:!0,activePage:!1,activePageType:!0,menuLimit:165},f=this,g={},h={},i={},j={},k=[],l=[],m=[],n=[],o=0,p="";f.$el=a(c),f.el=c,f.init=function(){f.options=a.extend({},e,f.$el.data(),d);var b={},c=[],i={},j=1;if(g=a("ul",f.$el).first(),h=a("nav",f.$el),p=h.attr("aria-label")?h.attr("aria-label"):"",a("ul > li",f.$el).each(function(){var b=a(this);i={},i.obj=b,i.width=parseInt(K(a(this)),10),b.attr("data-cb-list")||(b.hasClass(f.options.iconClass)?i.type="icon":a("ul",b).length>0?(b.attr("data-cb-parent",j),i.type="nested",i.parent=j,i.list=r(b,j),i.list.length>0&&(j+=o+1,o=0)):i.type="simple",k.push(i),"icon"!==i.type&&l.push(i))}),a('[data-cb-list="true"]',f.$el).removeAttr("data-cb-list"),f.options.activePage)for(var i in k){var n=k[i],s=n.obj;i={},s.hasClass("dropdown")?(c=[],a("a",s).each(function(){var b=a(this);i={},i.type="child",i.obj=b,i.url=b.attr("href"),c.push(i)}),b=a("a",s),i.type="nested",i.obj=s,i.url=b.attr("href"),i.list=c):s.hasClass(f.options.iconClass)||(b=a("a",s),i.type="single",i.obj=b.parent(),i.url=b.attr("href"),i.list=[]),a.isEmptyObject(i)||m.push(i)}f.options.addDesktopParentLabel&&F(),E(a("a",g)),u(),H(),q(),f.$el.cbDropdownExtension(),f.options.activePage&&A()};var q=function(){s(),a(window).on("resize",function(){s(),i.hasClass("hidden")||x()})},r=function(b,c){var d=[],e={};return a("ul:first",b).children().each(function(){var b=a(this);e={},e.obj=b.clone(),e.child=c,e.list=r(b,c+1),e.list.length>0&&(e.parent=c+1,o+=1),d.push(e),b.attr("data-cb-list",!0)}),d},s=function(){var a=b.apricot.utils.viewport();y(a.prefix),"xs"!==a.prefix&&G()},t=function(c,d,e){var g={},h={},i={},j=c?f.options.mobileHomeLabel:f.options.mobieLabelPrefix?f.options.mobileHomeLabel+" "+d:d+" "+f.options.mobileHomeLabel,k=c?a(".home a",f.$el).attr("href"):e;return b.apricot.utils.isBlank(k)||"#"===k?{}:(g=a("<li/>"),h=a("<a/>").attr("href",k).attr("aria-selected",!1).appendTo(g),i=a("<span/>").html(j).appendTo(h),g)},u=function(){var b={},c={},d={},e={},g=[];if(a.isEmptyObject(i)){i=a("<nav/>").addClass(f.options.mobileClass).addClass("hidden").attr("role","navigation").appendTo(f.$el),f.options.addMobileParentLabel&&(c=t(1),a.isEmptyObject(c)||g.push(c));for(var h in k){var j=k[h],l=j.obj,m=l.clone();l.hasClass("home")?(b=a("<div/>").addClass(f.options.mobileHeaderClass).appendTo(i),e=a("<span/>").addClass("local-menu-title").attr("data-cb-header-title",a("span",l).html()).html(a("span",l).html()).appendTo(b),d=a("<a/>").addClass("local-menu-icon").addClass("glyphicon-cb").addClass("cb-icon-Nav_Links").attr("href","#").attr("data-cb-panel-for","panel-main").appendTo(b)):"nested"===j.type?(c={},c=a("<li/>").attr("data-cb-panel-for","panel-sub-"+j.parent).addClass("panel-sub").addClass("dropdown"),d=a("<a/>").attr("href",a("a",l).attr("href")).attr("aria-selected",!1).appendTo(c),e=a("<span/>").html(a("span",l).first().html()).appendTo(d),g.push(c),v(j)):("simple"===j.type||"icon"===j.type)&&g.push(m)}w(g,"main"),n.sort(function(a,b){return parseFloat(a.order)-parseFloat(b.order)});for(var h in n)n[h].panel.appendTo(i);C()}},v=function(b){var c=[],d=b.list,e=b.obj,f={},g={},h={},i="",j="";i=a("span:first",e).html(),j=a("a:first",e).attr("href"),e=t(0,i,j),a.isEmptyObject(e)||c.push(e);for(var k in d){var l=d[k];e={},e=l.obj,l.list.length>0?(f={},f=a("<li/>").attr("data-cb-panel-for","panel-sub-"+l.parent).addClass("panel-sub").addClass("dropdown"),g=a("<a/>").attr("href",a("a",e).attr("href")).attr("aria-selected",!1).appendTo(f),h=a("<span/>").html(a("span",e).first().html()).appendTo(g),c.push(f),v(l)):c.push(e)}c.length>0&&w(c,b.parent)},w=function(b,c){var d={},e={},g={},h=!1,i=isNaN(c)?"panel-main":"panel-sub-"+c,j=a("<div/>").addClass(f.options.panelClass).attr("data-cb-panel",i);d=a("<ul/>").appendTo(j).addClass("link-panel"),e=a("<ul/>").addClass("icon-panel");for(var g in b)b[g].hasClass("cb-has-icon")?(h=!0,e.append(b[g])):d.append(b[g]);h&&e.appendTo(j),g={},g.order=isNaN(c)?0:c,g.panel=j,n.push(g)},x=function(){var b=a('[data-cb-panel="panel-main"]',f.$el),c=a(".link-panel",f.$el),d=a(".icon-panel",f.$el),e=parseInt(b.height(),10),g=parseInt(c.height(),10),h=parseInt(c.find("li:first").height(),10),i=0;return b.hasClass("show")?void(d.length>0&&(i=a("li",d).length*h,g+i>e?d.addClass("adjust-icon-panel"):d.removeClass("adjust-icon-panel"))):!1},y=function(b){"xs"===b?(J(),z(0)):a.isEmptyObject(i)||z(1)},z=function(c){c?(h.removeClass("hidden"),b.apricot.utils.isBlank(p)||h.attr("aria-label",p),i.addClass("hidden"),i.removeAttr("aria-label"),D(1),a(".cb-menu-panel.show",f.$el).removeClass("show")):(i.removeClass("hidden"),b.apricot.utils.isBlank(p)||i.attr("aria-label",p),h.addClass("hidden"),h.removeAttr("aria-label"))},A=function(){var c=window.location.hash,d=window.location.pathname,e="",g=[];if(e=f.options.activePageType?B(d):"#"+c.replace(/^#/,""),b.apricot.utils.isBlank(e)||"#"===e)return!1;for(var h in m)if("single"===m[h].type)f.options.activePageType?m[h].url.indexOf(e)>=0&&m[h].obj.addClass("active"):m[h].url===e&&m[h].obj.addClass("active");else{g=m[h].list;for(var i in g)f.options.activePageType?g[i].url.indexOf(e)>=0&&m[h].obj.addClass("active"):g[i].url===e&&m[h].obj.addClass("active-trail")}a(".active a",f.$el).attr("aria-selected","true").prepend('<span class="sr-only">Active Page: </span>')},B=function(a){return a?a.split("/").pop().split("#").shift().split("?").shift():""},C=function(b){var c=b?b:a('[data-cb-panel-for^="panel"]',f.$el);c.on("click",function(b){b.preventDefault();var c=a(this),d=c.attr("data-cb-panel-for"),e=a(".cb-menu-panel.show",f.$el),g=a('div[data-cb-panel="'+d+'"]',f.$el),h={},i=parseInt(f.$el.position().top,10)+parseInt(f.$el.height(),10)+2;g.css("top",i),d?"panel-main"===d?(e.length>0?e.removeClass("show"):(g.addClass("show"),x()),D(1)):(g.addClass("show"),h.panelName=d,h.title=a("span",c).html(),D(0,h)):(d=c.attr("data-cb-panel-close"),a('div[data-cb-panel="'+d+'"]',f.$el).removeClass("show"),D(2))})},D=function(b,c){var d=a(".local-menu-title",f.$el),e=d.attr("data-cb-header-title"),g=[],h="",i=[],j="";1===b?d.html(e).removeClass("menu-back").removeAttr("data-cb-panel-close").removeAttr("data-cb-panel-prev").removeAttr("data-cb-panel-title").unbind("click"):0===b?(g=d.attr("data-cb-panel-prev")?d.attr("data-cb-panel-prev").split(","):[],i=d.attr("data-cb-panel-title")?d.attr("data-cb-panel-title").split(","):[],d.attr("data-cb-panel-close")&&(a.inArray(d.attr("data-cb-panel-close"),g)<0&&g.push(d.attr("data-cb-panel-close")),a.inArray(d.html(),i)<0&&i.push(d.html())),d.addClass("menu-back").attr("data-cb-panel-title",i.join()).attr("data-cb-panel-prev",g.join()).attr("data-cb-panel-close",c.panelName).html(c.title).unbind("click"),C(d)):(g=d.attr("data-cb-panel-prev")?d.attr("data-cb-panel-prev").split(","):[],h=g[g.length-1],g.splice(a.inArray(h,g),1),i=d.attr("data-cb-panel-title")?d.attr("data-cb-panel-title").split(","):[],j=i[i.length-1],i.splice(a.inArray(j,i),1),h?(d.addClass("menu-back").attr("data-cb-panel-prev",g.join()).attr("data-cb-panel-title",i.join()).attr("data-cb-panel-close",h).html(j).unbind("click"),C(d)):D(1))},E=function(b){b.on("mouseover",function(){a(this).parent("li").addClass("hover")}),b.on("mouseleave",function(){a(this).parent("li").removeClass("hover")}),b.on("focus",function(){a(this).parent("li").addClass("focus")}),b.on("blur",function(){a(this).parent("li").removeClass("focus")})},F=function(){var c={},d={},e={},g={},h="",i="";a("ul > li",f.$el).each(function(){var j=a(this);if(j.hasClass("dropdown")){if(i=a("a",j).attr("href"),b.apricot.utils.isBlank(i)||"#"===i)return!1;g=a("li:first",j),h=f.options.desktopLabelPrefix?f.options.desktopHomeLabel+" "+a("span:first",j).html():a("span:first",j).html()+" "+f.options.desktopHomeLabel,c=a("<li/>"),d=a("<a/>").attr("href",i).attr("aria-selected",!1).appendTo(c),e=a("<span/>").html(h).appendTo(d),c.insertBefore(g)}})},G=function(){var b=K(f.$el),c=parseInt(b,10)-parseInt(f.options.menuLimit,10),d=0,e=30;for(var g in l)e+=l[g].width,c>=e&&(d+=1);e>c?(J(),I(d)):(a(".exp-more",f.$el).addClass("hidden"),a(".exp-less",f.$el).removeClass("hidden").removeClass("exp-less"))},H=function(){var b=a("."+f.options.desktopClass+" ."+f.options.iconClass+":first",f.$el),c={},d={},e={},g={},h=!1;return b.length>0?h=!0:b=a("."+f.options.desktopClass+" ul:first",f.$el),a.isEmptyObject(j)?(j=a("<li/>").addClass("dropdown").addClass("exp-more"),h?b.before(j):b.append(j),c=a("<a/>").addClass("dropdown-toggle").attr("data-toggle","dropdown").attr("href","#").attr("role","button").attr("aria-expanded","false").appendTo(j),d=a("<span/>").text("More").appendTo(c),d=a("<span/>").addClass("sr-only").text("Press Enter for Dropdown").appendTo(c),e=a("<i/>").addClass("glyphicon-cb").addClass("cb-icon-icn_arrow-down").attr("aria-hidden","true").appendTo(c),e=a("<i/>").addClass("glyphicon-cb").addClass("cb-icon-icn_arrow-up").addClass("hidden").attr("aria-hidden","true").appendTo(c),g=a("<ul/>").addClass("dropdown-menu").attr("role","menu").appendTo(j)):j.removeClass("hidden"),E(a("a",j)),j},I=function(b){for(var c=[],d=H(),e={},f=a("ul",d),g={},h={},i={},j=b;j<l.length;j++)e=l[j].obj,e.hasClass("cb-has-icon")||(e.hasClass("dropdown")?(g={},g=a("<li/>"),h=a("<a/>").attr("href",a("a:first",e).attr("href")).attr("aria-selected",!1).appendTo(g),i=a("<span/>").html(a("span:first",e).first().html()).appendTo(h),c.push(g)):c.push(e.clone()),e.addClass("hidden").addClass("exp-less"));f.empty();for(var k in c)e=c[k].removeClass("hidden"),f.append(e);d.cbDropdownExtension()},J=function(){a.isEmptyObject(j)||(j.remove(),j={}),a(".exp-less",f.$el).removeClass("hidden").removeClass("exp-less")},K=function(a){var b=0,c=a.hasClass("hidden")?!0:!1;return c?(a.removeClass("hidden"),b=a.outerWidth(),a.addClass("hidden")):b=a.outerWidth(),b};f.init()},a.fn.cbLocalNavigation=function(c){return this.each(function(){a(this).data("cbLocalNavigation")||a(this).data("cbLocalNavigation",new b.apricot.localNav(this,c))})}}(jQuery,cb),/*!
 *  Bootstrap v3.3.0
 *  Copyright 2011-2014 Twitter, Inc.
 *  Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b,g=f&&f.selector;(e||"destroy"!=b)&&(g?(e||d.data("bs.popover",e={}),e[g]||(e[g]=new c(this,f))):e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.0",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),/*!
 *  Apricot v0.7.0
 *  By:             The College Board
 *  App:            homeorg
 *  Build Time:     2015-05-19 [2:15:41 PM] EDT
 *  Build Number:   26
 *  SVN Revision:   33056
 *  Jenkins Job:    apricot-clients
 *  This version of Apricot includes Bootstrap v3.3.0
 */
+function(a){"use strict";if(!a.fn.popover)throw new Error("popover-extension requires popover.js");a(window).on("resize",function(){a('[data-toggle="popover"]').each(function(){var b=a(this);b.popover("hide")})}),a(document).on("click",function(b){a('[data-toggle="popover"]').each(function(){var c=a(this);c.is(b.target)||0!==c.has(b.target).length||0!==a(".popover").has(b.target).length||c.popover("hide")})}),a(window).on("load",function(){a(".cb-popover-button-list, .cb-popover-link-list").each(function(){a(this).on("click",function(a){a.preventDefault()})})})}(jQuery),+function(a,b){"use strict";if(!a.fn.popover)throw new Error("cbPopOverListItems requires popover.js");b.apricot.popOverListItems=function(c,d){var e={onScreen:!0,focus:!1},f=this;f.$el=a(c),f.init=function(){f.options=a.extend({},e,d),f.$el.click(function(c){if(c.preventDefault(),f.$el.attr("aria-describedby")){var d=f.$el.attr("aria-describedby"),e=a("#"+d).find(".popover-content"),h=f.$el.data("bs.popover").options,i="function"==typeof h.placement?h.placement():h.placement,j=e.height()+11,k=0;if(e.find("li").each(function(){var c=a(this);c.attr("data-cb-popover-parent",d),c.keydown(function(c){var d=a(this);b.apricot.utils.isKey(c,"DOWN")?(c.preventDefault(),d.next().find("a").focus()):b.apricot.utils.isKey(c,"UP")?(c.preventDefault(),d.prev().find("a").focus()):b.apricot.utils.isKey(c,"TAB")&&c.shiftKey?(c.preventDefault(),d.prev().find("a").focus()):b.apricot.utils.isKey(c,"ESC")&&(c.preventDefault(),f.$el.popover("hide"),f.$el.focus())})}),e.find("li:first").keydown(function(a){b.apricot.utils.isKey(a,"TAB")&&a.shiftKey&&(a.preventDefault(),f.$el.popover("hide"),f.$el.focus())}),e.find("li:last").keydown(function(a){b.apricot.utils.isKey(a,"TAB")&&!a.shiftKey&&(a.preventDefault(),f.$el.popover("hide"),f.$el.focus())}),f.options.focus&&e.find("a:first").focus(),f.options.onScreen&&(k=g(i,j),0!==k)){var l=b.apricot.utils.browser();l.msie&&parseInt(l.version,10)<9?window.scrollTo(1,k):a("body, html").animate({scrollTop:k},1e3)}}}),f.$el.keydown(function(c){if(b.apricot.utils.isKey(c,"TAB")){var d=f.$el.attr("aria-describedby"),e={};a("#"+d).is(":visible")&&(c.preventDefault(),e=a("#"+d).find(".popover-content"),e.find("a:first").focus())}})};var g=function(b,c){var d={},e={},g=0,h=0;return d.top=a(window).scrollTop(),d.bottom=d.top+a(window).height(),e.top=f.$el.offset().top,e.bottom=e.top+f.$el.outerHeight(),"top"===b.toLowerCase()?(g=e.top-c,g<d.top&&(h=e.top-(e.top-g))):"bottom"===b.toLowerCase()&&(g=e.bottom+c,g>d.bottom&&(h=d.top+(g-d.bottom))),h};f.init()},a.fn.cbPopOverListItems=function(c){return this.each(function(){a(this).data("cbPopOverListItems")||a(this).data("cbPopOverListItems",new b.apricot.popOverListItems(this,c))})}}(jQuery,cb),+function(a,b){"use strict";b.apricot.dropdownExtension=function(c){var d=this,e=b.apricot.utils.keys,f={},g={},h=a(document),i=!1;d.$el=a(c),f=a(".dropdown",d.$el),g=a(".dropdown-toggle",f),d.init=function(){h.on("click","*",a.proxy(function(b){j(a(b.target))},this)),h.on("keydown",a.proxy(function(b){var c=a(b.target);if(b.which===e.ESC)this.closeDropdownMenu(c,!0);else if(b.which===e.TAB){var d=a("a, input:enabled, button:enabled").filter(":visible"),f=d.index(b.target);i=b.shiftKey,i&&0!==f?(c=a(d.eq(f-1)),j(c)):i||f===d.length-1?j(c,!0):(c=a(d.eq(f+1)),j(c))}else(b.which===e.UP||b.which===e.DOWN)&&k(b)},this)),f.on("hide.bs.dropdown show.bs.dropdown",function(b){a(this).find(".glyphicon-cb.hidden").removeClass("hidden").siblings("i").addClass("hidden")}),h.on("focus",g,function(b){var c=a(this),d=c.parent();return d.hasClass("open")&&!i?(d.find("> ul li:first a").focus(),!1):void 0})};var j=function(b,c){var e=a(".dropdown.open",d.$el);e.length>0&&(c||(e=e.filter(function(){var c=a(this);return!(b.is(c)||b.closest(c).length>0||c.find(b).length>0)})),e.length>0&&e.find(".dropdown-toggle").dropdown("toggle"))},k=function(b){var c=a(".dropdown.open",d.$el),f=c.find(":focus");0!==c.length&&0!==f.length&&(c.find("ul li a:last").is(":focus")&&b.which===e.DOWN||c.find("ul li a:first").is(":focus")&&b.which===e.UP)&&b.preventDefault()};d.init()},a.fn.cbDropdownExtension=function(c){return this.each(function(){a(this).data("cbDropdownExtension")||a(this).data("cbDropdownExtension",new b.apricot.dropdownExtension(this))})}}(jQuery,cb),+function(a,b){"use strict";b.apricot.responsiveImage=function(c,d){var e={cbViewport:!0,cbBreakpoint:!0,cbDefaultImage:"",cbXsImage:"",cbSmImage:"",cbMdImage:"",cbLgImage:"",cbPath:""},f=[],g=this;g.$el=a(c),g.init=function(){g.options=a.extend({},e,g.$el.data(),d),i(),g.options.cbViewport&&l(b.apricot.utils.viewport().prefix),g.options.cbBreakpoint&&h()};var h=function(){b.apricot.utils.breakpoints(),a(document).on("breakpoint_change",function(a,b){l(b.prefix)})},i=function(){b.apricot.utils.isBlank(g.options.cbXsImage)||f.push(j("xs")),b.apricot.utils.isBlank(g.options.cbSmImage)||f.push(j("sm")),b.apricot.utils.isBlank(g.options.cbMdImage)||f.push(j("md")),b.apricot.utils.isBlank(g.options.cbLgImage)||f.push(j("lg"))},j=function(a){var b={},c="";return c=g.options.cbPath+g.options[k(a)],b={prefix:a,url:c}},k=function(a){return"cb"+a.substr(0,1).toUpperCase()+a.substr(1)+"Image"},l=function(a){var c=m(a);b.apricot.utils.isBlank(c)?g.$el.css("border","1px solid green"):g.$el.is("img")?g.$el.attr("src",c):g.$el.css("background-image","url("+c+")")},m=function(c){var d={},e="";b.apricot.utils.isBlank(g.options.cbDefaultImage)?g.$el.is("img")?b.apricot.utils.isBlank(g.$el.attr("src"))||(e=g.$el.attr("src")):e=g.$el.css("background-image").replace(/^url\(['"]?/,"").replace(/['"]?\)$/,""):e=g.options.cbPath+g.options.cbDefaultImage;for(var h in f)f[h].prefix===c&&(d=f[h]);return a.isEmptyObject(d)||(e=d.url),e};g.init()},a.fn.cbResponsiveImage=function(c){return this.each(function(){a(this).data("cbResponsiveImage")||a(this).data("cbResponsiveImage",new b.apricot.responsiveImage(this,c))})},a(window).on("load",function(){b.apricot.setup.isCb("responsiveImage")?a('[data-cb-element="responsive-image"]').each(function(){a(this).cbResponsiveImage()}):b.apricot.setup.hasSelector("responsiveImage")&&a.each(b.apricot.setup.selector("responsiveImage"),function(b,c){a(c).cbResponsiveImage()})})}(jQuery,cb),/*!
 *  Bootstrap v3.3.0
 *  Copyright 2011-2014 Twitter, Inc.
 *  Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.0",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.0",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=i?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a("body").height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery),/*!
 *  Apricot v0.7.0
 *  By:             The College Board
 *  App:            homeorg
 *  Build Time:     2015-05-19 [2:15:41 PM] EDT
 *  Build Number:   26
 *  SVN Revision:   33056
 *  Jenkins Job:    apricot-clients
 *  This version of Apricot includes Bootstrap v3.3.0
 */
+function(a,b){"use strict";b.apricot.taggedSidebar=function(b,c){var d={mainNav:"sidebar-item",subNav:"sub-sidebar-item",backTop:1,navCount:6,contained:0,container:"body"},e=this,f=[],g=[];e.$el=a(b),e.el=b,e.init=function(){e.options=a.extend({},d,c),f=a(e.options.container).find('[data-cb-tags="'+e.options.mainNav+'"]'),e.$el.addClass("hidden-print").addClass("hidden-xs").addClass("hidden-sm").attr("role","complementary"),h(),g.length>0&&e.$el.append(j())};var h=function(){f.each(function(){var b=a(this),c={};c.name=b.html(),c.tag=b.attr("id"),e.options.contained?c.list=i(b.parent().find('[data-cb-tags="'+e.options.subNav+'"]')):c.list=i(b.nextUntil('[data-cb-tags="'+e.options.mainNav+'"]','[data-cb-tags="'+e.options.subNav+'"]')),g.push(c)})},i=function(b){var c={},d=[],e=[];return b.each(function(){var b=a(this);e=[],"undefined"!=typeof b.attr("data-cb-parent")&&"add"!==b.attr("data-cb-level-check")?(b.attr("data-cb-level-check","add"),a('[data-cb-parent="'+b.attr("data-cb-parent")+'"]').each(function(){var b=a(this);b.attr("data-cb-level-check","add"),c={},c.name=b.html().replace(/<\/?[^>]+(>|$)/g,"").replace(/^\s+|\s+$/g,""),c.tag=b.attr("id"),c.subList=[],e.push(c)}),d[d.length-1].subList=e):"undefined"==typeof b.attr("data-cb-parent")&&(c={},c.name=b.html().replace(/<\/?[^>]+(>|$)/g,"").replace(/^\s+|\s+$/g,""),c.tag=b.attr("id"),c.subList=[],d.push(c))}),d},j=function(){var b='<ul class="nav cb-tagged-sidenav">';return a.each(g,function(a,c){b+="<li>",b+='<a href="#'+c.tag+'">'+c.name+"</a>",c.list.length>0&&(b+=k(c.list,0)),b+="</li>"}),b+="</ul>",e.options.backTop&&g.length>=e.options.navCount&&(b+='<a class="back-to-top" href="#top">Back to top</a>'),b},k=function(b,c){var d='<ul class="nav '+c+' ">';return a.each(b,function(a,b){d+="<li>",d+='<a href="#'+b.tag+'">'+b.name+"</a>",b.subList.length>0&&(d+=k(b.subList,1)),d+="</li>"}),d+="</ul>"};e.init()},a.fn.cbTaggedSidebar=function(c){return this.each(function(){a(this).data("cbTaggedSidebar")||a(this).data("cbTaggedSidebar",new b.apricot.taggedSidebar(this,c))})}}(jQuery,cb),/*!
 *  Bootstrap v3.3.0
 *  Copyright 2011-2014 Twitter, Inc.
 *  Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.0",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus","focus"==b.type)})}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.0",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$element.find(".modal-dialog").one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.checkScrollbar=function(){this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){if(document.body.clientWidth>=window.innerWidth)return 0;var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.0",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.0",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c="prev"==a?-1:1,d=this.getItemIndex(b),e=(d+c)%this.$items.length;return this.$items.eq(e)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i="next"==b?"first":"last",j=this;if(!f.length){if(!this.options.wrap)return;f=this.$element.find(".item")[i]()}if(f.hasClass("active"))return this.sliding=!1;var k=f[0],l=a.Event("slide.bs.carousel",{relatedTarget:k,direction:h});if(this.$element.trigger(l),!l.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var m=a(this.$indicators.children()[this.getItemIndex(f)]);m&&m.addClass("active")}var n=a.Event("slid.bs.carousel",{relatedTarget:k,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),j.sliding=!1,setTimeout(function(){j.$element.trigger(n)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(n)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a(this.options.trigger).filter('[href="#'+b.id+'"], [data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.0",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.find("> .panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":a.extend({},e.data(),{trigger:this});c.call(f,h)})}(jQuery);;
/*  CB Apricot Functionality for Webforms
 *
 *  @Author: Mike Sharkey
 *  @Date  : 05/20/2015
 */

(function ($) {
    'use strict';

    Drupal.behaviors.wapricot = {
      attach: function() {

        // Apricot freaks out in this environment (HomeOrg) so let's customize the load.
        // Change default Apricot behavior by making these fields create manually after the fact.
        cb.apricot.setup.behavior({
          // Placeholder is broke in IE9, so just kill it.
            placeholder: {
              mode: 'manual',
              selector: []
            },
            text: {
              mode: 'manual',
              selector: []
            },
            select: {
                mode: 'manual',
                selector: []
            }
        });

        $(window).ready(function() {
          if ($('.wapricot').length > 0) {
            // Only run all of this if we have an actual Wapricot form.

            // Declare variables.
            var $form = $('.wapricot'),
                $formAction = $form.find('.form-actions'),
                $progress = $form.find('.webform-progressbar'),
                $submitButton = $form.find('.webform-submit.form-submit'),
                $integerNumber = $form.find('.form-number'),
                $nextButton = $form.find('.webform-next'),
                $prevButton = $form.find('.webform-previous'),
                $previewPageAlert = $('.messages.warning:contains("Please review your submission. Your submission is not complete until you press the "Submit" button!")'),
                $currentProgress,
                $lastProgress,
                $nextProgress,
                formName = $('h1#page-title').text(),
                header2Txt = '<h2 class="sr-only">Start ' + formName + ' Form</h2>',
                requiredTxt = '<div id="wapricotRequired" class="form-item"><em><span title="This field is required." class="form-required">*</span> = Required</em></div>',
                currentStep = 0,
                progressSteps = 0,
                browser,
                doc,
                stepText,
                prevText,
                nextText;

            // Add Apricot Classes.
            $('.wapricot input[type="radio"]').parent().addClass('radio');
            $('.wapricot input[type="checkbox"]').parent().addClass('checkbox');
            $('.wapricot input[type="text"], .wapricot input[type=email]').addClass('form-control');
            $('.wapricot textarea').addClass('form-control');

            // Truncating hidden select boxes results in unnecessary truncating when they are shown.
            $('.wapricot select').cbCustomSelect({
              truncate: false
            });

            // Hidden select boxes that are shown were still styled with a "disabled" class. Fix that.
            $('.wapricot select').removeAttr('disabled').trigger('enable');

            // Turn on apricot styles for Input text fields.
            $('.wapricot input[type=text]').cbCustomElement({
              type: 'text'
            });

            // IE 9/10 fix for padding hiding text on the edges.
            browser = cb.apricot.utils.browser();

            if (!!browser.msie && parseInt(browser.version, 10) <= 10 ) {
              // Remove padding from input elements.
              $('.wapricot input[type=text], .wapricot input[type=email]').each(function(){
                $(this).css({
                  'padding': 'inherit'
                });
              });
            }

            // Put placeholder text in the "Other..." fields.
            $('.wapricot .select-or-other-other').attr('placeholder', 'Please specify');

            /* ================================
                        UPDATE TITLE
            /* ================================ */

            // Make sure we have a progress bar at all.
            if(typeof $progress !== 'undefined' && $progress.length > 0){
              // Count how many progress steps are there.
              progressSteps = $form.find('.webform-progressbar .webform-progressbar-page').length;

              // Get current progress step.
              $currentProgress = $form.find('.webform-progressbar-page.current');

              // Get the previous step.
              $lastProgress = $currentProgress.prev();

              // Get the next step.
              $nextProgress = $currentProgress.next();

              // Get the index of the current item.
              currentStep = $form.find('.webform-progressbar-page').index($currentProgress) + 1;

              // Current step text.
              stepText = $form.find('.webform-progressbar-page.current span').next().text().replace('(Active)', '').trim();

              // Previous step text.
              prevText = $lastProgress.find('span').next().text().replace('(Completed)', '').trim();

              // Next step text.
              nextText = $nextProgress.find('span').next().text().replace('(Pending)', '').trim();

              // Add hidden label to the next and previous buttons if possible.
              $prevButton.attr('id', 'wapricotPreviousBtn').after('<label for="wapricotPreviousBtn" class="sr-only">Go back to previous page: ' + prevText + '</label>');

              $nextButton.attr('id', 'wapricotNextBtn').after('<label for="wapricotNextBtn" class="sr-only">Proceed to next page: ' + nextText + '</label>');

              // Add Aria attributes.
              $progress.attr({
                'role': 'progressbar',
                'aria-label': formName + ' Form Progress Meter',
                'tabindex': 0
              });
            }

            if(typeof currentProgress !== 'undefined' && currentProgress.length === 1) {
              document.title = formName + ' | ' + 'Step ' + currentStep + ' of ' + progressSteps + ' | ' + document.title;

              // Add valuetext aria attribute.
              $progress.attr({
                'aria-valuetext': 'Step ' + currentStep + ' of ' + progressSteps + ' – ' + stepText
              });
            }

            // Add a print button to the final page.
            if(typeof $progress !== 'undefined' && $progress.length > 0 && $submitButton.length > 0){
              // We have both the submit button and a progress bar, show the print button.
              $formAction.prepend('<input type="button" onclick="window.print();" class="button btn-primary form-print" value="Print Application">');
            }

            // Add a function that warns a user that un-submitted data will be lost on page back.
            if(typeof $progress !== 'undefined' && $progress.length > 0){
              $(window).bind('beforeunload', function() {
                return 'Unsubmitted form information may be lost. If you need to go back to a previous step, please use the Previous button at the bottom of the form.';
              });
            }

            // Remove the warning about leaving the page if they are actually submitting the form.
            $('.wapricot input[type="submit"], .wapricot .mollom-refresh-captcha, .wapricot .mollom-refresh-image').on('keypress click', function (e) {
              if($(window).keyTrigger(e)){
                if($(this).parents('.wapricot').length > 0 &&
                   $progress.length > 0 &&
                   $(this).parents('.wapricot .error').length === 0 ) {
                      $(window).unbind('beforeunload');
                }
              }
            });

            /* ================================
                        ACCESSIBILITY
            /* ================================ */
            // Add steps for screen readers.
            $('.wapricot .webform-progressbar-page').each(function(){
              doc = $(this).find('.webform-progressbar-page-label');

              if($(this).hasClass('completed')) {
                doc.append('<span class="sr-only"> (Completed)</span>');
              }
              else if($(this).hasClass('current')) {
                doc.append('<span class="sr-only"> (Active)</span>');
              }
              else{
                doc.append('<span class="sr-only"> (Pending)</span>');
              }
            });

            // We have an issue with headers showing up even though the parents are hidden. Hide the headers.
            if($('#content-wrapper').hasClass('page-1-col')) {
              // Hide all sidebars from Screen Readers.
              $('.hidden').attr('aria-hidden', true).css({
                'display': 'none'
              });

              // Hide all header elements inside of a hidden sidebar.
              $('.hidden').find('h1, h2, h3, h4, h5, h6').attr('aria-hidden', true).css({
                'display': 'none'
              });
            }

            // Add * = required to every form on the page if is needed.
            if($('#wapricotRequired').length === 0 && !$('form.wapricot').hasClass('preview')) {
              if($progress.length > 0) {
                $progress.after(requiredTxt);
              }
              else{
                $('form.wapricot').prepend(requiredTxt);
              }
            }

            // Check and make sure we have an H2 tag, if not, add one.
            if($('h2').length === 0) {
              if($progress.length > 0) {
                $progress.after(header2Txt);
              }
              else{
                $('form.wapricot').prepend(header2Txt);
              }
            }

            // Update the Preview Page Alert so it has "Important" in it.
            $previewPageAlert.prepend('<h2 class="element-invisible">Important message</h2>');

            /* ================================================================================
                              PLACE SPECIFIC JS BELOW THIS LINE, RELEVANT TO YOUR FORM ONLY
            /* ================================================================================ */

            /* ======================================================
                  START OF SPECIFIC CODE FOR /membership/apply
            /* ====================================================== */

            var $yearFounded = $('#edit-submitted-06-00-yearfounded');
            var dYear = new Date();
            var thisYear = dYear.getFullYear();
            var id;
            // All the fields that can be used when copying address informaton.
            var fields = [
              'prefix',
              'fname',
              'lname',
              'title',
              'country',
              'address1',
              'address2',
              'city',
              'state_us',
              'state_intl',
              'zip',
              'phone',
              'phone_ext',
              'email',
            ];

            // Form Arrays full of all the fields we are going to mess with.
            var org = [];
            var app = [];
            var mpp = [];
            var ceo = [];

            // Holders for a for-in loop.
            var ditto_i = 0;
            var ditto_key;

            /**
             * Copy form data if needed.
             */
            var ditto = function (checkbox, source, destination) {
              var checked = checkbox.prop('checked');
              var i = 0;
              var key = 0;
              var dest;

              for (i in fields) {
                // Get the field name.
                key = fields[i];

                if (typeof source[key] !== 'undefined' && typeof destination[key] !== 'undefined') {
                  if (checked === true) {
                    // Copy the data.
                    destination[key].val(source[key].val()).trigger('change', ['dontDitto']);
                  }
                  else {
                    // Erase the data.
                    destination[key].val('').trigger('change', ['dontDitto']);
                  }
                }
              }
            };

            // Organization Form Fields.
            org['country'] = $('#edit-submitted-organization-contact-02-01-country-select');
            org['address1'] = $('#edit-submitted-organization-contact-02-02-address-1');
            org['address2'] = $('#edit-submitted-organization-contact-02-02-address-2');
            org['city'] = $('#edit-submitted-organization-contact-02-03-city');
            org['state_us'] = $('#edit-submitted-organization-contact-02-04-state-us');
            org['state_intl'] = $('#edit-submitted-organization-contact-02-05-state-intl');
            org['zip'] = $('#edit-submitted-organization-contact-02-06-zip');

            // Application Submitter (your name).
            app['copy'] = $('#edit-submitted-application-contact-copy-address-app-1');
            app['prefix'] = $('#edit-submitted-application-contact-03-00-prefix-select');
            app['fname'] = $('#edit-submitted-application-contact-03-01-fname');
            app['lname'] = $('#edit-submitted-application-contact-03-02-lname');
            app['title'] = $('#edit-submitted-application-contact-03-03-title');
            app['country'] = $('#edit-submitted-application-contact-03-04-country-select');
            app['address1'] = $('#edit-submitted-application-contact-03-05-address-1');
            app['address2'] = $('#edit-submitted-application-contact-03-06-address-2');
            app['city'] = $('#edit-submitted-application-contact-03-07-city');
            app['state_us'] = $('#edit-submitted-application-contact-03-08-state-us');
            app['state_intl'] = $('#edit-submitted-application-contact-03-08-state-intl');
            app['zip'] = $('#edit-submitted-application-contact-03-09-zip');
            app['phone'] = $('#edit-submitted-application-contact-03-10-phone');
            app['phone_ext'] = $('#edit-submitted-application-contact-03-11-phone-ext');
            app['email'] = $('#edit-submitted-application-contact-03-12-email');

            // Member Point Person.
            mpp['copy'] = $('#edit-submitted-point-person-contact-copy-address-app-sub-1');
            mpp['prefix'] = $('#edit-submitted-point-person-contact-03a-00-prefix-select');
            mpp['fname'] = $('#edit-submitted-point-person-contact-03a-01-fname');
            mpp['lname'] = $('#edit-submitted-point-person-contact-03a-02-lname');
            mpp['title'] = $('#edit-submitted-point-person-contact-03a-03-title');
            mpp['country'] = $('#edit-submitted-point-person-contact-03a-04-country-select');
            mpp['address1'] = $('#edit-submitted-point-person-contact-03a-05-address-1');
            mpp['address2'] = $('#edit-submitted-point-person-contact-03a-06-address-2');
            mpp['city'] = $('#edit-submitted-point-person-contact-03a-07-city');
            mpp['state_us'] = $('#edit-submitted-point-person-contact-03a-08-state-us');
            mpp['state_intl'] = $('#edit-submitted-point-person-contact-03a-08-state-intl');
            mpp['zip'] = $('#edit-submitted-point-person-contact-03a-09-zip');
            mpp['phone'] = $('#edit-submitted-point-person-contact-03a-10-phone');
            mpp['phone_ext'] = $('#edit-submitted-point-person-contact-03a-11-phone-ext');
            mpp['email'] = $('#edit-submitted-point-person-contact-03a-12-email');

            // Chief Executive Officer
            ceo['copy_app'] = $('#edit-submitted-ceo-contact-copy-address-ceo-as-1');
            ceo['copy_mpp'] = $('#edit-submitted-ceo-contact-copy-address-ceo-pp-1');
            ceo['prefix'] = $('#edit-submitted-ceo-contact-04-00-prefix-select');
            ceo['fname'] = $('#edit-submitted-ceo-contact-04-01-fname');
            ceo['lname'] = $('#edit-submitted-ceo-contact-04-02-lname');
            ceo['title'] = $('#edit-submitted-ceo-contact-04-03-title');
            ceo['country'] = $('#edit-submitted-ceo-contact-04-04-country-select');
            ceo['address1'] = $('#edit-submitted-ceo-contact-04-05-address-1');
            ceo['address2'] = $('#edit-submitted-ceo-contact-04-06-address-2');
            ceo['city'] = $('#edit-submitted-ceo-contact-04-07-city');
            ceo['state_us'] = $('#edit-submitted-ceo-contact-04-08-state-us');
            ceo['state_intl'] = $('#edit-submitted-ceo-contact-04-09-state-intl');
            ceo['zip'] = $('#edit-submitted-ceo-contact-04-10-zip');
            ceo['phone'] = $('#edit-submitted-ceo-contact-04-11-phone');
            ceo['phone_ext'] = $('#edit-submitted-ceo-contact-04-12-phone-ext');
            ceo['email'] = $('#edit-submitted-ceo-contact-04-13-email');

            // Toggle checkboxes for CEO section.
            $(ceo['copy_app']).on('change', function() {
              $(ceo['copy_mpp']).prop('checked', false);
            });

            $(ceo['copy_mpp']).on('change', function() {
              $(ceo['copy_app']).prop('checked', false);
            });

            // Add event handlers to all fields to copy down if needed.
            for (ditto_i in fields) {
              // Get the field name.
              ditto_key = fields[ditto_i];

              $(org[ditto_key]).add(app[ditto_key]).add(mpp[ditto_key]).add(ceo[ditto_key]).add(ceo[ditto_key]).on('keyup change', function(e, dontDitto) {
                if (typeof dontDitto !== 'undefined' && dontDitto === 'dontDitto') {
                  // Don't rerun ditto for the change event that triggered this.
                }
                else {
                  if (app['copy'].prop('checked') === true) {
                    ditto($(app['copy']), org, app);
                  }
                  if (mpp['copy'].prop('checked') === true) {
                    ditto($(mpp['copy']), app, mpp);
                  }
                  if (ceo['copy_app'].prop('checked') === true) {
                    ditto($(ceo['copy_app']), app, ceo);
                  }
                  if (ceo['copy_mpp'].prop('checked') === true) {
                    ditto($(ceo['copy_mpp']), mpp, ceo);
                  }
                }
              });
            }

            /**
             * Event handlers for clicking a checkmarks.
             */
            $(app['copy']).add($(mpp['copy'])).add($(ceo['copy_app'])).add($(ceo['copy_mpp'])).on('change', function() {
              // Run all dittos to trickle down if needed.
              if (app['copy'].prop('checked') === true) {
                ditto($(app['copy']), org, app);
              }
              if (mpp['copy'].prop('checked') === true) {
                ditto($(mpp['copy']), app, mpp);
              }
              if (ceo['copy_app'].prop('checked') === true) {
                ditto($(ceo['copy_app']), app, ceo);
              }
              if (ceo['copy_mpp'].prop('checked') === true) {
                ditto($(ceo['copy_mpp']), mpp, ceo);
              }
            });

            // Run once on load to ensure data working if page has stuff clicked already.
            if ($(app['copy']).length > 0) {
              if (app['copy'].prop('checked') === true) {
                ditto($(app['copy']), org, app);
              }
              if (mpp['copy'].prop('checked') === true) {
                ditto($(mpp['copy']), app, mpp);
              }
              if (ceo['copy_app'].prop('checked') === true) {
                ditto($(ceo['copy_app']), app, ceo);
              }
              if (ceo['copy_mpp'].prop('checked') === true) {
                ditto($(ceo['copy_mpp']), mpp, ceo);
              }
            }

            /*
             * Custom function that totals all inputs in a DIV given an ID and puts the total in the last input field.
             *
             * Requirements: The "total" input field should be the last element in the collection,
             *               and it should be readonly so the user can't change it manually.
             *
             * Arguments: receives the parent container ID.
             *
             * e.g. <div id="myCollection">
             *       <input type="text">
             *       <input type="text">
             *       <input type="text" readonly="readonly">
             *      </div>
             */
            var totalCollection = function(parentId){
              var $collection = $('#' + parentId);
              var $inputs = $collection.find('input');
              var total = 0;

              $inputs.on('change keyup', function() {
                // Get the sums of every input except the Total field which should be read-only.
                total = 0;

                $inputs.each(function(){
                  if (!$(this).is('[readonly]')) {
                    total += parseInt($(this).val().trim() || 0);
                  }
                  else{
                    // Don't add this field, it's the total.
                    if($.isNumeric(total || 0)){
                      $(this).val(total);
                    }
                    else{
                      $(this).val('Not a valid number.');
                    }
                  }
                });
              });
            };

            // Year founded must not be later than current year.
            $yearFounded.on('change keydown', function(){
              dYear = new Date();
              thisYear = dYear.getFullYear();

              if ($(this).val().trim() > thisYear){
                $(this).val(thisYear);
              }
            });

            // Make sure integers don't go over their PHP server limit.
            $integerNumber.on('change keydown', function(){
              if ($(this).val().trim() > 9999999999){
                $(this).val(9999999999);
              }
            });

            /* ====================================
                Percentages - Race & Gender totals
            /* ==================================== */

            totalCollection('webform-component-gender-breakdown-for-all-students');
            totalCollection('webform-component-demographic-breakdown-of-students');

            // END RACE PERCENTAGES.

            // jQuery Validate : Regular Expression for e-Signature.
            if($('#edit-submitted-12-02-signame').length > 0) {
              $('#webform-client-form-9801').validate();

              $.validator.addMethod(
                      'regex',
                      function(value, element, regexp) {
                          var re = new RegExp(regexp);
                          return this.optional(element) || re.test(value);
                      },
                      'Please check your input.'
              );

              // First character must be a forward slash
              $( '#edit-submitted-12-02-signame' ).rules( 'add', {
                regex: '^[/].*[/]$',
                messages: {
                  regex: 'E-Signature must begin and end with a forward slash.'
                }
              });

            }

            // Mollom should be required on the client-side.
            if($('#edit-mollom-captcha').length > 0) {
              $( '#edit-mollom-captcha' ).rules( 'add', {
                required: true
              });
            }

            // Phone numbers must be numeric.
            if($('#edit-submitted-organization-contact-02-07-phone').length > 0) {
              $( '#edit-submitted-organization-contact-02-07-phone' ).rules( 'add', {
                digits: true
              });
            }
            // Phone numbers must be numeric.
            if($('#edit-submitted-application-contact-03-10-phone').length > 0) {
              $( '#edit-submitted-application-contact-03-10-phone' ).rules( 'add', {
                digits: true
              });
            }
            // Phone numbers must be numeric.
            if($('#edit-submitted-ceo-contact-04-11-phone').length > 0) {
              $( '#edit-submitted-ceo-contact-04-11-phone' ).rules( 'add', {
                digits: true
              });
            }
            // Phone numbers must be numeric.
            if($('#edit-submitted-referral-10-03-refphone').length > 0) {
              $( '#edit-submitted-referral-10-03-refphone' ).rules( 'add', {
                digits: true
              });
            }
            /* ======================================================
                    END OF SPECIFIC CODE FOR - /membership/apply
            /* ====================================================== */
          }
        });
        // END WINDOW.READY().
      }
      // END ATTACH.
    };
    // END DRUPAL.BEHAVIORS.WAPRICOT.
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
