---
title: Serving Vector Tiles
date: '2019-03-25T20:00:00-04:00'
subtitle: a
description: a
netlify-img: /images/post-img/original/parcel-wide.jpg
feature-img: parcel-wide.jpg
tags:
  - blog
---


New post - setup

My setup is as follows, start the no tileserver every night which bulls views from bye post GIS database, brings them into node as geojson0vt and build a tile index. The node server is proxy with n g i n x and the responses are cashed as well. This is done using the built-in cash to n g i n x. This way the node server only has to create a tile one time. The cash is set to time out at 3 hours. Because the node server relies on json. Parse it is not suitable for large data, however I believe it could be built with our bus to stream data into a spatial index then query the index for the tiles to be created. This shirt server is only been in production for a short time but it means no longer do I have to export files ask geojson0vt convert them to wgs84 then push them to mapbox were cut my own tiles. The conversion is done automatically through the hostess database views and the tiles are cut with denote script.

Many of the web map projects I work on involve rendering vector tiles in the client using Mapbox GL JS. Currently I utilize a variety of methods for serving tiles, from hosting the data on Mapbox to cutting and hosting static tiles along-side the web application, to simply hosting the raw geojson file and letting Mapxbox GL JS do the work. Although this combination of methods has worked for most of my needs up until this point, I decided it was time to explore the landscape of vector-tile servers and test out their capabilities as compared to the methods mentioned above. What follows is not a rigorous study or benchmark, but simply the result of me experience in deploying four different servers: Tegola, t_rex, Geoserver and a custom Node JS tile server. I explore the ease of getting them up and running, their effectiveness at cutting tiles, and my overall thoughts on their performance. 

> TL;DR - While all of the servers have more stars are GitHub, more maintainers, more options. etc., the custom NodeJS- server powered by geojson-vt proved to be the fastest at generating tiles. 



view - #14/39.9428/-82.0162

## Servers Tested

Tegola

t_rex

Custom Node Tile Server

Geoserver

## Vector Tile Serving

I managed to get all the servers to cut and serve vector tiles. 

insert photo of error. 

This may be related to the rendering engine and not the tile server there are similar artifacts present when using the NodeJS server (or even geojson-vt natively in gljs).

## Server Performance

The performance benchmark I am using is simply the static tiles hosted on Netlify. This is a fairly high bar since these tiles already exist, but all the servers have the ability to cache vector tiles, so if everything is setup correctly, the test should pull tiles form the cache. I tested the servers using `loadtest -c 100 -t 10`.

http://157.230.226.113:8080/geoserver/gwc/service/tms/1.0.0/coz:impervious@EPSG%3A900913@pbf/15/8919/20357.pbf 100KB file

http://134.209.222.109/vector-tiles/parcels/12/1114/1550.pbf 100KB file

http://134.209.222.109/vector-tiles/parcels/12/1114/1553.pbf 118KB file

https://gis.coz.org/assets/map-data/vector-tiles/TaxParcels_Mapbox_InCity_wgs84/14/4458/6206.mvt - 102KB file

http://134.209.222.109/vector-tiles/parcels/14/4458/6206.pbf

* Static Raw MVT Tiles on Netlify
  * TR - 4,13, 13 
  * RPS - 0, 1, 1
  * ML - 7883, 9585, 9068
  * LR - 9706, 9972, 9068
* Geoserver
  * Total Requests - 247, 223, 225
  * RPS - 25, 22, 22
  * Mean Latency - 3304, 3523, 3542
  * Longest Request - 9214, 7657, 7284
* Tegola
* T-Rex
  * Good and simple documentation
  * NGINX Reverse Proxy sample config file
* NodeJS/NGINX Cache - woops these were on small do droplet
  * TR - 218, 192
  * RPS - 22
  * ML - 3894
  * LR - 8506

- - -

Geoserver 2.15
Java

Tegola
Written in Go

T-Rex
Rust

Caching the tiles is very slow

Simple NodeJS Server
JavaScript

Superfast tile creation, partially because the data is indexed by geojson-vt when the script is first loaded. Moving this indexing until the first request slows the initial tile creation down significantly.

## Tegola

`./tegola cache seed --bounds -84,38,-81,42 --max-zoom 18`

### Benefits

* Data Sources: PostgreSQL database or Geopackage

### Issues

* Data must be in WGS84 or Web Mercator
* On-the-Fly tile creation is slow compared to t_rex and geojson-vt but it does have a caching option

## geojson-vt NodeJS Server

#### Benefits

* Easy to understand the code
* Simple
* Fast

#### Issues

* Tile rendering issues

## t_rex

#### Issues

* PostgreSQL as a datasource not working
* Tile rendering issues
* Slower than the Node Server

## Geoserver

#### Benefits

* OGC Compliant server with WMS, WFS, WFS-T, raster tiles, vector tiles and and raw data files
* WMS searching for layer search
* Has it's own caching system
* Can use a variety of data sources from PostGIS to shapefiles and more

#### Issues

* Resource heavy
* Complicated setup and configuration

## Conclusion

It actually performs almost as well as a static tile cache, at least for minimal load. The only drawback is that it relies on ``JSON.parse()``, meaning it is not currently suited for huge datasets. Fortunately this is not an issue for me at this point, but it could be a reason to utilize another one of the other many servers available.
