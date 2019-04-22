#include 'Smart Import.jsx'

//-----file Functions-------------
//returns  child folder/file
function Bp_FolderContent(retType, MainFldr) {
    var ChildFldrs = new Array();
    var ChildFiles = new Array();
    //get the children files in the selected folder
    var files = MainFldr.getFiles('*');
    //filter out the files and folders
    for (var i = 0; i < files.length; i++)
        if (files[i] instanceof File)
            ChildFiles[ChildFiles.length] = files[i];
        else
            ChildFldrs[ChildFldrs.length] = files[i];

    if (retType == 'folder')
        return ChildFldrs;
    else
        return ChildFiles;
}


//set the total duration of the final comp and then sequence the layers
function Bp_sequenceComps() {
    FullComp.duration = FullcompDuration;
    var flag = 0;
    var CompLayers = FullComp.layers
    for (var i = 1; i <= CompLayers.length; i++) {
        if (!flag) {
            flag = 1;
            var previousLayer = FullComp.layer(i);
        }
        else {
            var currentLayer = FullComp.layer(i);
            currentLayer.startTime = previousLayer.outPoint;
            previousLayer = currentLayer;
        }
    }
}


//add new Shots
function Bp_AddShots(selShots) {

    //create the progress bar window
    var w = new Window("palette");
    var progressBar = w.add("progressbar", undefined, 1, selShots.length);
    progressBar.preferredSize = [300, 20];
    w.show();

    for (var i = 0; i < selShots.length; i++) {

        //get the shot name
        var ShotNo = selShots[i].text;
        //find the folder path
        var tmp = projFldr.getFiles('*');

        for (var j = 0; j < tmp.length; j++) {

            var tmpStr = tmp[j].displayName.toString();
            if (tmpStr == ShotNo) {

                break;

            }

        }
        //create the project folders
        var ShotFolder = myItemCollection.addFolder(ShotNo);
        var CompFolder = myItemCollection.addFolder('Comp');
        var InputFolder = myItemCollection.addFolder('Input');
        var RefFolder = myItemCollection.addFolder('Ref');
        //Parent the folders
        CompFolder.parentFolder = ShotFolder;
        InputFolder.parentFolder = ShotFolder;
        RefFolder.parentFolder = ShotFolder;

        //import the image sequences
        SmartImport(tmp[j], InputFolder);
        //setting the comp length to the duration of the footages
        var compL = InputFolder.item(1).duration;
        FullcompDuration += compL;

        var myComp = myItemCollection.addComp((ShotNo + '_comp'), compW, compH, 1, compL, compRate);
        myComp.parentFolder = CompFolder;
        //adding the files in the input Folder to the Shot Comp
        for (var itemNo = 1; itemNo <= InputFolder.numItems; itemNo++) {
            myComp.layers.add(InputFolder.item(itemNo));
        }
        //add the shot Comp to the Final Comp
        FullComp.layers.add(myComp);
        //
        progressBar.value = (progressBar.value) + 1;

    }
    Bp_sequenceComps();
    progressBar.parent.close();
}


//----------Perform Button commands--------------
function Bp_BtnClick(btnType) {
    if (btnType == 1) {
        var opt = confirm('Add New Shot?');
        if (opt) {
            $.writeln('adding shots');
            //import the footage
            var selectedShots = ShotList.selection;
            Bp_AddShots(selectedShots);
        }
    }
    else if (btnType == 2) {
        var opt = confirm('Do you Want to Update?');
        if (opt) {
            $.writeln('adding shots');
            //replace the fooatages
            var selectedShots = ShotList.selection;
            Bp_UpdateShots(selectedShots);
        }
    }
}


//--------------Ui Creation----------------
//create a pallete window
var mywin = new Window('palette', 'Shot Creator');
mywin.orientation = 'row';
//LIST BOX Group
var listBxGrp = mywin.add('group');
//select the folder
var projFldr = Folder.selectDialog();
//get the folder contents
var ShotNames = Bp_FolderContent('folder', projFldr);
var shotItems = new Array();
//create list items from the folder content
for (var i = 0; i < ShotNames.length; i++) {
    shotItems.push(ShotNames[i].displayName.toString());
}
//sort the elements
shotItems.sort();
//add the list Box
var ShotList = listBxGrp.add('listbox', undefined, shotItems, { multiselect: true });
//BUTTON GROUP
var BtnGrp = mywin.add('group');
BtnGrp.orientation = 'column';
var addBtn = BtnGrp.add('button', undefined, 'Add');
var updateBtn = BtnGrp.add('button', undefined, 'Update');
mywin.show();

//button Commands
addBtn.onClick = function () { Bp_BtnClick(1); };
updateBtn.onClick = function () { Bp_BtnClick(2); };
//------------------UiEnd-----------------


//-------------------After Effects project ----------------------
{
    // create undo group
    app.beginUndoGroup("Create shot Folders");

    // create project if necessary
    var proj = app.project;
    if (!proj) proj = app.newProject();

    //create Items object for the project
    var myItemCollection = app.project.items;

    //create the final comp and move to the Comp Folder
    var FullCompFolder = myItemCollection.addFolder("Full_Comp");
    var FullcompDuration = 0;
    var compW = 1920;
    var compH = 1080;
    var compRate = 25;
    var FullComp = myItemCollection.addComp("Final_comp", compW, compH, 1, compL, compRate);
    FullComp.parentFolder = FullCompFolder;

    app.endUndoGroup();
}
