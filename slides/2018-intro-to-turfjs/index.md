---
title: Turf JS
subtitle: Geospatial Analysis for the Browser, Desktop & Server
layout: big
theme: light
css: >-
  html {
    overflow: hidden;
  }
  .display-content {
    display: contents;
  }
  h1 {
    font-size: inherit
  }
  body.talk-mode, p, h1 {
    font-family: "Montserrat", "Rubik", "Segoe UI", sans-serif;
    font-weight: 600;
  }
  strong {
    color: #2ecc71;
    font-size: inherit;
  }
  input {
    width: 60%;
  }
  .input-group {
    margin: 10px 0;
  }
  .input-group button {
    width: 38%;
    float: right;
  }
  button, input {
    font-size: inherit;
  }
  @media screen and (min-width: 1440px) {
    .emoji {
      font-size: 256px!important; 
    }
  }
  .print-mode .emoji, .jump-mode .emoji {
    font-size: inherit!important;
  }
  code, pre code {
    box-shadow: none;
    font-size: inherit;
    background-color: white;
    padding: 10px;
    border: solid thin lightgray;
  }
  pre code {
    padding-right: 20px;
    padding-left: 20px;
  }
  .buttons {
    background: black;
    width:100%;
  }
  #buttons {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
    left: 0;
    background: black;
  }
  .buttons button {
    float: left;
  }
  .buttons > button:last-child {
    float: right;
  }
  .btn.btn-clear:hover {
    opacity: 1;
    background-color: lightgray;
  }

  .btn.btn-primary:not(.map-btn),
  .btn.btn-primary.map-btn {
    color: white;
    background: black;
    border-color: black;
    z-index: 600;
  }
  .btn.btn-link {
    color:#000;
  }
  .btn.btn-link:hover, .btn.btn-link:focus,.btn.btn-link:active {
    color:#000;
  }
  .btn.btn-primary:focus,
  .btn.btn-primary:hover,
  .btn.btn-primary:active, .btn.btn-primary.active {
    background: white;
    border-color: #000;
    color: #000;
    opacity: 1;
  }
  .btn.btn-primary .icon-location,
  .icon-arrow-right,
  .icon-arrow-left {
    width: 60px;
  }
  .map {
    position: relative;
    top: 0;
    left: 0;
    height: calc(65vh);
    width: 100%;
    background-color: whitesmoke;
    border: solid thin;
  }
  .print-mode .map, .jump-mode .map {
    height: 40px;
    width: 40px;
  }
  .mapboxgl-map .mapboxgl-popup .mapboxgl-popup-content {
    font-size: 1rem;
    padding: 1rem;
  }
  .img {
    width:90%;margin:0 auto;
  }
  .light {
    background-image: linear-gradient(to top right, #e6e6e6, white);
  }
  .jump-mode div.slide {
      width: inherit;
      overflow: hidden;
  }
header: >-
  <link rel="stylesheet" href="/css/montserrat/Montserrat.css" />
  <link rel="stylesheet" href="/css/mapbox-gl.css">
  <script src="/js/mapbox-bundle-min.js"></script>
---
<div markdown="1" style="width:90%;margin:0 auto;">
![](img/OhioGIS_Title_Page_2018.png)
</div>

<div class="emoji">👶👧👩
</div>

<div markdown="1">
What is <strong>TurfJS?</strong>
</div>

<div>
Advanced <strong>geospatial analysis</strong> for browsers and Node.js
</div>

<div>
<strong>Modular => </strong> 
Area, Bounding Box, Buffer, Grids, Intersect, Isolines, Length, Random, Sample, Voroni, Within...
</div>

<div>
JavaScript functions that speak <strong>GeoJSON</strong>
</div>

<div><strong>What</strong> is GeoJSON?</div>

<div>
<pre><code>
/** GeoJSON is a single JSON file containing one or more features */
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-82, 39] /*WGS 84*/
      },
      "properties": {
        "field": "value"
      }
    }
  ]
}
</code></pre>
</div>

<div>
GeoJSON is <strong>Everywhere</strong>
</div>

<div>
Geocoder APIs | ArcGIS Feature to JSON | USGS Earthquake Feed | DATA.GOV (1,600+ Datasets) | AGOL Query Response & Exports | geojson.xyz (Natural Earth Data+) | Native Support in QGIS (Editing)
</div>

<div class="img">
<h1>GitHub Support (2013)</h1>
<img src='img/github-geojson-2.png' width='100%'>
</div>

<div markdown="1">
Free & Open 

Source Software
[github.com/Turfjs](https://github.com/Turfjs)
</div>

<div markdown="1">
# Include in your HTML
<br>
<pre><code>https://cdnjs.cloudflare.com/ajax/libs/Turf.js/5.1.5/turf.min.js</code></pre>
<br><br>
# Install via NodeJS  
<br>
<pre><code>npm install @turf/turf --OR-- npm install @turf/bbox</code></pre>
</div>

<div>
Why use <strong>TurfJS?</strong>
</div>

<div>
<strong>Simple geospatial queries</strong>
</div>

<div>
Complex geospatial analysis <strong>(in NodeJS)</strong>
</div>

<div style="border: solid thick #2ecc71;">
Creating spatial metadata (bounding box)
</div>

<div>
A Few Examples
</div>

<div>
  Turf Within
  <pre><code>turf.booleanWithin(point, polygon)</code></pre>
</div>

<div>
<h1>Find My County</h1>
<pre><code>
var result = "";
counties.features.map(function(county) {
  var point = turf.point([x,y]);
    if (turf.booleanWithin(point, county) {
      result = county.properties.NAME;
    }
});
</code></pre>
<div class="input-group">
  <input type="text" class="form-input" value="-82,39">
  <button class="btn btn-primary input-group-btn" id="withinSubmit">Submit</button>
</div>
</div>

<div id="formResult">Click the Submit button on the previous page</div>

<div class="emoji">🤩😵🧐</div>

<div class="emoji">😢😭😿</div>

<div>
  Practical Applications
</div>

<div>
  Local <strong>Authoritative</strong> Open Data
</div>

<div>
  Turf Nearest
  <pre><code>Array.filter()</code></pre>
  <pre><code>turf.nearestPoint(point, points)</code></pre>
</div>

<div markdown="1">
# Find the Closest Playground
<pre><code>
var data = amenities.features.filter(function(a) {
  return a.properties.TYPE === 'Playground' 
})
var playgrounds = turf.featureCollection(data);
var result = turf.nearestPoint(point, playgrounds)
</code></pre>

<div class="input-group">
  <input type="text" value="-82.007054,39.942022">
  <button class="btn btn-primary input-group-btn" id="nearestSubmit">Submit</button>
</div>
</div>

<div id='playgroundResult'>
Loading...
</div>


<div class="emoji">😍😍😍</div>

<div markdown="1">
Advanced Analysis in <strong>TurfJS</strong>
</div>

<div>
Visualizing <strong>Crashes</strong> in Muskingum County (>7k)
</div>

<div>
Hexgrids
<pre><code>turf.hexGrid(bbox, size, opts)</code></pre>
Intersect
<pre><code>turf.intersect(a,b)</code></pre>
Collect
<pre><code>turf.collect(p, pts, field, name)</code></pre>
</div>

<div class="emoji">🐨😴💤</div>

<div>
<h1>Turf Hexgrids</h1>
<pre><code>
var bbox = [-82.5, 39.7, -81.5, 40.18];
var size = 1;
var options = {
  units: 'miles'
};

var hexgrid = turf.hexGrid(bbox, size, options)
</code></pre>
</div>
<div markdown="1">
Turf Intersect 
<pre><code>
/* loop through each grid
 * add the intersecting areas to the clippedGrid
 * calculate the area in sq miles */

var clippedGrid = { "type":"FeatureCollection", "features":[] }

hexgrid.features.map(function(grid) {
  var toFt = 0.00000386102159
  var intersect = turf.intersect(grid, muskingum);
  if (intersect) {
    clippedGrid.features.push(intersect);
  }
});
</code></pre>

</div>

<div class="display-content">
  <div id="map" class="map">
    <div id="buttons" class="buttons"></div>
  </div>
</div>

<div markdown="1">
Turf in <strong>Node JS</strong>
</div>
<div>
Find the Nearest National Park 🏕️<br>45MB GeoJSON National Park Boundary File
</div>

<div>
<pre><code>turf.explode(polygon)</code></pre>

<pre><code>turf.nearestPoint(point, points)</code></pre>
</div>

<div>
<pre><code>
function findNearestPolygon(point, polygon) {
  var vertices = turf.explode(polygon)
  return turf.nearestPoint(point, vertices)
}
</code></pre>
</div>

<div>
Find the Nearest Polygon
  <form class="input-group">
    <div class="input-group">
      <input class="form-input" name="lng" type="text" id="lng" placeholder="Longitude" value="-82">
    </div>
    <div class="input-group">
      <input class="form-input" type="text" id="lat" placeholder="Latitude" name="lat" value="39">
    </div>
    <button class="btn btn-primary form-input" id="nearestPolySubmit" style="float:left;">Submit</button>
  </form>
</div>

<div id="nearestPolyResult">
Loading...
</div>

<!--div>
Turf Center
<pre><code>
var center = {
  "type": "FeatureCollection",
  "features": []
};

/* Calculate the center for each grid */

hexgrid.features.map(function (feature) {
  center.features.push(turf.centerOfMass(feature));
});
</code></pre>
</div-->

<div markdown="1">
Support [TurfJS](https://opencollective.com/turf)
</div>

<div markdown="1">
Thanks!
Malcolm Meyer
[@getbounds](https://twitter.com/getbounds)
</div>
<script src="app.js"></script>
<script>

function changeHTMLOverflow() {
  return null
}

</script>
