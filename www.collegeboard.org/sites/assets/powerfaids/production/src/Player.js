var tracer = (typeof tracer !== "undefined") ? tracer : {};
tracer.player = (typeof tracer.player !== "undefined") ? tracer.player : {};
tracer.player.Player = (typeof tracer.player.Player !== "undefined") ? tracer.player.Player : (function() { 

	var Player = function(elem) {
	
		this.$el = elem;

		this.configuration = {};
		this.integration = null;
		this.integrationCallbacks = {};
		this.view = null;
		this.callbacks = {};
		this.initialize();

	}

	Player.prototype.initialize = function() {
		console.log("Player.initialize");

		this.configuration = {};

		this.configuration.assetUrl = "assets/asset_manifest.json";
		this.configuration.libUrl = "../../lib/";
		this.configuration.cssUrl = "assets/styles/main.css";
		this.configuration.imgUrl = "assets/img/";
		this.configuration.audioUrl = "assets/audio/";
		this.configuration.manifestUrl = "assets/asset_manifest.json";
		this.configuration.fontUrl = "assets/font/";

		this.configuration.documentUrl = document.location.protocol + "//" + document.location.host + (document.location.pathname.substring(0, document.location.pathname.lastIndexOf('/') + 1));

		// Override config with global and url params
		var item;

		if (CONFIG) {
			for (item in CONFIG) {
				this.configuration[item] = CONFIG[item];
			}
		}
		
	};

	// exposed for player integration class
	Player.prototype.load = function(url, callback) {
		if(callback)
			this.onLoadComplete = callback;
			
		if(this.view) {
			this.view.destroy();
		}
		
		if (url) this.configuration.url = url;
		
		this.loadImages(this.configuration.assetUrl);
	
	};

	Player.prototype.show = function() {
		this.view.show();
	};

	Player.prototype.getState = function() {
		return this.view.getState();
	};

	Player.prototype.setState = function(value) {
		this.view.setState(value);
	};
	
	Player.prototype.playPause = function() {
		this.view.togglePause();
	};
	
	Player.prototype.mute = function() {
		this.view.mute();
	};
	
	Player.prototype.stop = function() {
		this.view.stop();
	};
	
	Player.prototype.hasNext = function() {
		return this.view.hasNext();
	};

	Player.prototype.navigateNext = function() {
		this.view.next();
	};

	Player.prototype.hasPrevious = function() {
		return this.view.hasPrevious();
	};

	Player.prototype.navigatePrevious = function() {
		this.view.previous();
	};

	Player.prototype.gotoBeginning = function() {
		this.view.gotoBeginning();
	};

	Player.prototype.gotoEnd = function() {
		this.view.gotoEnd();
	};

	Player.prototype.getContentId = function() {
		return this.view.getId();
	};

	Player.prototype.setContentId = function(value) {
		this.view.gotoById(value);
	};

	Player.prototype.getContentIndex = function() {
		return this.view.getIndex();
	};

	Player.prototype.setContentIndex = function(value) {
		Log.log("Player.setContentIndex : " + value);
		this.view.goto(value);
	};
	
	Player.prototype.sendContentMessage = function(message, params) {
		Log.log("Player.sendContentMessage : " + message);
		this.view.sendContentMessage(message, params);
	};

	Player.prototype.showMenu = function() {
		this.view.showMenu();
	};
	
	Player.prototype.setAutoPlay = function(value) {
		this.view.autoplay = value;
	};
	
	Player.prototype.getManifest = function() {
		return this.model.toJSON();
	};
	
	Player.prototype.setManifest = function(value) {
		if(!this.model)
				this.model = new PlayerModel();
		this.model.fromJSON(value, $.proxy(this.modelLoaded, this));
	};
	
	Player.prototype.loadImages = function(url) {
		console.log("Player.loadImages");
		
		var self = this;
		
	    $.ajax({
            url: url,
            dataType : "json",
            success: function(mani) {

                if (mani.images != null){
                    	self.preload("assets/img/", mani.images, $.proxy(self.loadAudio, self));
                } else {
					self.loadAudio();
                }

            },
            error:function(response, status, error){
                console.log ("Error loading manifest " + url);
            }
        });
				
	};
	
	Player.prototype.loadAudio = function() {
		console.log("Player.loadAudio");
		
		var self = this;
		
		window.soundManager.setup({ 
	
	        url: "lib/soundmanager/swf/",
	        allowScriptAccess: 'always',
	        useHTML5Audio: true,
	        useHighPerformance: false,
	        waitForWindowLoad : true,
	        flashLoadTimeout : 0,
			useFlashBlock: true,
	        preferFlash : false,
			debugMode: false,
			debugFlash: false,
	        onready: function() {
				console.log("Player.soundmanager.onReady");
	            self.loadModel();
	        },
	        ontimeout: function() {
        		// show error message
				// self.loadModel();
	        }

	    });
		
	};
	
	Player.prototype.loadModel = function() {
		console.log("Player.loadModel");

		var url = "data/manifest.json";

		if (this.configuration.url) {
			url = this.configuration.url;
		}

		if (parent.config) {
			if (parent.config.url) {
				url = parent.config.url;
			}
		}

		//if (this.params.url) {
		//	url = this.params.url
		//}

		this.model = new tracer.player.PlayerModel();
		this.model.load(url, $.proxy(this.modelLoaded, this));

	};

	Player.prototype.modelLoaded = function() {
		console.log("Player.modelLoaded : " + this.model);
		var self = this;
		
		if(this.view) {
			this.view.destroy();
		}
		
		this.view = new tracer.player.PlayerScreenStack(this.$el);
		this.view.setPlayerModel(this.model);
		this.view.onLoadComplete = this.onLoadComplete();
		this.view.sendMessage = function(message, params) {
			self.sendMessage(message, params);
		}

	};

	Player.prototype.registerMessage = function (message, callback, scope) {
		this.callbacks[message] = {"callback":callback, "scope":scope};
    };
	
    Player.prototype.sendMessage = function(message, params) {
		if(this.callbacks[message]){
			this.callbacks[message].callback.call(this.callbacks[message].scope || this, params);
        }
    };
	
	// Need to implement a preloader for assets
    Player.prototype.preload = function(baseUrl, assets, callback) {
        console.log("Player.preload");
		console.log(assets);
		if (assets == null) callback ();

        var loader = new PxLoader();

        for (var i = 0; i < assets.length; i++) {
			loader.addImage(baseUrl + assets[i].replace("/",""));
        }

        loader.addCompletionListener(callback);
        loader.start ();
		
    };

	return Player;

})();