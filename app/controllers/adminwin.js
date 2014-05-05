	var args = arguments[0] || {};
	var adminBtn = args.adminbutton;
	var imageFile;
	var imageDir;
	var myImageID;
	var currentImage;

	$.adminWin.addEventListener('androidback', function(e) {
	   adminBtn.visible = false;
	   $.adminWin.close();
	});

	function openTxtFileWin(){
		var createTxtFileWin = Alloy.createController('/createtextfile').getView();
			createTxtFileWin.open();
	}

	function pickPhotoFromGallery(){
	
		Titanium.Media.openPhotoGallery({
			success : function(event) {
			blobOfImage = event.media;
			
				if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				
				$.imageFromGallery.image = blobOfImage;
				myImageID = new Date().getTime() + ".jpg";
				
				var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory,'myimagedir');
					if(!dir.exists()){
					dir.createDirectory();
					}

				imageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + 'myimagedir/', myImageID);
				imageFile.write(blobOfImage);
				
				currentImage = imageFile.name;
				return imageFile.nativePath;

			}
		},
	});
}


	var first = true;
	$.ocrTxtfield.addEventListener('focus', function f(e) {
	    if (first) {
	        first = false;
	        $.ocrTxtfield.blur();
	    } else {
	        $.ocrTxtfield.removeEventListener('focus', f);
	    }
	});


	function addToList(){
		
		if($.ocrTxtfield.value=="" || $.imageFromGallery.image==null || $.starternameTxtfield.value=="" || $.taglineTxtfield.value==""){
	        alert("Du har missat att välja bild eller fylla i alla fält");
	    
		}else{
	    	var db = Ti.Database.open('Fyrklovern');
	        db.execute('INSERT INTO starterpackage (startername, ocrnumber, image, imagename, tagline) VALUES (?,?,?,?,?)', $.starternameTxtfield.value, $.ocrTxtfield.value, imageFile.nativePath, currentImage, $.taglineTxtfield.value);
	        db.close();
	        
	        updateTableView();       
	        
	        $.ocrTxtfield.value="";
	        $.starternameTxtfield.value="";
	        $.taglineTxtfield.value ="";
	        $.imageFromGallery.image = null;
	        $.ocrTxtfield.blur();
	        $.starternameTxtfield.blur();
	        $.taglineTxtfield.blur();
	    }
	}
  
	function closeChangeOcrView(){
		$.changeOcrView.visible = false;
	}   

	var data = [];
	
	function populateTableView(id, startername, ocrnumber, image, imagename, tagline) {
	    var row = Ti.UI.createTableViewRow({
	            height:"133dp",
	            rowid:id,
	            imagename:imagename,
	    });
	        
	    var starterImageImgView = Ti.UI.createImageView({
	            height:"93dp",
	            width:"105dp",
	            left:"10dp",
	            image:image
	        });
	        row.add(starterImageImgView);
	        
	    var ocrNumberLbl = Ti.UI.createLabel({
	            text:ocrnumber,
	            top:"25dp",
	            left:"150dp",
	            width:"auto",
	            height:"auto",
	            color:"#4C4C4C",
	            font:{
	   				fontSize:"20sp",
	   				fontFamily: "GretaTextStdMedium"
	   		   },
	    });
	    row.add(ocrNumberLbl);
	    
	    var starterNameLbl = Ti.UI.createLabel({
	            text:startername,
	            top:"55dp",
	            left:"150dp",
	            width:"auto",
	            height:"auto",
	            color:"#4C4C4C",
	            font:{
	   				fontSize:"20sp",
	   				fontFamily: "GretaTextStdMedium"
	   		   },
	    });
	    row.add(starterNameLbl);
	    
	    var taglineLbl = Ti.UI.createLabel({
		        text:tagline,
		        top:"85dp",
		        left:"150dp",
		        width:"auto",
		        height:"auto",
		        color:"#4C4C4C",
		        font:{
		        	fontSize:"20sp",
					fontFamily: "GretaTextStdMedium"
				   },
		});
		row.add(taglineLbl);
	    
	    data.push(row); 
	}

	function updateTableView() {
	
		var db = Ti.Database.open("Fyrklovern");
		var sql = db.execute('SELECT id, startername, ocrnumber, image, imagename, tagline FROM starterpackage');
		data = [];    
			
			while(sql.isValidRow()){
	    
			    var id = sql.fieldByName("id");
			    var startername = sql.fieldByName("startername");
			    var ocrnumber = sql.fieldByName("ocrnumber");
			    var image = sql.fieldByName("image");
			    var imagename = sql.fieldByName("imagename");
			    var tagline = sql.fieldByName("tagline");
			    
			    populateTableView(id, startername, ocrnumber, image, imagename, tagline);
			    
			    sql.next();
			}
	    sql.close();
	    db.close();
	    $.adminTableView.setData(data);
	}
	

	$.adminTableView.addEventListener('click', function(e) {
	    rowId = e.index;
	    var optionDialog = Titanium.UI.createAlertDialog({
	            title:'Vad vill du göra?',
	            buttonNames:['Radera', 'Ändra OCR', 'Avbryt'],
	            cancel:2,
	            delete:0,
	            change:1,
	        });
	       optionDialog.show();
	       
	       optionDialog.addEventListener("click", function(f) {
	    	   
	    	   if (f.index == optionDialog.delete) {
	    		   $.adminTableView.deleteRow(e.index);
			       
	    		   var db = Ti.Database.open("Fyrklovern");
			       db.execute("DELETE FROM starterpackage WHERE id = " + e.rowData.rowid);
			       db.close();
			       
			       updateTableView(); 
			       
			       var outputFile = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + 'myimagedir/' + e.rowData.imagename);
			       		outputFile.deleteFile();
	
	    	   }else if (f.index == optionDialog.change){
	            rowId = e.rowData.rowid;
	            var changeOcrView = Ti.UI.createView({
	                height:"224dp",
	                width:"420dp",
	                backgroundColor:"#006699",
	                });
	            $.adminWin.add(changeOcrView);
	            
	            var changeOcrTxtfield = Ti.UI.createTextField({
	                top:"50dp",
	                right:"10dp",
	                left:"10dp",
	                height:"auto",
	                hintText:"Nytt OCRnummer",
	                color:"#828282",
	        		hintText : "Nytt OCR-nummer",
	                keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
	                returnKeyType : Ti.UI.RETURNKEY_DONE,
	        		font:{
	        		      fontSize:"20sp",
	        		      fontFamily: "GretaTextStdLight"
	        		   },
	            });
	            changeOcrView.add(changeOcrTxtfield);
	            
	            var closeBtn = Ti.UI.createButton({
	                title:"Stäng",
	                height:"60dp",
	                width:"130dp",
	                bottom:"30dp",
	                left:"20dp",
	                color:"#fff",
	                borderWidth:"3dp",
	                borderColor:"#fff",
	                backgroundColor:"#006699",
	                font:{
	                	fontSize:"24sp",
	            		fontFamily: "GretaTextStdRegularItalic"
	            		   }, 
	            });
	            changeOcrView.add(closeBtn);
	            
	            closeBtn.addEventListener("click", function(e){
	                changeOcrView.visible = false;
	            });
	
	            var doneBtn = Ti.UI.createButton({
	            	 title:"Klar",
	                 height:"60dp",
	                 width:"130dp",
	                 bottom:"30dp",
	                 right:"20dp",
	                 color:"#fff",
	                 borderWidth:"3dp",
	                 borderColor:"#fff",
	                 backgroundColor:"#006699",
	                 font:{
	                 	fontSize:"24sp",
	             		fontFamily: "GretaTextStdRegularItalic"
	             		   },
	            });
	            changeOcrView.add(doneBtn);
	            
	            doneBtn.addEventListener("click", function(e){
	                var db = Ti.Database.open('Fyrklovern');
	                db.execute("UPDATE starterpackage SET ocrnumber = '"+changeOcrTxtfield.value+"' WHERE id = "+rowId);            
	                db.close();
	
	                updateTableView();  
	                changeOcrView.visible = false;
	
	                changeOcrTxtfield.blur();
	                
	            });
	        }
	    });  
	});

	updateTableView();