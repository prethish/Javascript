//duplicate the photoshop file
var dupeDoc=app.activeDocument.duplicate ();
var docName = app.activeDocument.name;  // save the app.activeDocument name before duplicate.
//get the list of groups in the PSD file
var layerSets = app.documents[docName].layerSets;
var layerSetsCount = layerSets.length;


for(var i=0;i<layerSetsCount;i++){
    
    $.writeln (layerSets[i].layers.length);
    //get the no of layers in each group
    var numLayers=layerSets[i].layers.length;
    //  merge all the layers in a group before saving 
    for(var j=0;j<numLayers-1;j++){
        
            layerSets[i].layers[0].merge();
        
        }
    //get the grpName to save as the file
    var GrpName=layerSets[i].name;
    //save the files
    layerSets[i].layers[0]

    
}

dupeDoc.close (SaveOptions.DONOTSAVECHANGES);