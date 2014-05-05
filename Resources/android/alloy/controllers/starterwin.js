function Controller() {
    function openAminWin() {
        var adminWin = Alloy.createController("/adminwin", {
            adminbutton: $.admin
        }).getView();
        adminWin.open();
        $.starterwin.close();
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
        $.gridView.add(containerView);
        containerView.addEventListener("click", function() {
            var clientInfoWin = Alloy.createController("/clientinfowin", {
                adminbutton: $.admin,
                ocrnumber: ocrnumber,
                image: image,
                startername: startername,
                tagline: tagline
            }).getView();
            clientInfoWin.open();
        });
        var img = Ti.UI.createImageView({
            height: "350dp",
            top: "20dp",
            bottom: "100dp",
            left: "25dp",
            right: "25dp",
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
                fontFamily: "GretaTextStdLight"
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
            bubbleParent: true,
            font: {
                fontSize: "24sp",
                fontFamily: "GretaTextStdRegularItalic"
            }
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "starterwin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.starterwin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "starterwin",
        modal: "true",
        navBarHidden: "true",
        fullscreen: "true"
    });
    $.__views.starterwin && $.addTopLevelView($.__views.starterwin);
    $.__views.starter = Ti.UI.createView({
        id: "starter"
    });
    $.__views.starterwin.add($.__views.starter);
    $.__views.admin = Ti.UI.createButton({
        width: "auto",
        height: "auto",
        right: "10dp",
        top: "10dp",
        title: "Admin",
        visible: false,
        id: "admin"
    });
    $.__views.starter.add($.__views.admin);
    openAminWin ? $.__views.admin.addEventListener("click", openAminWin) : __defers["$.__views.admin!click!openAminWin"] = true;
    $.__views.logo = Ti.UI.createImageView({
        width: "auto",
        height: "auto",
        image: "/images/logo.png",
        top: "20dp",
        left: "20dp",
        id: "logo"
    });
    $.__views.starter.add($.__views.logo);
    $.__views.headLine = Ti.UI.createLabel({
        top: "70dp",
        width: "auto",
        height: "auto",
        color: "#4C4C4C",
        text: "Välj din favoritservis",
        font: {
            fontSize: "36sp",
            fontFamily: "GretaTextStdRegular"
        },
        id: "headLine"
    });
    $.__views.starter.add($.__views.headLine);
    $.__views.banner = Ti.UI.createView({
        top: "125dp",
        width: "100%",
        height: "90dp",
        backgroundColor: "#006699",
        id: "banner"
    });
    $.__views.starter.add($.__views.banner);
    $.__views.bannerLbl = Ti.UI.createLabel({
        width: "auto",
        height: "auto",
        color: "#fff",
        textAlign: "center",
        text: "Bläddra bland serviserna och klicka på den du gillar bäst.\nPå nästa sida får du fylla i beställningsformuläret.",
        font: {
            fontSize: "24sp",
            fontFamily: "GretaTextStdLight"
        },
        id: "bannerLbl"
    });
    $.__views.banner.add($.__views.bannerLbl);
    $.__views.containerScroll = Ti.UI.createScrollView({
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.SIZE,
        height: "auto",
        width: "100%",
        top: "210dp",
        backgroundColor: "#fff",
        scrollType: "vertical",
        id: "containerScroll"
    });
    $.__views.starter.add($.__views.containerScroll);
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
    $.__views.containerScroll.add($.__views.gridView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.starterwin.addEventListener("longpress", function() {
        $.admin.visible = true;
    });
    var curr = 0;
    var gridView = [];
    updateGrid();
    __defers["$.__views.admin!click!openAminWin"] && $.__views.admin.addEventListener("click", openAminWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;