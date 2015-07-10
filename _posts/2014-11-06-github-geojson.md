---
layout:	post
title: Hosting a GeoJson on GitHub
date: '2014-11-19'
tags: leaflet
---
GitHub will host and preview your geojson files! [Geomusings](http://blog.geomusings.com/2013/06/18/geojson-on-github-now-what/) gives a good explanation of some pros and cons. Here is an example of a geojson stored on GitHub, then shared. GitHub takes care of the rendering via [Mapbox](https://www.mapbox.com).

<script src="https://embed.github.com/view/geojson/reyemtm/geojson/master/metro-trails-2012.geojson?width=1000"></script>

So how do you host and share a single gis point/line/polygon layer on GitHub? A quick web search will point you in the right direction. Here is the work flow I followed. First off you need a free GitHub account and data. I used a package layer (park trails) downloaded from the public repository in ArcMap (you could also get data directly from ArcGIS Online or anywhere). The data needs to be in geojson format, you can use [this](http://ogre.adc4gis.com/) to convert your data. You can upload a zip file if you have multiple files, such as shapefiles. If you don't know the code for your projection you can look that up [here.]("http://spatialreference.org/ref/) I converted the trail data to WGS1984 in ArcMap, so my online conversion to geojson looked like this:

    Source SRS:
    EPSG:4326

    Target SRS:
    urn:ogc:def:crs:OGC:1.3:CRS84

*(This is the only projection used by GitHub according to [this article.](https://help.github.com/articles/mapping-geojson-files-on-github/))*

I only included two fields because I did not yet have a chance to figure out labels/popups in GitHub. The default is to show all the attributes in the popup when clicked. It is also possible to host a public map through GitHub pages with several layers of data and a custom layout by integrating with leaflet. I include an exmaple of that on another post.  
