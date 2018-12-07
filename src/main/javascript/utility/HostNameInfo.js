import $ from 'jquery';

/**
 * @class HostNameInfo
 *
 * @param {string} hostnameValueId
 *
 * @constructor
 **/
function HostNameInfo(hostnameValueId) {
    /**
     * @type {jQuery}
     * @protected
     */
    this._hostnameValue = $('#' + hostnameValueId);

    /**
     * @type {Array}
     * @protected
     */
    this._apiUrls = {
        getHostname: "/library/getHostname"
    };
}

HostNameInfo.prototype.initialise = function () {
    var self = this;
    $.ajax({
        url: self._apiUrls["getHostname"]
    }).then(function (data) {
        self._hostnameValue.text(data);
    });
};

export default HostNameInfo;