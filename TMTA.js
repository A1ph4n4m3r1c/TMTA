


var tableField = document.getElementById("divTable");
var subButton = document.getElementById("subButton");
var station = document.getElementById("stationSelect");

subButton.addEventListener("click", displayTable);



var request = new XMLHttpRequest();
request.open('GET','getTrains.php', false);
request.send();

console.log(request.responseText);



var responseByRow = request.responseText.split('\n');





var departures = new Array(responseByRow.length);



for(rowCount=0; rowCount < responseByRow.length; rowCount++){
	departures[rowCount] = new Array(8)
	departures[rowCount] = responseByRow[rowCount].split(',');
}


//////Date Conversion from Unix Time to Standard Date/////////
for(rowCount=1; rowCount < responseByRow.length; rowCount++){
	departures[rowCount][0] = new Date( departures[rowCount][0] *1000 );
	departures[rowCount][4] = new Date( departures[rowCount][4] *1000 );
}
/////////////////



function displayTable(){


var tableString = "<table align=\"center\" border=\"1\">";

for(rowCount = 0; (rowCount < responseByRow.length); rowCount++){

	if(departures[rowCount][1] == undefined){break;}

	if( ((departures[rowCount][1].replace('"','')).replace('"','') == station.value)   || rowCount == 0 ){
		

	tableString = tableString + "<tr>";
	for(colCount = 0; colCount<8; colCount++){
		if(rowCount==0){
			tableString = tableString + "<th><i>" + departures[rowCount][colCount] + "</i></th>";
		}
	

		else if( colCount == 0 || colCount == 4){
			tableString = tableString + "<th>" + departures[rowCount][colCount] + "</th>";
		}
		else{
			tableString = tableString + "<th>" + (departures[rowCount][colCount].replace('"','')).replace('"','') + "</th>";
		}
	}

	tableString = tableString + "</tr>";

	}
}

tableString = tableString + "</table>";






tableField.innerHTML = tableString;

} //End Display Table Function



