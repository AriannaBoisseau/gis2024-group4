import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, BingMaps, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition, ZoomToExtent } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Stroke } from 'ol/style';

let osm = new Tile({
    title: "Open Street Map",
    type: "base",
    visible: true,
    source: new OSM()
});

//step 1

var aspect = new Image({
    title: "Aspect",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:aspect' }
    })
});

var dtm = new Image({
    title: "DTM",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:dtm' }
    })
});

var dusaf = new Image({
    title: "Dusaf",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:dusaf' }
    })
});

var faults = new Image({
    title: "Faults",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:faults' }
    })
});

var nvdi = new Image({
    title: "NVDI",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:nvdi'}
    })
});

var plan = new Image({
    title: "Plan",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:plan'}
    })
});

var profile = new Image({
    title: "Profile",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:profile'}
    })
});

var rivers = new Image({
    title: "Rivers",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:rivers'}
    })
});

var roads = new Image({
    title: "Roads",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:roads'}
    })
});

var slope = new Image({
    title: "Slope",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:slope'}
    })
});

var NLZ = new Image({
    title: "No Landslides Zone",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:NLZ'}
    })
});

var trainPoints = new Image({
    title: "Training Points Sampled",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:trainingPointsSampled'}
    })
});

var testPoints = new Image({
    title: "Testing Points Sampled",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:testingPointsSampled'}
    })
});

//step2

var confidence = new Image({
    title: "Confidence",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:confidence'}
    })
});

var susMap = new Image({
    title: "Landslide Susceptibility Map",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:LandslideSusceptibilityMap'}
    })
});

//step 3

var population = new Image({
    title: "Population",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:population'}
    })
});

var susMap_rec = new Image({
    title: "Landslide Susceptibility Map Reclassified",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:LandslideSusceptibilityMap_reclass_resamp'}
    })
});

//extra

var outline = new Image({
    title: "Case Study",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:GROUP_GROUP 4'}
    })
});

var merged = new Image({
    title: "NLZ & LS Merged",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_04:Merged_NLZ_LSinv' }
    })
});

//Create the layer groups and add the layers to them
let basemapLayers = new Group({
    title: "Base Maps",
    layers: [osm]
});
let step1 = new Group({
    title: "Step 1",
    layers: [aspect, dtm, dusaf, faults, nvdi, plan, profile, rivers, roads, slope, NLZ, trainPoints, testPoints]
})
let step2 = new Group({
    title: "Step 2",
    layers: [confidence, susMap]
})
let step3 = new Group({
    title: "Step 3",
    layers: [population, susMap_rec]
})
let extra = new Group({
    title: "Extra Layers",
    layers: [outline, merged]
})

//step1
aspect.setVisible(false);
dtm.setVisible(false);
dusaf.setVisible(false);
faults.setVisible(false);
nvdi.setVisible(false);
plan.setVisible(false);
profile.setVisible(false);
rivers.setVisible(false);
roads.setVisible(false);
slope.setVisible(false);
NLZ.setVisible(false);
trainPoints.setVisible(false);
testPoints.setVisible(false);

//step2
confidence.setVisible(false);

//step3
population.setVisible(false);
susMap_rec.setVisible(false);

//extra
merged.setVisible(false);
outline.setVisible(false);

// Map Initialization
let map = new Map({
    target: document.getElementById('map'),
    layers: [basemapLayers, extra, step3, step2, step1],
    view: new View({
        center: fromLonLat([9.92, 45.74]), //center of our group areas
        zoom: 12
    })
});

// Add the map controls:
map.addControl(new ScaleLine()); //Controls can be added using the addControl() map function
map.addControl(new FullScreen());
map.addControl(
    new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-control',
        placeholder: '0.0000, 0.0000'
    })
);
map.addControl(new ZoomToExtent({
    extent: [
        1106000 - 14000,
        5739000 - 14000,
        1106000 + 14000,
        5739000 + 14000,
    ],
  }),);

var layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);

//Add the Bing Maps layers
var BING_MAPS_KEY = "AqbDxABFot3cmpxfshRqLmg8UTuPv_bg69Ej3d5AkGmjaJy_w5eFSSbOzoHeN2_H";
var bingRoads = new Tile({
    title: 'Bing Maps—Roads',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Road'
    })
});
var bingAerial = new Tile({
    title: 'Bing Maps—Aerial',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Aerial'
    })
});
basemapLayers.getLayers().extend([bingRoads, bingAerial]);

// Adding map event for pointermove
map.on('pointermove', function (event) {
    var pixel = map.getEventPixel(event.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});
