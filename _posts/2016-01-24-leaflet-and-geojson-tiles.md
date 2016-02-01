---
layout: post
title: "Leaflet & GeoJson Tiles"
description: "Improving Leaflet performance using the geojson-vt plugin with two county parcel map examples."
subtitle: "A County Parcel App: No GIS Server? No Problem!"
tags:
 - leaflet
 - geojsonvt
published: false
feature-img: parcel-wide2.png
---
When displaying very  

<iframe src="apps/county-parcel-test-map.html" allowfullscreen width="100%" height="500px"></iframe>

The geojson is loaded via the omnivore plugin as topojson, then added to an empty L.geoJson layer - which is not added to the map. The original parcel shapefile (40mb & 70k features) was exported to geojson from ArcMap with the esri2open plugin, then exported as a topojson (5.5mb) using mapshaper.

This app is a test case to see if a county parcel viewer can be built without using a GIS server, which drives up the cost of such an application significantly. Frankly I'm amazed it works and at how fast it is, even on mobile. It is as fast if not faster than the OpenLayers 2/Geoserver app that is currently hosting the parcel viewer. Note that the app has all the plugins I use in all our web apps/maps loaded in the head. Only a handful of them are actually used in this app.
