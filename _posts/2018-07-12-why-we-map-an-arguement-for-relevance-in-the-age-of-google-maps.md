---
title: Serving Vector Tiles
date: '2018-07-12 T00:00:00.000Z'
netlify-img: /images/post-img/original/parcel-wide.jpg
feature-img: parcel-wide.jpg
tags:
  - blog
undefined: A Quick Comparison of Four Vector Tile Servers
---
Many of the web map projects I work on involve rendering vector tiles in the client using Mapbox GL JS. Currently I utilize a variety of methods for serving tiles, from hosting the data on Mapbox to cutting and hosting static tiles along-side the web application to simply hosting the raw geojson file and letting Mapxbox GL JS do the work. Although this combination of methods has worked for most of my needs up until this point, I decided it was time to explore the landscape of vector-tile servers and test out their capabilities as compared to the methods mentioned above. What follows is not a rigorous study or benchmark, but simply the result of me experience in deploying four different servers. I explore the ease of getting them up and running, their effectiveness at cutting tiles, the  

All tests were perfomed on a Digital Ocean Droplet runing Ubuntu 18.10 4GB Ram 2vcpus

tests using ``loadtest`` - results will vary depending on your internet connection

Geoserver 2.15
Java

Tegola
Written in Go

T-Rex
Rust

Simple NodeJS Server
JavaScript
