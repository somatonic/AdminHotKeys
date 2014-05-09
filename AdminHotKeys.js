var hkconf = config.AdminHotKeys;

$(function() {

    // save hot key for all edit screens
    if ($('button[id*="submit"]').length > 0) {
        function savePage(e) {
            $('button[id*="submit"]').trigger('click');
            e.preventDefault();
        };
        $(document).bind('keydown', hkconf.hk_save, savePage);
    }
    // add hot key for "add new"
    if ($('a[href*="add"]').length > 0) {
        function addNew(e) {
            $('a[href*="add"] button').trigger('click');
        };
        $(document).bind('keydown', hkconf.hk_addnew, addNew);
    }
    // add hot key for "view" on page edit screen
    if ($('a[id="_ProcessPageEditView"]').length > 0) {
        function viewPage() {
            window.location.href = $('a[id="_ProcessPageEditView"]').attr('href');
        };
        $(document).bind('keydown', hkconf.hk_view, viewPage);
    }


    // add hot key for /setup/
    function openSetup() {
        window.location.href = $('#topnav a[href*="/setup"]').attr('href');
    };
    $(document).bind('keydown', hkconf.hk_opensetup, openSetup);

    // add hot key for /module/
    function openModules() {
        window.location.href = $('#topnav a[href*="/module"]').attr('href');
    };
    $(document).bind('keydown', hkconf.hk_openmodules, openModules);

    // add hot key for /page/
    function openPages() {
        window.location.href = $('#topnav a[href*="/page"]').attr('href');
    };
    $(document).bind('keydown', hkconf.hk_openpages, openPages);

    // add hot key for /access/
    function openAccess() {
        window.location.href = $('#topnav a[href*="/access"]').attr('href');
    };
    $(document).bind('keydown', hkconf.hk_openaccess, openAccess);




    // add hot key for template,field autocomplete edit
    function openHKTemplateList() {
        $('#hk_list').remove();
        prepareHKContainer(hkconf.hk_pwtemplates, 'Edit <a href="' + config.urls.admin + 'setup/template/">Template</a>:', 'setup/template/edit', 'template');
        $('#hk_list').fadeIn(200, function() {
            $(this).find('input:first').focus()
        });
    };

    function openHKFieldList() {
        $('#hk_list').remove();
        prepareHKContainer(hkconf.hk_pwfields, 'Edit <a href="' + config.urls.admin + 'setup/field/">Field</a>:', 'setup/field/edit', 'field');
        $('#hk_list').fadeIn(200, function() {
            $(this).find('input:first').focus()
        });
    };

    function openHKPageList() {
        $('#hk_list').remove();
        prepareHKContainer(function(request, callback) {
            searchPages(request.term, callback)
        }, 'Edit <a href="' + config.urls.admin + 'page/">Page</a>:', 'page/edit/', 'page');
        $('#hk_list').fadeIn(200, function() {
            $(this).find('input:first').focus()
        });
    };


    $(document).bind('keydown', hkconf.hk_templateedit, openHKTemplateList);
    $(document).bind('keydown', hkconf.hk_fieldedit, openHKFieldList);
    $(document).bind('keydown', hkconf.hk_pageedit, openHKPageList);

    function closeHKList() {
        $('#hk_list').fadeOut(200, function() {
            $(this).remove();
        });
    };
    $(document).bind('keydown', "esc", closeHKList);
    $("body").live('click', function(e) {
        var node = $(e.target);
        if (node.closest('.hk_list').length == 0) closeHKList();
    });




});

/**
 * Create an autcomplete search box
 * tags: the objects array|object
 * label to show string|html
 * url for the edit page
 */
var prepareHKContainer = function(tags, label, url, type) {
    var $items = $('<div id="hk_list" class="hk_list ui-widget ui-widget-content"><label>' + label + ' </label><input id="hk_items"></div>');

    // if using type page, append template select
    if (type == 'page') {
        $select = $('<select id="hk_templateselect"></select>');
        $select.append('<option value=""> </option>');
        for (name in hkconf.hk_pwtemplates) {
            $select.append('<option value="' + hkconf.hk_pwtemplates[name] + '">' + name + '</option>');
        }
        $items.append($select);
    }

    if (typeof tags == "function") {
        // source can also be a callback that handles the remote source
        hk_source = tags;
    } else {
        var hk_source = [];
        for (var tname in tags) {
            // create static array obects for autocomplete search
            hk_source.push({
                label: tname,
                value: tags[tname]
            });
        }
    }

    $('body').append($items.hide());
    $('#hk_items').autocomplete({
        // the source can also be a callback
        source: hk_source,
        minLength: 2,
        position: {
            my: "center top+40",
            at: "center bottom"
        },
        focus: function(event, ui) {
            return false;
        },
        select: function(event, ui) {
            window.location = config.urls.admin + url + "?id=" + ui.item.value;
            return false;
        }
    })
    // set max height based on screen size
    var wheight = $(window).height() / 100 * 73;
    $('body').find('.ui-menu').css({
        'maxHeight': wheight + "px"
    });
};

// helper callback by autcomplete to search using PW search (ajax)
// result will be a json object if called using aja
var searchPages = function(term, callback) {
    $.ajax({
        url: config.urls.admin + 'page/search/',
        data: {
            'q': term,
            'operator': 7, // using %= to find pages
            'field': hkconf.hk_pagefields != '' ? hkconf.hk_pagefields : 'title body',
            'template': $('#hk_templateselect').val()
        },
        dataType: 'json',
        success: function(data) {
            if (data.total == 0) {
                callback();
            } else {
                // save each result in a array with objects
                var results = [];
                for (res in data.matches) {
                    results.push({
                        label: data.matches[res].title,
                        value: data.matches[res].id
                    });
                }

                // send back results to autocomplete
                callback(results);
            }
        }
    });
};