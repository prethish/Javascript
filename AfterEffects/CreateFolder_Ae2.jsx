//returns the children of the folder selected
function Bp_FolderContent() {
        write('--------------Start Script------------------');
        //select the folder
        var Fld = Folder.selectDialog();
        //get the children files in the selected folder
        var files = Fld.getFiles('*');
        return files;
}

{
        // create undo group
        app.beginUndoGroup("Create Text Layers From File");

        // create project if necessary
        var proj = app.project;
        if (!proj) proj = app.newProject();
        //Accept the User Input
        var ShotNo = prompt('Enter the Comp Name', 'Name', ' Deepu\'s Shot Creator');

        //ShotNo=('Shot_'+ShotNo);
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
        var flders = Bp_FolderContent();
        for (var i = 0; i < flders.length; i++) {
                //get only the name of the folder instead of the full path
                var tmpStr = flders[i].displayName.toString();
                //create the folder with the name and parent it under the main folder
                var CompFolder = myItemCollection.addFolder(tmpStr);
                CompFolder.parentFolder = InputFolder;
        }
        //parent the folders
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
