---
published: false
title: Mapping wth Vector Tiles (Part I) 
date: 2018-01-01
description: "Maps using vector tiles only load data in the current viewport. This article demonstrates one method of loading and searching attributes from a GeoJSON outside the current viewport. This is a follow up to the open parcel viewer."
tags:
  - mapbox-gl
  - vector-tiles
subtitle: "Query Features Outside the Current Viewport"
image: mapbox-gl.jpg
---
The goal of my original post on [client-side web mapping](https://getbounds.com/blog/leaflet-and-geojson-tiles/) for large datasets was to create an inexpensive, robust county-wide parcel viewer web application. The base functionality would include the ability to both identify and search the parcel data. The result of this effort was the [Open Parcel Viewer](https://github.com/ovrdc/parcel-viewer). The project consists of a Leaflet map and [https://github.com/Leaflet/Leaflet.VectorGrid](Leaflet.VectorGrid) to cut GeoJSON into vector-tiles on-the-fly. The app is performant, but the drawback is that a very large file is loaded into the browser. This method works well for small datasets, but breaksdown when the size and complexity of the data exceeds device or network capabilities. For example, load time for a typical 70k polygon county parcel map on mobile might exceed 30 seconds. 

To get around this dilema, one option is to create the vector tiles first, then serve these tiles out via static pbf or mvt files (see [geojson2mvt](https://www.npmjs.com/package/geojson2mvt)), via a simple [mbtiles server](https://github.com/ovrdc/tileserver), or even host the data directly on [Mapbox](https://www.mapbox.com). These tiles can then be viewed with virtually any web mapping library.

Creating the vector tiles first server-side or on the desktop mitigates the large GeoJSON size issue, since only the data within the viewport is loaded into the browser. It is important to properly structure the vector tiles such that the there are no very large individuals tiles. This should be verified by inpsecting the network resources utilized by the web app. However, another problem emerges when structuring an app using pre-cut tiles: since only the data within the current viewport is loaded, data outside the viewport is unknown to the client and therefore not searchable. So how do we go about searching for data that exists outside the viewport, especially if we are unwilling to host a dedicated server-side geocoding application for our data?

> Data outside the viewport is unknown to the client and therefore not searchable, which is one of the two key components needed for this application.

A wide variety of JavaScript plugins exist for searching JSON data in the browser, so this part of the task can be easily accomplshed with your plugin of choice. This dataset should still fall within an acceptable file size for mobile applications. Since we are using a GeoJSON as the source data for our vector tiles, minimizing and transforming this dataset into a JSON with only those fields we need to search is also a straightforward task.

To slim down the GeoJSON file into a simple JSON we can use in our custom search, I wrote a simple mode script that calls the ```.map()``` function on the GeoJSON features `object`, returning only those feature properties we wish to search. Utilizing the ```turf.center()``` function, we can also create a centroid that we will use in the ```map.flyTo()``` function to pan our map to the location of the searched feature. The original data should contain a unique ID field in order for ```map.queryRenderedFeatures()``` in Mapbox GL to work properly. (If you are using another API you will have to figure this part out on your own.) If the dataset does not have a unique ID field, this can easily be created in the Node script before cutting out data into tiles, making sure to return this ID to our searchable JSON object.

There are a wide variety of JSON search plugins, and since I use Jekyll for my website I decided to use the [simple-jekyll-search](https://github.com/christian-fei/Simple-Jekyll-Search) plugin for this project. This plugin has the advantage of having a built-in search results preview.  

One final problem problem exists before we can call this project a success, and that is knowing when the Mapbox GL map has all loaded  and rendered all the tiles after zooming to the desired feature. This is necessary in order to highlight the feature and access any additional attributes. One method to check for loaded tiles is to set an interval function on the ```sourcedataloading``` event, then check to see if this event still fired x seconds later. Once this event is no longer fired, then all the tiles have loaded. Another, more simpler method is to simply query the features and check if anything is returned, and if not query them again in 500ms or so, and do this for maybe five seconds. If nothing is returned simply send an alter to the client.

This method will breakdown for very large data, and in that case a custom geocoder would need to be built.
