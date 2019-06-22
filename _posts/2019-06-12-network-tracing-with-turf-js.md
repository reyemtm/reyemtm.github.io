---
layout: post
title: Network Tracing with Turf JS
date: 2019-06-12T18:36:49.613Z
subtitle: A Client Side Solution for Simple Upstream and Downstream Linear Analysis
description: Client Side Solutions for Simple Upstream and Downstream Linear Analysis
netlify-img: /images/post-img/original/network-trace.png
feature-img: network-trace.png
tags:
  - turfjs
  - mapbox
---
One of the benefits of having a seamless utility GIS database is to perform network traces. This is possible using a variety of desktop and server tools including [geometric networks in ArcGIS Desktop](http://desktop.arcgis.com/en/arcmap/10.3/manage-data/geometric-networks/what-are-geometric-networks-.htm), the [ArcGIS Utility Network Management extension for ArcGIS Server/Enterprise](https://pro.arcgis.com/en/pro-app/help/data/utility-network/what-is-a-utility-network-.htm), [pgRouting](https://pgrouting.org/), and via [various QGIS plugins](https://plugins.qgis.org/search/?q=network). However, what if we wanted to do some simple network tracing right in the browser? Fortunately in my case I am working with a utility dataset from a medium-sized city (population ~ 25k). What this means is that the entire database can be loaded into the browser (via GeoJSON of course). This means we can visualize and analyze the data using client-side libraries, in this instance [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) and [Turf JS](https://github.com/Turfjs/turf). 

My first attempt at network tracing involved looping through all the linear features and checking for equal upstream and downstream asset IDs assigned to each linear feature. However, after looking through the Turf JS API I changed my approach. The basic idea became quit simple: grab all the connected lines to the origin point using `turf.booleanPointOnLine()` and then use the first or last point in the coordinates array of the linear feature to find the next lines in the network. By iterating over this method we end up with the entire upstream or downstream network.

In the first iteration I was simply focused on getting all the intersecting lines of the origin point to test the `turf.booleanPointOnLine` method. I did run into some issues with the points and lines not being coincident, which was fixed by limited the coordinate check to six decimals using ``coordinate.toFixed(6)``. This is the same approach used by the [geojons-equlity](https://www.npmjs.com/package/geojson-equality) package. The coordinates could also be trimmed before adding them to the browser using QGIS, or in NodeJS using [geojson-precision](https://www.npmjs.com/package/geojson-precision), or [mapshaper](https://github.com/mbloch/mapshaper/wiki/Command-Reference). 

```javascript
function getIntersectingLines(point, linearFeatures) {
  var point = point;
  var intersectingFeatures = {
    type: "FeatureCollection",
    features: []
  };
  linearFeatures.features.map(function(f) {
    if (turf.booleanPointOnLine(point, f)) {
      intersectingFeatures.features.push(f)
    }
  });

  return intersectingFeatures
}
```

This worked, however it only returns the **first** intersecting lines, and it returns the lines in both directions. To achieve the desired upstream or downstream network I simply used either the first of last coordinate pair of the ``intersectingFeatures``. The result can be found below. Here I am only using the upstream trace, but adding a switch to choose either upstream or downstream is trivial. I have built this out in production as a Mapbox GL JS control, with the network calculations moved to a worker thread. T

<iframe src="/apps/turf-trace.html/#17/39.915321/-82.005697" width="100%" height="400px">

_To trace the upstream network simply click on a point._
