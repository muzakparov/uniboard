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
