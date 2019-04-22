//search the whole comp for the Name and return the index of the
function Bp_findItem(Item_name) {
    var searcher = new RegExp(Item_name);
    var proj = app.project;
    if (!proj) {

        alert('No Project Selected');
        return 0;

    }
    var Ids = new Array();

    for (var i = 1; i <= proj.numItems; i++) {
        var result = searcher.exec(app.project.item(i).name);
        if (result) {
            $.writeln(app.project.item(i).name);
            Ids[Ids.length] = i;
        }

    }

    $.writeln('found ' + Ids.length + ' occurances');

    return Ids;

}

var output = Bp_findItem('(_comp)$');

