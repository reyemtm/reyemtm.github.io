---
User: Malcolm
published: false
title: Mapping wth Vector Tiles (Part I)
date: '2018-01-05 T00:00:00.000Z'
description: >-
  Maps using vector tiles only load data in the current viewport. This article
  demonstrates one method of loading and searching attributes from a GeoJSON
  outside the current viewport. This is a follow up to the open parcel viewer.
tags:
  - mapbox
  - vector tiles
subtitle: Query Features Outside the Current Viewport
feature-img: mgl-parcels-01.png
---
The goal of my original post on [client-side web mapping](https://getbounds.com/blog/leaflet-and-geojson-tiles/) for large datasets was to create an inexpensive, robust county-wide parcel viewer web application. The base functionality would include the ability to both identify and search the parcel data. The result of this effort was the [Open Parcel Viewer](https://github.com/ovrdc/parcel-viewer). The project consists of a Leaflet map and [Leaflet.VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid) to cut GeoJSON into vector-tiles on-the-fly. The app is performant, but the drawback is that a very large file is loaded into the browser. This method works well for small datasets, but breaksdown when the size and complexity of the data exceeds device or network capabilities. For example, load time for a typical 70k polygon county parcel map on mobile might exceed 30 seconds. 

To get around this dilema, one option is to create the vector tiles first, then serve these tiles out via static pbf or mvt files (see [geojson2mvt](https://www.npmjs.com/package/geojson2mvt)), via a simple [mbtiles server](https://github.com/ovrdc/tileserver), or even host the data directly on [Mapbox](https://www.mapbox.com). These tiles can then be viewed with virtually any web mapping library. In this example we are using [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/). However, creating this type of vector tile cache solves one problem but creates another: since only the data within the current viewport is loaded, data outside the viewport is unknown to the client and therefore not searchable. So how do we go about searching for data that exists outside the viewport, especially if we are unwilling to host a dedicated server-side geocoding application for our data?

> Data outside the viewport is unknown to the client and therefore not searchable, which is one of the two key components needed for this application.

The answer to this is a simple Node script that minimizes our GeoJSON into a JSON with only those fields we need to search. Using the ```.map()``` function on the GeoJSON features `object` the script returns only those feature properties we wish to search. Utilizing the ```turf.center()``` function, we can also create a centroid that we will use in the ```map.flyTo()``` function to pan our map to the location of the searched feature. The original data should contain a unique ID field in order for ```map.queryRenderedFeatures()``` in Mapbox GL to work properly. If the dataset does not have a unique ID field, this can easily be created in the Node script before cutting out data into tiles, making sure to return this ID to our searchable JSON object.

```javascript
var geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id":"0ABCDE",
        "name": "point",
        "label": "nowhere",
        "type":"nothing"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          105.77636718749999,
          69.76375692223178
        ]
      }
    }
  ]
}

var json = (geojson.features).map(function(feature) {
  var keys = ["id","label","name"];
  var obj = {};
  for (prop in feature.properties) {
    if (keys.includes(prop)) {
        obj[prop] = feature.properties[prop]
    }
  }
  return obj
});
```

There are a wide variety of JSON search plugins, and since I use Jekyll for my website I decided to use the [simple-jekyll-search](https://github.com/christian-fei/Simple-Jekyll-Search) plugin for this project. This plugin has the advantage of having a built-in search results preview.  

One final problem problem exists before we can call this project a success, and that is knowing when the Mapbox GL map has all loaded  and rendered all the tiles after zooming to the desired feature. This is necessary in order to highlight the feature and access any additional attributes. One method to check for loaded tiles is to set an interval function on the ```sourcedataloading``` event, then check to see if this event still fired x seconds later. Once this event is no longer fired, then all the tiles have loaded. Another, more simpler method is to simply query the features and check if anything is returned, and if not query them again in 500ms or so, and do this for maybe five seconds. If nothing is returned simply send an alter to the client.

This method will breakdown for very large data, and in that case a custom geocoder would need to be built.
