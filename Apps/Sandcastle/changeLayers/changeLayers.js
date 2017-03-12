var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
        url : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    }),
    baseLayerPicker : false
});

var layers = viewer.imageryLayers;
var blackMarble = layers.addImageryProvider(Cesium.createTileMapServiceImageryProvider({
    url : 'https://cesiumjs.org/blackmarble',
    credit : 'Black Marble imagery courtesy NASA Earth Observatory',
    flipXY : true // Only old gdal2tile.py generated tilesets need this flag.
}));

//blackMarble.splitDirection = Cesium.ImagerySplitDirection.LEFT; // Only show to the left of the slider.

// // Sync the position of the slider with the split position
// var slider = document.getElementById('slider');
// viewer.scene.imagerySplitPosition = (slider.offsetLeft) / slider.parentElement.offsetWidth;

// var dragStartX = 0;

// document.getElementById('slider').addEventListener('mousedown', mouseDown, false);
// window.addEventListener('mouseup', mouseUp, false);

// function mouseUp() {
//   window.removeEventListener('mousemove', sliderMove, true);
// }

// function mouseDown(e) {
//   var slider = document.getElementById('slider');
//   dragStartX = e.clientX - slider.offsetLeft;
//   window.addEventListener('mousemove', sliderMove, true);
// }

// function sliderMove(e) {
//   var slider = document.getElementById('slider');
//   var splitPosition = (e.clientX - dragStartX) / slider.parentElement.offsetWidth;
//   slider.style.left = 100.0 * splitPosition + "%";
//   viewer.scene.imagerySplitPosition = splitPosition;
// }


