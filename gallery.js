

(function( $ ) {
	var nowIndex = 0;
	var prevIndex = -1;

	$.fn.gallery = function(ele, options){
		var imgArray = new Array();
		
		$(this).find("img").each(function (i){
			imgArray[i] = $(this);
		});
		createGallery(imgArray, options);
	};
	
	function createGallery(imgArray, options){

		var warpperDefaults = {
			wrapperAttrs: {
				id : "galleryWrapper",
			},
			wrapperCSS: {
				position : "fixed",
				top : "50px",
				height : "100%",
				width : "100%",
				backgroundColor : "rgba(20, 16, 16 ,0.7)",
				//textAlign : "center",
				display : "none",
				zIndex : "700",
			},
			wrapperEvents: {
				click : function(){ $("#galleryWrapper").hide(); }
			},
		};
		var setWarpper = warpperDefaults;
		
		var setImgDiv = {
			divAttrs: {
				id : "galleryDiv",
			},
			divCSS: {
				height : "650px",
				width : "70%",
				backgroundColor : "rgba(255, 255, 255, 0.6)",
				marginTop : "50px",
				border : "5px solid",
				borderRadius : "10px",
				float : "left",
				overflow : "scroll",
				},
			divEvents: {
				click : function(event){ 
					event.stopPropagation();
				},
			},
		};
		var turnDefault = {
			turnAttrs : {
			},
			turnCSS : {
				height : "50px",
				width: "14%",
				marginTop : "425px",
				fontSize : "50px",
				color : "rgba(255, 255, 255, 0.6)",
				textAlign : "center",
				float : "left",
				cursor : "pointer"
			},
			turnEvents : {
			}
		};
		var right = {
			turnAttrs : {
				id : "turnRight",
			},
			turnEvents: {
				click : function(event){ 
					event.stopPropagation();
					
					prevIndex = nowIndex;
					if(nowIndex+1 < imgArray.length){
						nowIndex++;
					} else {
						nowIndex = 0;
					}
					resetImg(img, imgArray[nowIndex]);
				}
			}
		};
		var left = {
			turnAttrs : {
				id : "turnLeft",
			},
			turnEvents: {
				click : function(event){ 
					event.stopPropagation();
					
					prevIndex = nowIndex;
					if(0 < nowIndex){
						nowIndex--;
					} else {
						nowIndex = imgArray.length - 1;
					}
					resetImg(img, imgArray[nowIndex]);
				}
			}
		};
		var setTurnRight = $.extend( true, {}, turnDefault, right);
		var setTurnLeft = $.extend( true, {}, turnDefault, left);
		
		var setSmallGallery = {
			smallAttrs : {
				id : "smallGalleyr"
			},
			smallCSS : {
				height : "180px",
				width: "90%",
				bottom : "5px",
				backgroundColor : "rgba(255, 255, 255, 0.6)",
				margin: "0 5%",
				textAlign : "center",
				overflow : "scroll"
			},
			smallEvents : {
				click : function(event){ 
					event.stopPropagation();
				}
			}
		};
		var setImg = {
			imgAttrs: {
				id : "galleryImg",
			},
			imgCSS: {
				heigit : "auto",
				width : "80%",
				margin : "5px 5%",
				cursor : "all-scroll",
				textAlign : "none",
				overflow : "hidden",
				},
			imgEvents: {
				click : function(event){ 
					event.stopPropagation();
				},
			},
		};
		var setSmallImg = {
			smallAttrs : {
				class : "smallImgDiv",
			},
			smallCSS : {
				height : "100px",
				widht : "auto",
				cursor : "pointer",
				border : "3px solid",
				margin : "5px",
				overflow : "hidden",
			},
			smallEvents : {
				click : function(){

					var words = $(this).attr("id").split("_");
					prevIndex = nowIndex;
					nowIndex = parseInt(words[1]);
					resetImg(img, $(this));
				}
			}
		};
		
		var warpper = $( "<div />" )
			.attr(setWarpper.wrapperAttrs)
			.css(setWarpper.wrapperCSS)
			.bind(setWarpper.wrapperEvents)
			.appendTo($("body"));
			
		var turnLeft = $( "<div />")
			.attr(setTurnLeft.turnAttrs)
			.css(setTurnLeft.turnCSS)
			.bind(setTurnLeft.turnEvents)
			.text("<")
			.appendTo(warpper);	
			
		var imgDiv = $( "<div />")
			.attr(setImgDiv.divAttrs)
			.css(setImgDiv.divCSS)
			.bind(setImgDiv.divEvents)
			.appendTo(warpper);	
		
		var turnRight = $( "<div />")
			.attr(setTurnRight.turnAttrs)
			.css(setTurnRight.turnCSS)
			.bind(setTurnRight.turnEvents)
			.text(">")
			.appendTo(warpper);	
			
		var smallGallery = $( "<div />")
			.attr(setSmallGallery.smallAttrs)
			.css(setSmallGallery.smallCSS)
			.bind(setSmallGallery.smallEvents)
			.appendTo(warpper);	
							
		var img = $( "<img />")
			.attr(setImg.imgAttrs)
			.css(setImg.imgCSS)
			.bind(setImg.imgEvents)
			.appendTo(imgDiv);

		$.each(imgArray, function(i, obj){
			obj.css( "cursor", "pointer");
			
			var smallImg = $( "<img />")
			.attr(setSmallImg.smallAttrs)
			.css(setSmallImg.smallCSS)
			.bind(setSmallImg.smallEvents)
			.appendTo(smallGallery);
			
			smallImg.attr({
				"id" : "smallImg_"+i,
				"src" : obj.attr("src")
			});

			obj.bind("click", function(){
				prevIndex = nowIndex;
				nowIndex = i;
				warpper.show();
				resetImg(img, obj);
			});
		});	
			
		var imgWheel = document.getElementById("galleryImg");
			
		//event

		img.draggable();

		//for chrome
		imgWheel.addEventListener("mousewheel", mouseScroll, false);
			function mouseScroll (event) {
				//lock scroll
				$('html').css('overflow', 'hidden');
				imgDiv.css('overflow', 'hidden');
					
				var delta = event.wheelDeltaY;
				
				var height = parseFloat(img.css("height"));
				var width = parseFloat(img.css("width"));
				
				var imgOffset = img.offset();
				//alert(height/width);
				//var percX = width/(height+width);
				//var percY = height/(height+width);
				
				var offsetX = event.pageX - imgOffset.left;
				var offsetY = event.pageY - imgOffset.top;
				var _offsetX = width - offsetX;
				var _offsetY = height - offsetY;

				var growRate = 0.005;
				var top = parseFloat(img.css("margin-top")) + growRate * delta*offsetY;
				var bottom = parseFloat(img.css("margin-bottom")) + growRate * delta*_offsetY;

				var left = parseFloat(img.css("margin-left")) + growRate * delta*offsetX;
				var right = parseFloat(img.css("margin-right")) + growRate * delta*_offsetX;

				var newHeight = height - (growRate * delta*height);
				var newWidth = width - (growRate * delta*width);
				
				if((newHeight <= 150) || (newWidth <= 150)){
					return 0;
				}
				
				img.css({
					"height" : newHeight,
					"width" : newWidth,
					"margin-top" : top,
					"margin-bottom" : bottom,
					"margin-left" : left,
					"margin-right" : right 
				});
				
				//unlock scroll
				$('html').css('overflow', 'auto');
				imgDiv.css('overflow', 'scroll');
			}
	}
	function resetImg(img, obj){
		img.height("auto");
		img.width("80%");
		img.css({
			"margin" : "5% 5px"
		});
		img.attr( "src", obj.attr("src"));
		img.position({
			my : "center top+10",
			at : "center top+10",
			of : "#galleryDiv"
		});	
		$("#smallImg_"+prevIndex).css("border-color","black");	
		$("#smallImg_"+nowIndex).css("border-color","red");		
	}

	$.removeGallery = function(){
		$("#galleryWrapper").remove();
		
	}
}(jQuery));

