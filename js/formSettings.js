var formSettings = {
	init: function() {
		utils.formSettings.on("submit", formSettings.submitForm);
		utils.inputs.on("input", formSettings.validation);
		utils.cancelBtn.on("click", function(e) {
			e.preventDefault();
			var tab = $(this).closest('.tabs-data');
			formSettings.closeSettings(tab);
		});

		$(document).on('keyup',function(e){
                var tab = $($(this).find('.activeTab').attr('href'));
                if(e.keyCode === 27 ){
                    formSettings.closeSettings(tab)
                }
        })
	},

	formArray: function(content, contentArr) {
		content.each(function () {
		var nameInput = $(this).find(".name-input");
		var urlInput = $(this).find(".url-input");
		if (!nameInput.val()) {
			return;
		}
		contentArr.push({name: nameInput.val(), url: urlInput.val()});
	});
		return contentArr;
	},

	generateOption: function(select, content) {
		select.html('');
		for(var i = 0; i<content.length; i++) {
			var option = $("<option>" + content[i].name + "</option>").attr("value", content[i].url);
			select.append(option);
		}
			formSettings.showSelect(select, content);
	},

	showSelect: function(select, content) {
		select.show();
		select.focus();
		select.closest(utils.tabData).find(utils.expandBtn).show();
		select.closest(utils.tabData).find("iframe").attr("src", content[0].url);
	},

	hideSelect: function(select) {
		select.hide();
		select.closest(utils.tabData).find(utils.expandBtn).hide();
		select.closest(utils.tabData).find("iframe").attr("src", '');
	},

	openSettings: function(tab) {
		tab.find(utils.settings).show();
		tab.find(utils.settingsBtn).addClass("open");
	},

	closeSettings: function(tab) {
		var settingsBtn = tab.find(utils.settingsBtn);
		tab.find(utils.settings).hide();
		settingsBtn.focus();
		settingsBtn.removeClass("open");
	},

	submitForm: function(e) {
		e.preventDefault();
		var tab = $(this).closest('.tabs-data'),
			tabId = tab.attr('id'),
			//form = tab.find('.form-wrap'),
			//iframe = tab.find('iframe'),
			report = $(this).find('.set-link'),
			select = tab.find('select'),
			settingsBtn = tab.find(utils.settingsBtn),
			reportsArr = [];
			formSettings.formArray(report, reportsArr);
			if(reportsArr.length>0) {
				formSettings.generateOption(select, reportsArr);
				//iframe.show();
				//form.hide();
				//settingsBtn.removeClass("open");
			}
			else {
				formSettings.hideSelect(select);
				//form.show();
				//iframe.hide();
			}
			formSettings.closeSettings(tab);
			storage.storageData[tabId] = reportsArr;
			storage.setStorage();

	},

	validation : function(){
            var report = $(this).closest('.set-link'),
                inputs = report.find('input'),
                inputsArr = [].slice.call(inputs),
                emptyInputs = inputsArr.every(function(element){
                    var element = $(element);
                    return !element.val();   
                });

            inputs.prop('required', true); 
            if(emptyInputs){
                inputs.removeProp('required'); 
            }  

        }




}