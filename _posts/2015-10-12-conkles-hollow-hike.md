---
title: Conkle's Hollow Fall Hike
date: 2015-10-12 00:00:00 Z
tags:
- leaflet
layout: post
description: Here I am Leaflet Elevation to show a the elevation cross-section of
  a GPS track recorded with MyTracks at Conkle's Hollow Nature Preserve in the Hocking
  Hills region of Ohio.
subtitle: Mapping GPS Tracks
map: leaflet-beta
plugins: elevation
header-img: c-hollow.jpg
---

<!--style>
.dist-marker {
	font-size: 12px;
	border: 1px solid #888;
	border-radius: 10px;
	text-align: center;
	color: #888;
	background: #fff;
  height: 20px!important;
  width: 20px!important;
  margin:-10px!important;
  font-weight:600;
}
</style-->
<div id="map" style="position:relative;">
</div>
<script src="https://www.ovrdc.org/apps/assets/cssjs/leaflet.geometryutil.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
<script>
//map
	var map = L.map('map', {
		maxZoom: 16,
		sleep: true
	});
	map.setView([39.4570,-82.5778], 16);
	var hash = L.hash(map);
//tiles
	var esritopo = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
		}).addTo(map);
	var comic = L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		subdomains: 'abcd',
		id: 'reyemtm.mnijk2mp',
		accessToken: 'pk.eyJ1IjoicmV5ZW10bSIsImEiOiJCTHUxSVZ3In0.Q-qbg_jG0JcT6bfBeiwXQg'
	});

	var osm = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
	});

	var toner = new L.StamenTileLayer("toner");

	var cdb = L.tileLayer('http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> ' +
	                      'contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">' +
	                      'CC-BY-SA</a>. Tiles &copy; <a href="http://cartodb.com/attributions">' +
	                      'CartoDB</a>'
  	});
//data
	var el = L.control.elevation({
		position: 'bottomleft',
		theme: 'green-theme',
		width: 500,
		height: 150,
		imperial: true
	}).addTo(map);

	var hike = new L.geoJson.ajax("../../data/c_hollow.geojson", {
	    color: '#629062',
	    weight: 6,
	    opacity: 1,
	    onEachFeature: el.addData.bind(el)
	  }).addTo(map);

	hike.on('data:loaded', function(){
	  ride.addTo(map);
	  map.fitBounds(ride.getBounds());
	});
//controls
	var baseMaps = {
		"OpenStreetMap": osm,
		"Contrast": toner,
		"Comic": comic,
		"Topo": esritopo,
		"Light": cdb
	};
	L.control.layers(baseMaps, null).addTo(map);
</script>

This is a map of a hike using the Leaflet elevation plugin. I added a green theme.
