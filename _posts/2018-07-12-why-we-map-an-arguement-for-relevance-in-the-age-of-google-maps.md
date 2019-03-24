---
title: Serving Vector Tiles
date: '2018-07-12 T00:00:00.000Z'
netlify-img: /images/post-img/original/parcel-wide.jpg
feature-img: parcel-wide.jpg
tags:
  - blog
undefined: A Quick Comparison of Four Vector Tile Servers
---
Many of the web map projects I work on involve rendering vector tiles in the client using Mapbox GL JS. Currently I utilize a variety of methods for serving tiles, from hosting the data on Mapbox to cutting and hosting static tiles along-side the web application to simply hosting the raw geojson file and letting Mapxbox GL JS do the work. Although this combination of methods has worked for most of my needs up until this point, I decided it was time to explore the landscape of vector-tile servers and test out their capabilities as compared to the methods mentioned above. What follows is not a rigorous study or benchmark, but simply the result of me experience in deploying four different servers. I explore the ease of getting them up and running, their effectiveness at cutting tiles, and the 

## Hosting Setup

All tests were perfomed on a Digital Ocean Droplet runing Ubuntu 18.10 4GB Ram 2vcpus

## Vector Tile Serving

In general, all the servers proved to cut and serve vector tiles, however the tiles cut using Geoserver did result in some rendering errors using Mapbox GL JS. 

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
  T-Rex
  NodeJS
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
