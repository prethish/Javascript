﻿
// Smart Import.jsx(D) Not sure where I download this from :(.

function SmartImport(targetFolder, InputFolder) {
	var scriptName = "Smart Import";

	// Ask the user for a folder whose contents are to be imported.
	//var targetFolder = Folder.selectDialog("Import items from folder...");

	if (targetFolder != null) {
		// If no project open, create a new project to import the files into.
		if (!app.project) {
			app.newProject();
		}

		function processFile(theFile) {
			try {
				// Create a variable containing ImportOptions.
				var importOptions = new ImportOptions(theFile);
				importSafeWithError(importOptions);

			} catch (error) {
				// Ignore errors.
			}
		}

		function testForSequence(files) {
			var searcher = new RegExp("[0-9]+");
			var movieFileSearcher = new RegExp("(mov|avi|mpg)$", "i");
			var parseResults = new Array;

			// Test that we have a sequence. Stop parsing after 10 files.
			for (x = 0; (x < files.length) & x < 10; x++) {
				var movieFileResult = movieFileSearcher.exec(files[x].name);
				if (!movieFileResult) {
					var currentResult = searcher.exec(files[x].name);
					// Regular expressions return null if no match was found.
					// Otherwise, they return an array with the following information:
					// array[0] = the matched string.
					// array[1..n] = the matched capturing parentheses.

					if (currentResult) { // We have a match -- the string contains numbers.
						// The match of those numbers is stored in the array[1].
						// Take that number and save it into parseResults.
						parseResults[parseResults.length] = currentResult[0];
					} else {
						parseResults[parseResults.length] = null;
					}
				} else {
					parseResults[parseResults.length] = null;
				}
			}

			// If all the files we just went through have a number in their file names,
			// assume they are part of a sequence and return the first file.

			var result = null;
			for (i = 0; i < parseResults.length; ++i) {
				if (parseResults[i]) {
					if (!result) {
						result = files[i];
					}
				} else {
					// In this case, a file name did not contain a number.
					result = null;
					break;
				}
			}

			return result;
		}


		function importSafeWithError(importOptions) {
			try {
				var footage = app.project.importFile(importOptions);
				footage.parentFolder = InputFolder;
				footage.name = importOptions.file.parent.displayName.toString();
			} catch (error) {
				alert(error.toString() + importOptions.file.fsName, scriptName);
			}
		}


		function processFolder(theFolder) {
			// Get an array of files in the target folder.
			var files = theFolder.getFiles();

			// Test whether theFolder contains a sequence.
			var sequenceStartFile = testForSequence(files);

			// If it does contain a sequence, import the sequence,
			if (sequenceStartFile) {
				try {
					// Create a variable containing ImportOptions.
					var importOptions = new ImportOptions(sequenceStartFile);

					importOptions.sequence = true;
					// importOptions.forceAlphabetical = true;		// Un-comment this if you want to force alpha order by default.
					importSafeWithError(importOptions);
				} catch (error) {
				}
			}

			// Otherwise, import the files and recurse.

			for (index in files) { // Go through the array and set each element to singleFile, then run the following.
				if (files[index] instanceof File) {
					if (!sequenceStartFile) { // If file is already part of a sequence, don't import it individually.
						processFile(files[index]); // Calls the processFile function above.
					}
				}
				if (files[index] instanceof Folder) {
					processFolder(files[index]); // recursion
				}
			}
		}

		// Recursively examine that folder.
		processFolder(targetFolder);
	}
}




