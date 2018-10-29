---
title: Leaflet Photo Map
date: 2018-10-28
posted-date: 2015-07-13 00:00:00 Z
tags:
- leaflet
layout: post
description: This web map is an example of the Leaflet Photo plugin using photos from
  a family vacation in 1985. Photos include Yellowstone, Watertown Park, Baraboo Circus
  Museum and a Sod House.
subtitle: A Trip Out West circa 1985
plugins:
- photo-map
map: leaflet
header-img: header-vacay-2.jpg
header: >-
  <script src="https://cdn.jsdelivr.net/npm/exif-js"></script>
css: >-
  #map{height: 580px;margin-bottom:2rem;}
  .leaflet-touch .leaflet-control-layers, .leaflet-touch .leaflet-bar {
    border: 2px solid rgba(0,0,0,0.2);
  }  
---
**Update October, 2018** This map originally used Google's Picasa Web API, but this will [soon be shut down](https://developers.google.com/picasa-web/). Instead of migrating to another Google service, I simply extracted the EXIF data from the photos ([using this tool](http://www.br-software.com/extracter.html)). The resulting csv was converted to json, which worked as a drop-in replacement for former Picasa feed.

<div id="map">
</div>
<script>

/*map*/
	var map = L.map('map', {
		maxZoom: 8,
		sleep: true,
    fullscreenControl: true
		/*defaultExtentControl: true*/
	});
	map.setView([45.446,-100.928], 4);
  /*5/46.408/-100.811*/
	var hash = L.hash(map);
/*tiles*/
	var esritopo = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
		});

	var toner = new L.StamenTileLayer("toner");

	var cdb = L.tileLayer('http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> ' +
	                      'contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">' +
	                      'CC-BY-SA</a>. Tiles &copy; <a href="http://cartodb.com/attributions">' +
	                      'CartoDB</a>'
  	}).addTo(map);
/*controls*/
	var baseMaps = {
		"Contrast": toner,
		"Topo": esritopo,
		"Light": cdb
	};

	var lyrs = new L.control.layers(baseMaps).addTo(map);

/*photo layer*/
	var photoLayer = L.photo.cluster({spiderfyDistanceMultiplier: 2}).on('click', function (evt) {
	var photo = evt.layer.photo,
        template = '<img src="{url}"/><p>{caption}</p>';
	/*var w = (window.innerWidth > 0) ? window.innerWidth : screen.width;*/
	var w = $('#map').width();
	var x = w * 0.5;

	if (photo.video && (!!document.createElement('video').canPlayType('video/mp4; codecs=avc1.42E01E,mp4a.40.2'))) {
		template = '<video autoplay controls poster="{url}"><source src="{video}" type="video/mp4"/></video>';
	};

	evt.layer.bindPopup(L.Util.template(template, photo), {
			className: 'leaflet-popup-photo',
			minWidth: x,
			keepInView: true
		}).openPopup();
	});

	reqwest({
		url:'/assets/img/trip-out-west/gps.json',
		type: 'json',
		success: function (data) {
			var photos = [];
      var url = '/assets/img/trip-out-west/';
			for (var i = 0; i < data.length; i++) {
			var photo = data[i];
				photos.push({
					lat: data[i].lat,
					lng: data[i].lng,
					url: url + data[i].image,
					caption: data[i].title,
					thumbnail: url + data[i].image
				});
		}
			L.control.navbar().addTo(map);
			photoLayer.add(photos).addTo(map);
		}
	});

</script>

This is an example of the [Leaflet.Photo](https://github.com/turban/Leaflet.Photo) plugin, based almost entirely on Bjørn Sandvik's post [here](http://blog.thematicmapping.org/2014/08/showing-geotagged-photos-on-leaflet-map.html). I did add a tweak that adjusts the photo when opened to a percentage of the size of the map div, but other than that I followed his example and the result is really cool. These are photos long since forgotten, of a trip my family took out west back in 1985. Most of the pictures were taken with a Kodak Disc 4000, or a similar model. Sod houses, the Lower Falls, Mount Rushmore, buffalo...it's all here.


<!--https://picasaweb.google.com/data/feed/base/user/103469053044045468318/albumid/6170973282606682673?alt=rss&kind=photo&hl=en_US-->
<!--https://picasaweb.google.com/103469053044045468318/Picasa?authuser=0&authkey=Gv1sRgCPzEjLbb4-aHdw&feat=directlink-->
