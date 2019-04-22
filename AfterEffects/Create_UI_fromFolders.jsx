function Bp_retFolderContents(){
    var fldr=Folder.selectDialog ();
    var files=fldr.getFiles('*');

    var list=new Array();
    for(var i=0;i<files.length;i++){
                if(!(files[i] instanceof File))
               list.push (files[i]);
        }

    return list;

}
//create a pallete window
var mywin=new Window ('palette','Shot Creator');
//get the folder contents
var ShotNames=new Array();
ShotNames=Bp_retFolderContents();
//create buttons from the content
for(var i=0;i<ShotNames.length;i++){
    mywin.add ('button', undefined,ShotNames[i].displayName.toString());
}
mywin.show();