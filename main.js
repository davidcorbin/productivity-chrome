/**
 * Copyright (c) 2016 David Corbin. All rights reserved.
 */

(function() {

    "use strict";

    // Send data to desktop app
    function send(data) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = parseresponse(xhr);
        xhr.open("POST", "http://localhost:8000/productivity", true);
        xhr.send(data);
    }

    // Parse data returned from application after http request
    function parseresponse(xhr) {
        //console.log(xhr);
    }

    // Get user agent
    function getUA() {
        return navigator.userAgent;
    }

    // Connect to desktop application
    function connect() {
        send('{"status":"running", "source":"' + getUA() + '"}');
    }

    // Called when tab is updated
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {

            // Don't send message if new tab
            if (tab.url=="chrome://newtab/") {
                return;
            }

            var tabdata = {};
            tabdata.status = "tab_updated";
            tabdata.url = tab.url;
            tabdata.title = tab.title;
            tabdata.favicon = tab.favIconUrl;
            console.log(tabdata);
            send(JSON.stringify(tabdata));
        }
    });

    // Called when tabs are switched
    chrome.tabs.onActivated.addListener(function(tab) {
        chrome.tabs.get(tab.tabId, function(tab) {

            // Don't send message if new tab
            if (tab.url=="chrome://newtab/") {
                return;
            }

            var tabdata = {};
            tabdata.status = "tab_switched";
            tabdata.url = tab.url;
            tabdata.title = tab.title;
            tabdata.favicon = tab.favIconUrl;
            console.log(tabdata);
            send(JSON.stringify(tabdata));
        });
    });

    connect();

})();
