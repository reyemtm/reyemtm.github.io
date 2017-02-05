---
title: Google MyMaps, Leaflet and ArcGIS Online
date: 2014-11-19 17:47:09 Z
tags:
- leaflet
layout: post
style: "iframe{width:100%!important;}"
---
### Update 12/2015

Since I wrote this I have come to rely almost exclusively on [Leaflet](http://Leafletjs.com/) for web mapping. For one, Leaflet maps are fast, really fast. There are also hundreds of plugins to choose from, which makes it a very flexible platform. Of course map rendering speed depends on how much data you are pushing to the client, and the speed of your map tile provider. With Leafleat 1.0 (beta) speed has increased even further. The fact that I can host a searchable parcel map for a small city of 5,000 people without a GIS server is one of the reasons I will continue to develop in Leaflet for the foreseeable future.

To read my initial thoughts on these three platforms, continue reading.

### Update 1/2017

The GeoJSON file hosted on GitHub is the only map that still works three years later. GitHub will automatically map a GeoJSON file which you can then embed on any website, using the original Mapbox JS API, which is based on Leaflet.

---
### Leaflet - Hosted on GitHub
<script src="https://embed.github.com/view/geojson/reyemtm/geojson/gh-pages/metro-trails-2012.geojson?height=480&width=auto"></script>

### Google MyMaps
Google has long been the standard for map embeds sharing, but there are other platforms out there. The following maps show a basic polyline layer rendered in three different map platforms: Google's MyMaps, Leaflet and ArcGIS Online.

<iframe src="https://www.google.com/maps/d/embed?mid=zohGjDikXVzw.k1Spqlzpqkws" style="width:100%;height:480px;" frameborder='0'></iframe>

### ArcGIS Online
<iframe style="width:100%;height:480px;" frameborder='0' src="https://www.arcgis.com/apps/Viewer/index.html?appid=a7b9fe89135b4f69a51803704c8302b2"></iframe>

One major difference between the services are the free webapp templates offered through ArcGIS Online. Although the other two services allow for customization through backend programming, the ArcGIS templates, free and customizable with most published on GitHub, make the presentation of spatial data both simple and flexible.
