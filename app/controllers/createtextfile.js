	var args = arguments[0] || {};
	
	var outputFile;
	var exportFileName = txtFileCreationDate() + ".txt";
	
	$.createTxtFileWin.addEventListener("androidback", function(e) {
	$.createTxtFileWin.close();
	});
	
	function openAdminWin() {
	$.createTxtFileWin.close();
	}

	var exportCsvData = function(input) {
		var rowTxt = "";
		for (var i = 0; i < input.length; i++) { // row iteration
			for (var j = 0; j < input[i].length; j++) { // column iteration
				rowTxt += input[i][j];
	
				if (j < (input[i].length)) {
					rowTxt += ';';
				}
			}
			rowTxt += "\r\n";// adding new line at end of row
		}
	
		var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory,'mysubdir');
		if(!dir.exists()){
			dir.createDirectory();
		}
		
		// creating output file on sd card
		var exportFileName = txtFileCreationDate() + ".txt";
		var outputFile = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + 'mysubdir/', exportFileName);
		
		// writing data in output file
		outputFile.write(rowTxt);
		outputFile = null;
		dir = null;
		
		
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.subject = "Order från mässa";
		emailDialog.toRecipients = ['berit.andersson@fyrklovern.se'];
		emailDialog.messageBody = 'Hej Berit,\nen mässorder.\n\nHälsningar till Dig från alla glada säljare på mässan!';
	
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + 'mysubdir/' + exportFileName);
		
		emailDialog.addAttachment(file);
	
		if (emailDialog.isSupported()) {
			emailDialog.open();
		} else {
			alert('Konfigurera din e-post');
		}
		emailDialog
				.addEventListener(
						'complete',
						function(e) {
	
							if (e.result == emailDialog.SENT) {
								var db = Ti.Database.open('Fyrklovern');
								db.execute('UPDATE clientorder SET ifsent = "yes" WHERE ifsent="no"');
								db.close();
							}
							if (e.result == emailDialog.FAILED) {
	
							}
						});
	
	};

	var createTextFile = function() {
		var input = csvDatapush();
		exportCsvData(input);
		$.txtFileTableView.setData(getTableViewContent());
	};
	
	$.createTxtFileBtn.addEventListener("click", function(e){
		createTextFile();
	});
	
	
	function getTableViewContent() {
		var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory,'mysubdir');
		var list = dir.getDirectoryListing();
		var resultList = list.toString().split(',');
		Ti.API.info('list : ' + resultList);
		
		var data = [];
		for (var i=0; i < resultList.length; i++) {
			var row = Ti.UI.createTableViewRow({
				height : "100dp",
				rowId:i,
				txtFile:resultList[i],
				value: Titanium.Filesystem.externalStorageDirectory + Titanium.Filesystem.separator + resultList[i],
			});
	
			var txtFileLbl = Ti.UI.createLabel({
				text : resultList[i],
				top:"10dp",
				color:"#4C4C4C",
				font : {
					fontFamily : "GretaTextStdMedium",
					fontSize : '20sp',
				},
				left : "20dp",
				width : "auto",
				height : "auto",
				color : "#000000",
		
			});
			row.add(txtFileLbl);
	
			var sendOrderBtn = Ti.UI.createButton({
				title : "Skicka igen",
				height : "44dp",
				width : "150dp",
				right : "20dp",
				color:"#006699",
				borderColor:"#006699",
				borderWidth:"3dp",
				backgroundColor:"#fff",
				font:{
					fontSize:"24sp",
					fontFamily: "GretaTextStdRegularItalic"
					   },
				bubbleParent : true,
				x:"sendBtn",
			});
			row.add(sendOrderBtn);
			
			var deleteTxtFile = Ti.UI.createButton({
				title : "Ta bort",
				height : "44dp",
				width : "99dp",
				left : "20dp",
				bottom:"10dp",
				color:"#E5E5E5",
				borderColor:"#E5E5E5",
				borderWidth:"3dp",
				backgroundColor:"#fff",
				font:{
					fontSize:"24sp",
					fontFamily: "GretaTextStdRegularItalic"
					   },
				bubbleParent : true,
				x:"deleteBtn",
			});
			row.add(deleteTxtFile);
	
			data.push(row);
		}
		
		list = null;
		dir = null;
		
		return data;
	};
	
	$.txtFileTableView.setData(getTableViewContent());
	
	
	function clickedRow(e){
		if(e.source.x == "sendBtn"){
			var emailDialog = Ti.UI.createEmailDialog();
			emailDialog.subject = "Order från mässa";
			emailDialog.toRecipients = ['berit.andersson@fyrklovern.se'];
			emailDialog.messageBody = 'Hej Berit,\nen mässorder.\n\nHälsningar till Dig från alla glada säljare på mässan!';
	
			var outputFile = Titanium.Filesystem
			.getFile(Titanium.Filesystem.externalStorageDirectory
			+ 'mysubdir/' + e.rowData.txtFile);
	
			emailDialog.addAttachment(outputFile);
	
			if (emailDialog.isSupported()) {
			emailDialog.open();
			} else {
			alert('Konfigurera din e-post');
			}
			
		}else if(e.source.x == "deleteBtn"){
			var optionDialog = Titanium.UI.createAlertDialog({
				title : 'Vill du radera filen?',
				buttonNames : ['OK', 'Avbryt'],
				cancel : 1,
				ok : 0,
				});
				optionDialog.show();
	
				optionDialog.addEventListener("click", function(f) {
	
				if (f.index == optionDialog.ok) {
				var outputFile = Titanium.Filesystem
				.getFile(Titanium.Filesystem.externalStorageDirectory
				+ 'mysubdir/' + e.rowData.txtFile);
	
				outputFile.deleteFile();
				$.txtFileTableView.deleteRow(e.index);
	
				} else {
				optionDialog.hide();
				}
				});
			
		}else{
			
		}
		
	}


	function csvDatapush(){
		var input = [];	
		var sent = "Skickat";

		var db = Ti.Database.open("Fyrklovern");
	
	     var rows = db.execute('SELECT firstname, lastname, street, zipcode, city, homephone, email, emptyone, sms, ocrnumber, socialsecurity, mobilephone, orderid, startername, network, originalocr, date FROM clientorder WHERE ifsent = "no"');
	     //var empty = "";
	
	     while (rows.isValidRow()){
	    	 input.push([rows.fieldByName('firstname'), rows.fieldByName('lastname'), rows.fieldByName('street'), rows.fieldByName('zipcode'), rows.fieldByName('city'), rows.fieldByName('homephone'), rows.fieldByName('email'), rows.fieldByName('emptyone'), rows.fieldByName('sms'), rows.fieldByName('ocrnumber'), rows.fieldByName('socialsecurity'), rows.fieldByName('mobilephone'), rows.fieldByName('orderid'), rows.fieldByName('startername'), rows.fieldByName('network'), rows.fieldByName('originalocr'), rows.fieldByName('emptyone'), rows.fieldByName('emptyone'), rows.fieldByName('emptyone'), rows.fieldByName('date')]);
	    	 rows.next();
	     };
	     rows.close();
	     db.close();
	     return input;
	};
	
	function txtFileCreationDate() {
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
			if (day < 10){
			day = "0" + day;
			}
			if (hours < 10){
			hours = "0" + hours;
			}
			if (minutes < 10){
			minutes = "0" + minutes;
			}
			if (seconds < 10){
			seconds = "0" + seconds;
			}
		
		return year + "-" + month + "-" + day+ "_" + hours + minutes + seconds;
	}
