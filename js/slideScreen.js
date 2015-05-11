function Design(wrapper,screen) {
    var that = this;
    that.wrapper = wrapper, 
    that.screen = screen,
    that.iWidth = $(window).width(), 
    that.iHeight = $(window).height(), 
    that.len = screen.length, 
    that.maxHeight = that.len * that.iHeight, 
    that.startX = 0, 
    that.startY = 0, 
    that.endX = 0, 
    that.endY = 0, 
    that.boundary = 30, 
    that.current = 0, 
    that.isMoving = false, 
    that.isMoved = false, 
    that.speed = 450
}

Design.prototype = {init: function() {
       var that = this;
       that.setStyle();
       that.setHeight();
       that.fnEvent();
    },setStyle: function(){
    	var that = this;
    	var str = "";
    	var width = $(window).width();
    	var firstH = 697*width/720;
    	str += ".enter .zhou .zhou_middle{height:"+firstH+"px}"

    	$('.style').html(str);
    	$('.loading').hide();
        $('.slide_img').show();
        that.wrapper.css('opacity','1');
        that.screen.eq(0).addClass("enter");
    },setHeight:function(){
        var that = this;
        that.iHeight = $(window).height();
        that.maxHeight = that.len * that.iHeight;
        that.screen.css("height", that.iHeight + "px");
    },fnEvent: function() {
        var that = this;
        touchStartHandler = $.proxy(that.touchStart, that), 
        touchMoveHandler = $.proxy(that.touchMove, that), 
        touchEndHandler = $.proxy(that.touchEnd, that), 
        that.wrapper.on("touchstart", touchStartHandler), 
        that.wrapper.on("touchmove", touchMoveHandler), 
        that.wrapper.on("touchend", touchEndHandler);
    },touchStart: function(ev) {
        var that = this;
        // ev.preventDefault();
        if(that.isMoving == false){
			that.startX = that.getPos(ev).posX;
			that.startY = that.getPos(ev).posY;
			that.moved = false; 
		}
    },touchMove: function(ev) {
        var that = this;
		
		if(that.isMoving == false){
			that.endX = that.getPos(ev).posX; 
			that.endY = that.getPos(ev).posY;
			that.distanceX = that.endX - that.startX;
			that.distanceY = that.endY - that.startY;

			// 判断是横向滑动非纵向滑动
			if(Math.abs(that.distanceY) - Math.abs(that.distanceX)>5){
				that.moved = true;
				that.moveToY(that.distanceY + that.current * -that.iHeight);
                ev.preventDefault();
			}
		}
    },touchEnd: function() {
    	var that = this;
		if(that.moved && ! that.isMoving){
			if(Math.abs(that.distanceY) < that.boundary){
					that.endToY(that.current)
			}else{
				if(that.endY - that .startY <0){ 
					that.current ++;
					that.coordinate = that.current-1;

					if( that.current >= that.len - 1){
						that.current = that.len - 1;
						that.coordinate = that.current-1;
					}
				}else{
					that.current--;
					that.coordinate = that.current+1;
					if( that.current <= 0){
						that.current = 0;
						that.coordinate = 1;
					}
				}
				that.endToY(that.current);
			}
		}
    },moveToY : function(dis){
		this.wrapper.css("-webkit-transform","translate3d(0,"+dis+"px,0)");
	},getPos :function(ev){
		return {posX : ev.changedTouches[0].clientX,posY : ev.changedTouches[0].clientY}
	},endToY : function(page){
		var that = this,dis=-page*that.iHeight;
			that.isMoving = true;
			that.wrapper.animate({translate3d: '0,'+ dis +'px,0'}, that.speed, "swing",function(){
					that.isMoving = false;
					that.screen.removeClass("enter");
					that.screen.eq(page).addClass("enter");
				});
        page == that.len - 1?$('.slide_img').hide():$('.slide_img').show();
}};



    