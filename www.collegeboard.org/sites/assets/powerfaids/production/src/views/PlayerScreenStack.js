var tracer = (typeof tracer !== "undefined") ? tracer : {};
tracer.player = (typeof tracer.player !== "undefined") ? tracer.player : {};
tracer.player.PlayerScreenStack = (typeof tracer.player.PlayerScreenStack !== "undefined") ? tracer.player.PlayerScreenStack : (function() { 

        var PlayerScreenStack = function(elem){
			console.log ("PlayerScreenStack");
			
			this.$el = elem;
            this.connections = [];
			this.screenItems = [];
			this.sectionIndex = -1;
            this.currentIndex = -1;
			this.currentSlide = null;
			this.playing = false;
			this.soundComplete = false;
			this.durationTimer = null;
			this.durationComplete = false;
			this.muted = false;
			this.hasShownMenu = false;
			this.autoplay = false;
			
		};
        
		PlayerScreenStack.prototype.findSlideById = function(id) {
			console.log("findSlideById : " + id);
			var out = {};
			for(var i = 0; i < this.playerModel.contents.length; i++){
				for(var j = 0; j < this.playerModel.contents[i].contents.length; j++){
					if(id == this.playerModel.contents[i].contents[j].id)
						out = {"section": i, "slide": j};
				}
			}
			return out;
		};
		
		PlayerScreenStack.prototype.destroy = function(){
			console.log ("PlayerScreenStack.destroy");
			this.$el.empty();
            this.connections = [];
			this.screenItems = [];
            this.currentIndex = -1
			this.removeAllScreens();
		};
		
		PlayerScreenStack.prototype.onLoadComplete = function(){
			
		};
		
		PlayerScreenStack.prototype.createActivityScreens = function(){
				//console.log ("PlayerScreenStack - createActivityScreens");
                
				if(this.playerModel){
                    this.removeAllScreens();
					for(var i = 0; i < this.playerModel.contents.length; i++){
						for(var j = 0; j < this.playerModel.contents[i].contents.length; j++){
							this.createActivityScreen(this.playerModel.contents[i].contents[j]);
						}
					}
                }
				
				this.sectionIndex = 0;
				this.currentIndex = 0;
				this.onLoadComplete();
				
		};
		
		PlayerScreenStack.prototype.createActivityScreen = function (item) {
                //console.log ("PlayerScreenStack - createActivityScreen : " + item.type);

				var self = this;
				
				var screen;
				
				var d = new Date();
				var n = d.getTime();
				
				item.screenId = n + "" + Math.ceil((Math.random() * 1000)) ;
				
				var slideContent = $("#" + item.id);
				slideContent.remove();
				
				var container = $("<div id='" + item.screenId + "' class='slide'></div>");
				container.append(slideContent);
				this.$el.append(container);
				container.hide();

				// for accessibility 
				container.attr("aria-hidden", "true");
				container.attr("tabindex", "-1");
	
				this.screenItems.push(container);
				
				
				// create slide sudio 
				if(item.audio) {
                	var tmp = soundManager.createSound({"id": item.id, "url": "assets/audio/" + item.audio.url, "autoLoad": item.audio.autoLoad});
				}
            };
			
			PlayerScreenStack.prototype.removeAllScreens = function () {
                this.screenItems = [];
				this.sectionIndex = -1;
                this.currentIndex = -1;
            };
		
            PlayerScreenStack.prototype.hasNext = function () {
				console.log ("PlayerScreenStack:hasNext : " + this.currentIndex + " : " + this.getScreenCount());
				return (this.currentIndex < (this.getScreenCount() - 1));
            };

            PlayerScreenStack.prototype.hasPrevious = function () {
				console.log ("PlayerScreenStack:hasPrevious : " + this.currentIndex);
                return this.currentIndex > 0;
            };

            PlayerScreenStack.prototype.gotoBeginning = function () {
                this.goto (0);
            };

            PlayerScreenStack.prototype.gotoEnd = function () {
                this.goto (this.getScreenCount() - 1);
            };

            PlayerScreenStack.prototype.goto = function (index) {
				console.log("PlayerScreenStack.goto : " + index);
                
            };

            PlayerScreenStack.prototype.gotoById = function (id) {
				var slide = this.findSlideById(id);
				this.sectionIndex = slide.section;
				this.currentIndex = slide.slide;
				this.showSlide(this.playerModel.contents[this.sectionIndex].contents[this.currentIndex]);
            };

            PlayerScreenStack.prototype.getIndex = function () {
                return this.currentIndex;
            };
			
			PlayerScreenStack.prototype.getId = function () {
				var index = this.getIndex();
				return this.screenItems[index].screenData.id;
			};
			
            PlayerScreenStack.prototype.getScreenCount = function () {
                return this.screenItems.length;
            };

			PlayerScreenStack.prototype.show = function () {
				var index = this.getIndex();
				this.screenItems[index].show();	
			};
			
            PlayerScreenStack.prototype.next = function () {
               
				var self = this;
                var index = this.getIndex();
				
				if(this.currentIndex < this.playerModel.contents[this.sectionIndex].contents.length - 1) {
					this.currentIndex++;
					this.showSlide(this.playerModel.contents[this.sectionIndex].contents[this.currentIndex]);
				} else {
					if(this.sectionIndex < this.playerModel.contents.length - 1) {
						this.sectionIndex++;
						this.currentIndex = 0;
						$("#sectionTitle").html(this.playerModel.contents[this.sectionIndex].info.title);
						this.showSlide(this.playerModel.contents[this.sectionIndex].contents[this.currentIndex]);
					} else {
						// end of preso
					}
				}
		
            };	
			
            PlayerScreenStack.prototype.previous = function () {
                
                var index = this.getIndex();
				
				if(this.currentIndex > 0) {
					this.currentIndex--;
				} else {
					if(this.sectionIndex > 0) {
						this.sectionIndex--;
						this.currentIndex = this.playerModel.contents[this.sectionIndex].contents.length - 1;
						$("#sectionTitle").html(this.playerModel.contents[this.sectionIndex].info.title);
					}
				}
				
				console.log(this.sectionIndex + " : " + this.currentIndex);
				this.showSlide(this.playerModel.contents[this.sectionIndex].contents[this.currentIndex]);
                				
            };
			
			PlayerScreenStack.prototype.togglePause = function (){
				console.log("togglePause : " + this.playing + " : " + this.soundComplete);
				var self = this;
				
				this.playing = !this.playing;
				
				// need to set up menu to pause
				if(this.sectionIndex == -1) {
					var screenData = {"id":"002"};
				} else {
					var screenData = this.playerModel.contents[this.sectionIndex].contents[this.currentIndex];
				}
			
				if(this.playing) {
					if(this.soundComplete == true) {
						soundManager.stopAll();
						soundManager.play(screenData.id, {onfinish: $.proxy(this.handleAudioComplete, this)});
						this.playing = true;
						this.soundComplete = false;
					
						console.log("reset timer");
						clearTimeout(this.durationTimer)
						this.durationComplete = false;
						if(screenData.duration) 
							this.durationTimer = setTimeout(function() { self.handleDurationComplete()}, screenData.duration * 1000);
													
					} else {
						// reset timer 
						//if(slide.duration) {
							//this.durationTimer = setTimeout(function() { self.handleDurationComplete()}, slide.duration * 1000);
							//} else {
							//this.durationComplete = true;
							//}
						soundManager.togglePause(screenData.id);
					}
					
					if($("#playPauseBtn").hasClass("selected"))
						$("#playPauseBtn").removeClass("selected");
						
				} else {
					
					soundManager.pause(screenData.id);
					$("#playPauseBtn").addClass("selected");
				}
				
            };
			
			PlayerScreenStack.prototype.mute = function (){
				console.log("PlayerScreenStack.mute : " + this.muted);
				this.muted = !this.muted;
				if(this.muted) {
					soundManager.mute();
				} else {
					soundManager.unmute();
				}
			}
			
			PlayerScreenStack.prototype.stop = function () {
				soundManager.stopAll();
			};
			
			PlayerScreenStack.prototype.onShow = function (){
				console.log("PlayerScreenStack - show");
            };

            PlayerScreenStack.prototype.onHide = function (){
				console.log("PlayerScreenStack - hide");
            };

			PlayerScreenStack.prototype.onChildrenReady = function () {
                console.log ("PlayerScreenStack:onChildrenReady");
            };

			
			PlayerScreenStack.prototype.setPlayerModel = function (data) {
           	 	console.log ("PlayerScreenStack - setPlayerModel : " + data);
	            this.playerModel = data;
				// create menu
	            this.createActivityScreens();
	        };
			
			PlayerScreenStack.prototype.getScreenByScreenId = function (value) {
				for(var i = 0; i < this.screenItems.length; i++){
					if(this.screenItems[i][0].id == value)
						return this.screenItems[i];		
				}
				
			};

			// Need to add transition			
			PlayerScreenStack.prototype.showSlide = function(slide) {
				console.log("PlayerScreenStack.showSlide");
				console.log("Playing : " + this.playing);
				
				var self = this,
					imageOne = null,
					imageTwo = null;
			
				if(this.currentSlide !== null)
					this.currentSlide.hide(0, function() {
						// Remove class that triggers css transition that fades in another image
						// $(this).toggleClass("playAnimation");
							// window.clearTimeout(self.imageOne);
							// window.clearTimeout(self.imageTwo);

							// $(".slide202 .animation1").show();
							// $(".slide202 .animation2").hide();

							// $(".slide301 .animation1").show();
							// $(".slide301 .animation2").hide();

					});
					this.currentSlide = this.getScreenByScreenId(slide.screenId);
					this.currentSlide.show(0, function() {
						// Add class that triggers css transition that fades in another image
						// $(this).toggleClass("playAnimation");
						// self.imageOne = window.setTimeout(function() {
						// 	$(".slide202 .animation1").fadeOut(1000);
						// 	$(".slide202 .animation2").fadeIn(1000);
						// }, 24000);

						// self.imageTwo = window.setTimeout(function() {
						// 	$(".slide301 .animation1").fadeOut(1000);
						// 	$(".slide301 .animation2").fadeIn(1000);
						// }, 14000);

						$(".captions").scrollTop(0);

						$('.flipbookMenu')

					});

					// for accessibility 
					this.currentSlide.attr("aria-hidden", "false");
					this.currentSlide.attr("tabindex", "0");

				// Setting complete status on slide (not sure if this should be moved)
				this.playerModel.contents[this.sectionIndex].contents[this.currentIndex].complete = true;
				
				$("#captions").html(slide.caption);
				$("#sectionTitle").html(this.playerModel.contents[this.sectionIndex].info.title);
				
				this.updateProgressDisplay();
				
				soundManager.stopAll();
				soundManager.play(slide.id, {onfinish: $.proxy(this.handleAudioComplete, this)});
				if($("#playPauseBtn").hasClass("selected"))
					$("#playPauseBtn").removeClass("selected");
				this.soundComplete = false;
				
				clearTimeout(this.durationTimer)
				this.durationComplete = false;
				
				this.playing = true;
				this.updateNavigationButtons();
				
				if(slide.duration) {
					this.durationTimer = setTimeout(function() { self.handleDurationComplete()}, slide.duration * 1000);
				} else {
					this.durationComplete = true;
				}
				
				$("#flipbookMenuBar").removeClass("mainMenuState");
				
			};
			
			PlayerScreenStack.prototype.updateNavigationButtons = function() {
				
				if(this.sectionIndex >= this.playerModel.contents.length - 1) {
					if(this.currentIndex >= this.playerModel.contents[this.sectionIndex].contents.length -1) {
						$("#nextButton").hide();
					} else {
						$("#nextButton").show();
					}
				} else {
					$("#nextButton").show();
				}
				
				if(this.sectionIndex == 0 && this.currentIndex == 0) {
					$("#previousButton").hide();
				} else {
					$("#previousButton").show();
				}
				
			};
			
			PlayerScreenStack.prototype.updateProgressDisplay = function() {
				$("#currentSlide").html(this.currentIndex + 1);
				$("#totalSlides").html(this.playerModel.contents[this.sectionIndex].contents.length);

				// appending hidden section title to end of slide of slide for accessibility
				$("#slideOfSlideSection").html("of " + this.playerModel.contents[this.sectionIndex].info.title);
				
				$("#slideDotsWrap").empty()
				for(var i = 0; i < this.playerModel.contents[this.sectionIndex].contents.length; i++){
					if(this.playerModel.contents[this.sectionIndex].contents[i].complete) {
						$("#slideDotsWrap").append($("<div class='slideDot progress'></div>"));
					} else {
						$("#slideDotsWrap").append($("<div class='slideDot'></div>"));
					}
					
				}
			};
			
			PlayerScreenStack.prototype.handleAudioComplete = function() {
				console.log("PlayerScreenStack - handleAudioComplete : " + this.playing);
				this.soundComplete = true;
				if(this.durationComplete) {
					
					this.playing = false;
					if($("#playPauseBtn").hasClass("selected")) {
						$("#playPauseBtn").removeClass("selected");
					} else {
						$("#playPauseBtn").addClass("selected");
					}
				
					// Need to wait for duration timer before moving next
					if(this.autoplay)
						this.next();
					
					this.playerModel.contents[this.sectionIndex].contents[this.currentIndex].complete = true;
					this.updateProgressDisplay();
				}
			};
			
			PlayerScreenStack.prototype.handleDurationComplete = function() {
				console.log("PlayerScreenStack - handleDurationComplete");
				
				clearTimeout(this.durationTimer)
				this.durationComplete = true;
				
				if(this.soundComplete) {
					this.playing = false;
					if($("#playPauseBtn").hasClass("selected")) {
						$("#playPauseBtn").removeClass("selected");
					} else {
						$("#playPauseBtn").addClass("selected");
					}
				
					// Need to wait for duration timer before moving next
					if(this.autoplay)
						this.next();
					
					this.playerModel.contents[this.sectionIndex].contents[this.currentIndex].complete = true;
					this.updateProgressDisplay();
				}	
			};
			
			PlayerScreenStack.prototype.showMenu = function() {
				console.log("PlayerScreenStack - showMenu");
				this.sectionIndex = -1;	
				if(!this.hasShownMenu) {			
					this.hasShownMenu = true;
					soundManager.stopAll();
					soundManager.play("002", {onfinish: $.proxy(function() {$("#playPauseBtn").addClass("selected"); }, this)});
					//soundManager.play("002");
					if($("#playPauseBtn").hasClass("selected"))
						$("#playPauseBtn").removeClass("selected");
					this.soundComplete = false;
					this.playing = true;
				} else {					
					$("#playPauseBtn").addClass("selected");
				}
				
				// $("#captions").html("<p>Welcome to the AP Course Audit –Syllabus Development Tutorial. You may use this page to navigate to a specific part of the tutorial by clicking on the appropriate link within the table of contents.</p>");
				
				
			}
			
        return PlayerScreenStack;

})();