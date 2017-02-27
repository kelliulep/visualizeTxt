/*************************************
 ** visTxt.js
 ** visualizes a text file path
 ************************************/

var viewer = new Cesium.Viewer('cesiumContainer');

/******************************************************************
* Function: getSendData(input)
* Description: creates array from file text and calls visualize function using array
* Param: file text string
******************************************************************/
function getSendData(input) {
  var valArr = input.split(" ");
  printArr(valArr);
  visualize(valArr);
}


/******************************************************************
* Function: visualize(arr)
* Description: uses data from array to create a path
* Param: array of lat and long
******************************************************************/
function visualize(arr) {
  console.log("in visualize function");
  var entity = viewer.entities.add({
    polyline : {
      // positions : Cesium.Cartesian3.fromDegreesArray([-77, 35,
      //                                               -77.1, 35]),
      positions : Cesium.Cartesian3.fromDegreesArray(arr),
      width : 5,
      material : Cesium.Color.RED
    }
  });
  viewer.zoomTo(viewer.entities);
  //viewer.flyTo(viewer.entities);
  printArr(arr);
}


/******************************************************************
* Function: printArr(arr)
* Description: prints array out (testing)
* Param: array
******************************************************************/
function printArr(arr) {
  var i;
  console.log(arr.length);
  for(i = 0; i < arr.length; i++) {
    console.log(arr[i] + ", ");
  }
  console.log("printed");
}


/******************************************************************
* Function: readTextFile(file)
* Description: Reads from the text file and turns file into array
* Param: Path to text file
******************************************************************/
function readTextFile(file) {
  var txt = new XMLHttpRequest();
  var latLongArr;

  txt.onreadystatechange = function() {
    if(txt.readyState == 4 && txt.status == 200) {
      var input = txt.responseText;
      latLongArr = getSendData(input);
    }
  }

  //txt.open("GET", "./latLong.txt", true);
  txt.open("GET", file, true);
  txt.send();
}

//File is txt file of long, lat, long, lat alternating
readTextFile("./latLong2.txt");
