function Controller() {
    function getClientInfo() {
        var loginReq = Titanium.Network.createHTTPClient({
            timeout: 1e3,
            onload: function() {
                if ("fel" == this.responseText) {
                    alert("Vi ber om ursäkt, någonting gick fel. Prova igen eller skriv in dina uppgifter manuellt.");
                    $.firstNameTxtfield.focus();
                } else {
                    var json = this.responseText;
                    var response = JSON.parse(json);
                    $.firstNameTxtfield.value = response.GivenName;
                    $.lastNameTxtfield.value = response.LastName;
                    $.streetAddressTxtfield.value = response.AddressStreet + response.AddressFo + response.AddressCo;
                    $.zipcodeTxtfield.value = response.AddressZip;
                    $.cityTxtfield.value = response.AddressCity;
                    $.homePhoneTxtfield.focus();
                }
            }
        });
        loginReq.open("POST", "http://www.kopserviser.com/personsearch.php");
        var params = {
            pnr: $.socialSecurityNumTxtfield.value
        };
        loginReq.send(params);
    }
    function cleanOCR() {
        oriNum = oriNum.slice(0, -4);
        return oriNum;
    }
    function generateOrderId() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        10 > month && (month = "0" + month);
        10 > hours && (hours = "0" + hours);
        10 > day && (day = "0" + day);
        10 > minutes && (minutes = "0" + minutes);
        10 > seconds && (seconds = "0" + seconds);
        return year + month + day + hours + minutes + seconds;
    }
    function getDate() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        10 > month && (month = "0" + month);
        10 > day && (day = "0" + day);
        10 > hours && (hours = "0" + hours);
        10 > minutes && (minutes = "0" + minutes);
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    }
    function populateGridView(id, startername, ocrnumber, image, imagename, tagline) {
        var containerView = Ti.UI.createView({
            width: "50%",
            height: "480dp",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderColor: "#CCC",
            borderWidth: "2dp",
            startername: startername
        });
        containerView.addEventListener("click", function() {
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
            top: "20dp",
            image: image,
            bubbleParent: true
        });
        containerView.add(img);
        var label = Ti.UI.createLabel({
            width: "auto",
            height: "auto",
            bottom: "70dp",
            text: startername,
            color: "#4C4C4C",
            font: {
                fontSize: "26sp",
                fontFamily: "GretaTextStdLight",
                bubbleParent: true
            }
        });
        containerView.add(label);
        var button = Ti.UI.createButton({
            width: "180dp",
            height: "50dp",
            bottom: "10dp",
            title: "Välj",
            color: "#006699",
            backgroundColor: "#fff",
            borderWidth: "3dp",
            borderColor: "#006699",
            font: {
                fontSize: "24sp",
                fontFamily: "GretaTextStdRegularItalic"
            },
            bubbleParent: true
        });
        containerView.add(button);
        gridView[curr] = containerView;
        curr++;
    }
    function updateGrid() {
        gridView = [];
        var db = Ti.Database.open("Fyrklovern");
        var sql = db.execute("SELECT id, startername, ocrnumber, image, imagename, tagline FROM starterpackage");
        while (sql.isValidRow()) {
            var id = sql.fieldByName("id");
            var startername = sql.fieldByName("startername");
            var ocrnumber = sql.fieldByName("ocrnumber");
            var image = sql.fieldByName("image");
            var imagename = sql.fieldByName("imagename");
            var tagline = sql.fieldByName("tagline");
            populateGridView(id, startername, ocrnumber, image, imagename, tagline);
            sql.next();
        }
        sql.close();
        db.close();
    }
    function showConditions() {
        $.conditionView.visible = true;
        $.conditionHeadLbl.visible = true;
        $.conditionBodyLbl.visible = true;
        $.closeConditionsBtn.visible = true;
    }
    function closeConditionsWin() {
        $.conditionView.visible = false;
        $.conditionHeadLbl.visible = false;
        $.conditionBodyLbl.visible = false;
        $.closeConditionsBtn.visible = true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clientinfowin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.clientInfoWin = Ti.UI.createWindow({
        backgroundColor: "#F8F8F8",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "clientInfoWin",
        modal: "true",
        navBarHidden: "true",
        fullscreen: "true"
    });
    $.__views.clientInfoWin && $.addTopLevelView($.__views.clientInfoWin);
    $.__views.__alloyId2 = Ti.UI.createView({
        id: "__alloyId2"
    });
    $.__views.clientInfoWin.add($.__views.__alloyId2);
    $.__views.containerView = Ti.UI.createScrollView({
        widht: "100%",
        height: "100%",
        top: "0dp",
        backgroundColor: "#F8F8F8",
        scrollType: "vertical",
        id: "containerView"
    });
    $.__views.__alloyId2.add($.__views.containerView);
    $.__views.getAddressBtn = Ti.UI.createButton({
        width: "260dp",
        height: "60dp",
        top: "780dp",
        right: "100dp",
        title: "Hämta bokföringsadress",
        color: "#006699",
        backgroundColor: "#fff",
        borderWidth: "3dp",
        borderColor: "#006699",
        visible: true,
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdRegularItalic"
        },
        id: "getAddressBtn"
    });
    $.__views.containerView.add($.__views.getAddressBtn);
    getClientInfo ? $.__views.getAddressBtn.addEventListener("click", getClientInfo) : __defers["$.__views.getAddressBtn!click!getClientInfo"] = true;
    $.__views.logoImgView = Ti.UI.createImageView({
        top: "30dp",
        left: "20dp",
        image: "/images/logo.png",
        id: "logoImgView"
    });
    $.__views.containerView.add($.__views.logoImgView);
    $.__views.bannerView = Ti.UI.createView({
        width: "100%",
        height: "90dp",
        top: "80dp",
        backgroundColor: "#006699",
        id: "bannerView"
    });
    $.__views.containerView.add($.__views.bannerView);
    $.__views.headLineLbl = Ti.UI.createLabel({
        width: "auto",
        height: "auto",
        top: "10dp",
        color: "#fff",
        font: {
            fontSize: "36sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "headLineLbl"
    });
    $.__views.bannerView.add($.__views.headLineLbl);
    $.__views.descriptionLbl = Ti.UI.createLabel({
        width: "auto",
        height: "auto",
        bottom: "5dp",
        color: "#fff",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdRegularItalic"
        },
        id: "descriptionLbl"
    });
    $.__views.bannerView.add($.__views.descriptionLbl);
    $.__views.starterImage = Ti.UI.createImageView({
        width: "630dp",
        height: "500dp",
        top: "205dp",
        id: "starterImage"
    });
    $.__views.containerView.add($.__views.starterImage);
    $.__views.socialSecurityNumTxtfield = Ti.UI.createTextField({
        width: "310dp",
        top: "790dp",
        height: "44dp",
        left: "83dp",
        color: "#828282",
        hintText: "Personnummer 10 siffror",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "socialSecurityNumTxtfield"
    });
    $.__views.containerView.add($.__views.socialSecurityNumTxtfield);
    $.__views.firstNameTxtfield = Ti.UI.createTextField({
        width: "310dp",
        height: "44dp",
        top: "870dp",
        left: "83dp",
        hintText: "Förnamn",
        color: "#828282",
        keyboardType: Ti.UI.KEYBOARD_DEFAULT,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
        autocorrect: false,
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "firstNameTxtfield"
    });
    $.__views.containerView.add($.__views.firstNameTxtfield);
    $.__views.lastNameTxtfield = Ti.UI.createTextField({
        width: "310dp",
        height: "44dp",
        top: "870dp",
        right: "87dp",
        hintText: "Efternamn",
        color: "#828282",
        borderWidth: "1dp",
        keyboardType: Ti.UI.KEYBOARD_DEFAULT,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
        autocorrect: false,
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "lastNameTxtfield"
    });
    $.__views.containerView.add($.__views.lastNameTxtfield);
    $.__views.streetAddressTxtfield = Ti.UI.createTextField({
        width: "630dp",
        height: "44dp",
        left: "83dp",
        top: "925dp",
        hintText: "Adress",
        color: "#828282",
        keyboardType: Ti.UI.KEYBOARD_NAMEPHONE_PAD,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
        autocorrect: false,
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "streetAddressTxtfield"
    });
    $.__views.containerView.add($.__views.streetAddressTxtfield);
    $.__views.zipcodeTxtfield = Ti.UI.createTextField({
        width: "310dp",
        height: "44dp",
        top: "980dp",
        left: "83dp",
        hintText: "Postnummer",
        color: "#828282",
        borderWidth: "1dp",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "zipcodeTxtfield"
    });
    $.__views.containerView.add($.__views.zipcodeTxtfield);
    $.__views.cityTxtfield = Ti.UI.createTextField({
        width: "310dp",
        height: "44dp",
        top: "980dp",
        right: "87dp",
        hintText: "Ort",
        color: "#828282",
        keyboardType: Ti.UI.KEYBOARD_DEFAULT,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
        autocorrect: false,
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "cityTxtfield"
    });
    $.__views.containerView.add($.__views.cityTxtfield);
    $.__views.homePhoneTxtfield = Ti.UI.createTextField({
        width: "630dp",
        height: "44dp",
        top: "1035dp",
        left: "83dp",
        hintText: "Telefon",
        color: "#828282",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "homePhoneTxtfield"
    });
    $.__views.containerView.add($.__views.homePhoneTxtfield);
    $.__views.emailAddressTxtfield = Ti.UI.createTextField({
        width: "630dp",
        height: "44dp",
        top: "1090dp",
        left: "83dp",
        hintText: "Email",
        color: "#828282",
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "emailAddressTxtfield"
    });
    $.__views.containerView.add($.__views.emailAddressTxtfield);
    $.__views.sendOrderBtn = Ti.UI.createButton({
        width: "220dp",
        height: "60dp",
        top: "1140dp",
        right: "87dp",
        title: "Bekräfta ordern",
        color: "#fff",
        backgroundColor: "#006699",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdRegularItalic"
        },
        id: "sendOrderBtn"
    });
    $.__views.containerView.add($.__views.sendOrderBtn);
    $.__views.changeStarterBtn = Ti.UI.createButton({
        width: "auto",
        height: "60dp",
        top: "1140dp",
        left: "95dp",
        title: "Välj annan servis",
        color: "#006699",
        backgroundColor: "transparent",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdRegularItalic"
        },
        id: "changeStarterBtn"
    });
    $.__views.containerView.add($.__views.changeStarterBtn);
    $.__views.readConditions = Ti.UI.createLabel({
        width: "auto",
        height: "auto",
        top: "1230dp",
        left: "120dp",
        text: "Genom att bekräfta ordern godkänner du",
        color: "#4C4C4C",
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdMedium"
        },
        id: "readConditions"
    });
    $.__views.containerView.add($.__views.readConditions);
    $.__views.conditions = Ti.UI.createLabel({
        width: "auto",
        height: "auto",
        top: "1230dp",
        left: "483dp",
        text: "beställningsvillkoren",
        color: "#006699",
        font: {
            fontSize: "20sp",
            fontFamily: "GretaTextStdMedium"
        },
        id: "conditions"
    });
    $.__views.containerView.add($.__views.conditions);
    showConditions ? $.__views.conditions.addEventListener("click", showConditions) : __defers["$.__views.conditions!click!showConditions"] = true;
    $.__views.thankYouView = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/images/tack.png",
        visible: false,
        id: "thankYouView"
    });
    $.__views.__alloyId2.add($.__views.thankYouView);
    $.__views.parentView = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        visible: false,
        id: "parentView"
    });
    $.__views.__alloyId2.add($.__views.parentView);
    $.__views.parentLogoImgView = Ti.UI.createImageView({
        width: "auto",
        height: "auto",
        image: "/images/logo.png",
        top: "20dp",
        left: "20dp",
        id: "parentLogoImgView"
    });
    $.__views.parentView.add($.__views.parentLogoImgView);
    $.__views.parentHeadLbl = Ti.UI.createLabel({
        top: "70dp",
        width: "auto",
        height: "auto",
        color: "#4C4C4C",
        text: "Välj din favoritservis",
        font: {
            fontSize: "36sp",
            fontFamily: "GretaTextStdRegular"
        },
        id: "parentHeadLbl"
    });
    $.__views.parentView.add($.__views.parentHeadLbl);
    $.__views.parentBannerView = Ti.UI.createView({
        top: "125dp",
        width: "100%",
        height: "90dp",
        backgroundColor: "#006699",
        id: "parentBannerView"
    });
    $.__views.parentView.add($.__views.parentBannerView);
    $.__views.parentBannerLbl = Ti.UI.createLabel({
        width: "auto",
        height: "auto",
        color: "#fff",
        textAlign: "center",
        text: "Bläddra bland serviserna och klicka på den du gillar bäst.\nPå nästa sida får du fylla i beställningsformuläret.",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "parentBannerLbl"
    });
    $.__views.parentBannerView.add($.__views.parentBannerLbl);
    $.__views.parentViewScroll = Ti.UI.createScrollView({
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.SIZE,
        height: "auto",
        width: "100%",
        top: "210dp",
        backgroundColor: "#fff",
        scrollType: "vertical",
        id: "parentViewScroll"
    });
    $.__views.parentView.add($.__views.parentViewScroll);
    $.__views.gridView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: Ti.UI.FILL,
        id: "gridView"
    });
    $.__views.parentViewScroll.add($.__views.gridView);
    $.__views.conditionView = Ti.UI.createView({
        width: "640dp",
        height: "650dp",
        top: "205dp",
        backgroundColor: "#fff",
        visible: false,
        id: "conditionView"
    });
    $.__views.__alloyId2.add($.__views.conditionView);
    $.__views.closeConditionsBtn = Ti.UI.createButton({
        width: "44dp",
        height: "44dp",
        top: "10dp",
        right: "10dp",
        title: "X",
        borderWidth: "3dp",
        borderColor: "#006699",
        color: "#006699",
        font: {
            fontSize: "30sp"
        },
        backgroundColor: "#fff",
        visible: false,
        id: "closeConditionsBtn"
    });
    $.__views.conditionView.add($.__views.closeConditionsBtn);
    closeConditionsWin ? $.__views.closeConditionsBtn.addEventListener("click", closeConditionsWin) : __defers["$.__views.closeConditionsBtn!click!closeConditionsWin"] = true;
    $.__views.conditionHeadLbl = Ti.UI.createLabel({
        text: "Kampanjvillkor",
        color: "#000",
        width: "auto",
        height: "auto",
        top: "220dp",
        left: "100dp",
        visible: false,
        textAlign: "left",
        font: {
            fontSize: "30sp",
            fontFamily: "GretaTextStdRegular"
        },
        id: "conditionHeadLbl"
    });
    $.__views.__alloyId2.add($.__views.conditionHeadLbl);
    $.__views.conditionBodyLbl = Ti.UI.createLabel({
        html: "1. Erbjudandet gäller t.o.m. 30/06/2014. Endast ett erbjudande per hushåll och endast<br>kunder som inte tidigare köpt av servisen/serien.<br><br>2. Jag blir gratis och utan förpliktelser medlem i Fyrklöverns Stjärnklubb. Som<br>klubbmedlem riskerar jag inte att gå miste om några erbjudanden och jag får<br>information skriftligen, per telefon eller e-post när Fyrklövern har kampanjer.<br><br>3. Fyrklövern accepterar bara order från personer över 18 år och förbehåller sig rätten att<br>godkänna beställningen. Kreditkontroll kan komma att göras.<br><br>4. Vi lagrar och uppdaterar personuppgifter för att kunna administrera<br>kundförhållanden och lämna fördelaktiga erbjudanden från oss eller våra<br>samarbetspartners samt uppfylla våra garantiåtaganden. Om du inte önskar<br>erbjudanden från våra partners, är du välkommen att kontakta vår kundtjänst på<br>040-665 45 50.<br><br>5. Jag accepterar att få nyhetsbrev från Fyrklövern AB skickade till min epost.<br>Jag kan när som helst avbeställa detta val genom att ringa in till Fyrklövern kundtjänst. Jag får en unik möjlighet att duka hemma. Därefter får jag ett kuvert med mat- och förrättstallrik en gång i månaden till det fördelaktiga samlarpriset 349:- (ord. 498:-). Serien består av 12 kuvert, men jag bestämmer själv hur många jag vill ha.Porto 49:- tillkommer per leverans.<br><br>Öppettider kundservice:<br>Måndagar - torsdagar: 8.30 - 17.00<br>Fredagar: 8.30 - 15.00<br>Lördagar, söndagar och helgdagar är det stängt<br><br>Du kan alltid nå oss på: kundtjanst@fyrklovern.se",
        color: "#000",
        width: "600dp",
        height: "auto",
        top: "265dp",
        visible: false,
        font: {
            fontSize: "16sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "conditionBodyLbl"
    });
    $.__views.__alloyId2.add($.__views.conditionBodyLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var ocrNumber = args.ocrnumber;
    var starterName = args.startername;
    var starterImage = args.image;
    var tagLine = args.tagline;
    $.headLineLbl.text = starterName;
    $.descriptionLbl.text = tagLine;
    $.starterImage.image = starterImage;
    $.clientInfoWin.addEventListener("androidback", function() {
        if (true == $.parentView.visible) $.parentView.hide(); else {
            var optionDialog = Titanium.UI.createAlertDialog({
                title: "Du är på väg att lämna sidan. Ifyllda uppgifter kommer att försvinna",
                buttonNames: [ "OK", "Avbryt" ],
                cancel: 1,
                ok: 0
            });
            optionDialog.show();
            optionDialog.addEventListener("click", function(f) {
                if (f.index == optionDialog.ok) {
                    args.adminbutton.visible = false;
                    $.clientInfoWin.close();
                } else optionDialog.hide();
            });
        }
    });
    $.clientInfoWin.addEventListener("open", function() {
        $.getAddressBtn.visible = Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? false : true;
    });
    var socialSecurityNum = " ";
    var first = true;
    $.socialSecurityNumTxtfield.addEventListener("focus", function f() {
        if (first) {
            first = false;
            $.socialSecurityNumTxtfield.blur();
        } else $.socialSecurityNumTxtfield.removeEventListener("focus", f);
    });
    $.socialSecurityNumTxtfield.addEventListener("next", function() {
        $.socialSecurityNumTxtfield.blur();
        $.firstNameTxtfield.focus();
    });
    $.socialSecurityNumTxtfield.addEventListener("blur", function() {
        if ("" != $.socialSecurityNumTxtfield.value) {
            var temp = $.socialSecurityNumTxtfield.value;
            !/[^0-9]/.test(temp) ? false : $.socialSecurityNumTxtfield.value = temp.replace(/[^0-9]/gi, "");
            socialSecurityNum = temp;
            if (10 > $.socialSecurityNumTxtfield.value.length) {
                alert("Personnummer ska innehålla 10 siffror.");
                $.socialSecurityNumTxtfield.focus();
            }
            if ($.socialSecurityNumTxtfield.value.length > 10) {
                alert("Personnummer ska innehålla 10 siffror.");
                $.socialSecurityNumTxtfield.focus();
            }
        }
    });
    $.firstNameTxtfield.addEventListener("focus", function() {
        $.containerView.scrollTo(0, 500);
    });
    $.firstNameTxtfield.addEventListener("next", function() {
        $.firstNameTxtfield.blur();
        $.lastNameTxtfield.focus();
    });
    $.firstNameTxtfield.addEventListener("blur", function() {
        "" != $.firstNameTxtfield.value && ($.firstNameTxtfield.value = $.firstNameTxtfield.value.trim());
    });
    $.lastNameTxtfield.addEventListener("next", function() {
        $.lastNameTxtfield.blur();
        $.streetAddressTxtfield.focus();
    });
    $.lastNameTxtfield.addEventListener("blur", function() {
        "" != $.lastNameTxtfield.value && ($.lastNameTxtfield.value = $.lastNameTxtfield.value.trim());
    });
    $.streetAddressTxtfield.addEventListener("next", function() {
        $.streetAddressTxtfield.blur();
        $.zipcodeTxtfield.focus();
    });
    var zipCode = "";
    $.zipcodeTxtfield.addEventListener("next", function() {
        $.zipcodeTxtfield.blur();
        $.cityTxtfield.focus();
    });
    $.zipcodeTxtfield.addEventListener("blur", function() {
        if ("" != $.zipcodeTxtfield.value) {
            var temp = $.zipcodeTxtfield.value;
            !/[^0-9]/.test(temp) ? false : $.zipcodeTxtfield.value = temp.replace(/[^0-9]/gi, "");
            zipCode = temp;
            if (5 > $.zipcodeTxtfield.value.length) {
                alert("Postnummer ska innehålla 5 siffror.");
                $.zipcodeTxtfield.focus();
            }
            if ($.zipcodeTxtfield.value.length > 5) {
                alert("Postnummer ska innehålla 5 siffror.");
                $.zipcodeTxtfield.focus();
            }
        }
    });
    $.cityTxtfield.addEventListener("next", function() {
        $.cityTxtfield.blur();
        $.homePhoneTxtfield.focus();
    });
    var mobileNumber = "";
    var homePhone = "";
    $.homePhoneTxtfield.addEventListener("next", function() {
        $.homePhoneTxtfield.blur();
        $.emailAddressTxtfield();
    });
    $.homePhoneTxtfield.addEventListener("blur", function() {
        if ("" != $.homePhoneTxtfield.value) {
            var temp = $.homePhoneTxtfield.value;
            !/[^0-9]/.test(temp) ? false : $.homePhoneTxtfield.value = temp.replace(/[^0-9]/gi, "");
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
            }
        }
    });
    $.emailAddressTxtfield.addEventListener("return", function() {
        $.emailAddressTxtfield.blur();
    });
    var emptyOne = "";
    var netWork = "";
    var sent = "no";
    var oriNum = ocrNumber.toString();
    $.sendOrderBtn.addEventListener("click", function() {
        if ("" == $.firstNameTxtfield.value || "" == $.lastNameTxtfield.value || "" == $.streetAddressTxtfield.value || "" == $.zipcodeTxtfield.value || "" == $.cityTxtfield.value || "" == $.homePhoneTxtfield.value || "" == $.emailAddressTxtfield.value) alert("Det saknas uppgifter"); else if ("" == $.firstNameTxtfield.value && "" == $.lastNameTxtfield.value && "" == $.streetAddressTxtfield.value && "" == $.zipcodeTxtfield.value && "" == $.cityTxtfield.value && "" == $.homePhoneTxtfield.value && "" == $.emailAddressTxtfield.value) alert("Det saknas uppgifter"); else {
            $.thankYouView.visible = true;
            var db = Ti.Database.open("Fyrklovern");
            db.execute("INSERT INTO clientorder(firstname, lastname, street, zipcode, city, homephone, email, emptyone, sms, ocrnumber, socialsecurity, mobilephone, orderid, startername, network, originalocr, date, ifsent) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", $.firstNameTxtfield.value, $.lastNameTxtfield.value, $.streetAddressTxtfield.value, zipCode, $.cityTxtfield.value, homePhone, $.emailAddressTxtfield.value, emptyOne, mobileNumber, ocrNumber, socialSecurityNum, mobileNumber, generateOrderId(), $.headLineLbl.text, netWork, cleanOCR(), getDate(), sent);
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
            setTimeout(function() {
                $.clientInfoWin.close();
            }, 8e3);
        }
    });
    $.changeStarterBtn.addEventListener("click", function() {
        $.parentView.visible = true;
    });
    var curr = 0;
    var gridView = [];
    updateGrid();
    __defers["$.__views.getAddressBtn!click!getClientInfo"] && $.__views.getAddressBtn.addEventListener("click", getClientInfo);
    __defers["$.__views.conditions!click!showConditions"] && $.__views.conditions.addEventListener("click", showConditions);
    __defers["$.__views.closeConditionsBtn!click!closeConditionsWin"] && $.__views.closeConditionsBtn.addEventListener("click", closeConditionsWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;