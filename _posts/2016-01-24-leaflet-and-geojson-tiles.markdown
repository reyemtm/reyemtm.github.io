---
title: Leaflet & GeoJson Tiles
date: 2016-01-24 00:00:00 Z
tags:
- leaflet
- esri
layout: post
description: Improving Leaflet performance using the geojson-vt plugin with two county
  parcel map examples.
subtitle: 'A County Parcel App: No GIS Server? No Problem!'
header-img: parcel-wide-2.jpg
feature-img: parcel-wide.jpg
---
## The Client-Side County Parcel App
*Update 2017-02-23 I have recently been experimenting with the Leaflet Vector Grid plugin for Leaflet 1.0, as the method described here will not work with the newest version of Leaflet. You can view an example of this experiment [here](https://www.ovrdc.org/apps/vector-grid.html).*

It all started with this simple question from a county engineer: Would it be possible to create a low-cost or even free parcel viewer? Having successfully rendered a few thousand parcels with leaflet and geojson I thought this might be possible. However, running client-side apps has its drawbacks, including fairly meager limits on the number of polygons rendered in a map. The geojson-vt plugin expands this limit by converting the polygons into vector tiles. The resulting parcel test app is shown below.

>Would it be possible to create a low-cost client-side parcel viewer using open source tools? And could this app still maintain most if not all the functions of a typical auditor site including search and identify functions?

Yearly hosting costs for apps such as this can run in the thousands if not tens of thousands, so having a free alternative could be of great economic benefit to many counties across the country. With the average parcel count per county in the US right around 50k (see [Core Logic](http://www.corelogic.com/products/parcelpoint.aspx)) and the upper limit of client-side rendering between 25k and 40k features, it follows that at least a third if not half of US counties could share their parcels with the public via client-side web apps such as this one.

<iframe id="map" src="" name="map" allowfullscreen width="100%" height="350px" style="border:1px lightgray solid;display:none;"></iframe>
<div id="openMap" style="cursor:default;background-image:url('/images/post-img/original/parcel-wide-2-red.jpg');height:350px;width:100%;text-align:center;">
	<a href="https://www.ovrdc.org/apps/geojson-tiles.html" target="map" class="inverse-txt"><h2 style="padding-top:160px;color:whitesmoke;">Click Here to Open the Parcel Map</h2></a>
</div>

<h2>Simplification & TopoJson</h2>

One of the first things to prepare a shapefile for hosting on a web app is to eliminate unnecessary fields, which can decrease size significantly. For the parcel map all the fields were removed spare the owner name and parcel ID, which were concantenated into an index field. The original 22mb shapefile was then simplified (40%) via [mapshaper](http://mapshaper.com) and exported as topojson. This shaved off 16mb resulting in an app that would load quickly with adequate performance on a desktop pc. However the map was not usable on a mobile device, due to load times and panning issues. So when when it comes to rendering tens of thousands of polygons, field purging, simplification and topojson are still not enough. Luckily [mourner](https://github.com/mourner) created [geojson-vt](https://github.com/mapbox/geojson-vt).

<h2>GeoJson Tiles</h2>

The bulk of the code for creation of this app comes from [Sumbera](http://bl.ocks.org/Sumbera/c67e5551b21c68dc8299). This method uses the leaflet canvas layer to draw the tiles (deprecated in leaflet 1.0 in favor of the new grid layer). As you can see above, this method easily renders the 22k parcels in the map above. The only major difference with this map as compared to most web maps is that touch zoom has been disabled on mobile, which eliminates some issues with zoom animations. I am using the following parameters for the geojson-vt tile options:

    var tileOptions = {
      maxZoom: 22,  
      tolerance: 7,
      extent: 4096,
      buffer: 64,   
      debug: 0,      
      indexMaxZoom: 0,       
      indexMaxPoints: 100000,
    };

<h2>Search and Identify</h2>

The one issue with the geojson tiles is that they are not interactive, so I used the [point in polygon](https://www.mapbox.com/mapbox.js/example/v1.0.0/point-in-polygon/) plugin to identify features. Since the geojson is already loaded, the plugin does not add much in the way of a performance hit to the app. Leaflet search is used searching the features based on the index value mentioned earlier. This allows searching more than one 'field' at a time. The index field is then split out using javascript for the popups.

<h2>Pushing the Feature Limits</h2>

To test the limits of this method I tested the app with another county parcel layer, this time with over 70k features. The app would load fine on desktops, but would performance was not ideal on mobile devices and sometimes crashed the mobile browser. To get around this I broke apart the county by township and city boundaries (using model builder in Esri's ArcMap), allowing the user to switch between these areas via the sidebar. When the user switches to another area, the entire map gets redrawn with the map.destroy() function. One drawback is that the search and point in polygon only work on one area of the county at a time. To load the full county open the sidebar, scroll to the bottom and click 'Fairfield County'.

<iframe id="cityMap" name="cityMap" src="" allowfullscreen width="100%" height="350px" style="border:1px lightgray solid;display:none;"></iframe>
<div id="openCity" style="cursor:default;background-image:url('/images/post-img/original/parcel-wide-2.jpg');height:350px;width:100%;text-align:center;">
	<a href="/apps/county-parcel-test-map/" target="cityMap" class="inverse-txt"><h2 style="padding-top:160px;color:whitesmoke;">Click Here to Open the Fairfield County Map</h2></a>
</div>


<h2>Crashing the Browser</h2>

The map below uses a series of square grids to test the limits of geojson tiles. On most devices the browser will crash when trying to load the 58k feature grid, though it does load on my enterprise desktop. Click on the grids in the sidebar to find out what your devices and browser can handle! <a href="/apps/geojson-tile-grids/" target="_blank">Click here to open the Grid Map (opens in a new window).</a>

<!--iframe id="gridMap" name="grid" src="" allowfullscreen width="100%" height="350px" style="border:0;display:none;"></iframe>
<div id="openGrid" style="cursor:default;background-color:black;height:350px;width:100%;text-align:center;">
	<h2 style="padding-top:160px;"><a href="/apps/geojson-tile-grids.html" target="grid">Click Here to Open the Grid Map</a></h2>
</div-->

<script>
$('#openMap').click(function() {
	$('#map').show();
	$('#openMap').hide();
});
$('#openCity').click(function() {
	$('#openCity').hide();
	$('#cityMap').show();
});
</script>
