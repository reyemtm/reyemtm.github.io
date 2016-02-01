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
A county engineer recently asked me if it would be possible to create a low-cost or even free parcel viewer. Having successfully rendered a few thousand parcels with leaflet and geojson I thought this might be possible. However, running client-side apps has its drawbacks, including fairly meager limits on the number of polygon features drawn on the map.

###Simplification & TopoJson

One of the first things to prepare a shapefile for a leaflet map is to eliminate unecessary fields. For the parcel map all the fields were removed spare the owner name and parcel ID, which were concantenated into an index field. The original 22mb shapefile was then simplified via [mapshaper](http://mapshaper.com) and exported as topojson. This shaved 16mb off the shapefile, and the raw topojson would load on my work pc. However the map was still not usable on a mobile device, due to load times and overall performance. So when redering tens of thousands of polygons, field purging, simplication and topojson is still not enough. Luckily [mourner](https://github.com/mourner) created [geojson-vt](https://github.com/mapbox/geojson-vt).

###GeoJson Tiles

###Search and Identify

<iframe src="apps/county-parcel-test-map.html" allowfullscreen width="100%" height="500px"></iframe>

The geojson is loaded via the omnivore plugin as topojson, then added to an empty L.geoJson layer - which is not added to the map. The original parcel shapefile (40mb & 70k features) was exported to geojson from ArcMap with the esri2open plugin, then exported as a topojson (5.5mb) using mapshaper.

This app is a test case to see if a county parcel viewer can be built without using a GIS server, which drives up the cost of such an application significantly. Frankly I'm amazed it works and at how fast it is, even on mobile. It is as fast if not faster than the OpenLayers 2/Geoserver app that is currently hosting the parcel viewer. Note that the app has all the plugins I use in all our web apps/maps loaded in the head. Only a handful of them are actually used in this app.