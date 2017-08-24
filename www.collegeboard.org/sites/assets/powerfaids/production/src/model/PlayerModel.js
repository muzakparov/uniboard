var tracer = (typeof tracer !== "undefined") ? tracer : {};
tracer.player = (typeof tracer.player !== "undefined") ? tracer.player : {};
tracer.player.PlayerModel = (typeof tracer.player.PlayerModel !== "undefined") ? tracer.player.PlayerModel : (function() { 


        var PlayerModel = function(){
			console.log("PlayerModel");
			
			this.parse = function (doc) {
				console.log("PlayerModel.parse");
				
				this.id = doc.id;
				this.version = doc.version;
				this.info = doc.info;
				  
				var contentMod;
                var subContentMod;

				for(var i=0; i< doc.contents.length; i++){
                        
						contentMod = {
                            "id": doc.contents[i].id,
                            "type":doc.contents[i].type,
                            "path":doc.contents[i].path,
                            "thumbnail":doc.contents[i].thumbnail,
                            "display":doc.contents[i].display,
                            "config":doc.contents[i].config,
							"info":doc.contents[i].info,
							"caption":doc.contents[i].caption,
							"duration":doc.contents[i].duration,
							"audio":doc.contents[i].audio
                        };

						if(typeof doc.contents[i].contents !== "undefined") {
						
							contentMod.contents = [];
							for(var j = 0; j < doc.contents[i].contents.length; j++){

									subContentMod = {
			                            "id": doc.contents[i].contents[j].id,
			                            "type":doc.contents[i].contents[j].type,
			                            "path":doc.contents[i].contents[j].path,
			                            "thumbnail":doc.contents[i].contents[j].thumbnail,
			                            "display":doc.contents[i].contents[j].display,
			                            "config":doc.contents[i].contents[j].config,
										"info":doc.contents[i].contents[j].info,
										"caption":doc.contents[i].contents[j].caption,
										"duration":doc.contents[i].contents[j].duration,
										"audio":doc.contents[i].contents[j].audio
			                        };

									contentMod.contents.push(subContentMod);
			                }
						
						}
						
						this.contents.push(contentMod);
					
                }
					
            }

		};
		
		PlayerModel.prototype.id = "-1";
        PlayerModel.prototype.version = "";
        PlayerModel.prototype.info = { title:"", creator:"", creationDate:"", publisher:"", publishDate:"" };
		PlayerModel.prototype.complete = false;
		PlayerModel.prototype.capabilities = [];
        PlayerModel.prototype.contents = [];
        PlayerModel.prototype.currentId = null;

		PlayerModel.prototype.initialize = function () {
			console.log("PlayerModel.initialize");
			this.id = "-1";
			this.version = "";
			this.info = { title:"", creator:"", creationDate:"", publisher:"", publishDate:"" };
			this.caption = "";
			this.capabilities = [];
			this.contents = [];
			this.currentId = null;
        };
		
		PlayerModel.prototype.load = function(url, callback) {
			console.log("PlayerModel.load : " + url);
			var self = this;
			$.getJSON( url, function( data ) {
				console.log("PlayerModel.load : " + data);
				self.parse(data);
				callback();
			});
		};
		
        PlayerModel.prototype.toJSON = function () {
			console.log("PlayerModel.toJSON");
			return {};
		};
		
		PlayerModel.prototype.fromJSON = function (value, callback) {
			console.log("PlayerModel.fromJSON");
			this.initialize();
			this.parse(value);
			callback();
		};
		
        return PlayerModel;

})();