/*
    Create folders within the AE project window.

    Author:B.Prethish

*/
{
    // create undo group
    app.beginUndoGroup("Create Text Layers From File");

    // create project if necessary
    var proj = app.project;
    if (!proj) proj = app.newProject();
    //Accept the User Input
    var ShotNo = prompt('Enter the Comp Name', 'Name', ' Deepu\'s Shot Creator');
    //ShotNo=('Shot_'+ShotNo);
    //create the Folder structure
    var myItemCollection = app.project.items;

    var ShotFolder = myItemCollection.addFolder(ShotNo);
    var CompFolder = myItemCollection.addFolder('Comp');
    var InputFolder = myItemCollection.addFolder('Input');
    var RefFolder = myItemCollection.addFolder('Ref');
    //parent the folders
    CompFolder.parentFolder = ShotFolder;
    InputFolder.parentFolder = ShotFolder;
    RefFolder.parentFolder = ShotFolder;

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