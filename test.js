


var textField = document.getElementById("paraText");

var request = new XMLHttpRequest();
request.open('GET','getTrains.php', false);
request.send();

console.log(request.responseText);



var responseSplit = request.responseText.split('\n');

textField.innerHTML = responseSplit[0];
