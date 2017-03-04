
var viewer = new Cesium.Viewer('cesiumContainer');


/*****************************************************************
 * Function: getDataTXT(input)
 * Description: extracts data from file as a string
 * Param: response text from file (string)
 * Reference: https://www.w3schools.com/xml/dom_intro.asp
 ****************************************************************/
function getDataTXT(input) {

    var endTrkpt = input.search("</trkseg>");   //find ending point for loop
    var trkptIndex = input.search("<trkpt lat=");
    var lonLatArr = []; //alternating array with longitude and latitude

    /*creates array of longitude and latitude*/
    while(trkptIndex < endTrkpt) {
        var lat = getLatitude(input, trkptIndex);
        var lon = getLongitude(input, trkptIndex);
        lonLatArr.push(lon);    
        lonLatArr.push(lat);
        trkptIndex += 96;   //enough characters ahead 
        //trkptIndex = input.search("</trkpt>");
    }
    lonLatArr.pop();
    lonLatArr.pop();
    visualize(lonLatArr);
}



/******************************************************************
 * Function: getLatitude(txt, i)
 * Description: gets a latitude from the gpx file
 * Parameters: string of the file, current index in file string
 * Return: the latitude
 * Reference: https://www.w3schools.com/jsref/jsref_indexof.asp
 ******************************************************************/
function getLatitude(txt, i) {
    idx = txt.indexOf("<trkpt lat=", i);
    idx += 12;   //move to index after tag name (start of lat)
    var num = "";
    while(txt[idx] != '"') {    //while char not a "
        num += txt[idx];
        idx++;
    }
    return num; 
}

/******************************************************************
 * Function: getLongitude 
 * Description: gets longitude from the gpx file
 * Parameters: the string of the file, current index in the file string
 * Return: the latitude 
 *****************************************************************/
function getLongitude(txt, i) {
    var start = i;  //where to start searching
    i = txt.indexOf("lon=", start);
    i += 5;   //move to index after tag name (start of lon)
    var num = "";
    while(txt[i] != '"') {    //while char not a "
        num += txt[i];
        i++;
    }
    return num;    
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
        positions : Cesium.Cartesian3.fromDegreesArray(arr),
        width : 5,
        material : Cesium.Color.BLUE
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
    //console.log("printed");
}


/******************************************************************
* Function: readFileTXT(file)
* Description: Reads from the text file to send to function 
* Param: Path to XML(gpx) file
******************************************************************/
function readFileTXT(file) {
    var xmlhttp = new XMLHttpRequest();
    var latLongArr;

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var input = xmlhttp.responseText;    //gets response as XML DOM object
            getDataTXT(input);
        }
    }

    xmlhttp.open("GET", file, true);
    xmlhttp.send();
}

//file is gpx format
//readFileTXT("./giro a malga brisolin.gpx");
//readFileTXT("Centro_Ischia_.gpx");
readFileTXT("Alpe_tognola_cima_tognola.gpx");
