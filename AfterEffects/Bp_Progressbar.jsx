function Bp_createProgbar(w,list){
        
    var pbar = w.add ("progressbar", undefined, 1, list.length);
    pbar.preferredSize = [300,20];
    w.show ();
    return pbar;
}

function Bp_updateProgbar(progress,PrgValue){
    
        progress.value =PrgValue;
        
    }

function Bp_closeProgbar(progress){
    
        progress.parent.close();  
        
    }


var w = new Window ("palette");
var l = ["one", "two", "three", "four", "five", "six"];


var prg=Bp_createProgbar(w,l);

for(var i=1;i<=l.length;i++){
    $.sleep ('400');
   Bp_updateProgbar(prg,i);
    }

Bp_closeProgbar(prg);