function Controller() {
    function openTxtFileWin() {
        var createTxtFileWin = Alloy.createController("/createtextfile").getView();
        createTxtFileWin.open();
    }
    function pickPhotoFromGallery() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                blobOfImage = event.media;
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    $.imageFromGallery.image = blobOfImage;
                    myImageID = new Date().getTime() + ".jpg";
                    var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, "myimagedir");
                    dir.exists() || dir.createDirectory();
                    imageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + "myimagedir/", myImageID);
                    imageFile.write(blobOfImage);
                    currentImage = imageFile.name;
                    return imageFile.nativePath;
                }
            }
        });
    }
    function addToList() {
        if ("" == $.ocrTxtfield.value || null == $.imageFromGallery.image || "" == $.starternameTxtfield.value || "" == $.taglineTxtfield.value) alert("Du har missat att välja bild eller fylla i alla fält"); else {
            var db = Ti.Database.open("Fyrklovern");
            db.execute("INSERT INTO starterpackage (startername, ocrnumber, image, imagename, tagline) VALUES (?,?,?,?,?)", $.starternameTxtfield.value, $.ocrTxtfield.value, imageFile.nativePath, currentImage, $.taglineTxtfield.value);
            db.close();
            updateTableView();
            $.ocrTxtfield.value = "";
            $.starternameTxtfield.value = "";
            $.taglineTxtfield.value = "";
            $.imageFromGallery.image = null;
            $.ocrTxtfield.blur();
            $.starternameTxtfield.blur();
            $.taglineTxtfield.blur();
        }
    }
    function closeChangeOcrView() {
        $.changeOcrView.visible = false;
    }
    function populateTableView(id, startername, ocrnumber, image, imagename, tagline) {
        var row = Ti.UI.createTableViewRow({
            height: "133dp",
            rowid: id,
            imagename: imagename
        });
        var starterImageImgView = Ti.UI.createImageView({
            height: "93dp",
            width: "105dp",
            left: "10dp",
            image: image
        });
        row.add(starterImageImgView);
        var ocrNumberLbl = Ti.UI.createLabel({
            text: ocrnumber,
            top: "25dp",
            left: "150dp",
            width: "auto",
            height: "auto",
            color: "#4C4C4C",
            font: {
                fontSize: "20sp",
                fontFamily: "GretaTextStdMedium"
            }
        });
        row.add(ocrNumberLbl);
        var starterNameLbl = Ti.UI.createLabel({
            text: startername,
            top: "55dp",
            left: "150dp",
            width: "auto",
            height: "auto",
            color: "#4C4C4C",
            font: {
                fontSize: "20sp",
                fontFamily: "GretaTextStdMedium"
            }
        });
        row.add(starterNameLbl);
        var taglineLbl = Ti.UI.createLabel({
            text: tagline,
            top: "85dp",
            left: "150dp",
            width: "auto",
            height: "auto",
            color: "#4C4C4C",
            font: {
                fontSize: "20sp",
                fontFamily: "GretaTextStdMedium"
            }
        });
        row.add(taglineLbl);
        data.push(row);
    }
    function updateTableView() {
        var db = Ti.Database.open("Fyrklovern");
        var sql = db.execute("SELECT id, startername, ocrnumber, image, imagename, tagline FROM starterpackage");
        data = [];
        while (sql.isValidRow()) {
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "adminwin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.adminWin = Ti.UI.createWindow({
        backgroundColor: "#F8F8F8",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "adminWin",
        modal: "true",
        navBarHidden: "true",
        fullscreen: "true"
    });
    $.__views.adminWin && $.addTopLevelView($.__views.adminWin);
    $.__views.__alloyId0 = Ti.UI.createView({
        id: "__alloyId0"
    });
    $.__views.adminWin.add($.__views.__alloyId0);
    $.__views.logo = Ti.UI.createImageView({
        top: "30dp",
        left: "20dp",
        image: "/images/logo.png",
        id: "logo"
    });
    $.__views.__alloyId0.add($.__views.logo);
    $.__views.createTxtFileWinBtn = Ti.UI.createButton({
        width: "160dp",
        height: "60dp",
        top: "10dp",
        right: "30dp",
        title: "Skapa textfil",
        color: "#fff",
        backgroundColor: "#006699",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdRegularItalic"
        },
        id: "createTxtFileWinBtn"
    });
    $.__views.__alloyId0.add($.__views.createTxtFileWinBtn);
    openTxtFileWin ? $.__views.createTxtFileWinBtn.addEventListener("click", openTxtFileWin) : __defers["$.__views.createTxtFileWinBtn!click!openTxtFileWin"] = true;
    $.__views.banner = Ti.UI.createView({
        width: "100%",
        height: "90dp",
        top: "80dp",
        backgroundColor: "#006699",
        id: "banner"
    });
    $.__views.__alloyId0.add($.__views.banner);
    $.__views.headLineLbl = Ti.UI.createLabel({
        text: "Lägg till ett erbjudande:",
        width: "auto",
        height: "auto",
        top: "7dp",
        color: "#fff",
        font: {
            fontSize: "36sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "headLineLbl"
    });
    $.__views.banner.add($.__views.headLineLbl);
    $.__views.descriptionLbl = Ti.UI.createLabel({
        text: "Klicka på +, välj bild, fyll i OCR-nr, servisnamn och tagline",
        width: "auto",
        height: "auto",
        bottom: "7dp",
        color: "#fff",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "descriptionLbl"
    });
    $.__views.banner.add($.__views.descriptionLbl);
    $.__views.pickPhotoBtn = Ti.UI.createButton({
        height: "44dp",
        width: "44dp",
        title: "+",
        left: "30dp",
        top: "190dp",
        backgroundColor: "#fff",
        color: "#006699",
        borderWidth: "3dp",
        borderColor: "#006699",
        id: "pickPhotoBtn"
    });
    $.__views.__alloyId0.add($.__views.pickPhotoBtn);
    pickPhotoFromGallery ? $.__views.pickPhotoBtn.addEventListener("click", pickPhotoFromGallery) : __defers["$.__views.pickPhotoBtn!click!pickPhotoFromGallery"] = true;
    $.__views.imageFromGallery = Ti.UI.createImageView({
        height: "280dp",
        width: "320dp",
        top: "240dp",
        left: "30dp",
        borderColor: "#006699",
        borderWidth: "1dp",
        id: "imageFromGallery"
    });
    $.__views.__alloyId0.add($.__views.imageFromGallery);
    $.__views.ocrTxtfield = Ti.UI.createTextField({
        height: "44dp",
        width: "50%",
        top: "240dp",
        right: "30dp",
        hintText: "OCR",
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        color: "#828282",
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "ocrTxtfield"
    });
    $.__views.__alloyId0.add($.__views.ocrTxtfield);
    $.__views.starternameTxtfield = Ti.UI.createTextField({
        height: "44dp",
        width: "50%",
        top: "285dp",
        right: "30dp",
        hintText: "Servis",
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_ALL,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        color: "#828282",
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "starternameTxtfield"
    });
    $.__views.__alloyId0.add($.__views.starternameTxtfield);
    $.__views.starternameDescriptionLbl = Ti.UI.createLabel({
        height: "auto",
        width: "50%",
        top: "328dp",
        right: "28dp",
        textAlign: "left",
        text: "Ex. Victoria, Lace",
        color: "#4C4C4C",
        font: {
            fontSize: "19sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "starternameDescriptionLbl"
    });
    $.__views.__alloyId0.add($.__views.starternameDescriptionLbl);
    $.__views.taglineTxtfield = Ti.UI.createTextField({
        height: "44dp",
        width: "50%",
        top: "360dp",
        hintText: "Tagline",
        right: "30dp",
        rdType: Ti.UI.KEYBOARD_DEFAULT,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        color: "#828282",
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "taglineTxtfield"
    });
    $.__views.__alloyId0.add($.__views.taglineTxtfield);
    $.__views.taglineDescriptionLbl = Ti.UI.createLabel({
        height: "auto",
        width: "50%",
        top: "406dp",
        right: "28dp",
        textAlign: "left",
        text: "Ex. En hyllning till kärleken, Lovely. Luxorious. Lacy.",
        color: "#4C4C4C",
        font: {
            fontSize: "19sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "taglineDescriptionLbl"
    });
    $.__views.__alloyId0.add($.__views.taglineDescriptionLbl);
    $.__views.addToListBtn = Ti.UI.createButton({
        width: "130dp",
        height: "60dp",
        top: "490dp",
        right: "30dp",
        title: "Lägg till",
        color: "#006699",
        backgroundColor: "#fff",
        borderWidth: "3dp",
        borderColor: "#006699",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdRegularItalic"
        },
        id: "addToListBtn"
    });
    $.__views.__alloyId0.add($.__views.addToListBtn);
    addToList ? $.__views.addToListBtn.addEventListener("click", addToList) : __defers["$.__views.addToListBtn!click!addToList"] = true;
    var __alloyId1 = [];
    $.__views.adminTableViewRow = Ti.UI.createTableViewRow({
        height: "133dp",
        id: "adminTableViewRow"
    });
    __alloyId1.push($.__views.adminTableViewRow);
    $.__views.starterImgView = Ti.UI.createImageView({
        id: "starterImgView"
    });
    $.__views.adminTableViewRow.add($.__views.starterImgView);
    $.__views.ocrNumberLbl = Ti.UI.createLabel({
        id: "ocrNumberLbl"
    });
    $.__views.adminTableViewRow.add($.__views.ocrNumberLbl);
    $.__views.starterNameLbl = Ti.UI.createLabel({
        id: "starterNameLbl"
    });
    $.__views.adminTableViewRow.add($.__views.starterNameLbl);
    $.__views.taglineLbl = Ti.UI.createLabel({
        id: "taglineLbl"
    });
    $.__views.adminTableViewRow.add($.__views.taglineLbl);
    $.__views.adminTableView = Ti.UI.createTableView({
        backgroundColor: "#fff",
        top: "580dp",
        left: "4dp",
        right: "4dp",
        bottom: "0dp",
        editable: true,
        separatorColor: "#E5E5E5",
        data: __alloyId1,
        id: "adminTableView"
    });
    $.__views.__alloyId0.add($.__views.adminTableView);
    $.__views.changeOcrView = Ti.UI.createView({
        height: "224dp",
        width: "420dp",
        backgroundColor: "#006699",
        visible: false,
        id: "changeOcrView"
    });
    $.__views.__alloyId0.add($.__views.changeOcrView);
    $.__views.changeOcrTxtfield = Ti.UI.createTextField({
        top: "50dp",
        right: "10dp",
        left: "10dp",
        height: "auto",
        hintText: "Nytt OCR-nummer",
        color: "#828282",
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "changeOcrTxtfield"
    });
    $.__views.changeOcrView.add($.__views.changeOcrTxtfield);
    $.__views.closeBtn = Ti.UI.createButton({
        title: "Stäng",
        height: "60dp",
        width: "130dp",
        bottom: "30dp",
        left: "20dp",
        color: "#fff",
        borderWidth: "3dp",
        borderColor: "#fff",
        backgroundColor: "#006699",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdRegularItalic"
        },
        id: "closeBtn"
    });
    $.__views.changeOcrView.add($.__views.closeBtn);
    closeChangeOcrView ? $.__views.closeBtn.addEventListener("click", closeChangeOcrView) : __defers["$.__views.closeBtn!click!closeChangeOcrView"] = true;
    $.__views.doneBtn = Ti.UI.createButton({
        title: "Klar",
        height: "60dp",
        width: "130dp",
        bottom: "30dp",
        right: "20dp",
        color: "#fff",
        borderWidth: "3dp",
        borderColor: "#fff",
        backgroundColor: "#006699",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdRegularItalic"
        },
        id: "doneBtn"
    });
    $.__views.changeOcrView.add($.__views.doneBtn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var adminBtn = args.adminbutton;
    var imageFile;
    var myImageID;
    var currentImage;
    $.adminWin.addEventListener("androidback", function() {
        adminBtn.visible = false;
        $.adminWin.close();
    });
    var first = true;
    $.ocrTxtfield.addEventListener("focus", function f() {
        if (first) {
            first = false;
            $.ocrTxtfield.blur();
        } else $.ocrTxtfield.removeEventListener("focus", f);
    });
    var data = [];
    $.adminTableView.addEventListener("click", function(e) {
        rowId = e.index;
        var optionDialog = Titanium.UI.createAlertDialog({
            title: "Vad vill du göra?",
            buttonNames: [ "Radera", "Ändra OCR", "Avbryt" ],
            cancel: 2,
            "delete": 0,
            change: 1
        });
        optionDialog.show();
        optionDialog.addEventListener("click", function(f) {
            if (f.index == optionDialog.delete) {
                $.adminTableView.deleteRow(e.index);
                var db = Ti.Database.open("Fyrklovern");
                db.execute("DELETE FROM starterpackage WHERE id = " + e.rowData.rowid);
                db.close();
                updateTableView();
                var outputFile = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + "myimagedir/" + e.rowData.imagename);
                outputFile.deleteFile();
            } else if (f.index == optionDialog.change) {
                rowId = e.rowData.rowid;
                var changeOcrView = Ti.UI.createView({
                    height: "224dp",
                    width: "420dp",
                    backgroundColor: "#006699"
                });
                $.adminWin.add(changeOcrView);
                var changeOcrTxtfield = Ti.UI.createTextField({
                    top: "50dp",
                    right: "10dp",
                    left: "10dp",
                    height: "auto",
                    hintText: "Nytt OCRnummer",
                    color: "#828282",
                    hintText: "Nytt OCR-nummer",
                    keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
                    returnKeyType: Ti.UI.RETURNKEY_DONE,
                    font: {
                        fontSize: "20sp",
                        fontFamily: "GretaTextStdLight"
                    }
                });
                changeOcrView.add(changeOcrTxtfield);
                var closeBtn = Ti.UI.createButton({
                    title: "Stäng",
                    height: "60dp",
                    width: "130dp",
                    bottom: "30dp",
                    left: "20dp",
                    color: "#fff",
                    borderWidth: "3dp",
                    borderColor: "#fff",
                    backgroundColor: "#006699",
                    font: {
                        fontSize: "24sp",
                        fontFamily: "GretaTextStdRegularItalic"
                    }
                });
                changeOcrView.add(closeBtn);
                closeBtn.addEventListener("click", function() {
                    changeOcrView.visible = false;
                });
                var doneBtn = Ti.UI.createButton({
                    title: "Klar",
                    height: "60dp",
                    width: "130dp",
                    bottom: "30dp",
                    right: "20dp",
                    color: "#fff",
                    borderWidth: "3dp",
                    borderColor: "#fff",
                    backgroundColor: "#006699",
                    font: {
                        fontSize: "24sp",
                        fontFamily: "GretaTextStdRegularItalic"
                    }
                });
                changeOcrView.add(doneBtn);
                doneBtn.addEventListener("click", function() {
                    var db = Ti.Database.open("Fyrklovern");
                    db.execute("UPDATE starterpackage SET ocrnumber = '" + changeOcrTxtfield.value + "' WHERE id = " + rowId);
                    db.close();
                    updateTableView();
                    changeOcrView.visible = false;
                    changeOcrTxtfield.blur();
                });
            }
        });
    });
    updateTableView();
    __defers["$.__views.createTxtFileWinBtn!click!openTxtFileWin"] && $.__views.createTxtFileWinBtn.addEventListener("click", openTxtFileWin);
    __defers["$.__views.pickPhotoBtn!click!pickPhotoFromGallery"] && $.__views.pickPhotoBtn.addEventListener("click", pickPhotoFromGallery);
    __defers["$.__views.addToListBtn!click!addToList"] && $.__views.addToListBtn.addEventListener("click", addToList);
    __defers["$.__views.closeBtn!click!closeChangeOcrView"] && $.__views.closeBtn.addEventListener("click", closeChangeOcrView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;