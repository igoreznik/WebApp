$(function() {
	var initApp = {

			updateNotification: function() {
				var notification = utils.notifications.get(0);
				$.ajax({
					url: "/data/config.json",
					method: "GET"
				}).done(function(data) {
						notification.innerText=data.notification;
					});
			},

		init: function() {
			initApp.updateNotification();
			tabs.init();
			tabsCtrl.init();
			formSettings.init();
			search.init();
			storage.init();
		}

	};
	initApp.init();
})

	
