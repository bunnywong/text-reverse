function text_reverse( str ){
	
		function refine_symbol( character ){
		
			var char_group1 = '〔【「『《〈｛（(“';
			var char_group2 = '〕】」』》〉｝）)”';
			 char_group1.indexOf('(');
			char_group2.charAt(5);
			
			if( char_group1.indexOf(character) > 0 ){
				var this_pos = char_group1.indexOf(character);
				
				return char_group2.charAt(this_pos);
			}else if( char_group2.indexOf(character) > 0 ){
				var this_pos = char_group1.indexOf(character);
				
				return char_group1.charAt(this_pos);
			}else{
				return character;
			}
		
		//	--------------------------------------------------
		
			var replace_character = [	['(', ')'],				
								['（', '）'],					
								['[', ']'],					
								['<', '>'],					
								['{', '}'],
								['{', '}'],
								['“', '”']
							];
						
			for( var i = 0; i < replace_character.length; i++ ){
				if( character == replace_character[i][0] ){
					character = replace_character[i][1];
					console.log('Round: 1');
					break;
				}else if( character == replace_character[i][1] ){
					character = replace_character[i][0];
					console.log('Round: 2');
					break;
				}
			}
			
			return character;
			
		}// !refine_symbol
		
		//	--------------------------------------------------
		
		function to_array( str, line_brake ){
		
			var str_array = [];
			var each_line_str = line_brake;

			while (str) {
				if (str.length < each_line_str) {
					str_array.push(str);		break;				
				}
				else {
					str_array.push(str.substr(0, each_line_str));
					str = str.substr(each_line_str);
				}
			}
			
			return str_array;
			
		}// !to_array()
		
		//	--------------------------------------------------
		
		/*	Panel
		--------------------	*/
	
		var result		= '';		
		var line_brake = 20;
		
		str = str.trim();
		str = to_array(str, line_brake);
		
		for(var i = 0; i < str.length; i++ ){		// By array key
			var countdown	= str[i].length - 1;	
			
			for( var j = 0; j < str[i].length; j++ ) {
				result += refine_symbol( str[i].charAt(countdown) );
				countdown--;
			}		
			
			result += '\n';
		}
		
		return result;
		
	}// !text_reverse()
	
	//	----------------------------------------------------------------------------------------------------
	
	function do_swap(){
	
		var user_text = $('#text_in').val();					// Get text
		
		if( user_text == '' ){	
			focus_field('text_in');								// Redirect -> #text_in
		}else{
			$('#text_out').val( text_reverse(user_text) );		// Write text
			focus_field('text_out');							// Redirect -> #text_out
		}
		
	}// !do_swap()
	
	//	----------------------------------------------------------------------------------------------------
	
	function focus_field( action ){
	
		if( action == 'text_in' ){
			$('#text_in').focus().addClass('highlight');	// addClass special for initial use only
		}else{
			$('#text_out').select();
		}
		
	}// !focus_field()
	
	//	----------------------------------------------------------------------------------------------------

	function setup(){
		
		// Initial focus
		focus_field('text_in');
		
		// Click to swap
		$('.run').click(function(){
			do_swap();
		});
		
		// Highlight background
		$('#text_in, #text_out').focus(function(){
			$(this).addClass('highlight');
		}).focusout(function(){
			$(this).removeClass('highlight');
		});
		
		// Change mode
		$('#menu').change(function(){
			mode = $(this).val();
			console.log('Mode: ' + mode);
		});
		
	
		// New file
		$('.new_file').click(function(){			
			$('#text_in, #text_out').val('');	// Clean data
			focus_field('text_in');			
		});
		
	}// !setup()
		
	//	----------------------------------------------------------------------------------------------------
	
	
	//	----------------------------------------------------------------------------------------------------
			
	//	------------------------------------------------//
	//						P A N E L					//
	//	------------------------------------------------//
	
	var mode = 'swap_standard';			// Initial mode
	
	jQuery( document ).ready(function(){
		
		setup();
	
	});
	
	//	--------------------------------------------------
	