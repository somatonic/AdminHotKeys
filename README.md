# ProcessWire Hot Keys Module

This module adds hot key functionality to ProcessWire's backend. The keys can be configured to your preference in the module settings. [ProcessWire Forum thread](http://processwire.com/talk/topic/1524-admin-hot-keys/)

It uses a jQuery hotkeys plugin from here: [Hotkeys Github](https://github.com/jeresig/jquery.hotkeys)

### Currently supported actions:

* Save : `ctrl+s`
* Add New : `ctrl+n`
* View Page : `ctrl+v`
* Open Page search : `alt+q` (search fields can be configured)
* Open Templates search : `ctrl+shift+t`
* Open Fields search : `ctrl+shift+f`
* Goto Pages : `ctrl+shift+p`
* Goto Setup : `ctrl+shift+s`
* Goto Modules : `ctrl+shift+m`
* Goto Access : `ctrl+shift+a`

__Note__: If you're inside a text input it will ignore the hot keys, as to avoid problems with user input.

__Tip__: If you open up templates or fields autocomplete search `ctrl+shift+f|t` press `shift+tab` to focus on the link in the label previous to the search input box. Now hit enter to get right to the template or field screen. (If using FF make sure to enable tab focus for all elements in MacOSX: [Enable Setting in MacOSX](http://support.mozilla.org/en-US/kb/Pressing%20Tab%20key%20does%20not%20select%20menus%20or%20buttons))

Change Log:

0.0.9
- Dont display system save dialog on pressing CTRL-S @jmar

0.0.8
- added check to add hooks only in backend