import $ from "jquery";

/**
 * @class AppView
 * @param {HostNameInfo} hostNameInfo
 * @param {AuthorCommandTab} authorCommandTab
 * @param {BookCommandTab} bookCommandTab
 *
 * @constructor
 **/

function AppView(hostNameInfo, authorCommandTab, bookCommandTab) {
    /**
     * @type {HostNameInfo}
     * @protected
     */
    this._hostnNmeInfo = hostNameInfo;

    /**
     * @type {Element}
     * @protected
     */
    this._authorButton = document.getElementById("addAuthorButton");

    /**
     * @type {Element}
     * @protected
     */
    this._bookButton = document.getElementById("addBookButton");

    /**
     * @type {Element}
     * @protected
     */
    this._resetButton = document.getElementById("resetButton");

    /**
     * @type {AuthorCommandTab}
     * @protected
     */
    this._authorCommandTab = authorCommandTab;

    /**
     * @type {BookCommandTab}
     * @protected
     */
    this._bookCommandTab = bookCommandTab;

    /**
     * @type {Array}
     * @protected
     */
    this._apiUrls = {
        reset: "/library/resetApplication"
    };
}

AppView.prototype.initialise = function () {
    this._hostnNmeInfo.initialise();
    this._bookCommandTab.initialise();
    this._authorCommandTab.initialise();

    this._resetButton.addEventListener("click", this.resetApplication.bind(this), false);
    this._authorButton.addEventListener("click", this.openCommandTab.bind(this, 'addAuthor', this._authorCommandTab.updateView.bind(this._authorCommandTab)), false);
    this._bookButton.addEventListener("click", this.openCommandTab.bind(this, 'addBook', this._bookCommandTab.updateView.bind(this._bookCommandTab)), false);


};

AppView.prototype.resetApplication = function () {
    var self = this;
    $.ajax({
        url: self._apiUrls["reset"]
    }).then(function (data) {
        self._bookCommandTab.reset();
        self._authorCommandTab.reset();
    });
};

AppView.prototype.openCommandTab = function (commandName, callback, evt) {
    var i, x, tablinks;
    x = document.getElementsByClassName("command");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tabLink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" selected", "");
    }
    var commandNameElement = document.getElementById(commandName);
    commandNameElement.querySelectorAll('.responseBox')[0].innerHTML = "";

    if (callback !== null) {
        callback();
    }

    commandNameElement.style.display = "block";
    evt.currentTarget.className += " selected";
};

export default AppView;