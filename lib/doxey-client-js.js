/*
 * doxey-client-js
 *
 * Copyright (c) 2020 floreysoft
 * Licensed under the MIT license.
 */
(function () {
    "use strict";
    
    const base64 = require('base64-arraybuffer');
    const download = require("downloadjs");

    function doFetch(url, data, filename) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.blob();
        })
        .then(blob => {
            download(blob, filename, "application/octet-stream");
        })
        .catch(() => {
            debugger;
        });
    }

    exports.doConvertInput = function (url, files, format, model, locale, timezone, currency, apiKey) {
        url = url || "https://api.doxey.io/merge";
        var selectedFile = files[0];
        var filename = "file." + format;
        var p = selectedFile.arrayBuffer();
        p.then((buffer) => {
            var data = {
                template: "data:application/octet-stream;base64," + base64.encode(buffer),
                locale,
                timezone,
                currency,
                format,
                apiKey,
                model,
            };
            doFetch(url, data, filename);
        });
    }

    exports.doConvertUrl = function (url, template, format, model, locale, timezone, currency, apiKey) {
        url = url || "https://api.doxey.io/merge";

        var filename = "file." + format;
        var model = JSON.parse(document.getElementById("model").value);
        var data = {
            template,
            locale,
            timezone,
            currency,
            format,
            apiKey,
            model,
        };
        doFetch(url, data, filename);
    }

})();