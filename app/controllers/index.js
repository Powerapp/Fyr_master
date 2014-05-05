 
var db = Ti.Database.open('Fyrklovern');
//db.execute('DROP TABLE IF EXISTS starterpackage');
//db.execute('DROP TABLE IF EXISTS clientorder');

db.execute('CREATE TABLE IF NOT EXISTS starterpackage(id INTEGER PRIMARY KEY, startername TEXT, ocrnumber TEXT, image TEXT, imagename TEXT, tagline TEXT)');
db.execute('CREATE TABLE IF NOT EXISTS clientorder(id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, street TEXT, zipcode TEXT, city TEXT, homephone TEXT, email TEXT , emptyone TEXT, sms TEXT, ocrnumber INT, socialsecurity TEXT, orderid TEXT, startername TEXT, network TEXT, originalocr TEXT, mobilephone TEXT, date TEXT, ifsent TEXT)');

db.close();

/*$.container.addEventListener("androidback", function(e){
	$.container.close();
});*/

function openStarterWin(){
	 var starterWin = Alloy.createController('/starterwin').getView();
	 starterWin.open();
}

$.index.open();

