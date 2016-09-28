


var textField = document.getElementById("paraText");

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

//var temp = responseByRow[0].split(',');
//for(i=0;i<8;i++){
//alert(departures[0][i]);
//}


//textField.innerHTML = responseByRow.length;

