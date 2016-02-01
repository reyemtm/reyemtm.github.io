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

<h2>Simplification & TopoJson</h2>

One of the first things to prepare a shapefile for a leaflet map is to eliminate unnecessary fields. For the parcel map all the fields were removed spare the owner name and parcel ID, which were concantenated into an index field. The original 22mb shapefile was then simplified (40%) via [mapshaper](http://mapshaper.com) and exported as topojson. This shaved 16mb off the shapefile, and the raw topojson would load quickly and performance was acceptable on my work pc. However the map was not usable on a mobile device, due to load times and overall performance. So when when it comes to rendering tens of thousands of polygons, field purging, simplification and topojson are still not enough. Luckily [mourner](https://github.com/mourner) created [geojson-vt](https://github.com/mapbox/geojson-vt).

<h2>GeoJson Tiles</h2>

<iframe id="map" src="" name="map" allowfullscreen width="100%" height="350px" style="border:0;display:none;"></iframe>
<div id="openMap" style="cursor:default;background-image:url('https://getbounds.com/images/parcel-wide-2.png');height:350px;width:100%;text-align:center;">
	<a href="https://www.ovrdc.org/apps/geojson-tiles.html" target="map"><h2 style="padding-top:160px;color:whitesmoke;">Click Here to Open the Parcel Map</h2></a>
</div>

The bulk of the code for creating the vector tiles from geojson was obtained from [Sumbera](http://bl.ocks.org/Sumbera/c67e5551b21c68dc8299). This method uses the leaflet canvas layer to draw the tiles, which has been deprecated in leaflet beta in favor of the new grid layer. As you can see above, this method easily renders the 22k polygons. The only major difference with this map as compared to most webmaps is that touch zoom has been disabled on mobile, which eliminates some issues with zoom animations. I am using the following parameters for the geojson-vt tile options:

    var tileOptions = {
      maxZoom: 22,  // max zoom to preserve detail on
      tolerance: 7, // 5 simplification tolerance (higher means simpler)
      extent: 4096, //4096, // 4096 tile extent (both width and height)
      buffer: 64,   // 64 default 64tile buffer on each side
      debug: 0,      // logging level (0 to disable, 1 or 2)
      indexMaxZoom: 0,        // 0 max zoom in the initial tile index
      indexMaxPoints: 100000, // 100000 max number of points per tile in the index
    };

<h2>Search and Identify</h2>

The one issue with the geojson tiles is that they are not interactive, so I used the [point in polygon](https://www.mapbox.com/mapbox.js/example/v1.0.0/point-in-polygon/) plugin to identify features. Since the geojson is loaded anyway, this does not add much in the way of a performance hit to the app. Of course I also used leaflet search for searching the features based on the index value mentioned earlier. This allows searching more than one 'field' at a time. The index field is then split out using javascript for the popups.

<h2>Pushing the Feature Limits</h2>

To test the limits of this method I used another county parcel layer, this time with over 70k features. The app would load fine on desktops, but would performance was not ideal on mobile devices. To get around this I broke apart the county by township and city boundaries, allowing the user to switch between these areas via the sidebar. When the user switches to another area, the entire map gets redrawn, meaning that the search and point in polygon only work on one area of the county at a time. To load the full county open the sidebar and scroll to the bottom and click 'Fairfield County'.

<iframe src="/apps/county-parcel-test-map.html" allowfullscreen width="100%" height="350px" style="border:0;"></iframe>

<h2>Crashing the Browser</h2>

The map below uses a series of square grids to test the limits of the geojson tiles. On most devices the browser will crash when trying to load the 58k feature grid, though it does load on my work pc just fine. Click on the grids in the sidebar to find out what your devices and browser can handle!

<iframe src="/apps/geojson-tile-grids.html" allowfullscreen width="100%" height="350px" style="border:0;"></iframe>

<script>
$('#openMap').click(function() {
	$('#map').show();
	$('#openMap').hide();
	});
</script>
