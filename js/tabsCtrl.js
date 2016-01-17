var tabsCtrl = {
	init: function() {
		utils.settingsBtn.on("click", tabsCtrl.settingsToggle);
		utils.expandBtn.on("click", tabsCtrl.expand);
		utils.select.on("change", tabsCtrl.iframeChanger);
	},

	settingsToggle: function(e) {
		e.preventDefault();
		var $this = $(this);
		$this.toggleClass("open");
		$this.closest(utils.tabData).find(utils.settings).toggle();
	},

	expand: function(e) {
		e.preventDefault();
		var iframe = $(this).closest(utils.tabData).find("iframe");
		var expandBtn = $(this).closest(utils.tabData).find(utils.expandBtn);
			url = iframe.attr("src");
			if(url != '') {
				window.open(url, "_blank");
			}
			else {
				expandBtn.attr("href", url);
			}
	},

	iframeChanger: function() {
		var iframe = $(this).closest(utils.tabData).find("iframe");
		iframe.attr("src", $(this).val());
	}
}