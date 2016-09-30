---
title: A Modern Leaflet Toolbar
date: 2015-12-03 00:00:00 Z
tags:
- leaflet
layout: post
description: This is my first iteration of a modern-looking UI for leaflet maps.
subtitle: Horizontal Toolbars in Leaflet
feature-img: modern-ui.gif
---

This is my take on a more modern looking leaflet toolbar/ui. With [leaflet-search](https://github.com/stefanocudini/leaflet-search) as the base, and a few short lines of css, I have customized the .leaflet-top.leaflet-left class so that it adds tools across the top of the screen, with the sidebar toggle fixed to the left. Additional tools could be added to any of the other default leaflet positions, as those have all been left untouched. Tools could also be loaded via another button on the current toolbar, possibly an L.easyButton with a tools icon, that when clicked reveals additional tools at position: 'topright', for example.

<iframe width="100%" height="450" src="//www.ovrdc.org/apps/ports.html" frameborder="0" allowfullscreen></iframe>

The toolbar is a fixed width on larger screens, and full width on smaller devices. Currently the toolbar consists of an L.easyButton for the leaflet-sidebar toggle followed by search, loading, fullscreen, default extent, location and layers control tools. I did add a custom image for the layers control to fit the theme of the other icons. All the tools sit on top of the leaflet-search div, with direction set right-to-left. This means that tools need to be added in reverse order of their appearance on the toolbar.

It would be great to see someone take this idea and create another leaflet 'position' like this or possibly turn this into a leaflet plugin.

View the entire css [here](https://www.ovrdc.org/apps/assets/ovrdc-css/modern-ui.css).
