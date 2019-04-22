/*
    software Version:CS5
*/
#target afterEffects
//user Frame input
var frameOffset=prompt ('Enter the Frame Offset', '1',' 3D Shot Creator' );
//project settings
var proj = app.project;
var comp= app.project.activeItem;
var frameDuration=comp.frameDuration
var comp_layers = comp.layers;
var total_number = comp_layers.length;

if(total_number >= 2) {	
    
	for (j =total_number-1,i=1; j >=1 ; j--,i++) {
            outP=comp_layers[j].outPoint;
		comp_layers[j].inPoint=frameDuration*i*frameOffset;
        comp_layers[j].outPoint=outP;
        }
        
}

