function Controller() {
    function openAdminWin() {
        $.createTxtFileWin.close();
    }
    function getTableViewContent() {
        var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, "mysubdir");
        var list = dir.getDirectoryListing();
        var resultList = list.toString().split(",");
        Ti.API.info("list : " + resultList);
        var data = [];
        for (var i = 0; resultList.length > i; i++) {
            var row = Ti.UI.createTableViewRow({
                height: "100dp",
                rowId: i,
                txtFile: resultList[i],
                value: Titanium.Filesystem.externalStorageDirectory + Titanium.Filesystem.separator + resultList[i]
            });
            var txtFileLbl = Ti.UI.createLabel({
                text: resultList[i],
                top: "10dp",
                color: "#4C4C4C",
                font: {
                    fontFamily: "GretaTextStdMedium",
                    fontSize: "20sp"
                },
                left: "20dp",
                width: "auto",
                height: "auto",
                color: "#000000"
            });
            row.add(txtFileLbl);
            var sendOrderBtn = Ti.UI.createButton({
                title: "Skicka igen",
                height: "44dp",
                width: "150dp",
                right: "20dp",
                color: "#006699",
                borderColor: "#006699",
                borderWidth: "3dp",
                backgroundColor: "#fff",
                font: {
                    fontSize: "24sp",
                    fontFamily: "GretaTextStdRegularItalic"
                },
                bubbleParent: true,
                x: "sendBtn"
            });
            row.add(sendOrderBtn);
            var deleteTxtFile = Ti.UI.createButton({
                title: "Ta bort",
                height: "44dp",
                width: "99dp",
                left: "20dp",
                bottom: "10dp",
                color: "#E5E5E5",
                borderColor: "#E5E5E5",
                borderWidth: "3dp",
                backgroundColor: "#fff",
                font: {
                    fontSize: "24sp",
                    fontFamily: "GretaTextStdRegularItalic"
                },
                bubbleParent: true,
                x: "deleteBtn"
            });
            row.add(deleteTxtFile);
            data.push(row);
        }
        list = null;
        dir = null;
        return data;
    }
    function clickedRow(e) {
        if ("sendBtn" == e.source.x) {
            var emailDialog = Ti.UI.createEmailDialog();
            emailDialog.subject = "Order från mässa";
            emailDialog.toRecipients = [ "berit.andersson@fyrklovern.se" ];
            emailDialog.messageBody = "Hej Berit,\nen mässorder.\n\nHälsningar till Dig från alla glada säljare på mässan!";
            var outputFile = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + "mysubdir/" + e.rowData.txtFile);
            emailDialog.addAttachment(outputFile);
            emailDialog.isSupported() ? emailDialog.open() : alert("Konfigurera din e-post");
        } else if ("deleteBtn" == e.source.x) {
            var optionDialog = Titanium.UI.createAlertDialog({
                title: "Vill du radera filen?",
                buttonNames: [ "OK", "Avbryt" ],
                cancel: 1,
                ok: 0
            });
            optionDialog.show();
            optionDialog.addEventListener("click", function(f) {
                if (f.index == optionDialog.ok) {
                    var outputFile = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + "mysubdir/" + e.rowData.txtFile);
                    outputFile.deleteFile();
                    $.txtFileTableView.deleteRow(e.index);
                } else optionDialog.hide();
            });
        }
    }
    function csvDatapush() {
        var input = [];
        var db = Ti.Database.open("Fyrklovern");
        var rows = db.execute('SELECT firstname, lastname, street, zipcode, city, homephone, email, emptyone, sms, ocrnumber, socialsecurity, mobilephone, orderid, startername, network, originalocr, date FROM clientorder WHERE ifsent = "no"');
        while (rows.isValidRow()) {
            input.push([ rows.fieldByName("firstname"), rows.fieldByName("lastname"), rows.fieldByName("street"), rows.fieldByName("zipcode"), rows.fieldByName("city"), rows.fieldByName("homephone"), rows.fieldByName("email"), rows.fieldByName("emptyone"), rows.fieldByName("sms"), rows.fieldByName("ocrnumber"), rows.fieldByName("socialsecurity"), rows.fieldByName("mobilephone"), rows.fieldByName("orderid"), rows.fieldByName("startername"), rows.fieldByName("network"), rows.fieldByName("originalocr"), rows.fieldByName("emptyone"), rows.fieldByName("emptyone"), rows.fieldByName("emptyone"), rows.fieldByName("date") ]);
            rows.next();
        }
        rows.close();
        db.close();
        return input;
    }
    function txtFileCreationDate() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        10 > month && (month = "0" + month);
        10 > day && (day = "0" + day);
        10 > hours && (hours = "0" + hours);
        10 > minutes && (minutes = "0" + minutes);
        10 > seconds && (seconds = "0" + seconds);
        return year + "-" + month + "-" + day + "_" + hours + minutes + seconds;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "createtextfile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.createTxtFileWin = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        backgroundColor: "#F8F8F8",
        id: "createTxtFileWin",
        modal: "true",
        navBarHidden: "true",
        fullscreen: "true"
    });
    $.__views.createTxtFileWin && $.addTopLevelView($.__views.createTxtFileWin);
    $.__views.__alloyId3 = Ti.UI.createView({
        id: "__alloyId3"
    });
    $.__views.createTxtFileWin.add($.__views.__alloyId3);
    $.__views.logo = Ti.UI.createImageView({
        top: "30dp",
        left: "20dp",
        image: "/images/logo.png",
        id: "logo"
    });
    $.__views.__alloyId3.add($.__views.logo);
    $.__views.adminWinBtn = Ti.UI.createButton({
        width: "160dp",
        height: "60dp",
        top: "10dp",
        right: "30dp",
        title: "Admin",
        color: "#fff",
        backgroundColor: "#006699",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdRegularItalic"
        },
        id: "adminWinBtn"
    });
    $.__views.__alloyId3.add($.__views.adminWinBtn);
    openAdminWin ? $.__views.adminWinBtn.addEventListener("click", openAdminWin) : __defers["$.__views.adminWinBtn!click!openAdminWin"] = true;
    $.__views.banner = Ti.UI.createView({
        width: "100%",
        height: "90dp",
        top: "80dp",
        backgroundColor: "#006699",
        id: "banner"
    });
    $.__views.__alloyId3.add($.__views.banner);
    $.__views.headLineLbl = Ti.UI.createLabel({
        text: "Vid dagens slut:",
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
        text: "Maila in textfilen med beställningar genom att klicka på knappen nedan",
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
    $.__views.createTxtFileBtn = Ti.UI.createButton({
        width: "366dp",
        height: "100dp",
        top: "260dp",
        title: "Maila in beställningsfilen",
        color: "#fff",
        backgroundColor: "#006699",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdRegularItalic"
        },
        id: "createTxtFileBtn"
    });
    $.__views.__alloyId3.add($.__views.createTxtFileBtn);
    $.__views.txtFileTableView = Ti.UI.createTableView({
        backgroundColor: "#fff",
        top: "450dp",
        left: "4dp",
        right: "4dp",
        bottom: 0,
        color: "#000",
        data: null,
        id: "txtFileTableView"
    });
    $.__views.__alloyId3.add($.__views.txtFileTableView);
    clickedRow ? $.__views.txtFileTableView.addEventListener("click", clickedRow) : __defers["$.__views.txtFileTableView!click!clickedRow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    txtFileCreationDate() + ".txt";
    $.createTxtFileWin.addEventListener("androidback", function() {
        $.createTxtFileWin.close();
    });
    var exportCsvData = function(input) {
        var rowTxt = "";
        for (var i = 0; input.length > i; i++) {
            for (var j = 0; input[i].length > j; j++) {
                rowTxt += input[i][j];
                input[i].length > j && (rowTxt += ";");
            }
            rowTxt += "\r\n";
        }
        var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, "mysubdir");
        dir.exists() || dir.createDirectory();
        var exportFileName = txtFileCreationDate() + ".txt";
        var outputFile = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + "mysubdir/", exportFileName);
        outputFile.write(rowTxt);
        outputFile = null;
        dir = null;
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Order från mässa";
        emailDialog.toRecipients = [ "berit.andersson@fyrklovern.se" ];
        emailDialog.messageBody = "Hej Berit,\nen mässorder.\n\nHälsningar till Dig från alla glada säljare på mässan!";
        var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + "mysubdir/" + exportFileName);
        emailDialog.addAttachment(file);
        emailDialog.isSupported() ? emailDialog.open() : alert("Konfigurera din e-post");
        emailDialog.addEventListener("complete", function(e) {
            if (e.result == emailDialog.SENT) {
                var db = Ti.Database.open("Fyrklovern");
                db.execute('UPDATE clientorder SET ifsent = "yes" WHERE ifsent="no"');
                db.close();
            }
            e.result == emailDialog.FAILED;
        });
    };
    var createTextFile = function() {
        var input = csvDatapush();
        exportCsvData(input);
        $.txtFileTableView.setData(getTableViewContent());
    };
    $.createTxtFileBtn.addEventListener("click", function() {
        createTextFile();
    });
    $.txtFileTableView.setData(getTableViewContent());
    __defers["$.__views.adminWinBtn!click!openAdminWin"] && $.__views.adminWinBtn.addEventListener("click", openAdminWin);
    __defers["$.__views.txtFileTableView!click!clickedRow"] && $.__views.txtFileTableView.addEventListener("click", clickedRow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;