#target photoshop

var word = "ThanosRules";

var PSapp = app.activeDocument;
var oldPath = PSapp.path;
var Layers = PSapp.layers;

for (var i = 0; i < word.length; i++) {
    Layers[0].textItem.contents = word.charAt(i);
    var saveFile = new File(oldPath + "/" + word.charAt(i) + ".tga");
    SaveTarga(saveFile);
}


function SaveTarga(myFile) {

    TargaOpts = new TargaSaveOptions();
    TargaOpts.resolution = TargaBitsPerPixels.THIRTYTWO;
    TargaOpts.alphaChannels = true;
    TargaOpts.rleCompression = false;
    activeDocument.saveAs(myFile, TargaOpts, true, Extension.LOWERCASE);
}
