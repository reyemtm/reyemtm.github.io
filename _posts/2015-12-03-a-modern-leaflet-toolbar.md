---
layout: post
title: "A Modern Leaflet Toolbar"
description: "This is my first iteration of a modern-looking ui for leaflet maps"
subtitle: "Stlying the Leaflet Control Class to Create a Modern Looking Toolbar"
tags: leaflet
---
This is my take on a more modern looking leaflet toolbar/ui. With [leaflet-search](https://github.com/stefanocudini/leaflet-search) as the base, and a few short lines of css, I have customized the .leaflet-top.leaflet-left class so that it shows a more elegant looking toolbar. Additional tools could be added to any of the other default leaflet positions, as those have all been left untouched. Tools could also be loaded via another button on the current toolbar, possibly a L.easyButton with a tools icon, that when clicked reveals additional tools at position: 'topright', for example.

<iframe width="100%" height="450" src="//www.ovrdc.org/apps/ports.html" frameborder="0" allowfullscreen></iframe>

The toolbar is fixed width on larger screens, and full width on smaller devices. Currently the toolbar consists of an L.easyButton for the leaflet-sidebar toggle followed by search, loading, fullscreen, default extent, location and layers control tools. All the tools sit on top of the leaflet-search div, with direction set right-to-left. This means that tools need to be added in reverse order of their appearance on the toolbar.

To view the entire css click [here](//getbounds.com/data/ovrdc-modern-ui.css).
