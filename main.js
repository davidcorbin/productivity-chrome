/**
 * Copyright (c) 2016 David Corbin. All rights reserved.
 */

(function() {

    "use strict";

    // Send data to desktop app
    function send(data) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                parseresponse(xhr.status);
            }
        };
        xhr.open("POST", "http://127.0.0.1:8000/productivity", true);
        xhr.send(data);
    }

    // Parse data returned from application after http request
    function parseresponse(httpstatus) {
        // If http request is not successful, show an X next to the icon
        if (httpstatus!=200) {
            chrome.browserAction.setBadgeText({
                "text":"X"
            });
        }
        else {
            chrome.browserAction.setBadgeText({
                "text":""
            });
        }
    }

    // Get user agent
    function getUA() {
        return navigator.userAgent;
    }

    // Connect to desktop application
    function connect() {
        send('{"status":"running", "source":"' + getUA() + '"}');
    }

    // Generate array from tab data
    function getTabData(status, url, title) {
        var data = {};
        data.status = status;
        data.url = url;
        data.title = title;
        data.browser = "Firefox";
        return data;
    }

    // Previous url sent
    var prevUrl = "";

    // Called when tab is updated
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            var tabdata = getTabData("tab_updated", tab.url, tab.title);
            send(JSON.stringify(tabdata));
            prevUrl = tab.url;
        }
    });

    // Called when tabs are switched
    chrome.tabs.onActivated.addListener(function(tab) {
        chrome.tabs.get(tab.tabId, function(tab) {
            var tabdata = getTabData("tab_switched", tab.url, tab.title);
            send(JSON.stringify(tabdata));
            prevUrl = tab.url;
        });
    });

    // Send connection message when extension starts
    connect();

})();
