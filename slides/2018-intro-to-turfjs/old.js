
/* map & app */
/*
app section
*/

/* getJSON xhr request */
function getJSON(url, callback) {
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', url, true);
  req.onload  = function() {
    var jsonResponse = JSON.parse(req.responseText);
    callback(jsonResponse)
  };
  req.send(null);
}

/* load crash data and parse */
fetch('data/crashes.json').then(function(res) {
  return res.json()
})
.then(function(data) {
  crashes = data;
})
.catch(function(err) {
  console.log(err)
});

/* load county data then build the map, then build the buttons */
fetch('data/counties.topojson').then(res => {
  return res.json()
}).then(data => {
  counties = topojson.feature(data, data.objects["counties_single_fixed"]);
  counties.features.map(function(f, i) {
    if (f.properties.NAME === "Muskingum") {
      muskingum = f;
    }
  })
  console.log(muskingum);
  buildMap();
  buildApp();
})
.catch(function (err) {
  console.log(err)
})

var counties, map, labels, crashes;
var playgrounds = {
  type: "FeatureCollection",
  features: []
};
var muskingum =     {
  "type": "Feature",
  "geometry": {
  }
};

function getPosition() {

  var currentLocation;

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
    currentLocation = [crd.longitude, crd.latitude];
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  return currentLocation
}

function buildApp() {
  var hexgrid = {},
  center = {},
  clippedGrid =     {
    "type": "FeatureCollection",
    "features": []
  };
  /*
  create hexgrid button
  */
  
  function createButton(html, fn, id) {
    var button = document.createElement('button');
    button.innerHTML = html;
    button.className = className = "btn btn-primary map-btn";
    button.onclick = fn;
    button.addEventListener('click', function() {
      getLayers(map)
    })
    document.getElementById(id).appendChild(button)
  }
  
  createButton("Create Hex Grid", createHexgrid, "buttons")
  createButton("Center of Mass", getCenter, "buttons")
  createButton("Create Labels", createLabels, "buttons");
  createButton("Clip Grid", clipGrid, "buttons")
  createButton("Collect", collect, "buttons");
  createButton("Bounds", bounds, "buttons");
  createButton("Reset", reset, "buttons");

  function collect() {
    if (!getLayers(map, "within")) {
      var l = ((clippedGrid.features).length) - 1;
      console.log(l)
      var within = turf.collect(clippedGrid, crashes, "count", "crashvalues");
      var counts = [];
      var checkTurf = setInterval(function() {
        if (within && within.features[l]) {
          clearTimeout(checkTurf)
          within.features.map(function(f) {
            f.properties.count = (f.properties.crashvalues).length;
            counts.push((f.properties.crashvalues).length)
          });
          var limits = chroma.limits(counts, 'k', 5)
          console.log(limits)
          console.log(chroma.scale('OrRd').colors(limits.length))
          var scale = chroma.scale('PuRd').colors(limits.length)
          map.addLayer({
            id:"within",
            type:"fill",
            source: {
              type:"geojson",
              data: within
            },
            paint: {
              "fill-color": {
                "property":"count",
                stops: [
                [limits[0], scale[0]],
                [limits[1], scale[1]],
                [limits[2], scale[2]],
                [limits[3], scale[3]],
                [limits[4], scale[4]]
                ],
              },
              "fill-outline-color": "white",
              "fill-opacity": 1
            }
          }, 'counties')
          console.log(within)
        }
      }, 500);
    }
  }

  function bounds() {
    var num = Math.floor((Math.random() * 3481))
    console.log(num)
    var bbox = turf.bbox(counties.features[num])
    console.log(bbox)
    map.fitBounds([
      [bbox[0]-.2,bbox[1]-.2],[bbox[2]+.2,bbox[3]+.2]
    ]);
 
  }
  
  function clipGrid() {
    if (hexgrid.features.length > 0 && clippedGrid.features.length === 0) {
      console.log(true)
      hexgrid.features.map(function(feature) {
        var intersect = turf.intersect(feature, muskingum);
        if (intersect) {
          intersect.properties.area = ((turf.area(intersect))*0.00000386102159).toFixed(2);
          clippedGrid.features.push(intersect);
        }
      });
    }
    console.log(clippedGrid)
    if (hexgrid.features && !getLayers(map, "clippedGrid")) {
      console.log(true)
      map.addLayer({
        id:"clippedGrid",
        type:"fill",
        source: {
          type:"geojson",
          data:clippedGrid
        },
        paint: {
          "fill-color": 'rgba(212, 230, 241, 0.3)',
          "fill-outline-color": "#3498DB",
          "fill-opacity": 1
        }
      })
    }
  }
  
  function reset() {
    var layers = map.getStyle().layers
    for (l in layers) {
      if (layers[l].id != "counties" && layers[l].id != "background" && layers[l].id != "countiesFill") {
        console.log(layers[l].id)
        map.removeLayer(layers[l].id);
        map.removeSource(layers[l].source)
      }
    }
    map.flyTo({center: [-81.99, 39.93], zoom: 8.6})
  }
  
  function createHexgrid() {
    hexgrid = {};
    var bbox = [-82.5, 39.7, -81.5, 40.18];
    var cellSize = 1;
    var options = {
      units: 'miles'
    };
  
    hexgrid = turf.hexGrid(bbox, cellSize, options);
  
    map.addLayer({
      id: "hex",
      type: "fill",
      source: {
        type: "geojson",
        data: hexgrid
      },
      paint: {
        "fill-color": '#2ecc71',
        "fill-outline-color": "black",
        "fill-opacity": 0.6
      }
    })
    map.addLayer({
      id: "hexline",
      type: "line",
      source: {
        type: "geojson",
        data: hexgrid
      },
      paint: {
        "line-color": "#2ecc71",
        "line-width": 2
      }
    })
  
  }
  
  
  function getCenter() {
    if (!map.getLayer('center') && map.getLayer('hex') != "undefined") {
      center = {
        "type": "FeatureCollection",
        "features": []
      };
      hexgrid.features.map(function (f, i) {
        center.features.push(turf.centerOfMass(f));
      });
  
      map.addLayer({
        id: "center",
        type: "circle",
        source: {
          type: "geojson",
          data: center
        },
        paint: {
          "circle-radius": 10,
          "circle-blur": 2,
          "circle-opacity": 1,
          "circle-color": "black"
        }
      })
    }else{
      alert('error')
    }
  }
  
  function createLabels() {
    labels = {
      "type": "FeatureCollection",
      "features": []
    };
    counties.features.map(function (f) {
      var p = f.properties;
      // var xy = polylabel(f.geometry.coordinates);
      // if(!xy[0]) {
      //   xy = [0,0]
      // }
      // labels.features.push({
      //   "type":"Feature",
      //   "geometry": {
      //     "coordinates":[],
      //     "type":"Point"
      //   },
      //   "properties":{}
      // });
      // labels.features[i].geometry.coordinates = xy
      // labels.features[i].type = "Feature";
      // labels.features[i].properties = {"NAME":p.NAME};
      // console.log(polylabel(f.geometry.coordinates));
      labels.features.push(turf.centerOfMass(f, {
          "NAME":p.NAME
      }));
    });
    console.log(labels)
    map.addLayer({
      id:"labels",
      type:"symbol",
      source: {
        type:"geojson",
        data:labels
      },
      'minzoom': 6,
      'layout': {
        'visibility': 'visible',
        "text-field": "{NAME}",
        "text-anchor": "center",
        "text-size":14,
        "text-font":["Open Sans Regular"]
      }
    });

    map.flyTo({
      center: map.getCenter(), 
      zoom: 7.2,
      speed: 0.1
    })

  }
}

function buildMap() {
  map = new mapboxgl.Map({
    container: 'map',
    style: {
      "version": 8,
      sources: {
        "counties": {
          type: "geojson",
          data: counties
        }
      },
      "glyphs": "http://127.0.0.1:4000/slides/2018-intro-to-turfjs/{fontstack}/{range}.pbf",
      layers: [{
        id:"background",
        "type":"background",
        "paint":{
          "background-color":"lightblue"
        }
      },{
        id: "countiesFill",
        type: "fill",
        source: "counties",
        paint: {
          "fill-color": "white",
          "fill-opacity": 1
        }
      },
      {
        id: "counties",
        type: "line",
        source: "counties",
        paint: {
          "line-color": "#333",
          "line-width": {
            stops: [
              [0,1],[14,3]
            ]
          },
          "line-opacity": 1
        }
      }
    ]
    },
    center: [-81.99, 39.93],
    zoom: 8.6,
    // zoom: 3.65,
    // center: [-158.9935947381304, 62.83636773693945]
    // hash: true
  });

  var distanceContainer = document.getElementById('distance');

  // GeoJSON object to hold our measurement features
  var geojson = {
    "type": "FeatureCollection",
    "features": []
  };

  // Used to draw a line between points
  var linestring = {
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": []
    }
  };

  map.on('load', function () {
    map.resize();
    map.addLayer({
      'id': "crashes",
      "type": "circle",
      source: {
        type: "geojson",
        "data": crashes
      },
      paint: {
        "circle-radius": 10,
        "circle-blur": 2,
        "circle-opacity": 1,
        "circle-color": "black"
      },
      layout: {
        "visibility": "none"
      }
    })
  });

  /* booleanWithin() */
  var withinLoc = document.getElementById('withinSubmit');
  withinLoc.addEventListener('click', function(e) {
    e.preventDefault();
    console.log(this.parentElement)
    var loc = this.parentElement.children[0].value;
    var coord = loc.split(",")
    console.log(coord)
    var county = {};
    counties.features.map(function(f) {
      if (turf.booleanWithin(turf.point([Number(coord[0]),Number(coord[1])]), f)) {
        county = f;
      }
    });
    var result = document.getElementById("formResult");
    result.innerText = county.properties.NAME + ' County, ' + county.properties.STNAME
  });

  var nearestLoc = document.getElementById('nearestSubmit');

  nearestLoc.addEventListener('click', function(e) {
    e.preventDefault();
    var loc = this.parentElement.children[0].value;
    var coord = loc.split(",");
    var point = turf.point([Number(coord[0]),Number(coord[1])]);
    if (playgrounds.features.length == 0) {
      fetch('data/amenities.geojson')
      .then(function(res) {return res.json()})
      .then(function(data) {
        playgrounds.features = data.features.filter(function(d) {
          return d.properties.TYPE === 'Playground'
        });
        console.log(playgrounds)
        console.log(getNearest(point, playgrounds))
      })
    }else{
      console.log(getNearest(point, playgrounds))
    }
    function getNearest(p, pts) {
      var playground = turf.nearestPoint(p, pts)
      var r = document.getElementById('playgroundResult');
      console.log(playground)
      r.innerHTML = '<strong>' + playground.properties.PARK + ' is the closest park with a playground (' + Math.round((playground.properties.distanceToPoint * 0.621371) * 100) / 100 + ' mi).</strong>';
    }
  })

  var nearestPolySubmit = document.getElementById('nearestPolySubmit');

  nearestPolySubmit.addEventListener('click', function(e) {
    e.preventDefault();
    var loading = document.getElementById('findthenearestpolygon');
    // var span = loading.querySelector('div');
    var result = document.getElementById('nearestPolyResult');
    result.innerHTML = "Loading...";
    var lat = e.target.parentElement[1].value;
    var lng = e.target.parentElement[0].value;
    var url = 'http://127.0.0.1:3000/query/?lng=' + lng + '&lat=' + lat;
    getJSON(url, function(json) {
      result.innerHTML = '<strong>' + json.properties.PARKNAME + '</strong><br>Turf Benchmark: ' + json.properties.secToFindPoint + ' seconds'
    })
  })

  appUtils(map)
}

/* listeners to resize the content and resize the map */

function appUtils(map) {
  
  map.on('render', afterChangeComplete); // warning: this fires many times per second!

  function afterChangeComplete () {
    if (!map.loaded()) { return } // still not loaded; bail out.
  
    // now that the map is loaded, it's safe to query the features:
    // map.queryRenderedFeatures(...);
  
    console.log('map rendered')

    map.off('render', afterChangeComplete); // remove this handler now that we're done.
  }

  map.on('click', function(e) {
    var clickedFeatures = map.queryRenderedFeatures(e.point);
    console.log(clickedFeatures)
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(JSON.stringify(clickedFeatures[0].properties, 0, 2))
      .addTo(map);
    // console.log(map.queryRenderedFeatures(e.point))
  })

}

/*
general functions
*/

function getLayers(m, l) {
  var layerList = [];
  var obj = m.getStyle().layers;
  obj.map(function(o, i) {
    layerList[i] = o.id
  })
  if (layerList.indexOf(l) > -1) {
    return true 
  }
  console.log(layerList)
}

window.onhashchange = function() {
  map.resize();
}
