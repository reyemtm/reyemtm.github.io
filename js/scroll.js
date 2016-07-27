/*******************************************************************************
                             Gentle Anchors v1.2.4
********************************************************************************
* Author: Kendall Conrad of Angelwatt.com
* Home Page: http://www.angelwatt.com/coding/gentle_anchors.php
* Created: 2008-06-25
* Updated: 2013-04-18
* Description: Gentle Anchors is a page scrolling script for anchor and area tags on a page.
* License:
	This work is licensed under a Creative Commons Attribution-Share Alike
	3.0 United States License
	http://creativecommons.org/licenses/by-sa/3.0/us/
*******************************************************************************/
(function(scope) {
'use strict';

scope.Gentle_Anchors = function() {
	//#### Script preferences ####
	// Recommended Speed Range: 4 to 40 (fast to slow) default value 12
	var scrollSpeed  = 12,     // Controls speed of scroll:
		shine        = true,   // Whether to use shine effect
		shineColor   = '#dd9', // Background color for shine
		shineOutline = '#5f5', // Outline color for shine; transparent for off
		excluded = [ // array of exclusion patterns in regex format
			// example /exampleExclu[sion]{4}Pattern/
		],
	//#### End script preferences ####
		timer,      // Timer item
		elt = null, // the current clicked on element
		// Get the current URL page
		curPage = location.href.split('?')[0].split('#')[0],
		anchorOnPage = new RegExp("^" + curPage + "(\\?[^#]*)?#[a-zA-Z0-9:\._-]+");
	/**
	 * Setup href from link.
	 */
	var fxLinkClick = function(e) {
		e = e || window.event;
		var href = e.target ? e.target.href : e.srcElement.href;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false; // for IE
		return Setup(href);
		//return false;
	};

	// Initialization, grabbing all anchors and adding onclick event
	var Init = function() {
		var a = document.getElementsByTagName('a'),
			area = document.getElementsByTagName('area'),
			links = new Array(),
			x = 0, y = 0;
		// combine NodeLists together
		for (x = 0, y = a.length; x < y; links.push(a[x++]));
		for (x = 0, y = area.length; x < y; links.push(area[x++]));
		LBL:for (x = 0, y = links.length; x < y; x++) {
			// If the link is on the current page and has an anchor
			if (anchorOnPage.test(links[x].href)) {
				for (var j = 0, k = excluded.length; j < k; j++) {
					// If excluded, continue to next link
					if (excluded[j].test(links[x].href)) {
						console.info('Excluded Match: ' + links[x].href);
						continue LBL;
					}
				}
				if (window.addEventListener) {
					links[x].addEventListener('click', fxLinkClick, true);
				}
				else if (window.attachEvent) {
					links[x].attachEvent('onclick', fxLinkClick);
				}
				else {
					links[x]['onclick'] = fxLinkClick;
				}
			}
		}
	};

	/**
	 * Set things up for the scrolling effect
	 */
	var Setup = function(href) {
		var doc = document;
		if (!href.match(/#([^\?]+)/)) {
			return true;
		}
		var hash = href.match(/#([^\?]+)/)[1]; // get id, but not any query string
		// identify destination element
		if (doc.getElementById(hash)) {
			elt = doc.getElementById(hash);
		}
		else {
			return true;
		}
		// Find scroll position to destination
		var dest = elt.offsetTop;
		for (var node = elt;
			node.offsetParent && node.offsetParent != doc.body;
			node = node.offsetParent,
			dest += node.offsetTop);
		// fix for stupid IE
		if (navigator.appName.indexOf("Microsoft") != -1
				&& parseFloat(navigator.appVersion.split("MSIE")[1]) < 8.0) {
			dest = elt.offsetTop;
		}
		clearTimeout(timer);
		var start = getPageY();
		// fix for back button
		location.hash = hash;     // jump to destination
		window.scrollTo(0, start); // then quickly jump back to scroll the distance
		var speed = parseInt(Math.abs(start-dest) / scrollSpeed);
		Scroll(speed, (dest-10));   // minus 10 for padding
		return false;
	};

	/**
	 * Handles the scroll effect.
	 */
	var Scroll = function(step, desty) {
		var doc = document,
			was = getPageY(),
			// find out how much to scroll by up/down
			amt = (was < desty) ? was + step : was - step;

		// Make sure we didn't go past
		if (Math.abs(was-desty) < step) {
			amt = desty;
		}
		window.scrollTo(0, amt);
		var now = getPageY(),
			// slow scroll down as approach
			diff = Math.abs(now-desty);
		// Less than one doesn't add well
		if (diff < 1) {
			step = 1;
		}
		else if (diff < step * 2) {
			step *= .6;
		}
		else if (diff < step * 6) {
			step *= .9;
		}
		// if we're at the right scroll position
		if (was == now) {
			window.scrollTo(0, desty);
			clearTimeout(timer); // clear interval
			if (shine) {
				setTimeout(function(){
					ShineOn();
				}, 400);
			}
			return;
		}
		timer = setTimeout(function() {
			Scroll(step, desty);
		}, 30);
	};

	/**
	 * Returns the current offset from the top of the page.
	 */
	var getPageY = function() {
		var doc = document;
		return window.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
	};

	/**
	 * Highlght the target.
	 */
	var ShineOn = function() {
		var c = elt.style.backgroundColor,
			o = elt.style.outline;
		elt.style.backgroundColor = shineColor;
		elt.style.outline = '1px solid ' + shineOutline;
		setTimeout(function() {
			ShineOff(c, o);
		}, 1000 );
	};

	/**
	 * Removes the shine effect.
	 */
	var ShineOff = function(oldColor, oldOutline) {
		elt.style.backgroundColor = oldColor;
		elt.style.outline = oldOutline;
	};

	// Classic append for onload event to avoid overriding
	function appendOnLoad(fx) {
		try { // For browsers that know DOMContentLoaded (FF, Safari, Opera)
			document.addEventListener('DOMContentLoaded', fx, false);
		}
		catch(e) { // for IE and older browser
			try {
				document.addEventListener('load', fx, false);
			}
			catch(ee) {
				window.attachEvent('onload', fx);
			}
		}
	}
	appendOnLoad(Init);
	// Return public methods
	return {
		Setup:Setup
	};
}();

})(window);
