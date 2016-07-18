![alt tag](https://raw.githubusercontent.com/davidcorbin/productivity-chrome/master/icons/Productivity-icon-128.png)
# productivity-chrome
Chrome extension for Productivity 

## Documentation

### Events

This browser extension waits in the background until certain events are performed by the user. 

These events are when:
- the current tab URL changes
- the user switches tabs

### Data Transfer

When events occur, the browser extension sends data to the running Productivity desktop application. 
The data transfer is done via a POST request to http://127.0.0.1:8000/productivity. 
All data transfered is JSON in the form of:

`{"status":"tab_switched","url":"https://github.com/davidcorbin/productivity-chrome/new/master?readme=1","title":"New File","favicon":"https://assets-cdn.github.com/favicon.ico"}`

Immediately when the extension starts, it sends a POST request to Productivity desktop application with the browser user agent.

### Responses

To be completed
