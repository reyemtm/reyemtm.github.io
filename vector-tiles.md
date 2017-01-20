## OVRDC Workflow

 1. Export from ArcMap (shapefiles or feature layers) to GeoJSON via [esri2open](https://github.com/project-open-data/esri2open).
 2. Transfer the GeoJSON to our Ubuntu 16.10 computer which we use for something else, and convert the GeoJSON to vector tiles via [tippecanoe](https://github.com/mapbox/tippecanoe).
 3. Copy the mbtiles file to our Digital Ocean Node-JS/Ubuntu/NGINX server.
 4. Style the data with Mapbox GL JS and serve the maps on our normal web server via static HTML, CSS and JavaScript, using Google's Material Design Light framework.

## Info, Press, About

http://www.gartrellgroup.com/vector-tiles-for-all/

There are many videos on youtube by mapbox and others on vector tiles. I was inspired by the videos by Tobin Bradley.

## 'Servers' OVRDC has tried

### mbtiles-server node-js
https://github.com/ratrun/mbtiles-server (OVRDC is using a modified version)

Serves vector and raster tiles from mbtiles file.
This is what OVRDC is using on the smallest digital ocean instance 512 MB 1 core Ubuntu 16.04, NGINX, Node-JS, following Tobin Bradley's example.

### Tileserver PHP, Tileserver GL, Tileserver-light
https://github.com/klokantech/tileserver-gl (newer)
https://github.com/klokantech/tileserver-php (older)

Serves vector and raster tiles from mbtiles.
Tileserver GL can optionally render raster tiles from vector tiles via pre configured styles, and generate high-res static images.

OVRDC has the php version installed on our web server at https://www.ovrdc.org/apps/tiles, the performance of vector tile unpacking from the mbtiles file is not very good - try the open layers viewer.

## Other Servers I havent tried

### Tegola
http://tegola.io/
Generates vector tiles on the fly from PostGIS, written in GO

### Tilestache
http://tilestache.org/ - Not updated in over 2 years
Serves raster tiles from mbtiles, generates raster and vector tiles on the fly from ? sources
