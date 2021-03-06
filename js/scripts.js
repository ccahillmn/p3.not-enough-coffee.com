/*-------------------------------------------------------------------------------------------------
Initialize UI
-------------------------------------------------------------------------------------------------*/
$(document).ready(function(){

	 // Intit tabs and slider UI
	$(function(){
		$( ".slider" ).slider();
		$( "#generator" ).tabs({active:0});
	});
	
	// Init image carousels
	$(".picker").carouFredSel({
		circular: false,
		infinite: false,
		height: "auto",
		width: "variable",
		items: {
			visible: 5,
			width: 100,
			height: 100
		},
		auto: false,
		prev		: {
			button		: function() {
				return $(this).parents(".wrapper").find(".prev");
			}
		},
		next		: {
			button		: function() {
				return $(this).parents(".wrapper").find(".next");
			}
		},
	});
	
	// Init icon resizer
	$("#resize").slider({
		value: 125,
		max: 250,
		min: 0,
		slide: function(event, ui) {
			$( "#icon" ).width(ui.value);
			$( "#icon" ).height(ui.value);
	   }
	});
	
	// Init icon rotator
	$("#icon_rotate").slider({
		value: 0,
		max: 180,
		min: -180,
		slide: function(event, ui) {
			$( "#icon" ).css({ 
				'WebkitTransform': 'rotate(' + ui.value + 'deg)',
				 '-moz-transform': 'rotate(' + ui.value + 'deg)',
				 '-ms-transform':'rotate('+ ui.value +'deg)',
			});
		}
	});
	
	// Init text rotators
    $( ".rotate").each(function() {
	
		var item = $(this).closest('div.row').attr('id');
		
		$(this).slider({
			value: 0,
			max: 180,
			min: -180,
			slide: function(event, ui) {
				$("#" + item + "_text").css({ 
					'WebkitTransform': 'rotate(' + ui.value + 'deg)',
					 '-moz-transform': 'rotate(' + ui.value + 'deg)',
					 '-ms-transform':'rotate('+ ui.value +'deg)',
				});
			}
		});
    });	
});	

/*-------------------------------------------------------------------------------------------------
Image chooser
-------------------------------------------------------------------------------------------------*/

$('.thumb').click(function() {

	// Get chosen shape
	var new_shape = $(this).html();
	var layer;
	var fill;
    
	// Get element to update
	if ($(this).hasClass('badges')){
		layer = '#badge';
		fill = badge_color
	}
	else {
		layer = '#icon';
		fill = icon_color;
		
		$('#icon').css('cursor','move').draggable({ containment: "parent" });
	}
	
	// Update the image
	$(layer).html(new_shape);
	$(layer + ' .shape').css('fill', fill);

});   

/*-------------------------------------------------------------------------------------------------
Text input
-------------------------------------------------------------------------------------------------*/
$('.text').keyup(function(){
    
    // Get user input
	var text = $(this).val();
    var section = '#' + $(this).closest('div.row').attr('id');
    var length = text.length;
    var count = 20-length;
    
    // Show error if too long
    if (length >= 21){
        $(section).addClass('has-error').removeClass('has-warning');
        $(section + '_error').html('<strong>' + count + '</strong> Your text is too long').addClass('text-danger').removeClass('text-warning');
    }
    else {
        // Else hide error
        $(section + '_error').html('<strong>' + count + '</strong> characters left')
        
        // Show warning when close to limit
        if(length > 15){
            $(section).addClass('has-warning').removeClass('has-error');
            $(section + '_error').addClass('text-warning').removeClass('text-danger');
            
            $(this).blur(function() {
                $(section).removeClass('has-warning');
                $(section + '_error').removeClass('text-warning');
            });
        }
        else{
            $(section).removeClass('has-warning has-error');
            $(section + '_error').removeClass('text-warning text-danger');
        }
        
        // Get text location
        var location = section + '_text';
        
        // Insert text onto preview
        $(location).html(text);
		
		// Make text draggable
		$(location).css('cursor','move').draggable({ containment: "parent" });
		
		// Dynamically center text
		var margin = (290-$(section + '_text').width())/2;
		$(section + '_text').css('left', margin);
    }
});

$('select').change(function() {

    // Get selected font
    var fontName = $(this).val();
    
    // Change text font
    $('#preview p').css('font-family',"'" + fontName + "'");
    
});
    

/*-------------------------------------------------------------------------------------------------
Color chooser
-------------------------------------------------------------------------------------------------*/

// Init shape colors
var badge_color = '#c32b40';
var icon_color= '#000';

$('.color').change(function() {
    
	// Get chosen color
	var new_color = $(this).val();

	// Get element to change
	var item = $(this).closest('div').attr('id');
	
	// Update element color
	switch (item) {
		case 'top_color':
			$('#top_text').css('color', new_color);
			break;
		
		case 'mid_color':
			$('#mid_text').css('color', new_color);
			break;
		
		case 'bottom_color':
			$('#bottom_text').css('color', new_color);
			break;
		
		case 'badge_bg':
			$('#badge .shape').css('fill', new_color);
			badge_color = new_color;
			break;
		
		case 'icon_bg':
			$('#icon .shape').css('fill', new_color);
			icon_color = new_color;
			break;

		case 'preview_bg':
			$('#preview').css('background-color', new_color);
			break;
	}
});

/*-------------------------------------------------------------------------------------------------
Reset interface
-------------------------------------------------------------------------------------------------*/

$("#reset").click(function() {

	// Reset Text
	$("#text input").val("");
	$("#preview p").css('font-family','Arvo')
	$("#font").val("Arvo");
	
	// Reset Sliders
	$("#icon, #badge, #preview p").html("").css({ 
				'WebkitTransform': 'rotate(0deg)',
				 '-moz-transform': 'rotate(0deg)',
				 '-ms-transform':'rotate(0deg)',
			});
	$("#resize").slider({value: 125});
	$("#rotate, .rotate").slider({value: 0});
	
	// Reset Colors
	$('.color').each(function(){
	    
	    var item = $(this).attr('id');
	    
        switch (item) {
		case 'topcolor': case 'midcolor': case 'bottomcolor':
			var defaultColor = '#2C3E50';
			var textColor = '#fff';
			$("#preview p").css('color',defaultColor);
			break;
		case 'badgecolor':
			var defaultColor = '#C32B40';
			var textColor = '#fff';
			badge_color = defaultColor;
			break;
		case 'iconcolor':
			var defaultColor = '#000000';
			var textColor = '#fff';
			icon_color = defaultColor;
			break;
		case 'bbgcolor':
			var defaultColor = '#ffffff';
			var textColor = '#000';
			$('#preview').css('background-color', defaultColor);
        }
        $(this).val(defaultColor);
        $(this).css('background-color',defaultColor);
        $(this).css('color',textColor);
	});
});

/*-------------------------------------------------------------------------------------------------
Reset interface
-------------------------------------------------------------------------------------------------*/

$('#save').click(function() {
	
	// Get preview image html
    var badge_clone = $('#preview').clone();
    var badge = badge_clone.prop('outerHTML'); 
    
	// Combine preview html with css
    var new_tab_contents  = '<html>';
    new_tab_contents += '<head>';
    new_tab_contents += '<link rel="stylesheet" href="css/boostrap.css" type="text/css">'; // Don't forget your CSS so the card looks good in the new tab!
    new_tab_contents += '<link rel="stylesheet" href="css/style.css" type="text/css">';
    new_tab_contents += '</head>';
    new_tab_contents += '<body>'; 
    new_tab_contents += badge; 
    new_tab_contents += '</body></html>';
    
	// Open new tab
    var new_tab =  window.open();
    new_tab.document.open();
    
	// Render badge in new tab
    new_tab.document.write(new_tab_contents);

    new_tab.document.close();

    		
});
