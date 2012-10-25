// Copyright (c) 2012 Hawstein. All rights reserved.
// Description: Solve the Google Redirect Problem
// Author: Hawstein
// Email: tomhawstein@gmail.com

chrome.contextMenus.create
		({
			'title': 	'Google Url',
			'type': 	'normal',
			'contexts': ['all'],
			'onclick': 	getRealUrl
		});
		
function getRealUrl(info, tab){
	var myurl = info.linkUrl; //get the link url¡£
	strip(myurl, tab, 0, 0);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	var myurl = tab.url;
	strip(myurl, 0, tabId, 1);
});

function strip(myurl, tab, tabId, flag){
	if (myurl.indexOf("www.google.com.hk/url") >= 0 || myurl.indexOf("www.google.com/url") >= 0) 
	{ 
		myurl = myurl.replace(/(http)(.*)(url=)/, ""); 
		myurl = myurl.replace(/(&ei=).*/, "");
		myurl = myurl.replace(/%3A/g, ":");
		myurl = myurl.replace(/%2F/g, "/");
		if(flag==0)
			chrome.tabs.create({ url: myurl, index:(tab.index+1)});
		else
			chrome.tabs.update(tabId, { url: myurl })
	}
}
