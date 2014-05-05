	
	$.starterwin.addEventListener("longpress", function(e){
		$.admin.visible = true;
	});
	
	
	function openAminWin(){
		   var adminWin = Alloy.createController('/adminwin', {"adminbutton": $.admin}).getView();
		   adminWin.open();
		   $.starterwin.close();
	}
	
	
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
	  		$.gridView.add(containerView);
	  		
	  		containerView.addEventListener("click", function(e){
	        	var clientInfoWin = Alloy.createController('/clientinfowin', {adminbutton: $.admin, ocrnumber: ocrnumber, image: image, startername: startername, tagline: tagline}).getView();
	        	clientInfoWin.open();
	  		});
	  		var img = Ti.UI.createImageView({
	            height: "350dp",
	            top:"20dp",
	            bottom:"100dp",
	            left:"25dp",
	            right:"25dp",
	            image:image,
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
	  		      fontFamily: "GretaTextStdLight"
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
	        	bubbleParent:true,
	        	font:{
	        		fontSize:"24sp",
	        		fontFamily: "GretaTextStdRegularItalic"
	        		   },
	        	
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
	updateGrid();
	
