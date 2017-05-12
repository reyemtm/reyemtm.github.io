---
title: Firebase Testing App
date: 2017-03-24 00:00:00 Z
layout: app
map: leaflet
template: true
center: 39.2663,-82.9825
zoom: 9
basemap: topo
plugins: ["firebase", "awesome-markers"]
permalink: /apps/firebase-map/index.html
---
var config = {
  apiKey: "AIzaSyAWg1saNGWxnx5aB93Tuqh4nYRg2WzkSeY",
  authDomain: "fir-blog-post.firebaseapp.com",
  databaseURL: "https://fir-blog-post.firebaseio.com",
  storageBucket: "fir-blog-post.appspot.com",
  messagingSenderId: "355174079858"
};
firebase.initializeApp(config);

var marker = L.AwesomeMarkers.icon({
  icon: 'map-pin',
  prefix: 'fa',
  markerColor: 'cadetblue'
});


var points = L.geoJson.ajax("/data/firebase/points.geojson", {
  pointToLayer: function(feature, latlng) {
    return new L.marker(latlng, {icon:marker})
  }
}).addTo(map);

points.on('data:loaded', function() {
  map.spin(false);
});
