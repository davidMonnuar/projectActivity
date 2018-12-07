import AbstractCommandTab from './AbstractCommandTab';
import $ from "jquery";
import 'jquery-validation';

AuthorCommandTab.prototype = Object.create(AbstractCommandTab.prototype);

/**
 * @class AuthorCommandTab
 * @extends AbstractCommandTab
 *
 * @param {string} formContainerId
 * @param {string} submitButtonContainerId
 * @param {string} responseBoxId
 * @param {string} databaseListId
 * @param {string} updateDatabaseButtonId
 * @constructor
 **/

function AuthorCommandTab(formContainerId, submitButtonContainerId, responseBoxId, databaseListId, updateDatabaseButtonId) {
    AbstractCommandTab.call(this, formContainerId, submitButtonContainerId, responseBoxId, databaseListId, updateDatabaseButtonId);

    /**
     * @type {Array}
     * @protected
     */
    this._apiUrls = {
        addAuthor: "/library/addAuthor",
        getAllAuthors: "/library/getAllAuthors"
    };
}

/**
 * @override
 */
AuthorCommandTab.prototype.reset = function () {
    this._formContainer[0].reset();
    this._databaseList.text("");
    this._responseBox.innerHTML = "";
    this.updateDatabase();
};

/**
 * @override
 */
AuthorCommandTab.prototype.initialiseForm = function () {
    var self = this;

    var validator = this._formContainer.validate({
        onkeyup: false,
        onclick: false,
        onfocusout: false,
        ignore: "",
        errorElement: "label",

        errorPlacement: function (error, element) {
            element.val("");
            element.attr("placeholder", error.text());
            element.addClass("error");
        },

        // Specify the validation rules
        rules: {
            name: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            }
        },

        // Specify the validation error messages
        messages: {
            "name": "*Insert author name"
        },

        submitHandler: function (form) {
            $.ajax({
                type: 'PUT',
                url: self._apiUrls["addAuthor"],
                data: $(form).serialize(),
                dataType: 'html',
                success: function (data) {
                    self._responseBox.innerHTML = data;
                    self._formContainer[0].reset();
                    self.getAllElements();
                },
                error: function (data) {
                    self._responseBox.innerHTML = "Error, author not added";
                }
            });

            return false; // required to block normal submit since you used ajax
        }
    });
};

/**
 * @override
 */
AuthorCommandTab.prototype.getAllElements = function () {
    this.getAllAuthors();
};

/**
 * @override
 */
AuthorCommandTab.prototype.getAllAuthors = function () {
    var self = this;
    $.ajax({
        url: self._apiUrls["getAllAuthors"]
    }).then(function (data) {
        if (data.length === 0) {
            self._responseBox.innerHTML = "Empty Database";
        }
        else {
            self._databaseList.text("");
            for (var i in data) {
                self.appendDatabaseItem(data[i]);
            }
        }
    });
};


/**
 * @override
 */
AuthorCommandTab.prototype.appendDatabaseItem = function (dbElement) {
    var row = $("<div class='databaseRow'></div>");
    var id = $("<span class='authorId'></span>").text(dbElement.id);
    var name = $("<span class='authorName'></span>").text(dbElement.name);
    var books = $("<span class='authorBooks'></span>");
    var booksContent = "";
    var booksElement = dbElement.books;
    var booksElementLength = booksElement.length;
    if (booksElementLength > 0) {
        for (var i = 0; i < booksElementLength; i++) {
            booksContent += "" + booksElement[i];
            if (i + 1 < booksElementLength) {
                booksContent += ", ";
            }
        }
    }
    books.text(booksContent);
    this._databaseList.append(row.append(id, name, books));
};

export default AuthorCommandTab;