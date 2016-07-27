//--start geojson-vt map tiles--//
//--interaction on the underlying polygon not drawn but represented by the tiles - they draw better--//
var highlight;
map.on('click', function(e) {
  if (highlight) {
    map.removeLayer(highlight)
  }
  var x = e.latlng.lng;
  var y = e.latlng.lat;
  var layerData = leafletPip.pointInLayer([x, y], parcels, true);
  if (!layerData[0]) {
    console.log('nothing to see here')
  } else {
    map.spin(true);
    var highlightIndex = layerData[0].feature.properties.index;
    highlight = new L.geoJson(data, {
      filter: function(feature, layer) {
        return feature.properties.index == highlightIndex
      },
      style: {
        color: 'deepskyblue',
        fillColor: 'deepskyblue'
      }
    }).addTo(map);
    var attributes = highlightIndex.split('{{ page.split }}', {{ page.indexnumber }});
    //--adjust here if you have more than two fields in your index field or someone can write a code that just lists them all--//
    var pin = attributes[0];
    var deed = attributes[1];
    var popup = 'Parcel ID: ' + pin + '<hr>Deed: ' + deed;
    map.on('popupopen', function() {
      map.spin(false)
    });
    map.openPopup(popup, e.latlng);
    map.on('popupclose', function() {
      map.removeLayer(highlight)
    });
  }
});
//end point in polygon
//geojson-vt
var tileOptions = {
  maxZoom: 20, // max zoom to preserve detail on
  tolerance: 7, // 5 simplification tolerance (higher means simpler)
  extent: 4096, //4096, // 4096 tile extent (both width and height)
  buffer: 64, // 64 default 64tile buffer on each side
  debug: 0, // logging level (0 to disable, 1 or 2)
  indexMaxZoom: 20, // 0 max zoom in the initial tile index
  indexMaxPoints: 100000, // 100000 max number of points per tile in the index
};
var data = parcels.toGeoJSON();
var tileIndex = geojsonvt(data, tileOptions);
//take json output from geojson-vt and draw it with the now depricated (in leaflet-beta) L.canvasTiles and code from here - http://blog.sumbera.com/2015/05/31/geojson-vt-on-leaflet/
var tileLayer = L.canvasTiles().params({
  debug: false,
  padding: 50
}).drawing(drawingOnCanvas);
var pad = 0;
tileLayer.addTo(map);
tileLayer.setZIndex(10);

function drawingOnCanvas(canvasOverlay, params) {

  var bounds = params.bounds;
  params.tilePoint.z = params.zoom;

  var ctx = params.canvas.getContext('2d');
  ctx.globalCompositeOperation = 'source-over';


  //console.log('getting tile z' + params.tilePoint.z + '-' + params.tilePoint.x + '-' + params.tilePoint.y);

  var tile = tileIndex.getTile(params.tilePoint.z, params.tilePoint.x, params.tilePoint.y);
  if (!tile) {
    //console.log('tile empty');
    return;
  }

  ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);

  var features = tile.features;

  ctx.strokeStyle = '{{ page.color }}';


  for (var i = 0; i < features.length; i++) {
    var feature = features[i],
      type = feature.type;

    ctx.fillStyle = feature.tags.color ? feature.tags.color : 'transparent';
    ctx.beginPath();

    for (var j = 0; j < feature.geometry.length; j++) {
      var geom = feature.geometry[j];

      if (type === 1) {
        ctx.arc(geom[0] * ratio + pad, geom[1] * ratio + pad, 2, 0, 2 * Math.PI, false);
        continue;
      }

      for (var k = 0; k < geom.length; k++) {
        var p = geom[k];
        var extent = 4096;

        var x = p[0] / extent * 256;
        var y = p[1] / extent * 256;
        if (k) ctx.lineTo(x + pad, y + pad);
        else ctx.moveTo(x + pad, y + pad);
      }
    }

    if (type === 3 || type === 1) ctx.fill();
    ctx.stroke();
  }

};

});
//--flood--//
var nfhl = L.esri.dynamicMapLayer({
url: '//hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer',
layers: [28],
opacity: 0.5,
});
/*//--Popup is too slow to respond plus the layer is labeled--//
nfhl.bindPopup(function (error, featureCollection) {
if(error || featureCollection.features.length === 0) {
return false;
} else {
return featureCollection.features[0].properties.FLD_ZONE;
}
});
*/
layerControl.addOverlay(nfhl, "Flood Hazard");
//--end--//
map.on('overlayadd', function() {
if(map.getZoom() < 14) {
map.setZoomAround(map.getCenter(), 14);
}
$("#mapLegend").html("<img src='data/nfhl.png' alt='legend' style='width:100%;border:lightgray solid thin;padding:10px;margin-bottom: 10px;'/>");
});
map.on('overlayremove', function() {
$("#mapLegend").html("");
});
