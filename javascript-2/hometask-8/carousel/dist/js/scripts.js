function Container(){this.id="",this.className="",this.htmlCode=""}function Carousel(){Container.call(this,"carousel"),this.widthCarousel=0,this.leftString=0,this.productsSlide=0,this.productsFirst=1,this.countProducts=0,this.productsItems=[],this.widthCarouselNav=function(){return $(".carousel__nav").width()},this.widthProduct=function(){return $(".carousel__products-container").width()+20},this.widthString=function(){var t=this.widthProduct()*this.countProducts;return $(".carousel__products-string").css({width:t}),t},this.loadCarouselItems(),this.render(),this.renderDots(),this.keyDown(),this.arrows()}Container.prototype.render=function(){return this.htmlCode},Carousel.prototype=Object.create(Container.prototype),Carousel.prototype.constructor=Carousel,Carousel.prototype.arrows=function(t){"right"==t?(this.leftString-=this.widthProduct(),this.productsFirst++):"left"==t?(this.leftString+=this.widthProduct(),this.productsFirst--):isNaN(t)||(this.leftString=-(t-1)*this.productsSlide*this.widthProduct(),this.productsFirst=t*this.productsSlide),this.leftString>0&&(this.leftString=0,this.productsFirst=1),this.leftString<this.widthProduct()*this.productsSlide-this.widthString()&&(this.leftString=this.widthProduct()*this.productsSlide-this.widthString(),this.productsFirst=this.countProducts-this.productsSlide+1),$(".carousel__products-string").css({left:this.leftString}),this.renderDots(".carousel__dots-items")},Carousel.prototype.render=function(t){$(".carousel").css({width:this.widthCarousel}),this.widthCarouselNav(),this.widthProduct(),this.widthString(),$(t).empty();for(var s in this.productsItems){var r=$("<div />",{class:"carousel__products-container"});r.appendTo(t);var o=$("<div />",{class:"carousel__products-items"});o.appendTo(r),$("<div />",{class:"carousel__products-items-images",style:"background-image: url("+this.productsItems[s].image+")"}).appendTo(o),$("<div />",{class:"carousel__products-items-titles",text:this.productsItems[s].title}).appendTo(o),$("<div />",{class:"carousel__products-items-descriptions",text:this.productsItems[s].description}).appendTo(o),$("<div />",{class:"carousel__products-items-prices",text:this.productsItems[s].price}).appendTo(o),$("<div />",{class:"carousel__products-items-basket",text:"В корзину"}).appendTo(o)}},Carousel.prototype.renderDots=function(t){var s=this;$(t).empty();for(var r=1;r<=this.countProducts/this.productsSlide;++r){var o="";Math.ceil(this.productsFirst/this.productsSlide)==r&&(o=" carousel__dots-items-links-rounds_active");var i=$("<span />",{class:"carousel__dots-items-links"});i.appendTo(t);var e="carousel__dots-items-links-rounds_"+r;$("<span />",{id:e,class:"carousel__dots-items-links-rounds"+o}).appendTo(i),$("#"+e).on("click",function(){s.arrows($(this).attr("id").split("_")[3])})}},Carousel.prototype.loadCarouselItems=function(){$.get({url:"./json/carousel.json",dataType:"json",error:function(){console.log("JSON load: Error!")},success:function(t){console.log("JSON load: Ок!"),this.widthCarousel=t.widthCarousel,this.productsSlide=t.productsSlide,this.countProducts=t.products.length;for(var s in t.products)this.productsItems.push(t.products[s]);this.render(".carousel__products-string"),this.renderDots(".carousel__dots-items")},context:this})},Carousel.prototype.keyDown=function(){var t=this,s={37:"left",39:"right"};$("body").on("keydown",function(r){r.keyCode in s&&t.arrows(s[r.keyCode])})},$(document).ready(function(){var t=new Carousel;$(".carousel__nav-arrows-links_left").on("click",function(){t.arrows("left")}),$(".carousel__nav-arrows-links_right").on("click",function(){t.arrows("right")})});