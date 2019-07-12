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
A primary focus of my day job is managing utility datasets for a small municipality. I am currently in the process of taking a simple database of lines and points and turning it into a true utility network. One of the benefits of having this new seamless database is to perform network traces. This is possible using a variety of desktop and server tools including [geometric networks in ArcGIS Desktop](http://desktop.arcgis.com/en/arcmap/10.3/manage-data/geometric-networks/what-are-geometric-networks-.htm), the [ArcGIS Utility Network Management extension for ArcGIS Server/Enterprise](https://pro.arcgis.com/en/pro-app/help/data/utility-network/what-is-a-utility-network-.htm), [pgRouting](https://pgrouting.org/), and via [various QGIS plugins](https://plugins.qgis.org/search/?q=network). However, the utility field crews and managers only have access to our [web maps](https://gis.coz.org), so I wondered if I could program a Mapbox GL JS plugin to do some simple network tracing directly in the browser. Fortunately in my case the entire database is less than 3MB, so all the data can be loaded into the browser via GeoJSON. This data can  then be visualized and analyzed using client-side libraries, in this instance [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) and [Turf JS](https://github.com/Turfjs/turf). 

My first attempt at network tracing involved looping through all the linear features and checking for equal upstream and downstream asset IDs assigned to each feature. This seemed like a common sense approach, but it would mean these IDs would need to be calculated for each feature beforehand. This did work, but I wanted to find a way to eliminate the need to calculate these IDs and focus solely on the geometry. I found the answer in the Turf JS API.

The basic idea became quit simple: grab all the connected lines to an origin point using `turf.booleanPointOnLine()` and then use the resulting lines to seed the network trace. By iterating over this method the tool could return the entire network.

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

In the first iteration I focused solely on identifying all the intersecting lines of the origin point to test the `turf.booleanPointOnLine()` method. I ran into some issues with the points and lines not being coincident, possibly due to rounding of extremely long decimal places. I decided to borrow the method used by the [geojons-equality](https://www.npmjs.com/package/geojson-equality) package and limit the coordinate check to six decimals using `.toFixed(6)`. The coordinates could also be trimmed before adding them to the browser using QGIS, in NodeJS using [geojson-precision](https://www.npmjs.com/package/geojson-precision), or with the command-line [mapshaper](https://github.com/mbloch/mapshaper/wiki/Command-Reference) tool. 

This method worked well, however it only returns the **first** set of intersecting lines, and it returns the lines in both directions. In the production version, to achieve the desired upstream or downstream network trace the tool simply uses either the first or last coordinate pair of the intersecting lines. The result can be found below. In this example the tool only uses the upstream trace, however in production the tool is deployed as a Mapbox GL JS plugin and has a toggle to switch between upstream and downstream traces. Running this tool on the entire utility network can take some time, up five seconds on a PC, so I again in production I moved most of the computation to a worker thread so as to not lock up the UI.

<iframe src="/apps/turf-trace.html/#17/39.915321/-82.005697" width="100%" height="400"></iframe>

_To trace the upstream network simply click on a point._
