/*
/ Tyler McCabe
/ Live Commuter Rail Web-App
/ TMTA.js
/ 9-29-2016
/ tyler@neurlex.com
/ Neurlex.com/Testing/TMTA 
*/




var tableField = document.getElementById("divTable");  //Bind objects from the DOM to local JS objects
var subButton = document.getElementById("subButton");
var station = document.getElementById("stationSelect");
var dateField = document.getElementById("date");



dateField.innerHTML = new Date(); //Print current date and time on header


subButton.addEventListener("click", displayTable);  //Wait for user interaction



var request = new XMLHttpRequest();		//AJAX request to pull data from php server
request.open('GET','getTrains.php', false);
request.send();

//console.log(request.responseText);  //Debug message



var responseByRow = request.responseText.split('\n'); //Cut the response into rows of information





var departures = new Array(responseByRow.length); //Instantiate a 2d array to hold the row level data



for(rowCount=0; rowCount < responseByRow.length; rowCount++){  
	departures[rowCount] = new Array(8) 				//Create new 8 element arrays within the departures array
	departures[rowCount] = responseByRow[rowCount].split(',');      //Insert the column level data into the 2d array, creating a matrix or table like data structure
}


//////Date Conversion from Unix Time to Standard Date/////////
for(rowCount=1; rowCount < responseByRow.length; rowCount++){	//Convert the pesky Unix time-stamps to human readable form
	departures[rowCount][0] = new Date( departures[rowCount][0] *1000 );
	departures[rowCount][4] = new Date( departures[rowCount][4] *1000 );
}
/////////////////



function displayTable(){  //The main function to create the output data table


var tableString = "<table class=\"table table-bordered\" align=\"center\" border=\"1\">"; //The goal of the next set of loops is to create a final string of HTML to be sent to the DOM to 
											  // be rendered

for(rowCount = 0; (rowCount < responseByRow.length); rowCount++){

	if(departures[rowCount][1] == undefined){break;} //Removes unwanted data

	if( ((departures[rowCount][1].replace('"','')).replace('"','') == station.value)   || rowCount == 0 ){ //Forces the header row to always be included, and picks north or south
		

	tableString = tableString + "<tr>";
	for(colCount = 0; colCount<8; colCount++){    // Concatination to assemble the proper HTML for the table
		if(rowCount==0){
			tableString = tableString + "<th><i>" + departures[rowCount][colCount] + "</i></th>";
		}
	

		else if( colCount == 0 || colCount == 4){
			tableString = tableString + "<th>" + departures[rowCount][colCount] + "</th>";
		}
		else{
			tableString = tableString + "<th>" + (departures[rowCount][colCount].replace('"','')).replace('"','') + "</th>"; //The replace method purges unwanted characters
		}
	}

	tableString = tableString + "</tr>";

	}
}

tableString = tableString + "</table>";






tableField.innerHTML = tableString;  //Print the final table to the DOM

} //End Display Table Function



