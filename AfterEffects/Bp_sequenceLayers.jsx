var proj=app.project;

var totalDuration=0;

for(var i=1;i<=proj.numItems;i++)
{
totalDuration+=proj.item(i).duration;
$.writeln(proj.item(i).name+"="+proj.item(i).duration);
}

var compName="Full";
var compW=1920;
var compH=1080;
var pixelAspect=1;
var compDuration=totalDuration;
var compFrameRate=25;

var fullComp=app.project.items.addComp(compName,compW,compH,pixelAspect,compDuration,compFrameRate);
var flag=0;
for(var i=1;i<=proj.numItems;i++)
if(proj.item(i).name!="Full"){
    if(!flag){
    flag=1;
    var previousLayer=fullComp.layers.add(proj.item(i));
        }
    else{
        var currentLayer=fullComp.layers.add(proj.item(i));
       currentLayer.startTime= previousLayer.outPoint;
        previousLayer=currentLayer;
        }
}






