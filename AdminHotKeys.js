

$(function(){
	$(document).bind('keydown', config.AdminHotKeys.hk_save, savePage);
	function savePage(e){ $('#submit_save').trigger("click"); };
});

