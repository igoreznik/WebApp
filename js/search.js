var search = {
	init: function() {
		utils.searchBox.on("submit", search.setResult);
	},

	setOptArr: function(info, infoArr) {
		info.each(function(i, opt) {
			var opt = $(opt);
			infoArr.push({name: opt.text().toLowerCase(), url: opt.val(), opt:opt});
		});
		return infoArr;
	},

	getResult: function(optArr, searchInput) {
		var result;
		for(var i = 0; i<optArr.length; i++) {
			console.log(optArr[i].name.indexOf(searchInput));
			if(optArr[i].name.indexOf(searchInput) != -1) {
				result = optArr[i];
				break;
			}
		}
		return result;
	},


	setResult: function(e) {
		e.preventDefault();
		var searchInput = $(this).find("input").val().toLowerCase(),
			options = $("option"),
			optArr = [];
			console.log(searchInput);
			search.setOptArr(options, optArr);
			var result = search.getResult(optArr, searchInput);
			if(typeof(result) === "undefined") {
				utils.notifications.html("The search name " + searchInput + " not found");
			}
			else {
			var currentTabId = result.opt.closest(utils.tabData).attr("id"),
				currentLink = $("[href=#" + currentTabId + "]"),
				currentSelect = result.opt.closest(utils.select);
			currentLink.trigger("click");
			currentSelect.val(result.url);
			currentSelect.trigger("change");
			initApp.updateNotification();
			}
	},
};