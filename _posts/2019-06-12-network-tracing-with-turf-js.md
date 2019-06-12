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
One of the benefits of having a seamless utility GIS database is to perform network traces. This is possible using a vareity of desktop and server tools including [geometric networks in ArcGIS Desktop](http://desktop.arcgis.com/en/arcmap/10.3/manage-data/geometric-networks/what-are-geometric-networks-.htm), the [ArcGIS Utility Network Management extension for ArcGIS Server/Enterprise](https://pro.arcgis.com/en/pro-app/help/data/utility-network/what-is-a-utility-network-.htm), [pgRouting](https://pgrouting.org/), and via [various QGIS plugins](https://plugins.qgis.org/search/?q=network). However, what if we wanted to do some simple network tracing right in the browser? Fortunately in my case I am working with a small dataset, that of a municipal sanitary sewer network. What this means is that the entire database can be loaded into the browser, visualized with your favorite mapping API (Mapbox GL JS in my case), and then analyzed using Turf JS. 

In my initial efforts to perform upstream and downstream network traces I attempted to utilize and upstream and downstream asset ID written to the linear features. However, after looking through the Turf JS API and after fixing the flow directions (digitized direction) of all the linear features, I changed my approach. The majority of the code relies on ``turf.booleanPointOnLine()``, ``turf.buffer()``, and ``turf.booleanPointInPolyon()``. I also make use of several Turf helper functions throughout. 

In the first iteration I was simply focused on getting all the intersecting lines of the origin point. I did run into some issues with the points and lines not being coincident, which was fixed by setting the GeoJSON decimal degree precision - I landed on 7 or 0.0000001.

```javascript
function getIntersectingLines(point, features) {
  var point = point;
  var intersectingFeatures = {
    type: "FeatureCollection",
    features: []
  };
  features.features.map(function(f) {
    if (turf.booleanPointOnLine(point, f)) {
      intersectingFeatures.features.push(f)
    }
  });

  return intersectingFeatures
}
```

However this only returns the **first** intersecting lines, and it returns the lines in both directions. What I really want is to return all the network features, and be able to choose either upstream features or downstream features.

