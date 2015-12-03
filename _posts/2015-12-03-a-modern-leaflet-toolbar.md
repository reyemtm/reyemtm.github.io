---
layout: post
title: "A Modern Leaflet Toolbar"
description: "This is my first iteration of a modern-looking ui for leaflet maps"
subtitle: "Stlying the Leaflet Control Container to Create a Modern Looking Toolbar"
tags: leaflet
map: leaflet-1.0.html
---
This is my take on a more modern looking leaflet toolbar/ui. With [leaflet-search](https://github.com/stefanocudini/leaflet-search) as the base, and a few short lines of css, I have customized the .leaflet-top.leaflet-left class so that it shows a more elegant looking toolbar. Any additional tools could be added to any of the other leaflet positions, as those have all been left untouched. Additional tools could also be loaded via another button on the current toolbar, possibly a leaflet.easyButton with a tools icon, that when clicked reveals additional tools on the right for example.

<iframe width="100%" height="400" src="//www.ovrdc.org/apps/ports.html" frameborder="0" allowfullscreen></iframe>

The toolbar is fixed width on larger screens, and full width on smaller devices. To view the entire css click [here](//getbounds.com/data/ovrdc-modern-ui.css).
