/*
    3D output  Folder Oraganizer V1.0
    software Version:cs5
    notes:
    The script will automatically import 3d render passes and organize it in the project window;
    Right now the script is dumb,in the sense it does have error or debug capabilties.

    Author:B.Prethish

*/
//returns  child folders/Files(0 for files,1 for folders)
function Bp_FolderContent(retType, MainFldr) {
    var ChildFldrs = new Array();
    var ChildFiles = new Array();

    //get the children files in the selected folder
    var files = MainFldr.getFiles('*');
    //filter out the files
    for (var i = 0; i < files.length; i++)
        if (files[i] instanceof File)
            ChildFiles[ChildFiles.length] = files[i];
        else
            ChildFldrs[ChildFldrs.length] = files[i];

    if (retType)
        return ChildFldrs;
    else
        return ChildFiles;
}

{
    // create undo group
    app.beginUndoGroup("Create Text Layers From File");

    // create project if necessary
    var proj = app.project;
    if (!proj) proj = app.newProject();
    //Accept the User Input
    var ShotNo = prompt('Enter the Comp Name', 'Name', ' 3D Shot Creator');

    //create Items object for the project
    var myItemCollection = app.project.items;

    //create the main folders
    var ShotFolder = myItemCollection.addFolder(ShotNo);
    var CompFolder = myItemCollection.addFolder('Comp');
    var InputFolder = myItemCollection.addFolder('Input');
    var RefFolder = myItemCollection.addFolder('Ref');
    //Parent the folders
    CompFolder.parentFolder = ShotFolder;
    InputFolder.parentFolder = ShotFolder;
    RefFolder.parentFolder = ShotFolder;

    //get the list of folders inside the main folder
    var MainFldr = Folder.selectDialog();
    var flders = Bp_FolderContent(1, MainFldr);

    for (var i = 0; i < flders.length; i++) {

        var files = Bp_FolderContent(0, flders[i]);
        //sort the image sequence and get the first file Name

        //Import the sequence
        var ImportSeq = new ImportOptions();
        ImportSeq.file = new File(files[1].fullName);
        ImportSeq.sequence = true;
        var seqF = proj.importFile(ImportSeq);


        //get the name of the Parent folder
        var tmpStr = flders[i].displayName.toString();
        //Rename the sequence with the Name of the Parent Folder
        seqF.name = tmpStr;
        //parent it under the Input folder
        seqF.parentFolder = InputFolder;
    }

    //create the comp and move to the Comp Folder
    var compW = 1920; // comp width
    var compH = 1080; // comp height
    var compL = 15; // comp length (seconds)
    var compRate = 25; // comp frame rate
    var compBG = [48 / 255, 63 / 255, 84 / 255] // comp background color

    var myComp = myItemCollection.addComp(ShotNo, compW, compH, 1, compL, compRate);
    myComp.bgColor = compBG;
    myComp.parentFolder = CompFolder;
    app.endUndoGroup();
}
