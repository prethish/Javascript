#target afterEffects

var comp=app.project.activeItem;
var compLayers=comp.layers;
var total_number = compLayers.length;
var selLayers=comp.selectedLayers;
var lyrIndex=selLayers[0].index;
selLayers[0].startTime=compLayers[lyrIndex-1].outPoint;
compLayers[lyrIndex+1].startTime=selLayers[0].outPoint;

