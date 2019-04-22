#target Photoshop
//save the document
try {
    app.activeDocument.save(SaveOptions.DONOTSAVECHANGES);
}
catch (e) {
    alert(e.message);
}

var oldPath = app.activeDocument.path;
var DocName = app.activeDocument.name.split(".");
//duplicate the document
var DupeDocument = app.activeDocument.duplicate();

var MyLayers = DupeDocument.layers;

//Delete all layers not in groups
for (var i = 0; i < MyLayers.length; i++) {

    if (MyLayers[i].typename == 'ArtLayer')
        MyLayers[i].remove();
}

//merge all the layer groups
var MyLayerSets = DupeDocument.layerSets;
var SetNo = MyLayerSets.length;
for (i = 0; i < SetNo; i++) {
    $.writeln("merging set " + i + "," + MyLayerSets[0].name);
    var newLayer = MyLayerSets[0].merge();
    newLayer.visible = false;
}

//export the layers to files
MyLayers = DupeDocument.layers;

for (var i = 0; i < MyLayers.length; i++) {
    MyLayers[i].visible = true;
    //save the document
    var saveFile = new File(oldPath + "/" + DocName[0] + "_" + MyLayers[i].name + ".tga");
    $.writeln("saving" + saveFile.fullName);
    SaveTarga(saveFile);
    MyLayers[i].visible = false;
}


DupeDocument.close(SaveOptions.DONOTSAVECHANGES);

function SaveTarga(myFile) {

    TargaOpts = new TargaSaveOptions();
    TargaOpts.resolution = TargaBitsPerPixels.THIRTYTWO;
    TargaOpts.alphaChannels = true;
    TargaOpts.rleCompression = false;
    activeDocument.saveAs(myFile, TargaOpts, true, Extension.LOWERCASE);
}


