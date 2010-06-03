jQuery(function($) {
    
  $.fn.log = function (msg) {
    console.log("%s: %o", msg, this);
    return this;
  };
                     
  /* Setup vars */
  var newDivs = Array();
  
  /* functions */
  $.fn.makeBumpUpMenu = function(remove) {
    return this.each(function() {
      var el = $(this);
      var parent = el.children('.header').attr('rel');
      el.unbind('hover');
      var name = el.attr('id');
      if (remove) { newDivs[name].remove(); return; }

      if (newDivs[name] == null) {
        var pos = el.position();
        var elTop = pos.top;
        var elLeft = pos.left;
        var elWidth = el.width() + 1;
        var elHeight = el.height() + 2;
        newDivs[name] = el.clone().insertAfter(el);
        newDivs[name]
          .attr('id', name + '_clone')
          .css({ position: "absolute", cursor: "pointer",
            top:elTop, left:elLeft,width:elWidth, height:elHeight,zIndex:100,
            opacity:0.0, background:'#eee url(/wp-content/uploads/whatsInStore.jpg) bottom left no-repeat'
          }).children('ul.menu').css('display','block');

        el.hover(function(){ cPos = $('.bumpupmenuwidget#'+name).position().top; newDivs[name].stop().css({top:cPos, height:'140px'}); });
        newDivs[name].hover(
          function(){ cPos = $('.bumpupmenuwidget#'+name).position().top; $(this).stop().css('top',cPos).animate({opacity:1.0, top:cPos-100, height:'240px'}, "fast"); },
          function(){ cPos = $('.bumpupmenuwidget#'+name).position().top; $(this).stop().animate({top:cPos, height:'140px', opacity:0.0}, "fast"); }
        );
      }
    });
  }
  
  $.fn.makeBumpUpButton = function(remove) {
    return this.each(function() {
      var el = $(this);
      el.unbind('hover');
      var name = el.attr('id');
      if (remove) { newDivs[name].remove(); return; }

      if (newDivs[name] == null) {
        var pos = el.position();
        var elTop = pos.top;
        var elLeft = pos.left;
        var elWidth = el.width() + 1;
        var elHeight = el.height() + 2;
        newDivs[name] = el.clone().insertAfter(el);
        newDivs[name]
          .attr('id', name + '_clone')
          .css({ position: "absolute", cursor: "pointer", opacity:0,
            top:elTop, left:elLeft,width:elWidth, height:elHeight,zIndex:100
          }).click(function(){
            if ($('#' + this.id + ' a').attr('target') == '_blank')
              window.open($('#' + this.id + ' a').attr('href'), $('#' + this.id + ' a').html());
            else
              document.location = ($('#' + this.id + ' a').attr('href'));
          });
        
        el.hover(function(){ cPos = $('.bumpupbuttonwidget#'+name).position().top; newDivs[name].css({top:cPos, height:'140px'}); });
        newDivs[name].hover(
          function(){ cPos = $('.bumpupbuttonwidget#'+name).position().top; $(this).stop().css('top',cPos).animate({opacity:1.0, top:cPos-70, height:'210px'}, "fast"); },
          function(){ cPos = $('.bumpupbuttonwidget#'+name).position().top; $(this).stop().animate({top:cPos, height:'140px'}, "fast", function(){$(this).css('opacity',0)} ); }
        );
      }
    });
  } 

  jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    return this;
  }

  /* Bumpup boxes on homepages */
  if ($('.bumpupbuttonwidget').length)
    $(".bumpupbuttonwidget").makeBumpUpButton();

  /* Popup Dropdown Lists */
  if ($('.bumpupmenuwidget').length)
    $(".bumpupmenuwidget").makeBumpUpMenu();

  /* Inventory Search */
  $("#quick-find #inventory-search").focus(function(){
    if ($(this).attr('value') == 'Inventory Search...') {
      $(this).attr('value', '').css('color', '#999999');
    }
  });

  /* Quick Find bar links */
  $('#quick-find a').click(function(){
    if ($('#slideout').css('display') != 'block') $('#quick-find-button').click();
    $('#slideout .tabs').tabs('> .pane').click($(this).attr('href'));
    return false;
  });

  /* Quick Find Slideout */
  $('#quick-find-button').click(function(){ 
    if ($('#slideout').css('display') == 'none') {
      //ch = $('#footer').height();
      //$('#footer').css('min-height', ch + 200);
      //$("body").attr({ scrollTop: $("body").attr("scrollHeight") });
      $('#quick-find-button').find("img").attr('src', '/wp-content/uploads/2010/03/blue-arrow-up.jpg'); 
      $('#slideout').show();
    } else {
      $('#slideout').hide();
      $('#quick-find-button').find("img").attr('src', '/wp-content/uploads/2010/03/blue-arrow.jpg'); 
      //ch = $('#footer').height();
      //$('#footer').css('min-height', ch - 200);
    }
    return false;
  });
      
  /* Light box for Staff pages */
  $('.staff .person').each(function(){
    var current = $(this);
    current.children().children('.email').click(function(){
      name  = current.children().children('.name').html();
      email = current.children().children('.email').attr('href').replace(/mailto:/,'');
      $('#emailWindow').css('top','120px').center();
      $('#emailWindow #send-to-name').html(name);
      $('#emailWindow #staff-name').attr('value', name);
      $('#emailWindow #staff-email').attr('value', email);
      $('body').append('<div id="jquery-overlay"></div>');
      $('#jquery-overlay').css({zIndex:200,background:'black',opacity:0.85,height:$(document).height()}).fadeIn();
      $('#emailWindow').fadeIn();
      $('div#jquery-overlay').click(function(){
        $('body #jquery-overlay').remove();
        $('#emailWindow').hide();
      });
      return false;
    });
    current.children().children('.toggle-bio').click(function(){
      current.children('p.bio-text').toggle();
      return false;
    });
  });

  $('#emailWindow #close-window').click(function(){
    $('body #jquery-overlay').remove();
    $('#emailWindow').hide();
  });

  /* New Vehicle flyout slider */
  if ($('.page-item-151').length) {
    if (!$('#showcase-flyout').length && $('.showcase').length) {
      $('#slideout .showcase').clone().insertAfter('#submenu')
        .attr('id','showcase-flyout')
        .attr('class','showcase-flyout')
        .center()
        .css({top:'94px'})
        .hide();
      $('#showcase-flyout .pane').wrapInner('<div class="items" />');
      $('#showcase-flyout .pane').prepend('<div class="prev"></div>');
      $('#showcase-flyout .pane').append('<div class="next"></div>');
      $('#showcase-flyout .pane').scrollable({speed:100, size:5, clickable:false, items:'.items', item:'.vehicle'});
      $('#showcase-flyout .pane .vehicle').hover(
        function(){ $(this).children('.trims').show(); },
        function(){ $(this).children('.trims').hide(); }
      );
      $('.showcase-flyout ul.tabs').tabs('.showcase-flyout > div.pane');
    }
    $('.page-item-151').hover(function(){
      $('#showcase-flyout').show();
    });
    $('#menubar .page_item').hover(function(){if($(this).attr('class')!='page_item page-item-151')$('#showcase-flyout').hide();});
  }


  //========================
  // new-used-vehicles/new-vehicles/sync/
  // - Chad M.17.10
  // COMMENT: probably should have made a function for popups that can take flash video arguements...
  //
  $("#sync-wrap .video a").click(function() {
    $("#sync-wrap .videoplayer").show();
    $("#sync-wrap .videoplayer .frame").append("<object width='480' height='300'><param name='movie' value='http://www.youtube.com/v/9renvWel9cY&hl=en_US&fs=1&'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/9renvWel9cY&hl=en_US&fs=1&' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='480' height='300'></embed></object>");
  });

  $("#sync-wrap a.vidClose").click(function() {
    $(".videoplayer").hide();
    $(".videoplayer .frame").empty();
  });
  
  $("#sync-wrap #sync-nav a.about").click(function() {
    var shown = $("#sync-nav-content #sync-availability").css("display");
    if (shown == "none"){
      $("#sync-nav-content #sync-about").show();
    } else {
      $("#sync-nav-content #sync-availability").hide();
      $("#sync-nav-content #sync-about").show();
    }
  });

  $("#sync-wrap #sync-nav a.availability").click(function() {
    var shown = $("#sync-nav-content #sync-about").css("display");
    if (shown == "none"){
      $("#sync-nav-content #sync-availability").show();
    } else {
      $("#sync-nav-content #sync-about").hide();
      $("#sync-nav-content #sync-availability").show();
    }
  });

  $(".close").click(function() {
    $(this).parent().hide();
  });
  
  /* quick find test drive */
  $(".frm-btn-new-test-drive").click(function(){
      $(this).addClass("active");
      $(this).parent().find(".frm-btn-used-test-drive").removeClass("active");
      $(this).parent().find(".used-test-drive").hide();
      $(this).parent().find(".new-test-drive").show();
   });

  $(".frm-btn-used-test-drive").click(function(){
      $(this).addClass("active");
      $(this).parent().find(".frm-btn-new-test-drive").removeClass("active");                         
      $(this).parent().find(".new-test-drive").hide();
      $(this).parent().find(".used-test-drive").show();
   });  
  
  //***
  // Sidebar Navigation
  initMenu();
  
  //****
  //  Billboard
  billboardArrowHover();
  
  //****
  //  Specials arrow toggle
  specialsArrowToggle();
  
  //***
  //  Wizard
  formwizard();

  function initMenu() { 
    if ($("#sidebar .accordionmenuwidget-pages").length){
      var sidebarMenu = $("#sidebar .accordionmenuwidget-pages"); 
      var sidebarParent = sidebarMenu.children("li");
    
      //sidebarParent.find("a").toggle(function() {
      $(".accordionmenuwidget-pages > li > a").toggle(function() {
        $(this).parent().find("ul").show();
      }, function() {
        $(this).parent().find("ul").hide(); 
      });
    
      if ($("#sidebar .accordionmenuwidget .current_page_item").length){
        var current = $("#sidebar li.current_page_item");
        // show current sub menu
        current.parent().show();
      
        var currentPosition = $("#sidebar .accordionmenuwidget-pages li > ul > li.current_page_item").position().top;
        //var sidebarMenuHeight = sidebarMenu.height();
        //var sidebarSubMenuHeight = sidebarParent.height();
        var bgOffset = -297; // Backgroung image height. Positions background bottom at the top of the list
        bgOffset += currentPosition + 12;
      
        // Set background of active list
        current.parent().parent().find("a").addClass("activeParent");
        current.parent().css({
          "background-color" : "#F4F4F4",
          "background-image" : "url(/wp-content/uploads/2010/03/sidebar-current-page-arrow.png)",
          "background-position" : "left" + " " + bgOffset + "px",
          "background-repeat" : "no-repeat"
        });
      } else {
        sidebarMenu.find("li:first ul").show().addClass("activeParent");  
      }
    }
  }
  
  function checkPos(num){
    if(parseInt(num) > 0){  
      return true;
    } else {
      return false;
    }
  }
  
  function billboardArrowHover(){
    if($(".slideshowwidget").length){
      var slideshow = $(".slideshowwidget");
      var next = slideshow.find("div.next");
      var prev = slideshow.find("div.prev");
      var pager = slideshow.find(".pager");
    
      prev.hover(function() {
        $(this).css({"background-position": "-172px top"});           
      }, function() {
        $(this).css({"background-position": "-42px top"});
      });
      next.hover(function() {
        $(this).css({"background-position": "-95px top"});            
      }, function() {
        $(this).css({"background-position": "20px top"});
      });   
    
      pager.find("a").css({"color": "#555"});
    }
  }
  
  function specialsArrowToggle() {
    if($(".containerSpecials").length){
      $("h2.trigger:first").next(".toggle_container").slideToggle("slow");
    
      $('h2.trigger').toggle(function(){
        $(this).css({"background": "url(/wp-content/uploads/2010/03/h2_trigger_a.gif) no-repeat scroll 0 bottom transparent"}).next(".toggle_container").slideToggle("slow")
      }, function() { 
        $(this).css({"background": "url(/wp-content/uploads/2010/03/h2_trigger_a.gif) no-repeat scroll 0 top transparent"}).next(".toggle_container").slideToggle("fast");
      });   

    }
  }

  //*************************
  //* wizard for forms
  //*************************
  function formwizard() {
    if($("#tradeEstimate").length){
      var steps = $("#tradeEstimate fieldset");
      var count = steps.size();
    
      var submitbtn = $("input[type=submit]");
      submitbtn.hide();
    
      $("#tradeEstimate").before("<ul id='steps'></ul><div class='clear'></div>");
      steps.append("<div class='clear'></div>");
    
      steps.each(function(i) {
        var name = $(this).find("legend").html();
        $("#steps").append("<li id='stepDesc" + i + "'>Step " + (i + 1) + "<span>" + name + "</span></li>");
      
        $(this).wrap("<div id='step-" + i + "' class='step'></div>");
        $(this).append("<div id='step-" + i + "commands'></div>");
             
        if(i == 0) {
          createNextButton(i);
          selectStep(i);
        } else if(i == count -1){
          $("#step-" + i).hide();
          createPrevButton(i);

        } else {
          $("#step-" + i).hide();
          createPrevButton(i);
          createNextButton(i);
        }
		
      });

       if($(".mmf-checkbox").length) {
         var checkboxes = $(".mmf-checkbox");
		checkboxes.append("<div class='clear'></div>");
       }

      $("#steps").append("<div class='clear'></div>");
    
    }
  }

  function createPrevButton(i) {
    var stepName = "step-" + i;
    $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Prev' class='prev'>&laquo; Back</a>");
    $("#" + stepName + "Prev").bind("click", function(e) {
      $("#" + stepName).hide();
      $("#step-" + (i - 1)).show();
      selectStep(i - 1);
	  $("input[type=submit]").hide(); 
    });

  }

  function createNextButton(i) {
    var stepName = "step-" + i;
	var count = $("#tradeEstimate fieldset").size();
    $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class='next'>Next &raquo;</a>");
    $("#" + stepName + "Next").bind("click", function(e) {
      $("#" + stepName).hide();
      $("#step-" + (i + 1)).show();
      selectStep(i + 1);
	  if(i + 2 == count){
		  $("input[type=submit]").show();
	  }
    });
  }

  function selectStep(i) {
    $("#steps li").removeClass("current");
    $("#stepDesc" + i).addClass("current");
  }
  
  /* Showcase Slider */
  if ($(".detail .vehicle .slideshow").length)
    $(".detail .vehicle .slideshow .scrollable").scrollable({interval: 1500, speed: 200}).autoscroll().circular();

  /* Showcase Hover Overs */
  if ($('.showcase .vehicle').length) {
    $('.showcase .vehicle').stop().hover(
      function(){ $(this).children('.trims').show(); },
      function(){ $(this).children('.trims').hide(); }
    );
  }

  /* Showcase color picker */
  if ($('.showcase .photos')) {
	  // add some clear fixes to clear floats - chad
    $('.showcase .photos, .showcase .photos .exterior-colors, .showcase .photos .interior-colors, .showcase .photos ol').append("<div class='clear'></div>");
    
	$('.showcase .photos .exterior-colors .color a').hover(function(){
	  color_class = $(this).attr('href').replace(/#/,'');
	  $('.showcase .photos .exterior-images .file').hide();
	  $('.showcase .photos .exterior-images .file.' + color_class).show();
        });
	$('.showcase .photos .exterior-colors .color a').click(function(){
	  color = $(this).children('label').html();
	  $('.add-color').append('External Color: '+color+"\n");
	  return false;
	});
	$('.showcase .photos .interior-colors .color a').click(function(){
	  color = $(this).children('label').html();
	  $('.add-color').append('Interior Color: '+color+"\n");
	  return false;
	});
  }

  /* Showcase Button to tabs */
  if ($(".showcase .vehicle-buttons a").length) {
    $('.showcase .vehicle-buttons a[target!=_blank]').click(function(){
      $('.showcase ul.tabs li a[href='+$(this).attr('href')+']').click();
      return false;
    });  
  }

	if($("#post-94").length) {
		var ribbon = $("#post-94 .ribbon");
		var collisionform = $("#post-94 .collisionform");

		ribbon.hover(function(){
			$(this).css({opacity:0.85});
		}, function() {
			$(this).css({opacity:1});
		});

		ribbon.bind('click', function() {

			$("body").append("<div id='jquery-overlay'></div>");
			$("#jquery-overlay").css({zIndex:200,background:"black",opacity:0.85,height:$(document).height()}).fadeIn();
			collisionform.css({zIndex:250}).center().fadeIn();

			$("div#jquery-overlay, .close").click(function(){
				$("body #jquery-overlay").remove();
				collisionform.hide();
			});
			return false;
		});
	}

  $("#pikame").PikaChoose({thumb_height:30,thumb_width:30}); 

});
