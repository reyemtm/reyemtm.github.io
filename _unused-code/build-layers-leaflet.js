/*function buildMap() {
    map.fitBounds(storeData.getBounds());


    var stores = {},
        type;

    var allPoints = L.geoJson(storeData.toGeoJSON(), {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, myStyle);
        },
        style: function(feature) {
            switch (feature.properties.Type) {
                case 'Specialty':
                    return {
                        fillColor: "purple"
                    };
                case 'Convenience':
                    return {
                        fillColor: "red"
                    };
                case 'Grocery':
                    return {
                        fillColor: "orange"
                    };
                case 'Supermarket':
                    return {
                        fillColor: "green"
                    };
            }
        },
        onEachFeature: function(feature, layer) {
            var popup = "";
            for (var k in layer.feature.properties) {
                var v = String(layer.feature.properties[k]);
                popup += '<b>' + k + '</b><br>' + v + '<br>' + '<hr style="margin:5px 0px;">';
            }
            layer.bindPopup(popup);
            type = feature.properties.Type;
            // Initialize the type array if not already set.
            if (typeof stores[type] === "undefined") {
                stores[type] = [];
            }
            stores[type].push(layer);
        }
    });

    var overlaysObj = {},
        typeName,
        typeArray,
        typeLG;

    for (typeName in stores) {
        typeArray = stores[typeName];
        typeLG = L.layerGroup(typeArray);
        typeLG.typeName = typeName;
        overlaysObj[typeName] = typeLG;
    }

    // Create an empty LayerGroup that will be used to emulate adding / removing all stores.
    var allPointsLG = L.layerGroup();
    overlaysObj["All Points"] = allPointsLG;

    var zoomcontrol = L.control.zoom({
        position: 'topright'
    }).addTo(map);
    var control = L.control.layers(null, overlaysObj, {
        collapsed: false,
    }).addTo(map);

    // Make sure the Layers Control checkboxes are kept in sync with what is on map.
    // For some reason this control does not sync its checkboxes with the map state by itself, whereas it does with Leaflet 0.7.x?
    map.on("overlayadd overlayremove layeradd", function(event) {
        var layer = event.layer,
            layertype;

        if (layer === allPointsLG) {
            if (layer.notUserAction) {
                // allPointsLG has been removed just to sync its state with the fact that at least one
                // type is not shown. This event does not come from a user un-ticking the "All points" checkbox.
                layer.notUserAction = false;
                return;
            }
            // Emulate addition / removal of all type LayerGroups when allPointsLG is added / removed.
            for (var typeName in overlaysObj) {
                if (typeName !== "All Points") {
                    if (event.type === "overlayadd") {
                        overlaysObj[typeName].addTo(map);
                    } else {
                        map.removeLayer(overlaysObj[typeName]);
                    }
                }
            }
            control._update();
        } else if (layer.typeName && layer.typeName in overlaysObj) {
            if (event.type === "overlayadd") {
                // Check if all stores are shown.
                for (var typeName in overlaysObj) {
                    layertype = overlaysObj[typeName];
                    if (typeName !== "All Points" && !layertype._map) {
                        // At least one type is not shown, do nothing.
                        return;
                    }
                }
                allPointsLG.addTo(map);
                control._update();
            } else if (event.type === "overlayremove" && allPointsLG._map) {
                // Remove allPointsLG as at least one type is not shown.
                // But register the fact that this is purely for updating the checkbox, not a user action.
                allPointsLG.notUserAction = true;
                map.removeLayer(allPointsLG);
                control._update();
            }
        }
    });

    allPointsLG.addTo(map);

    //console.log(storeData);
    map.spin(false);


}


*/