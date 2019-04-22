var strtRulerUnits = app.preferences.rulerUnits;
var strtTypeUnits = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.INCHES;
app.preferences.typeUnits = TypeUnits.POINTS;

var docRef = app.documents.add(10, 10, 72);

var textColor = new SolidColor;
textColor.rgb.red = 0;
textColor.rgb.green = 0;
textColor.rgb.blue = 0;


for (var i = 0; i < 10; i++)
    for (var j = 0; j < 10; j++) {
        var newTextLayer = docRef.artLayers.add();
        newTextLayer.kind = LayerKind.TEXT;
        newTextLayer.textItem.contents = i + "," + j;
        newTextLayer.textItem.position = Array((i + .5), (j + .5));
        newTextLayer.textItem.size = 18;
    }

app.preferences.rulerUnits = strtRulerUnits;
app.preferences.typeUnits = strtTypeUnits;
docRef = null;
textColor = null;
newTextLayer = null;