---
layout: post
title: Network Tracing with Turf JS
date: 2019-06-12T18:36:49.613Z
subtitle: A Client Side Solution for Simple Upstream and Downstream Linear Analysis
description: Client Side Solutions for Simple Upstream and Downstream Linear Analysis
netlify-img: /images/post-img/original/trace.jpg
feature-img: trace.jpg
tags:
  - turfjs
  - mapbox
---
A primary focus of my day job is managing utility datasets for a small municipality. I am currently in the process of taking what was once simple lines and points and turning into a fully networked database. One of the benefits of having this database is to perform network traces. This is possible using a variety of desktop and server tools including [geometric networks in ArcGIS Desktop](http://desktop.arcgis.com/en/arcmap/10.3/manage-data/geometric-networks/what-are-geometric-networks-.htm), the [ArcGIS Utility Network Management extension for ArcGIS Server/Enterprise](https://pro.arcgis.com/en/pro-app/help/data/utility-network/what-is-a-utility-network-.htm), [pgRouting](https://pgrouting.org/), and via [various QGIS plugins](https://plugins.qgis.org/search/?q=network). However the utility field crews and managers do not have access to these desktop GIS tools, so I wondered if I could program a tool to do some simple network tracing right in the browser. Fortunately in my case the entire database is less than 3MB, so all the data can be loaded directly into the browser (via GeoJSON of course). This means the data can be visualized and analyzed using client-side libraries, in this instance [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) and [Turf JS](https://github.com/Turfjs/turf). 

My first attempt at network tracing involved looping through all the linear features and checking for equal upstream and downstream asset IDs assigned to each feature. This seemed like a common sense approach, but it would mean I would have to first calculate these IDs for each feature. I wanted to focus solely on the geometry so I took a look through the Turf JS API. The basic idea became quit simple: grab all the connected lines to an origin point using `turf.booleanPointOnLine()` and then use the first or last point in the coordinates array of the linear feature to seed the network trace. By iterating over this method the tool could return the entire upstream or downstream network.

In the first iteration I was simply focused on identifying all the intersecting lines of the origin point to test the `turf.booleanPointOnLine()` method. I did run into some issues with the points and lines not being coincident, which was fixed by limited the coordinate check to six decimals using `coordinate.toFixed(6)`. This is the same approach used by the [geojons-equality](https://www.npmjs.com/package/geojson-equality) package. The coordinates could also be trimmed before adding them to the browser using QGIS, or in NodeJS using [geojson-precision](https://www.npmjs.com/package/geojson-precision), or [mapshaper](https://github.com/mbloch/mapshaper/wiki/Command-Reference). 

```javascript
function getIntersectingLines(point, lines) {
  var point = point;
  var network = {
    type: "FeatureCollection",
    features: []
  };
  lines.features.map(function(f) {
    if (turf.booleanPointOnLine(point, f)) {
      network.features.push(f)
    }
  });

  return network 
}
```

This method worked well, however it only returns the **first** intersecting lines, and it returns the lines in both directions. To achieve the desired upstream or downstream network trace the tool uses either the first of last coordinate pair of the initial network. The result can be found below. Here I am only using the upstream trace, but in production the tool has a toggle to switch between upstream and downstream traces. Running this tool in production on the entire utility network took close to five seconds, so I moved most of the computation to a worker thread so as to not lock up the UI.

<iframe src="/apps/turf-trace.html/#17/39.915321/-82.005697" width="100%" height="400px">

_To trace the upstream network simply click on a point._
