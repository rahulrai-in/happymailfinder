/// <reference path="../App.js" />

(function () {
    "use strict";

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            displayItemDetails();
        });
    };

    // Displays the "Subject" and "From" fields, based on the current mail item
    function displayItemDetails() {
        var item = Office.cast.item.toItemRead(Office.context.mailbox.item);
        var encodedSubject = encodeURIComponent(item.subject);
        getScoreAsync(encodedSubject, displayResult);
    }

    function displayResult(responseData) {
        var score = JSON.parse(responseData).Score;
        $('#subject').text(score);
        $('#mailType').text(":-|");
        if (score<0.4) {
            $('#mailType').text(":-(");
        }
        if (score > 0.65) {
            $('#mailType').text(":-)");
        }
    }

    function getScoreAsync(encodedSubject, callback) {
        var xmlHttp = new XMLHttpRequest();
        var theUrl = "https://api.datamarket.azure.com/data.ashx/amla/text-analytics/v1/GetSentiment?Text=" + encodedSubject;
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                callback(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.setRequestHeader("Authorization", "Basic QWNjb3VudEtleTpQL045cDRNQjZGcE5xOGZuelFJQ0ljVVo0RHlmeHgydlJxbERlaXVDOGZJ");
        xmlHttp.setRequestHeader("Accept", "application/json");
        xmlHttp.send(null);
    }
})();