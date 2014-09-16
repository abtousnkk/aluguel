$(document).ready(function() {
	
	// Menu botão e ação
	// ----------------------------------------------------------
	
	$('#menubt').click(function() {
		$(this).toggleClass('menu-ativo');
		$('.corpo, .header').toggleClass('menu-ativo-corpo')
		$('.menu').toggleClass('menu-ativo');
	});
	
	
	

	// Form input e label
	// -----------------------------------------------------------
	
	$('.form-input').focusout(function() {
		if ( $(this).val() != '' ) {
			$(this).next().addClass('form-label-check');
		} else {
			$(this).next().removeClass('form-label-check');
		}
	});
	
	//$('.form-input-picture').on("click",carregaimg);function carregaimg(){alert('oioio');}
		
	$('.form-input-picture').on('keyup change', function() {
		$(this).addClass('photoselect');
	});
	

	
	// Form funções dos icones	
	// -----------------------------------------------------------
	
	$('.icone-add').click(function() {
		$('.form-list-check:last-child').after($('<li class="form-list-check"><div class="icone-circle icone-circle-cinza icone-delet"></div><input type="text" class="form-input addinput" name="" placeholder="Nome Item" /><input type="number" class="form-input form-list-check-qtd" name="" placeholder="Qtd" /></li>'));
		$('.icone-delet').click(function() {
			$(this).parent('.form-list-check').remove()
		});
		$('.addinput').focus();
	});
	
	
	$('.icone-delet').click(function() {
		$(this).parent('.form-list-check').remove()
	});
	
	
	
	// Form botão pega endereço
	// -----------------------------------------------------------
	
	$('#getend').click(function() {
	//I'm not doing anything else, so just leave
		if(!navigator.geolocation) return;
		
		navigator.geolocation.getCurrentPosition(function(pos) {
			geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
			geocoder.geocode({'latLng': latlng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					//Check result 0
					var result = results[0];
					//look for locality tag and administrative_area_level_1
					var city = "";
					var state = "";
					result.address_components[1];
					result.address_components[2];
					for(var i=0, len=result.address_components.length; i<len; i++) {
						console.log(result);
						var ac = result.address_components[i];
						if(ac.types.indexOf("locality") >= 0) city = ac.long_name;
						if(ac.types.indexOf("administrative_area_level_1") >= 0) state = ac.long_name;
					}
					//only report if we got Good Stuff
					if(city != '' && state != '') {
						$('#getendereco').val(""+result.address_components[1]['long_name']+", "+result.address_components[2]['long_name']+"");
						$('#getendereco').focus();
						//$("#result").html("Hello to you out there in "+result.address_components[1]['long_name']+", "+result.address_components[2]['long_name']+"!");
						//$("#result").html("Hello to you out there in "+city+", "+state+"!");
					}
				} 
			});
		
		});
	});




	
});