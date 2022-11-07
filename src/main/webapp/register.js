
function checkCredentials(){
	var credentials = ppp.ifExistsAKTLocal("u5");
	console.log("15 credentials=" + credentials + "||");
	if(!credentials){   // *****  KA has been stored today
		document.getElementById("initial").style.display='none';
		document.getElementById("login").style.display='table-row';
		document.getElementById("header").style.display='none';
		console.log("667 credentials=" + credentials);
	} else {
		document.getElementById("initial").style.display='none';
		document.getElementById("login").style.display='none';
		document.getElementById("header").style.display='table-row';
	}
}

