


var tableField = document.getElementById("divTable");

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

var tableString = "<table border=\"1\">";

for(rowCount = 0; rowCount < responseByRow.length; rowCount++){
	tableString = tableString + "<tr>";
	for(colCount = 0; colCount<8; colCount++){
		tableString = tableString + "<th>" + departures[rowCount][colCount] + "</th>";
	}
	tableString = tableString + "</tr>";
}

tableString = tableString + "</table>";






tableField.innerHTML = tableString;


//"<table border=\"1\"><tr><th>Firstname</th><th>Lastname</th><th>Age</th></tr></table>"



//textField.innerHTML = responseByRow.length;

//var temp = responseByRow[0].split(',');
//for(i=0;i<8;i++){
//alert(departures[0][i]);
//}

