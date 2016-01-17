var tabs = {
	init: function() {
		utils.tabLink.on("click", tabs.changeHash);
		$(window).on("hashchange", tabs.changeTab);
	},

	changeHash: function(e) {
		e.preventDefault();
		var tabId = $(this).attr("href");
		history.pushState(null, null, tabId);
		$(window).trigger("hashchange");

	},

	linkMatch: function(identity) {
		var tabId = [].slice.call(utils.tabLink).map(function(element) {
			var element = $(element);
				refEl = element.attr("href");
                return refEl;
        }),
            linkMatch = false,
            checkMatch = $.inArray(identity, tabId);
            if(checkMatch != -1){
                linkMatch = true			
            }; 
            return linkMatch;
	},

	gotoTab: function(currentTab, currentLink) {
		utils.tabData.hide();
		utils.tabLink.removeClass("activeTab");
		currentTab.show();
		currentLink.addClass("activeTab");
	},

	changeTab: function() {
		var identity = window.location.hash;
			currentTab = $(identity);
			currentLink = $("[href= " + identity + "]");
		if(tabs.linkMatch(identity)) {
			tabs.gotoTab(currentTab, currentLink);
			storage.storageData.hash = identity;
			storage.setStorage();
		}
	}	 
};