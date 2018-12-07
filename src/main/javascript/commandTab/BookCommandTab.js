import AbstractCommandTab from './AbstractCommandTab';
import $ from "jquery";
import 'jquery-validation';

BookCommandTab.prototype = Object.create(AbstractCommandTab.prototype);

/**
 * @class BookCommandTab
 * @extends AbstractCommandTab
 *
 * @param {string} formContainerId
 * @param {string} submitButtonContainerId
 * @param {string} responseBoxId
 * @param {string} databaseListId
 * @param {string} updateDatabaseButtonId
 * @param {string} authorsSelectId
 * @constructor
 **/

function BookCommandTab(formContainerId, submitButtonContainerId, responseBoxId, databaseListId, updateDatabaseButtonId, authorsSelectId) {
    AbstractCommandTab.call(this, formContainerId, submitButtonContainerId, responseBoxId, databaseListId, updateDatabaseButtonId);

    /**
     * @type {Array}
     * @protected
     */
    this._apiUrls = {
        addBook: "/library/addBook",
        getAllBooks: "/library/getAllBooks",
        getAllAuthors: "/library/getAllAuthors"
    };

    /**
     * @type {boolean}
     * @protected
     */
    this._isAuthorPresent = false;

    /**
     * @type {jQuery}
     * @protected
     */
    this._authorSelect = $('#' + authorsSelectId);

}

/**
 * @override
 */
BookCommandTab.prototype.initialise = function () {
    AbstractCommandTab.prototype.initialise.call(this);
};

/**
 * @override
 */
BookCommandTab.prototype.reset = function () {
    this._isAuthorPresent = false;
    this._formContainer[0].reset();
    this._databaseList.text("");
    this._responseBox.innerHTML = "";
    this.updateDatabase();
};

/**
 * @override
 */
BookCommandTab.prototype.initialiseForm = function () {
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
            title: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            isbn: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            author: {
                required: true
            },
        },

        // Specify the validation error messages
        messages: {
            "title": "*Insert book title",
            "isbn": "*Insert book ISBN"
        },

        submitHandler: function (form) {
            $.ajax({
                type: 'PUT',
                url: self._apiUrls["addBook"],
                data: $(form).serialize(),
                dataType: 'html',
                success: function (data) {
                    self._responseBox.innerHTML = data;
                    self._formContainer[0].reset();
                    self.getAllElements();

                },
                error: function (data) {
                    self._responseBox.innerHTML = "Error: book not added";
                }
            });

            return false; // required to block normal submit since you used ajax
        }
    });
};

/**
 * @override
 */
BookCommandTab.prototype.getAllElements = function () {
    this.getAllAuthors();
};

/**
 * @override
 */
BookCommandTab.prototype.getAllBooks = function () {
    var self = this;
    $.ajax({
        url: self._apiUrls["getAllBooks"]
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

BookCommandTab.prototype.getAllAuthors = function () {
    var self = this;
    $.ajax({
        url: self._apiUrls["getAllAuthors"]
    }).then(function (data) {
        self.fillAuthorSelect(data);
        if (!self._isAuthorPresent) {
            self._responseBox.innerHTML = "Please insert an author first";
        } else {
            self.getAllBooks();
        }
    });
};

/**
 * @override
 */
BookCommandTab.prototype.appendDatabaseItem = function (dbElement) {
    var row = $("<div class='databaseRow'></div>");
    var id = $("<span class='bookId'></span>").text(dbElement.id);
    var title = $("<span class='bookTitle'></span>").text(dbElement.title);
    var author = $("<span class='bookAuthor'></span>").text(dbElement.author.name);
    var isbn = $("<span class='bookIsbn'></span>").text(dbElement.isbn);
    this._databaseList.append(row.append(id, title, author, isbn));
};

BookCommandTab.prototype.fillAuthorSelect = function (data) {
    this._authorSelect.text("");
    if (data.length !== 0) {
        this._isAuthorPresent = true;
        for (var i in data) {
            var option = $("<option></option>");
            option.val(data[i].id);
            option.text(data[i].name);
            this._authorSelect.append(option);
        }
    }
};

export default BookCommandTab;