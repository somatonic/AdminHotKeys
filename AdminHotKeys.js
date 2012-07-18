

$(function(){
	// save hot key for all edit screens
	if($('button[id*="submit"]').length > 0){
		function savePage(e){ $('button[id*="submit"]').trigger('click'); };
		$(document).bind('keydown', config.AdminHotKeys.hk_save, savePage);

	}
	// add hot key for "add new"
	if($('a[href*="add"]').length > 0){
		function addNew(e){ $('a[href*="add"] button').trigger('click'); };
		$(document).bind('keydown', config.AdminHotKeys.hk_addnew, addNew);

	}

});

