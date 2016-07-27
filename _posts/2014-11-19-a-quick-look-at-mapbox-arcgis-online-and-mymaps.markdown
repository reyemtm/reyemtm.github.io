---
layout: post
title: Google MyMaps, Leaflet and ArcGIS Online
date: '2014-11-19 17:47:09'
tags: leaflet
---
###Update 12/2015

Since I wrote this I have come to rely almost exclusively on [Leaflet](http://leafletjs.com/) for web mapping. For one, leaflet maps are fast, really fast. There are also hundreds of plugins to choose from, which makes it a very flexible platform. Of course map rendering speed depends on how much data you are pushing to the client, and the speed of your map tile provider. With Leafleat 1.0 (beta) speed has increased even further. The fact that I can host a searchable parcel map for a small city of 5,000 people without a GIS server is one of the reasons I will continue to develop in leaflet for the foreseeable future.

To read my initial thoughts on these three platforms, continue reading.

---
Google has long been the standard for map embeds sharing, but there are other platforms out there. The following maps show a basic polyline layer rendered in three different map platforms: Google's MyMaps, Leaflet and ArcGIS Online.

###Google MyMaps
---
<iframe src="https://www.google.com/maps/d/embed?mid=zohGjDikXVzw.k1Spqlzpqkws" style="width:100%;height:480px;" frameborder='0'></iframe>

###Leaflet - Hosted on GitHub
---
<iframe height="450" src="https://getbounds.com/geojson/" style="width:100%;height:480px;" frameborder='0'></iframe>

###ArcGIS Online
---
<iframe style="width:100%;height:480px;" frameborder='0' src="https://www.arcgis.com/apps/Viewer/index.html?appid=a7b9fe89135b4f69a51803704c8302b2"></iframe>

One major difference between the services are the free webapp templates offered through ArcGIS Online. Although the other two services allow for customization through backend programming, the ArcGIS templates, free and customizable with most published on GitHub, make the presentation of spatial data both simple and flexible.

