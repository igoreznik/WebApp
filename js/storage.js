var storage = {
	init: function() {
		storage.initHash();
		storage.tabReport('quick-reports');
		storage.tabReport('my-team-folders');
	},

	storageData: JSON.parse(localStorage.getItem('data')) || {},

	initHash: function() {
		var currentLink = $('[href= ' + storage.storageData.hash + ']');
		currentLink.trigger('click');
	},

	setReports: function(info, infoArr) {
		info.each(function(i, el) {
			var el = $(el);
			if(!infoArr[i]) {
				return false;
			}
			var nameInput = el.find('.name-input');
			var urlInput = el.find('.url-input');
			nameInput.val(infoArr[i].name);
			urlInput.val(infoArr[i].url);
		})
	},

	tabReport: function(reportName) {
		if(storage.storageData[reportName]) {
			var tab = $('#' + reportName),
				select = $('.tabs-data').find('select'),
				report = $('.tabs-data').find('.set-link'),
				reportData = storage.storageData[reportName];

			if(!reportData.length) {
				formSettings.openSettings(tab);
				return;
			}
			formSettings.closeSettings(tab);
			formSettings.generateOption(select, reportData);
			storage.setReports(report, reportData);
		}
	},

	setStorage: function() {
		localStorage.setItem('data', JSON.stringify(storage.storageData));
	}
}