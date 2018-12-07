import $ from 'jquery';

//require('jquery-form-validation');

/**
 * @class AbstractCommandTab
 *
 * @param {string} formContainerId
 * @param {string} submitButtonContainerId
 * @param {string} responseBoxId
 * @param {string} databaseListId
 * @param {string} updateDatabaseButtonId
 *
 * @constructor
 **/
function AbstractCommandTab(formContainerId, submitButtonContainerId, responseBoxId, databaseListId, updateDatabaseButtonId) {
    /**
     * @type {jQuery}
     * @protected
     */
    this._formContainer = $('#' + formContainerId);

    /**
     * @type {Element}
     * @protected
     */
    this._submitButton = document.getElementById(submitButtonContainerId);

    /**
     * @type {Element}
     * @protected
     */
    this._responseBox = document.getElementById(responseBoxId);

    /**
     * @type {jQuery}
     * @protected
     */
    this._databaseList = $('#' + databaseListId);

    /**
     * @type {Element}
     * @protected
     */
    this._databaseUpdateButton = document.getElementById(updateDatabaseButtonId);

    /**
     * @type {String}
     * @protected
     */
    this._method = "GET";

    /**
     * @type {Array}
     * @protected
     */
    this._apiUrls = [];
}

AbstractCommandTab.prototype.initialise = function () {
    this.initialiseForm();
    this._submitButton.addEventListener("click", this.validate.bind(this), false);
    this._databaseUpdateButton.addEventListener("click", this.updateDatabase.bind(this), false);
    this.updateDatabase();
};

AbstractCommandTab.prototype.updateView = function () {
    this.updateDatabase();
};

AbstractCommandTab.prototype.updateDatabase = function () {
    this.getAllElements();
};

AbstractCommandTab.prototype.reset = function () {

};

AbstractCommandTab.prototype.initialiseForm = function () {

};

AbstractCommandTab.prototype.updateForm = function () {

};

AbstractCommandTab.prototype.getAllElements = function () {

};

AbstractCommandTab.prototype.appendDatabaseItem = function () {

};

AbstractCommandTab.prototype.validate = function () {
    if (this._formContainer.valid()) {
        this._formContainer.submit();
    }
};

export default AbstractCommandTab;