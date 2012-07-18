

$(function(){

	var hkconf = config.AdminHotKeys;

	// save hot key for all edit screens
	if($('button[id*="submit"]').length > 0){
		function savePage(e){ $('button[id*="submit"]').trigger('click'); };
		$(document).bind('keydown', hkconf.hk_save, savePage);

	}
	// add hot key for "add new"
	if($('a[href*="add"]').length > 0){
		function addNew(e){ $('a[href*="add"] button').trigger('click'); };
		$(document).bind('keydown', hkconf.hk_addnew, addNew);

	}
	// add hot key for /setup/
	function openSetup(){ window.location.href = $('#topnav a[href*="/setup"]').attr('href'); };
	$(document).bind('keydown', hkconf.hk_opensetup , openSetup);

	// add hot key for /module/
	function openModules(){ window.location.href = $('#topnav a[href*="/module"]').attr('href'); };
	$(document).bind('keydown', hkconf.hk_openmodules , openModules);

	// add hot key for /page/
	function openPages(){ window.location.href = $('#topnav a[href*="/page"]').attr('href'); };
	$(document).bind('keydown', hkconf.hk_openpages , openPages);

	// add hot key for /access/
	function openAccess(){ window.location.href = $('#topnav a[href*="/access"]').attr('href'); };
	$(document).bind('keydown', hkconf.hk_openaccess , openAccess);




	// add hot key for template,field autocomplete edit
	function openHKTemplateList(){
		$('#hk_list').remove();
		prepareHKContainer('Edit Template:',hkconf.hk_pwtemplates, 'setup/template/edit');
		$('#hk_list').fadeIn().find('input:first').focus();
	};
	function openHKFieldList(){
		$('#hk_list').remove();
		prepareHKContainer('Edit Field:',hkconf.hk_pwfields, 'setup/field/edit');
		$('#hk_list').fadeIn().find('input:first').focus();
	};

	$(document).bind('keydown', hkconf.hk_templateedit , openHKTemplateList);
	$(document).bind('keydown', hkconf.hk_fieldedit , openHKFieldList);

	function closeHKList(){ $('#hk_list').fadeOut(function(){ $(this).remove(); }); };
	$(document).bind('keydown', "esc", closeHKList);
	$("body").live('click', function(e){
		var node = $(e.target);
		if(node.closest('.hk_list').length == 0) closeHKList();
	});




});

var prepareHKContainer = function(label, tags, url) {
	var $items = $('<div id="hk_list" class="hk_list ui-widget"><label>'+label+' </label><input id="hk_items"></div>');
	var hk_taglist = [];
	for(var tname in tags){
		 hk_taglist.push({label: tname, value: tags[tname]});
		//$tmpls.append("<a href='" + config.urls.admin + "setup/template/edit?id=" + hkconf.hk_pwtemplates[tname] + "'>" + tname + "</a>");
	}
	var wheight = $(window).height()/2;
	$('body').append($items.hide());
	$('#hk_items').autocomplete({
		source: hk_taglist,
		minLength : 0,
		position: { my : "center top", at: "center bottom" },
		focus: function(event, ui) { return false; },
		select: function(event, ui) {
			window.location = config.urls.admin + url + "?id=" + ui.item.value;
			return false;
		}
	}).find('.ui-autocomplete.ui-menu').css({height: wheight + "px"});

};
