	var args = arguments[0] || {};
	
	var ocrNumber = args.ocrnumber;
	var starterName = args.startername;
	var starterImage = args.image;
	var tagLine = args.tagline;
	$.headLineLbl.text = starterName;
	$.descriptionLbl.text = tagLine;
	$.starterImage.image = starterImage;


	$.clientInfoWin.addEventListener('androidback', function(e) {
		if ($.parentView.visible==true){
			$.parentView.hide();
		}else{
			var optionDialog = Titanium.UI.createAlertDialog({
				title : 'Du är på väg att lämna sidan. Ifyllda uppgifter kommer att försvinna',
				buttonNames : ['OK', 'Avbryt'],
				cancel : 1,
				ok : 0,
			});
			optionDialog.show();
	
			optionDialog.addEventListener("click", function(f) {
	
				if (f.index == optionDialog.ok) {
					args.adminbutton.visible = false;
					$.clientInfoWin.close();
				} else {
					optionDialog.hide();
				}
			});
		}	
	});

	$.clientInfoWin.addEventListener("open", function(e) {
		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
			$.getAddressBtn.visible = false;
		} else {
			$.getAddressBtn.visible = true;
		}
	});
	
	function getClientInfo(){
			
			var loginReq = Titanium.Network.createHTTPClient({
				timeout : 1000,
				onload : function(e) {
					
					if(this.responseText=="fel"){
						alert("Vi ber om ursäkt, någonting gick fel. Prova igen eller skriv in dina uppgifter manuellt.");
						$.firstNameTxtfield.focus();
					}else{
					var json = this.responseText;
					var response = JSON.parse(json);
	
						$.firstNameTxtfield.value = response.GivenName;
						$.lastNameTxtfield.value = response.LastName;
						$.streetAddressTxtfield.value = response.AddressStreet+response.AddressFo+response.AddressCo;
						$.zipcodeTxtfield.value = response.AddressZip;
						$.cityTxtfield.value = response.AddressCity;
						$.homePhoneTxtfield.focus();
					}	
				}
			});
	
			loginReq.open("POST", "http://www.kopserviser.com/personsearch.php");
	
			var params = {
				pnr : $.socialSecurityNumTxtfield.value,
			};
	
			loginReq.send(params);	
	}
	

	var socialSecurityNum = " ";
	
	var first = true;
	$.socialSecurityNumTxtfield.addEventListener('focus', function f(e) {
	    if (first) {
	        first = false;
	        $.socialSecurityNumTxtfield.blur();
	
	    } else {
	    	$.socialSecurityNumTxtfield.removeEventListener('focus', f);
	    }
	});

	$.socialSecurityNumTxtfield.addEventListener("next", function(e) {
		$.socialSecurityNumTxtfield.blur();
		$.firstNameTxtfield.focus();
	});

	$.socialSecurityNumTxtfield.addEventListener("blur", function(event, type) {
		if ('' != $.socialSecurityNumTxtfield.value) {
			var temp = $.socialSecurityNumTxtfield.value;
			!!( /[^0-9]/.test(temp) ) ? $.socialSecurityNumTxtfield.value = temp.replace(/[^0-9]/gi, '') : false;
	
			socialSecurityNum = temp;
	
				if ($.socialSecurityNumTxtfield.value.length < 10) {
					alert("Personnummer ska innehålla 10 siffror.");
					$.socialSecurityNumTxtfield.focus();
				}
				
				if ($.socialSecurityNumTxtfield.value.length > 10) {
					alert("Personnummer ska innehålla 10 siffror.");
					$.socialSecurityNumTxtfield.focus();
				}
			}
	});
	$.firstNameTxtfield.addEventListener("focus", function(e){
		$.containerView.scrollTo(0, 500);
	});

	$.firstNameTxtfield.addEventListener("next", function(e){
		$.firstNameTxtfield.blur();
		$.lastNameTxtfield.focus();
	});

	$.firstNameTxtfield.addEventListener("blur", function(event, type) {
		
			if ('' != $.firstNameTxtfield.value) {
				$.firstNameTxtfield.value = $.firstNameTxtfield.value.trim();
				
		}
	});

	$.lastNameTxtfield.addEventListener("next", function(e){
		$.lastNameTxtfield.blur();
		$.streetAddressTxtfield.focus();
	});

	$.lastNameTxtfield.addEventListener("blur", function(event, type) {
		if ('' != $.lastNameTxtfield.value) {
				$.lastNameTxtfield.value = $.lastNameTxtfield.value.trim();
		}
	});

	$.streetAddressTxtfield.addEventListener("next", function(e){
		$.streetAddressTxtfield.blur();
		$.zipcodeTxtfield.focus();
	});

	var zipCode = "";
	
	$.zipcodeTxtfield.addEventListener("next", function(e){
		$.zipcodeTxtfield.blur();
		$.cityTxtfield.focus();
	});
	
	$.zipcodeTxtfield.addEventListener("blur", function(event, type) {
		if ('' != $.zipcodeTxtfield.value) {
			var temp = $.zipcodeTxtfield.value;
			!!( /[^0-9]/.test(temp) ) ? $.zipcodeTxtfield.value = temp.replace(/[^0-9]/gi, '') : false;
	
			zipCode = temp;
	
				if ($.zipcodeTxtfield.value.length < 5) {
					alert("Postnummer ska innehålla 5 siffror.");
					$.zipcodeTxtfield.focus();
				}
				
				if ($.zipcodeTxtfield.value.length > 5) {
					alert("Postnummer ska innehålla 5 siffror.");
					$.zipcodeTxtfield.focus();
				}
		}
	});

	$.cityTxtfield.addEventListener("next", function(e){
		$.cityTxtfield.blur();
		$.homePhoneTxtfield.focus();
	});


	var mobileNumber = "";
	var homePhone = "";
	
	$.homePhoneTxtfield.addEventListener("next", function(e){
		$.homePhoneTxtfield.blur();
		$.emailAddressTxtfield();
	});

	$.homePhoneTxtfield.addEventListener("blur", function(event, type) {
		if ('' != $.homePhoneTxtfield.value) {
			var temp = $.homePhoneTxtfield.value;
			!!( /[^0-9]/.test(temp) ) ? $.homePhoneTxtfield.value = temp.replace(/[^0-9]/gi, '') : false;
	
			homePhone = temp;
			
	
			var mobileNumberFirstThreeLetters = temp.substring(0, 3);
	
			switch (mobileNumberFirstThreeLetters) {
	
				case "070":
					mobileNumber = temp;
					break;
	
				case "072":
					mobileNumber = temp;
					break;
	
				case "073":
					mobileNumber = temp;
					break;
	
				case "076":
					mobileNumber = temp;
					break;
	
				default:
					mobileNumber = " ";
					break;
			}
		}
	});

	$.emailAddressTxtfield.addEventListener("return", function(e){
		$.emailAddressTxtfield.blur();
	});
	
	var emptyOne = "";
	var netWork = "";
	var sent = "no";
	
	var oriNum = ocrNumber.toString();
	
	function cleanOCR(){
		oriNum = oriNum.slice(0, -4);
		return oriNum;
	}

	function generateOrderId(){
		var currentTime = new Date();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var seconds = currentTime.getSeconds();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		
		if (month < 10){
			month = "0" + month;
		}
		if (hours < 10){
			hours = "0" + hours;
		}
		if (day < 10){
			day = "0" + day;
		}
		if (minutes < 10){
			minutes = "0" + minutes;
		}
		if (seconds < 10){
			seconds = "0" + seconds;
		}
		 
		return year+month+day+hours+minutes+seconds;
		 
		}

	function getDate() {
		var currentTime = new Date();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
	
		if (month < 10){
			month = "0" + month;
		}
		if (day < 10){
			day = "0" + day;
		}
		if (hours < 10){
			hours = "0" + hours;
		}
		if (minutes < 10){
			minutes = "0" + minutes;
		}
		 
		return year + "-" + month + "-" + day+ " " + hours + ":" + minutes;
		 
		}


	$.sendOrderBtn.addEventListener("click", function(e) {
		
		if ($.firstNameTxtfield.value == "" || $.lastNameTxtfield.value == "" || $.streetAddressTxtfield.value == "" || $.zipcodeTxtfield.value == "" || $.cityTxtfield.value == "" || $.homePhoneTxtfield.value == "" || $.emailAddressTxtfield.value == "") {
			alert("Det saknas uppgifter");
		
		} else if ($.firstNameTxtfield.value == "" && $.lastNameTxtfield.value == "" && $.streetAddressTxtfield.value == "" && $.zipcodeTxtfield.value == "" && $.cityTxtfield.value == "" && $.homePhoneTxtfield.value == "" && $.emailAddressTxtfield.value == "") {
			alert("Det saknas uppgifter");
	
		} else {
			
			$.thankYouView.visible=true;
			var db = Ti.Database.open('Fyrklovern');
			db.execute('INSERT INTO clientorder(firstname, lastname, street, zipcode, city, homephone, email, emptyone, sms, ocrnumber, socialsecurity, mobilephone, orderid, startername, network, originalocr, date, ifsent) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', $.firstNameTxtfield.value , $.lastNameTxtfield.value, $.streetAddressTxtfield.value, zipCode, $.cityTxtfield.value, homePhone, $.emailAddressTxtfield.value, emptyOne, mobileNumber, ocrNumber, socialSecurityNum , mobileNumber, generateOrderId(), $.headLineLbl.text, netWork, cleanOCR(), getDate(), sent);
			db.close();
	
			
	
			$.firstNameTxtfield.value = "";
			$.lastNameTxtfield.value = "";
			$.streetAddressTxtfield.value = "";
			$.zipcodeTxtfield.value = "";
			$.cityTxtfield.value = "";
			$.homePhoneTxtfield.value = "";
			$.emailAddressTxtfield.value = "";
			$.starterImage.image = "";
			$.socialSecurityNumTxtfield.value = "";
			$.headLineLbl.text = "";
			
			setTimeout(function() 
					{   $.clientInfoWin.close();
					}, 8000);
			}
	});
	
	$.changeStarterBtn.addEventListener("click", function(e){
	$.parentView.visible = true;
	});

	var curr = 0;
	var gridView = [];
	
	function populateGridView(id, startername, ocrnumber, image, imagename, tagline) {
	  		var containerView = Ti.UI.createView({
	    		width:"50%",
	    		height:"480dp",
	            left:0,
	            right:0,
	            backgroundColor:"#fff",
	            borderColor:"#CCC",
	            borderWidth:"2dp",
	            startername:startername,
	            
	            
	    	});
	  		containerView.addEventListener("click", function(e){
	         	$.starterImage.image = image;
	     		ocrNumber = ocrnumber;
	     		oriNum = ocrnumber.toString();
	     		$.headLineLbl.text = startername;
	     		$.descriptionLbl.text = tagline;
	     		$.parentView.visible = false;
	
	         });
	  		$.gridView.add(containerView);
	    	var img = Ti.UI.createImageView({
	            height: "350dp",
	            width: "350dp",
	            top:"20dp",
	            image: image,
	            bubbleParent:true,
	        });
	    	containerView.add(img);
	        
	        var label = Ti.UI.createLabel({
	        	width:"auto",
	        	height:"auto",
	        	bottom:"70dp",
	        	text:startername,
	        	color:"#4C4C4C",
	        	font:{
	  		      fontSize:"26sp",
	  		      fontFamily: "GretaTextStdLight",
	  		      bubbleParent:true,
	  		   },
	        });
	        containerView.add(label);
	        
	        var button = Ti.UI.createButton({
	        	width:"180dp",
	        	height:"50dp",
	        	bottom:"10dp",
	        	title:"Välj",
	        	color:"#006699",
	        	backgroundColor:"#fff",
	        	borderWidth:"3dp",
	        	borderColor:"#006699",
	        	font:{
	        		fontSize:"24sp",
	        		fontFamily: "GretaTextStdRegularItalic"
	        		   },
	        	bubbleParent:true,
	        	
	        });
	        containerView.add(button);
	        
	       
	        gridView[curr]=containerView;
	        curr++;
	    }
	
	
	function updateGrid(){
		gridView =[];
		 var db = Ti.Database.open("Fyrklovern");
		 var sql = db.execute('SELECT id, startername, ocrnumber, image, imagename, tagline FROM starterpackage');
		 
	
			while(sql.isValidRow()){
		    		
			         
			       			var id =  sql.fieldByName("id");
			                var startername= sql.fieldByName("startername");
			                var ocrnumber= sql.fieldByName("ocrnumber");
			                var image = sql.fieldByName("image");
			                var imagename = sql.fieldByName("imagename");
			                var tagline=  sql.fieldByName("tagline");
			   	      
			               
			         populateGridView(id, startername, ocrnumber, image, imagename, tagline);
			         sql.next();
		        }
		        sql.close();
		        db.close();
	}  
	function showConditions(){
		$.conditionView.visible = true;
		$.conditionHeadLbl.visible = true;
		$.conditionBodyLbl.visible = true;
		$.closeConditionsBtn.visible = true;
	}
	
	function closeConditionsWin(){
		$.conditionView.visible = false;
		$.conditionHeadLbl.visible = false;
		$.conditionBodyLbl.visible = false;
		$.closeConditionsBtn.visible = true;
	}
	
	updateGrid();