---
layout: post
title: "Leaflet & GeoJson Tiles"
description: "Improving Leaflet performance using the geojson-vt plugin with two county parcel map examples."
subtitle: "A County Parcel App: No GIS Server? No Problem!"
tags:
 - leaflet
 - geojsonvt
published: true
header-img: parcel-wide-2.png
---
A county engineer recently asked me if it would be possible to create a low-cost or even free parcel viewer. Having successfully rendered a few thousand parcels with leaflet and geojson I thought this might be possible. However, running client-side apps has its drawbacks, including fairly meager limits on the number of polygon features in the map. The map below is a test case of for this county parcel viewer. Yearly hosting costs for apps such as this can run in the thousands if not tens of thousands, so having a free alternative could be of great economic benefit to many counties across the country.

##Simplification & TopoJson

One of the first things to prepare a shapefile for a leaflet map is to eliminate unnecessary fields. For the parcel map all the fields were removed spare the owner name and parcel ID, which were concantenated into an index field. The original 22mb shapefile was then simplified (40%) via [mapshaper](http://mapshaper.com) and exported as topojson. This shaved 16mb off the shapefile, and the raw topojson would load quickly and performance was acceptable on my work pc. However the map was not usable on a mobile device, due to load times and overall performance. So when when it comes to rendering tens of thousands of polygons, field purging, simplification and topojson are still not enough. Luckily [mourner](https://github.com/mourner) created [geojson-vt](https://github.com/mapbox/geojson-vt).


<iframe src="" id="iframe" allowfullscreen width="100%" height="350px" style="border:0;"></iframe>
<a href="https://www.ovrdc.org/apps/geojson-tiles.html" target="#iframe"><img src="/images/parcel-wide-2.png" height="350px" width="100%"></img></a>


##GeoJson Tiles

The bulk of the code for creating the vector tiles from geojson was obtained from [Sumbera](http://bl.ocks.org/Sumbera/c67e5551b21c68dc8299). This method uses the leaflet canvas layer to draw the tiles, which has been deprecated in leaflet beta in favor of the new grid layer. As you can see below, this method easily renders the 22k polygons. I am using the following parameters for the geojson-vt tile options:

    var tileOptions = {
      maxZoom: 22,  // max zoom to preserve detail on
      tolerance: 7, // 5 simplification tolerance (higher means simpler)
      extent: 4096, //4096, // 4096 tile extent (both width and height)
      buffer: 64,   // 64 default 64tile buffer on each side
      debug: 0,      // logging level (0 to disable, 1 or 2)
      indexMaxZoom: 0,        // 0 max zoom in the initial tile index
      indexMaxPoints: 100000, // 100000 max number of points per tile in the index
    };

		
##Search and Identify

The one issue with the geojson tiles is that they are not interactive, so I used the [point in polygon](https://www.mapbox.com/mapbox.js/example/v1.0.0/point-in-polygon/) plugin to identify features. Since the geojson is loaded anyway, this does not add much in the way of a performance hit to the app. Of course I also used leaflet search for searching the features based on the index value mentioned earlier. This allows searching more than one 'field' at a time. The index field is then split out using javascript for the popups.

##Pushing the Feature Limits

<iframe src="/apps/county-parcel-test-map.html" allowfullscreen width="100%" height="350px"></iframe>