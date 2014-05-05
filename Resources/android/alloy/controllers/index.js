function Controller() {
    function openStarterWin() {
        var starterWin = Alloy.createController("/starterwin").getView();
        starterWin.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: "true",
        fullscreen: "true",
        modal: "true",
        exitOnClose: "true",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.welcome = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/images/firstwin.png",
        id: "welcome"
    });
    $.__views.index.add($.__views.welcome);
    openStarterWin ? $.__views.welcome.addEventListener("click", openStarterWin) : __defers["$.__views.welcome!click!openStarterWin"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var db = Ti.Database.open("Fyrklovern");
    db.execute("CREATE TABLE IF NOT EXISTS starterpackage(id INTEGER PRIMARY KEY, startername TEXT, ocrnumber TEXT, image TEXT, imagename TEXT, tagline TEXT)");
    db.execute("CREATE TABLE IF NOT EXISTS clientorder(id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, street TEXT, zipcode TEXT, city TEXT, homephone TEXT, email TEXT , emptyone TEXT, sms TEXT, ocrnumber INT, socialsecurity TEXT, orderid TEXT, startername TEXT, network TEXT, originalocr TEXT, mobilephone TEXT, date TEXT, ifsent TEXT)");
    db.close();
    $.index.open();
    __defers["$.__views.welcome!click!openStarterWin"] && $.__views.welcome.addEventListener("click", openStarterWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;