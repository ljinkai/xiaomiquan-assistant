chrome.browserAction.onClicked.addListener(function(tab) {
    var message = {
        act : "click",
    };
    chrome.tabs.sendMessage(tab.id, message);
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // read `newIconPath` from request and read `tab.id` from sender
        chrome.browserAction.setIcon({
            path : {
                "19": "icon128.png"
            },
            tabId: sender.tab.id
        });
    });