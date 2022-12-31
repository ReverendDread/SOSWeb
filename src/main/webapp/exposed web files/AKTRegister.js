  function makeRegisterTable(){
//	var contactTable= '<form id="frmcontact" name="contact"><br>';
	var html=`
   <div id="frmReturn">
    <p id="valueRet" name="valueRet"></p>
   </div>
   
<div id="preInitial">
     <p id="title">Version 1.5.01</p>
     <form name="frmSave" id="savefrm"   >
     <table id="topSave">
        <tr><td colspan="2"><b>Initial Ping</b></td></tr> 
        <tr><td>pb</td><td>    <span id="pb"></span></td></tr> 
        <tr><td>pbhex</td><td> <span id="pbhex"></span></td></tr> 
        <tr><td>pbu5B64</td><td>  <span id="pbu5B64"></span></td></tr> 
        <tr><td>pbcomp</td><td>  <span id="pbcomp"></span></td></tr>
        <tr><td colspan="2"><b>Register final</b></td></tr> 
        <tr><td>pb</td><td>    <span id="pb2"></span></td></tr> 
        <tr><td>pbhex</td><td> <span id="pbhex2"></span></td></tr> 
        <tr><td>pbu5B64</td><td>  <span id="pbu5B642"></span></td></tr>
     	</table> 

   	<br><br>
    </form>
</div>


   <div id="Initial">
     <p id="title">Enter your email address and phone number</p>
     <table id="topForm">
      <form id="frmping03"   >
        <tr><td>Email Address</td><td> <input type="text" id="email03" name="email03"></td></tr> 
		  <tr><td>Phone Number</td><td> <input type="text" id="phone03" name="phone03"></td></tr>
         <input type="hidden" name="AKTRequestID" value="AKTPPP03">
	   	<input type="hidden" id="ping03" name="ping03" value=""> 
         <input type="hidden" id = "server03" name="server03"   value="">
         <input type="hidden" id = "socket03" name="socket03"   value="">
         <input type="hidden" id = "pppcheck03" name="pppcheck03"   value="pppDecrypt">
         <input type="hidden" id = "SecLevel" name="SecLevel" value="10">         
   	  <tr><td colspan="2"><input id="RegisterBTN" type="button" value="Register" onclick="AKTPPP03();"></td></tr>
   	</table>
      </form>
   </div>

  <form name="frmregister" id="frmregister">
     <div id="Credentials">
     <div id="CredentialPart">
     <p id="title">Please fill in the form to register</p>
     <Table name="RegTable">
      <input type="hidden" id="Cell">
      <input type="hidden" id="Email">
      <TR><TD class="alt"><span id="Cellx" style="label">Cell Number:</span></TD><TD><span id="ShowCell"></span></td></tr>
      <TR><TD class="alt"><span id="Emailx" style="label">Email Address:</span></TD><TD><span id="ShowEmail"></span></td></tr>
      <TR><TD class="alt"><label for="Username" style="label">Username:</label></TD><TD><input type="text" id="username"></td></tr>
      <TR><TD class="alt"><label for="pass1" style="label">Password:</label></TD><TD><input type="password" id="pass1"></td></tr>
      <TR><TD class="alt"><label for="pass2" style="label">Retype Password:</label></TD>
      <TD><input type="password" id="pass2" onkeyup="CheckPW()"><span id="confirmMessage" class="confirmMessage"></span></td></tr>
     </table>
 	</div>
     <div id="QuestionPart">
     <table name="regQ">
      <TR><TD class="alt"><label for="Q1SQ" style="label">Security Question:</label></TD><TD><select id="Q1">
       <option id="SASQ1"></option>
       <option id="Q1a1"></option>
       <option id="Q1a2"></option>
       <option id="Q1a3"></option>
       <option id="Q1a4"></option>
       <option id="Q1a5"></option>
       <option id="Q1a6"></option>
       <option id="Q1a7"></option>
     </select></td></tr>
     <TR><TD class="alt"><label for="Q1A" style="label">Security Answer:</label></TD>
     <TD><input type="text" id="Q1Answer" onfocus="getQuestions(2, 2)"></td></tr>
     <TR id="Q2Q"><TD class="alt"> <label for="Q2" style="label">Security Question:</label></TD><TD><select id="Q2">
       <option id="SASQ2"></option>
       <option id="Q2a1"></option>
       <option id="Q2a2"></option>
       <option id="Q2a3"></option>
       <option id="Q2a4"></option>
       <option id="Q2a5"></option>
       <option id="Q2a6"></option>
       <option id="Q2a7"></option>
     </select></td></tr>
     <TR id="Q2A"><TD class="alt"><label for="Q2A" style="label">Security Answer:</label></TD>
     <TD><input type="text" id="Q2Answer" onfocus="showSubmit()"></td></tr>
    </table>
    </div>

     <div id="submitIt">
     <table name="butQ">
     <TR id="submitItbut"><TD class="alt"><a "registerFinal07();"> </a></td></tr> 
	<input type="button" id = "regFinal" value="Finalize Registration Here" onclick="registerFinal07();"><br><br>
       <input type="hidden" id = "qact" name="qact" value="0">
    </table>
    </div>
    </div>
   </form>


 <form id="frmreg01">
    <input type="hidden" name="AKTRequestID" value="AKTReg01">
    <input type="hidden" id = "server07" name="server07"   value="">
    <input type="hidden" id = "socket07" name="socket07"   value="">
	<input type="hidden" id="pbu507" name="pbu507" value=""> 
	<input type="hidden" id="pb5k07" name="pb5k07" value=""> 
	<input type="hidden" id="uppreInitialkey07" name="upkey07" value=""> 
	<input type="hidden" id="upkeyhash07" name="upkeyhash07" value=""> 
	<input type="hidden" id="u507" name="u507" value=""> 
	<input type="hidden" id="k507" name="k507" value=""> 
	<input type="hidden" id="ka07" name="ka07" value=""> 
	<input type="hidden" id="ks07" name="ks07" value=""> 
	<input type="hidden" id="kfn07" name="kfn07" value=""> 
	<input type="hidden" id="q107" name="q107" value=""> 
	<input type="hidden" id="q207" name="q207" value=""> 
	<input type="hidden" id="email07" name="email07" value=""> 
	<input type="hidden" id="phone07" name="phone07" value=""> 
	<input type="hidden" id="first07" name="first07" value=""> 
	<input type="hidden" id="last07" name="last07" value=""> 
	<input type="hidden" id="u07" name="u07" value=""> 
	<input type="hidden" id="p07" name="p07" value=""> 
	<input type="hidden" id="an107" name="an107" value=""> 
	<input type="hidden" id="an207" name="an207" value=""> 
	<input type="hidden" id="psk07" name="psk07" value=""> 
	<input type="hidden" id="kppp07" name="kppp07" value=""> 
   	<input type="hidden" id = "security" name="security" value="1">
	</form>
<!--   </div> --> 
   
   <Div id="Complete">
   <h1>Registration was completed</h1>
 <!--   <p> Please close the browser and restart ZecureiT.  </p>--> 
   

   <p>Thank you for registering with ShieldME365! <br>If you already have the application, close the browser and start using the application, otherwise, you can go to <a href="http://www.shieldme365.com/products.php">ShieldME365 website</a> to download the apps to begin using the secure system.<br><BR>
   When you first install an app it will ask you to Login. Enter the username and password you just created. 
   <br><br>
   Please check back with the website often to see what new apps, or existing apps that have been ported to new Operating Systems, have been uploaded to the system. If you have an app or and idea you want to see us build for the ShieldME365 community, please send your request to apps@shieldme365.com
   </p>
 
   </div>
<!-- </div> -->

<form id="frmping01"   >
      <input type="hidden" name="AKTRequestID" value="AKTPPP01">
	  <input type="hidden" id="ping01"  name="ping01"   value=""> 
      <input type="hidden" id ="server01" name="server01"   value="">
      <input type="hidden" id ="socket01" name="socket01"   value="">
</form>

<form name="frmPong" id="pongfrm"   >
		<input type="hidden" id="pong" name="pong" value=""><p id="PongValue"></p><br>  
		<input type="hidden" id="kppp" name="kppp" value=""><p id="KpppValue"></p>  <br>

</form>

<form name="frmStore" id="storefrm"   >
		<input type="hidden" id="emailg" name="emailg" value="">  
		<input type="hidden" id="phoneg" name="phoneg" value="">  
		<input type="hidden" id="decrypted" name="decrypted" value=""> 
		<input type="hidden" id="userg" name="userg" value=""> 
		<input type="hidden" id="passg" name="passg" value=""> 
		<input type="hidden" id="replicate" name="replicate" value="false"> 
		<input type="hidden" id="dualreg" name="dualreg" value="false"> 
</form>
		`;
		document.getElementById('registerDiv').innerHTML = html;
		document.getElementById('preInitial').style.display='none';
		document.getElementById('Credentials').style.display='none';
		document.getElementById('CredentialPart').style.display='none';
		document.getElementById('QuestionPart').style.display='none';
		document.getElementById('Complete').style.display='none';
		document.getElementById('Q2Q').style.display='none';
		document.getElementById('Q2A').style.display='none';
		document.getElementById('submitIt').style.display='none';

  }
  
  function  updateKS(ks, qn1, an1, qn2, an2, server){
	     var upkey  = getRandomKey(32);
	     var upkeyword = "";
	     upkeyword += upkey;
	  	 var bitArray   = sjcl.hash.sha256.hash(upkeyword); // ***** bitData is an object
	  	 var hashHex = sjcl.codec.hex.fromBits(bitArray);
	  	 var upkeyhash = AKTSha256.fromHex(hashHex);
		 var pbu5 =	ppp.getAKTLocal("pbu5");
		 var pb5k =	ppp.getAKTLocal("pb5k");
		 var pbu5B64 				= AKTBase64.encode(pbu5);
		 var aesAKT               	= new AKTaes();
		 aesAKT.setEDC(true);
		 aesAKT.initialize(pb5k);
		 var encqn1            		= aesAKT.encryptText(qn1);
		 var encqn2            		= aesAKT.encryptText(qn2);
		 var encqa1            		= aesAKT.encryptText(an1);
		 var encqa2            		= aesAKT.encryptText(an2);
		 var encup 					= aesAKT.encryptText(upkey);
		 var encupb64				= aesAKT.encryptText(upkeyhash);
		 var encks 					= aesAKT.encryptText(ks);
		 document.getElementById("pbu512").value       		= pbu5B64;
		 document.getElementById("q112").value       		= encqn1;
		 document.getElementById("q212").value       		= encqn2;
		 document.getElementById("an112").value       		= encqa1;
		 document.getElementById("an212").value       		= encqa2;
		 document.getElementById("ks12").value       		= encks;
		 document.getElementById("upkey12").value      		= encup;
		 document.getElementById("upkeyhash12").value   	= encupb64;
		 if(server == "local"){
			 document.getElementById("server12").value      = ppp.getAKTLocal("local");
			 document.getElementById("socket12").value      = ppp.getAKTLocal("localsocket");
		 } else {
			 document.getElementById("server12").value      = ppp.getAKTLocal("global");
			 document.getElementById("socket12").value      = ppp.getAKTLocal("globalsocket");
		 }
			$.ajax({
				type : "POST",
				url : "/AKTServer/signup",
//				url : "/AKTLawyer/replicate",
				dataType : "json",
				data : $('#frmfinalfix').serialize(),

			//
			// *****  we are going to get back the action, PONG (or ERROR)
//						
				success : function(response) {
				console.log("39 response=" + JSON.stringify(response));
				var error = response.error;
				var action = response.AKTRequestID;
				var akt=response.akt;
			    getReturnVars(akt);
				}
			});
	/*    	
	    	Send:	AKTRequestID=UPDATEUSERPERSONALINFO|PBU5=pbU5B64| 
	    	QN1=Q1|QN2=Q2|KS=ks|UPKEY=up|UPKEYH=uh| 
	    	Optionally append AN1=a1ïƒ pb5k |AN2=a2ïƒ pb5k| to store the actual answers
	    	frmfinalfix
	         <input type="hidden" id="AKTRequestID" name="AKTRequestID" value="UPDATEUSERPERSONALINFO">
			 <input type="hidden" id="pbu512" name="pbu512" value=""> 
			 <input type="hidden" id="q112" name="q112" value=""> 
			 <input type="hidden" id="q212" name="q212" value=""> 
			 <input type="hidden" id="ks12" name="ks12" value=""> 
			 <input type="hidden" id="upkey12" name="upkey12" value=""> 
			 <input type="hidden" id="upkeyhash12" name="upkeyhash12" value=""> 
			 <input type="hidden" id = "an112" name="an112" value=""> 
			 <input type="hidden" id = "an212" name="an212" value=""> 
	 */  	
	    }
	 
	function FixKS(){
		var emailRaw        = document.getElementById("email10").value;
		var email           = emailRaw.toLowerCase();
		var user 			= document.getElementById("user10").value;
		var pass 			= document.getElementById("pass10").value;
		var fn05 			= document.getElementById("fn05").value;
		 var cm             = AKTCM;
		 var k5             = cm.makeK5(user, pass);
		 var u5             = cm.makeU5(user);
		 var u5B64          = AKTBase64.encode(u5);
		 var k5B64          = AKTBase64.encode(k5); 
		 console.log("12 FixKS u5, k5=" + u5B64 + ", " + k5B64);
		 var pppdec 		= document.getElementById("pppcheck05").value;
		 var pppU5          = ppp.pingUserData(u5);
		 var pppFn          = ppp.pingUserData(fn05);
		 var pppCheck       = ppp.pingUserData(pppdec);
		 var localpong            = ppp.getAKTLocal("localping");        
		 var pingToLocal          = ppp.secondPing(localpong);  // *****  compute the final ping
		 document.getElementById("u505").value       		= pppU5;
		 document.getElementById("fn05").value       		= pppFn;
		 document.getElementById("ping05").value  			= pingToLocal;
		 document.getElementById("pppcheck05").value  		= pppCheck;
		 document.getElementById("server05").value  		= ppp.getAKTLocal("local");
		 document.getElementById("socket05").value  		= ppp.getAKTLocal("localsocket");
		 x=validateForm(email);
		 if(x==true) {
			$.ajax({
				type : "POST",
				url : "/AKTServer/signup",
//				url : "/AKTLawyer/replicate",
				dataType : "json",
				data : $('#getkcForm').serialize(),

			//
			// *****  we are going to get back the action, PONG (or ERROR)
//						
				success : function(response) {
				console.log("39 response=" + JSON.stringify(response));
				var error = response.error;
				var action = response.AKTRequestID;
				var akt=response.akt;
			    getReturnVars(akt);
	//
	// *****  if we find an error, we need to process it
	//
				if(error != null)
				{
					processError(error);
			        var email = localStorage.getItem("email");
			        document.getElementById("email05").value     = email;
			        document.getElementById("pppcheck05").value  = "pppDecrypt";
				}
				else		// *****  there was no error, process the return
				{
					var pong 									= response.pong;
			        var decrypted          						= ppp.decryptUserData(pong);
			        document.getElementById("decrypted").value  = decrypted;
			        document.getElementById("ka").value  		= decrypted;
					console.log("118 decrypted=" + decrypted);
					//
					// ***** now get pbU5, pb5K and get the questions
					//
					console.log("76 u=" + user + " pass=" + pass);
					ppp.setAKTLocal("pb", pb);
					var pb 			= getPBfromKA(decrypted, user, pass);
				    var hexpb 		= AKT.HEXFormat(pb);
					console.log("78 pb=" + hexpb);
					var pbrev 		= reverse(pb);
				    var pbB64     	= AKTBase64.encode(pb); 
				    var hexu5 		= AKT.HEXFormat(u5);
				    var hexk5 		= AKT.HEXFormat(k5);
				    var hexnorm 	= AKT.HEXFormat(pb);
				    var hexrev 		= AKT.HEXFormat(pbrev);
				    sha256     		= AKTSha256;
				    var pbu5   		= AKTSha1.GetHash(pb);		// *****  pbu5 is sha1 to be consistent with u5
				    var pbu5B64 	= AKTBase64.encode(pbu5);
				    var revWord 	= "";
				    revWord 		+= pbrev;
				    var bitArray   	= sjcl.hash.sha256.hash(revWord);
				    var pb5kHex    	= sjcl.codec.hex.fromBits(bitArray); 
				    var pb5k		= AKTSha256.fromHex(pb5kHex);
					ppp.setAKTLocal("pbu5", pbu5);
					ppp.setAKTLocal("pb5k", pb5k);
				    var pb5kB64 	= AKTBase64.encode(pb5k);
			        document.getElementById("pbu511").value  		= pbu5B64;
			   	    document.getElementById("server11").value  		= ppp.getAKTLocal("local");
				    document.getElementById("socket11").value  		= ppp.getAKTLocal("localsocket");
					$.ajax({
						type : "POST",
						url : "/AKTServer/signup",
//						url : "/AKTLawyer/replicate",
						dataType : "json",
						data : $('#frmnewquestions').serialize(),
						success : function(response) {
							console.log("93 response=" + JSON.stringify(response));
							var akt = response.akt;
							console.log("95 AKTRequestID=" + akt[0]);
						    getReturnVars(akt);
							if(akt[0].includes("AKTServerError")){
								
							} else {
								var i = akt[1].indexOf("=");
								var right = akt[1].substring(i+1);
							    var aesAKT               = new AKTaes();
							    aesAKT.setEDC(true);
							    aesAKT.initialize(pb5k);
							    var questions            = aesAKT.decryptText(right);
								console.log("106 questions=" + questions);
								getQuestions(1, questions);
						        document.getElementById("CredentialPart").style.display='none';
						        document.getElementById("regFinal").value="Finalize Fix";
							}
						}
					});
					
	//
	// *****  we are going to get back the action, PONG (or ERROR)
//								
					
		/*
		 Client:
	Send: 	|AKTRequestID=GETSECURITYQUESTIONS|PBU5=pbU5B64| 

	SVS Server:
	Send:	|AKTRequestID=GETSECURITYQUESTIONS|SECURITYQUESTIONS=Q| 
	Where: Q is the list of 7 security questions, text-encrypted with the PB5K.  Each question is of the form 'QuestionID=Question text' and are separated by vertical bars '|'. 
	- or -
	|AKTRequestID=AKTServerError|ERROR=N|ERRORMSG=S| if any errors are encountered. 

					 */
					
					
				    document.getElementById("FixKS").style.display='none';
				    document.getElementById("Credentials").style.display='table-row';
				    document.getElementById("CredentialPart").style.display='table-row';
				    document.getElementById("QuestionPart").style.display='table-row';
					}
				}
			});
		}
		else {
			alert("Please enter a valid email address");
			return false;
		}
	}

	function signup(){

//		 
	//*****  first, set up the return variables	    
	//
	var globalpong           = ppp.getAKTLocal("globalping");       
	var pingToGlobal         = ppp.secondPing(globalpong);  // *****  compute the final ping
	var localpong            = ppp.getAKTLocal("localping");        
	var pingToLocal          = ppp.secondPing(localpong);  // *****  compute the final ping
	var localkppp			= document.getElementById("localkppp06").value; 
	var globalkppp			= document.getElementById("globalkppp06").value; 
	document.getElementById('globalserver06').value = ppp.getAKTLocal("global");
	document.getElementById('localserver06').value  = ppp.getAKTLocal("local");
	document.getElementById('globalsocket06').value = ppp.getAKTLocal("globalsocket");
	document.getElementById('localsocket06').value  = ppp.getAKTLocal("localsocket");
	var emailRaw           = document.getElementById("email06").value;
	var email              = emailRaw.toLowerCase();
	var phone              = document.getElementById("phone06").value;
	var pppdec             = document.getElementById("pppcheck06").value;
	var pppeMail           = ppp.pingUserData(email);
	var pppPhone           = ppp.pingUserData(phone);
	var pppCheck           = ppp.pingUserData(pppdec);
	document.getElementById("email06").value     = pppeMail;
	document.getElementById("phone06").value     = pppPhone;
	//localStorage.setItem("email", email);                  // *****  save email for later
	//localStorage.setItem("phone", phone);                  // *****  save phone for later
	ppp.setAKTLocal("email", email);                  // *****  save email for later
	ppp.setAKTLocal("phone", phone);                  // *****  save phone for later
	document.getElementById("emailg").value      	= email;  
	document.getElementById("phoneg").value      	= phone;  
	//document.getElementById("ping03").value      	= pingTo;
	document.getElementById("globalping06").value  	= pingToGlobal;
	document.getElementById("localping06").value   	= pingToLocal;
	document.getElementById("globalkppp06").value  	= pingToGlobal;
	document.getElementById("localkppp06").value   	= pingToLocal;
	document.getElementById("pppcheck06").value  	= pppCheck;
	document.getElementById("dualreg").value  		= "true";
	//document.getElementById("SecLevel") = parent.document.getElementById("SecLevel").value;
	// Email Address is good. Check if already registered
	x=validateForm(email);
	if(x==true) {
		$.ajax({
			type : "POST",
			url : "/AKTServer/signup",
			dataType : "json",
			data : $('#frmsignup').serialize(),
	//
	//*****  we are going to get back the action, PONG (or ERROR), KPPP (if not error)
//			
			success : function(response) {
				console.log("341 response=" + JSON.stringify(response));
				var error = response.error;
				console.log("50 error=" + error);
	//
	//*****  if we find an error, we need to process it
	//
				if(error != null)
				{
					processError(error);
					document.getElementById("email06").value     = "error";
					document.getElementById("phone06").value     = "error";
					document.getElementById("pppcheck06").value  = "pppDecrypt";
				}
				else
				{
					var globalkppp 		= response.globalKPPP;
					console.log("489 globalkppp=" + globalkppp);
					var localkppp 		= response.localKPPP;
					console.log("491 localkppp=" + localkppp);
					var globalpong 		= response.globalPong;
					console.log("493 globalpong=" + globalpong);
					var localpong		= response.localPong;
					console.log("495 localpong=" + localpong);
					document.getElementById("pong").value       = pong;
	   	        	ppp.setAKTLocal("globalkppp", globalkppp);                  // *****  save KPPP for later
	   	        	ppp.setAKTLocal("localkppp", localkppp);                  // *****  save KPPP for later
	   	        
	   	        	var decrypted          = ppp.decryptUserData(globalpong);
	   	        	var decryptedLocal     = ppp.decryptUserData(localpong);
	   	        	document.getElementById("decrypted").value  = decrypted;
					console.log("505 decryptedGlobal=" + decrypted);
					console.log("505 decryptedLocal =" + decryptedLocal);
	     		    getQuestions(1, decrypted );
	/*     		    
				    document.getElementById("Questions").style.display='none';
				    document.getElementById("Credentials").style.display='table-row';
				    document.getElementById("CredentialPart").style.display='table-row';
				    document.getElementById("QuestionPart").style.display='table-row';
	*/      		    
				}
			}
		});
	}
	else {
		alert("Please enter a valid email address");
		return false;
	}
	}

	function Questions() {
		var a1 = document.getElementById("a1").value; 
		var a2 = document.getElementById("a2").value; 
		var ks = document.getElementById("ks").value;
		var ka = document.getElementById("ka").value;
		var user = document.getElementById("userg").value;
		var pass = document.getElementById("passg").value;
		var pbks = getPBfromKS(ks, a1, a2);
		var pbka = getPBfromKA(ka, user, pass);
	    var hexpbks		 = AKT.HEXFormat(pbks);
	    var hexpbka		 = AKT.HEXFormat(pbka);
		console.log("12 pb ks=" + hexpbks );
		console.log("13 pb ka=" + hexpbka );
		console.log("14 user=" + user + " pass=" + pass );
		console.log("15 ks=" + ks );
		console.log("16 ka=" + ka );
		if(hexpbks == hexpbka){
			  console.log("111 Good to register" );
			  ppp.setAKTLocal("pb", pbka);
			   var emailRaw           = document.getElementById("emailg").value;
			   var email              = emailRaw.toLowerCase();
			   var phone              = document.getElementById("phoneg").value;
			   var pppdec             = document.getElementById("pppcheck09").value;
			   var pppeMail           = ppp.pingUserData(email);
			   var pppPhone           = ppp.pingUserData(phone);
			   var pppCheck           = ppp.pingUserData(pppdec);
	//
	// *****  1. fill up the frmcheckemail form
//			   
			   document.getElementById("email09").value     	= pppeMail;
			   document.getElementById("phone09").value     	= pppPhone;
			   document.getElementById("pppcheck09").value  	= pppCheck;
			   var pingTo	 									= ppp.getAKTLocal("localping");
			   var ping         								= ppp.secondPing(pingTo);  // *****  compute the final ping
			   document.getElementById("ping09").value  		= ping;
			   document.getElementById('server09').value  		= ppp.getAKTLocal("local");		
			   document.getElementById('socket09').value  		= ppp.getAKTLocal("localsocket");
			   ppp.setAKTLocal("server", ppp.getAKTLocal("local"));
			   ppp.setAKTLocal("email", emailRaw);
			   // Email Address is good. Check if already registered
			   x=validateForm(email);
			     if(x==true) {
					$.ajax({
						type : "POST",
						url : "/AKTServer/signup",
						dataType : "json",
						data : $('#frmcheckemail').serialize(),
	//
	// *****  we are going to get back the action, PONG (or ERROR), KPPP (if not error)
//						
						success : function(response) {
							console.log("144 response=" + JSON.stringify(response));
							var error = response.error;
							if(error != null){
								console.log("147 error=" + error);
								 processError(error);							
								    document.getElementById("frmReturn").style.display='table-row';
								    document.getElementById("Credentials").style.display='none';
								    document.getElementById("CredentialPart").style.display='none';
								    document.getElementById("QuestionPart").style.display='none';

								    document.getElementById("Questions").style.display='none';
								   							    
							} else {
								var localpong 			= response.pong;
								var localkppp 			= response.kppp;
								ppp.setAKTLocal("localkppp", localkppp);
								console.log("147 kppp=" + localkppp);
								document.getElementById("kppp07").value  = localkppp;  // *****  we must set the kppp for the TO server
								console.log("154 pong=" + localpong);
								var decrypted          = ppp.decryptUserData(localpong);
								document.getElementById("decrypted").value  = decrypted;
								getQuestions(1, decrypted );
								console.log("158 decryptedGlobal=" + decrypted);
								document.getElementById("username").value  		= ppp.getAKTLocal("user");
								document.getElementById("pass1").value  		= ppp.getAKTLocal("pass");
								document.getElementById("pass2").value  		= ppp.getAKTLocal("pass");
							    document.getElementById("Questions").style.display='none';
							    document.getElementById("Credentials").style.display='table-row';
							    document.getElementById("CredentialPart").style.display='table-row';
							    document.getElementById("QuestionPart").style.display='table-row';
							}
						}
					});
				}
					
							
//			2. submit to the TO server
//			3. if no error, then show complete form.
			
		} else {
			  console.log("22 Error somewhere" );	// *****  pb from KA and KS are not the same
		}
	    
	}
	 
	function processError(error){
		if(error == "536870942")
		{
						document.getElementById("valueRet").innerHTML = "email=" + ppp.getAKTLocal("email") + " already used for server=" 
								+ ppp.getAKTLocal("server");
		}
		else if(error == "536870940")
						document.getElementById("valueRet").innerHTML = "input error";
		else if(error == "536870935")
			document.getElementById("valueRet").innerHTML = "server decrypt error";
		else if(error == "536870923")
			document.getElementById("valueRet").innerHTML = "user not found";

		
	}
	function Replicate() {
//					 
	// *****  first, set up the variables for GETKC from the FROM server	    
	//
		 var globalpong           = ppp.getAKTLocal("globalping");        
		 var pingToGlobal         = ppp.secondPing(globalpong);  // *****  compute the final ping
//		 var localpong            = ppp.getAKTLocal("localping");      
//		 var pingToLocal          = ppp.secondPing(localpong);  // *****  compute the final ping
		 console.log("435 globalpong=" + globalpong);
		 document.getElementById('server05').value = ppp.getAKTLocal("global");
		 document.getElementById('socket05').value = ppp.getAKTLocal("globalsocket");
//		 document.getElementById('localserver05').value  = ppp.getAKTLocal("local");
//		 document.getElementById('localsocket05').value  = ppp.getAKTLocal("localsocket");
		 var email05           = document.getElementById("email05").value;
		 var user05            = document.getElementById("user05").value;
		 var pass05            = document.getElementById("pass05").value;
		 var fn05              = document.getElementById("fn05").value;
		 var pppdec            = document.getElementById("pppcheck05").value;
		 ppp.setAKTLocal("user", user05);                  // *****  save username for later
		 ppp.setAKTLocal("pass", pass05);                  // *****  save password for later
		 ppp.setAKTLocal("email", email05);                  // *****  save email for later
		 document.getElementById("userg").value      = user05; // *****  need to store the email, username and password for later
		 document.getElementById("passg").value      = pass05;
		 document.getElementById("emailg").value     = email05;
	//
	// *****  here, we need to compute the user local credentials U5, K5		   
//			   
		 var cm             = AKTCM;
		 var k5             = cm.makeK5(user05, pass05);
		 var u5             = cm.makeU5(user05);
		 var u5B64          = AKTBase64.encode(u5);
		 var k5B64          = AKTBase64.encode(k5); 
		 console.log("459 u5, k5=" + u5B64 + ", " + k5B64);
			   
		 var pppEmail       = ppp.pingUserData(email05);
		 var pppUser        = ppp.pingUserData(user05);
		 var pppPass        = ppp.pingUserData(pass05);
		 var pppU5          = ppp.pingUserData(u5);
		 var pppFn          = ppp.pingUserData(fn05);
		 var pppCheck       = ppp.pingUserData(pppdec);
		 document.getElementById("email05").value    		= pppEmail;
		 document.getElementById("user05").value     		= pppUser;
		 document.getElementById("pass05").value     		= pppPass;
		 document.getElementById("u505").value       		= pppU5;
		 document.getElementById("fn05").value       		= pppFn;
		 document.getElementById("ping05").value  			= pingToGlobal;
//		 document.getElementById("localping05").value   	= pingToLocal;
//		 document.getElementById("globalkppp05").value  	= pingToGlobal;
//		 document.getElementById("kppp05").value   			= pingToLocal;
		 document.getElementById("pppcheck05").value  		= pppCheck;
		 document.getElementById("replicate").value  		= "true";
			//   document.getElementById("SecLevel") = parent.document.getElementById("SecLevel").value;
			// Email Address is good. Check if already registered
		 x=validateForm(email05);
		 if(x==true) {
			$.ajax({
				type : "POST",
				url : "/AKTServer/signup",
//				url : "/AKTLawyer/replicate",
				dataType : "json",
				data : $('#frmreplicate05').serialize(),

			//
			// *****  we are going to get back the action, PONG (or ERROR)
//						
				success : function(response) {
				console.log("493 response=" + JSON.stringify(response));
				var akt=response.akt;
				var l = akt.length;
				var error = response.error;
				for(j=0; j<l; j++){
					if(akt[j] !=null){
						var i     = akt[j].indexOf("=");
						var left  = akt[j].substring(0, i);
						var right = akt[j].substring(i+1);
						console.log("502 left=" + left + " right=" + right);
					}
				}
			//
			// *****  if we find an error, we need to process it
			//
				if(error != null)
				{
					processError(error);
			        var email = localStorage.getItem("email");
			        document.getElementById("email05").value     = email;
			        document.getElementById("pppcheck05").value  = "pppDecrypt";
				}
				else		// *****  there was no error, process the return
				{
					var pong = response.pong;
			        var decrypted          = ppp.decryptUserData(pong);
			        document.getElementById("decrypted").value  = decrypted;
			        document.getElementById("ka").value  		= decrypted;
					console.log("521 decrypted=" + decrypted);
	//
	// *****  Now, we must get the KS from the same server need email, ping, fn
	//	
					document.getElementById("AKTRequestID").value  	= "GR8PPP07";
					$.ajax({
						type : "POST",
							url : "/AKTServer/signup",
//							url : "/AKTLawyer/replicate",
							dataType : "json",
							data : $('#frmreplicate05').serialize(),

	//
	// *****  we are going to get back the action, PONG (or ERROR)
//									
							success : function(response) {
								console.log("537 response=" + JSON.stringify(response));
								var akt=response.akt;
								var l = akt.length;
								var error = response.error;
								if(error == null){
								for(j=0; j<l; j++){
									if(akt[j] !=null){
										var i     = akt[j].indexOf("=");
										var left  = akt[j].substring(0, i);
										var right = akt[j].substring(i+1);
										console.log("547 left=" + left + " right=" + right);
										switch(left){
											case "PONG":
												break;
											case "Q1":
								        	    var Q1 = ppp.decryptUserData(right);
												console.log("553 Q1=" + Q1);
												//
										        // document.getElementById("q1").value  = Q1;
												// document.getElementById("q1Value").write = Q1;
												//
										          document.getElementById("q1Value").innerHTML  = Q1;        
												break;
											case "Q2":
								        	    var Q2 = ppp.decryptUserData(right);
										        //document.getElementById("q2").value  = Q2;
										          document.getElementById("q2Value").innerHTML  = Q2;        
												console.log("564 Q2=" + Q2);
												break;
											case "KS":
								        	    var KS = ppp.decryptUserData(right);
												console.log("568 KS=" + KS);
										        document.getElementById("ks").value  = KS;
												break;
											case "KPPP":
										        document.getElementById("kppp").value  = right;
												break;
												
										}
										document.getElementById("Replicate").style.display='none';
										document.getElementById("Questions").style.display='table-row';
										var questions = getQuestionNumbers(Q1, Q2);
									}
								}
								} else {  // *****  this is the error path
									document.getElementById("user05").value  	= "error";
									document.getElementById("pass05").value  	= "error";
									document.getElementById("email05").value  	= "error";
	   							 	ppp.setAKTLocal("user", "");                  // *****  zero username 
									ppp.setAKTLocal("pass", "");                  // *****  zero password
									ppp.setAKTLocal("email", "");                 // *****  zero email
								}
							}
						});
//			          		    getQuestions(1, decrypted );
			           		    
						}
					}
				});
				}
				else {
					alert("Please enter a valid email address");
					return false;
				}
			 }


	function CheckPW()
	{
	    //Store the password field objects into variables ...
	    var password = document.getElementById('pass1');
	    var pass2 = document.getElementById('pass2');
	    //Store the Confimation Message Object ...
	    var message = document.getElementById('confirmMessage');
	    //Set the colors we will be using ...
	    var goodColor = "#66cc66";
	    var badColor  = "#ff6666";
	    //Compare the values in the password field 
	    //and the confirmation field
	    if(password.value == pass2.value){
	        //The passwords match. 
	        //Set the color to the good color and inform
	        //the user that they have entered the correct password 
	        pass2.style.backgroundColor = goodColor;
	        message.style.color = goodColor;
	        message.innerHTML = "Passwords Match!"
	    }else{
	        //The passwords do not match.
	        //Set the color to the bad color and
	        //notify the user.
	        pass2.style.backgroundColor = badColor;
	        message.style.color = badColor;
	        message.innerHTML = "Passwords Do Not Match!"
	    }
	}  
	//
	// ***** ping functions begin here *****
	//    
		function ping(  local, localsocket, global, globalsocket) {
		makeRegisterTable();
	    var pingTo      = ppp.pingData();
	    console.log("806 pingTo =" + pingTo);		
	    var secure      = document.forms.frmping;
	    var doLocal 	= false; 
	    var doGlobal 	= false;
	    var serverError = false;
	    if(local.length  > 5) doLocal  = true;
	    if(global.length > 5) doGlobal = true;
	    console.log("813 local server =" + local);		// ***** input parameter
	    console.log("814 global server=" + global); 	// ***** input parameter
		ppp.setAKTLocal("global",global); // ***** Chicago
	    ppp.setAKTLocal("globalsocket",globalsocket); 
		ppp.setAKTLocal("doglobal",doGlobal); 			// ***** global server address was supplied
		ppp.setAKTLocal("local",local); 				// ***** lawyer
	    ppp.setAKTLocal("localsocket",localsocket); 
		ppp.setAKTLocal("dolocal",  doLocal); 			// ***** local server address was supplied

	   console.log("408 global server=" + ppp.getAKTLocal("global"));
	   document.getElementById('ping01').value 				= pingTo;
	   document.getElementById('server01').value 			= ppp.getAKTLocal("local");
	   document.getElementById('socket01').value 			= ppp.getAKTLocal("localsocket");
	//   document.getElementById('local').value  			= ppp.getAKTLocal("local");
	//   document.getElementById('localsocket').value 	= ppp.getAKTLocal("localsocket");
	   console.log("420 local server, socket=" + ppp.getAKTLocal("local") + " " + ppp.getAKTLocal("localsocket"));
			$.ajax({
				type : "POST",
				url : "https://www.anonymouskey.com:8443/AKTServer/signup",
//				url : "/AKTLawyer/replicate",
				dataType : "json",
				data : $('#frmping01').serialize(),
	//
	// *****  we are going to get back the action, PONG (or ERROR), KPPP (if not error)
//				
			  	success : function(response) {
				console.log("6 response=" + JSON.stringify(response));
				var akt = response.akt;
			    getReturnVars(akt);

				var error 			= response.error;
	            if(error != null) 
	            {
	            	serverError = true;
	            	processError(error);
	    			console.log("439 error=" + error);
					document.getElementById("status").value = "Registration Error: 440 " + error;
	            }
	            else
	            {
	    			var KPPP 			= response.kppp;
	    			var Pong 			= response.pong
	            	ppp.setAKTLocal("localping",Pong);   // ***** save incoming local  pong AKTPPP02
	    			if(doGlobal){							// ***** if dual server function
	    				document.getElementById('server01').value 			= ppp.getAKTLocal("global");
	    				document.getElementById('socket01').value 			= ppp.getAKTLocal("globalsocket");
	    				console.log("451 global server, socket=" + ppp.getAKTLocal("global") 
	            			   + " " + ppp.getAKTLocal("globalsocket"));
	    				$.ajax({
	    					type : "POST",
	    					url : "https://anonymouskey.com:8443/AKTServer/signup",
//	        				url : "/AKTLawyer/replicate",
	    					dataType : "json",
	    					data : $('#frmping01').serialize(),
	        //
	        // *****  we are going to get back the action, PONG (or ERROR), KPPP (if not error)
//	        			
	    					success : function(response) {
	    						console.log("317 response=" + JSON.stringify(response));
	    						var error 			= response.error;
	    						if(error != null) 
	    						{
	    							serverError = true;
	    						} else {
		        		  			var KPPP 			= response.kppp;
		        		  			var Pong 			= response.pong
		        		  			ppp.setAKTLocal("globalping",Pong); // ***** save incoming global pong AKTPPP02
	    						}
	    					}
	    				});
	    			}
	 //           	if(action == 1)
//	                   document.getElementById("valueRet").innerHTML = "Begin ShieldMe365 Registration";
		//			document.getElementById("status").value = "Begin ShieldMe365 Registration";
				   }
				}
			});
			if(serverError){
	           document.getElementById("valueRet").innerHTML = "Possible Server Error. Please notify Aegis";
			}
		}

		function AKTPPP03() {
			//alert("In AKTPPP03");
//				 
		// *****  first, set up the return variables	    
		//
	       var pong            	  = ppp.getAKTLocal("localping");        
		   var pingTo             = ppp.secondPing(pong);  // *****  compute the final ping
		   document.getElementById('server03').value = ppp.getAKTLocal("local");
		   document.getElementById('socket03').value = ppp.getAKTLocal("localsocket");
		   var emailRaw           = document.getElementById("email03").value;
		   var email              = emailRaw.toLowerCase();
		   var phone              = document.getElementById("phone03").value;
		   var pppdec             = document.getElementById("pppcheck03").value;
		   var pppeMail           = ppp.pingUserData(email);
		   var pppPhone           = ppp.pingUserData(phone);
		   var pppCheck           = ppp.pingUserData(pppdec);
		   document.getElementById("email03").value     = pppeMail;
		   document.getElementById("phone03").value     = pppPhone;
		//   localStorage.setItem("email", email);                  // *****  save email for later
		//   localStorage.setItem("phone", phone);                  // *****  save phone for later
		   ppp.setAKTLocal("email", email);                  // *****  save email for later
		   ppp.setAKTLocal("phone", phone);                  // *****  save phone for later
		   document.getElementById("emailg").value      = email;  
		   document.getElementById("phoneg").value      = phone;  
		   document.getElementById("ping03").value      = pingTo;
		   document.getElementById("pppcheck03").value  = pppCheck;
		//   document.getElementById("SecLevel") = parent.document.getElementById("SecLevel").value;
			console.log("742 server=" + ppp.getAKTLocal("local") + " port=" + ppp.getAKTLocal("localsocket"));
			console.log("743 pong=" + pong);
		   x=validateForm(email);
		     if(x==true) {
				$.ajax({
					type : "POST",
					url : "/AKTServer/signup",
					dataType : "json",
					data : $('#frmping03').serialize(),

		//
		// *****  we are going to get back the action, PONG (or ERROR), KPPP (if not error)
		//	
					success : function(response) {
						console.log("758 response=" + JSON.stringify(response));
						var error = response.error;
						var action = response.AKTRequestID;
						var akt=response.akt;
					    getReturnVars(akt);
						
						var error = response.error;
						console.log("762 error=" + error);
//						alert("281 error=" + error );
		//
		// *****  if we find an error, we need to process it
		//
						if(error != null)
						{
							var error = response.error;
							var msg   = response.kppp;

							if(msg.length > 5){
								//alert("175 error=" + error );
								//document.getElementById("valueRet").innerHTML = "Error 476. error= " + msg;
								var decrypted = ppp.decryptUserData(msg);
//		 	                    ping(2);  // *****  this should reset the ppp protocol
		 						console.log("777 error=" + decrypted);
								document.getElementById("valueRet").innerHTML = decrypted;
								document.getElementById("pong").value = decrypted;
							}
							document.getElementById("kppp").value = error;

							if(error == "536870942")
								{
								document.getElementById("valueRet").innerHTML = "email already used";
//								alert("316 error=" + "email already used");
								}
							else if(error == "536870940")
								document.getElementById("valueRet").innerHTML = "input error";

			          	      var email = localStorage.getItem("email");
			        	      var phone = localStorage.getItem("phone");
			        	      document.getElementById("email03").value     = email;
			        	      document.getElementById("phone03").value     = phone;
			        	      document.getElementById("pppcheck03").value  = "pppDecrypt";
			 // *****  here, we need to process the error code that came back
							}
							else
							{
								var pong = response.pong;
								var kppp = response.kppp;
			                    document.getElementById("pong").value       = pong;
			        	        document.getElementById("kppp").value       = kppp;
			        	        ppp.setAKTLocal("localkppp", kppp);
			        	        var decrypted          = ppp.decryptUserData(pong);
			        	        document.getElementById("decrypted").value  = decrypted;
			        	        document.getElementById("qact").value  = "0";
			          		    getQuestions(1, decrypted );
							}
						}
					});
				}
				else {
			   	alert("Please enter a valid email address");
					return false;
				}
			 }
					
		
	/*
	function AKTPPP03() {
		//alert("In AKTPPP03");
//			 
	// *****  first, set up the return variables	    
	//
	//   var globalpong           = document.getElementById("globalping03").value;        
	   var globalpong           = ppp.getAKTLocal("globalping");       
	   var pingToGlobal         = ppp.secondPing(globalpong);  // *****  compute the final ping
	//   var localpong            = document.getElementById("localping03").value;        
	   var localpong            = ppp.getAKTLocal("localping");        
	   var pingToLocal          = ppp.secondPing(localpong);  // *****  compute the final ping
	//   var localkppp			= document.getElementById("localkppp05").value; 
	//   var globalkppp			= document.getElementById("globalkppp05").value; 
	   //   document.getElementById('server03').value = localStorage.getItem("server");
	//   document.getElementById('socket03').value = localStorage.getItem("socket");
	//   document.getElementById('server03').value = ppp.getAKTLocal("server");
	   document.getElementById('globalserver03').value = ppp.getAKTLocal("global");
	   document.getElementById('localserver03').value  = ppp.getAKTLocal("local");
	   document.getElementById('globalsocket03').value = ppp.getAKTLocal("globalsocket");
	   document.getElementById('localsocket03').value  = ppp.getAKTLocal("localsocket");
	   var emailRaw           = document.getElementById("email03").value;
	   var email              = emailRaw.toLowerCase();
	   var phone              = document.getElementById("phone03").value;
	   var pppdec             = document.getElementById("pppcheck03").value;
	   var pppeMail           = ppp.pingUserData(email);
	   var pppPhone           = ppp.pingUserData(phone);
	   var pppCheck           = ppp.pingUserData(pppdec);
	   document.getElementById("email03").value     = pppeMail;
	   document.getElementById("phone03").value     = pppPhone;
	//   localStorage.setItem("email", email);                  // *****  save email for later
	//   localStorage.setItem("phone", phone);                  // *****  save phone for later
	   ppp.setAKTLocal("email", email);                  // *****  save email for later
	   ppp.setAKTLocal("phone", phone);                  // *****  save phone for later
	   document.getElementById("emailg").value      	= email;  
	   document.getElementById("phoneg").value      	= phone;  
	//   document.getElementById("ping03").value      	= pingTo;
	   document.getElementById("globalping05").value  	= pingToGlobal;
	   document.getElementById("localping05").value   	= pingToLocal;
	   document.getElementById("globalkppp05").value  	= pingToGlobal;
	   document.getElementById("localkppp05").value   	= pingToLocal;
	   document.getElementById("pppcheck03").value  	= pppCheck;
	//   document.getElementById("SecLevel") = parent.document.getElementById("SecLevel").value;
	   // Email Address is good. Check if already registered
	   x=validateForm(email);
	     if(x==true) {
			$.ajax({
				type : "POST",
				url : "/AKTServer/signup",
				dataType : "json",
				data : $('#frmping03').serialize(),

	//
	// *****  we are going to get back the action, PONG (or ERROR), KPPP (if not error)
//				
				success : function(response) {
					console.log("341 response=" + JSON.stringify(response));
			
					var error = response.error;
					console.log("438 error=" + error);
//					alert("281 error=" + error );
	//
	// *****  if we find an error, we need to process it
	//
					if(error != null)
					{
						processError(error);
						
	        	      document.getElementById("email03").value     = "error";
	        	      document.getElementById("phone03").value     = "error";
	        	      document.getElementById("pppcheck03").value  = "pppDecrypt";
					}
					else
					{
						var globalkppp 		= response.globalKPPP;
						console.log("489 globalkppp=" + globalkppp);
						var localkppp 		= response.localKPPP;
						console.log("491 localkppp=" + localkppp);
						var globalpong 		= response.globalPong;
						console.log("493 globalpong=" + globalpong);
						var localpong		= response.localPong;
						console.log("495 localpong=" + localpong);
	                    document.getElementById("pong").value       = pong;
	        	        ppp.setAKTLocal("globalkppp", globalkppp);                  // *****  save KPPP for later
	        	        ppp.setAKTLocal("localkppp", localkppp);                  // *****  save KPPP for later
	        	        
	        	        var decrypted          = ppp.decryptUserData(globalpong);
	        	        var decryptedLocal     = ppp.decryptUserData(localpong);
	        	        document.getElementById("decrypted").value  = decrypted;
						console.log("505 decryptedGlobal=" + decrypted);
						console.log("505 decryptedLocal =" + decryptedLocal);
	          		    getQuestions(1, decrypted );
	           		    
					}
				}
			});
		}
		else {
	   	alert("Please enter a valid email address");
			return false;
		}
	 }
	*/
		function getQuestions(action, decrypted) {
			if(action == 1)
			{
//		     var decrypted          = "1=A|2=B|3=C|4=D|5=E|6=F|7=G|";
	          if(decrypted.indexOf("|") == 0)
	        	  decrypted = decrypted.substring(1);
	          if(decrypted.lastIndexOf("|") == decrypted.length-1)
	        	  decrypted = decrypted.substring(0, decrypted.length - 1);
//		      alert("368 decrypted=" + decrypted);
				console.log("667 questions=" + decrypted);
	          var qanda = decrypted.split("|");  // ***** split into qn=q
		      var qNum = [];                     // *****  question numbers
		      var questions = [];                // *****  questions
	          for(i=0; i<qanda.length; i++)
	       	  {
	        	  var tmp      = qanda[i].split("=");
	        	  qNum[i]      = tmp[0];
	        	  questions[i] = tmp[1].trim();
	       	  }
		      var val   = qNum;
		      var txt   = questions;
//		      var email = localStorage.getItem("email");
//		      var phone = localStorage.getItem("phone");
		      var email = ppp.getAKTLocal("email");
		      var phone = ppp.getAKTLocal("phone");
		      
		      document.getElementById("SASQ1").text = "<-- Select a Security Question -->";
	          document.getElementById("ShowCell").innerHTML  = phone;        
	          document.getElementById("ShowEmail").innerHTML = email;           
	          document.getElementById("Cellx").value = phone;
	          document.getElementById("Emailx").value = email;           
	          document.getElementById("Initial").style.display='none';
	          document.getElementById("Complete").style.display='none';
	          document.getElementById("Credentials").style.display='table-row';
	          document.getElementById("CredentialPart").style.display='table-row';
	          document.getElementById("QuestionPart").style.display='table-row';
	          for (i = 0; i < 7; i++)
	          { 
	              document.getElementById("Q1a" + (i + 1)).text  = txt[i];
	              document.getElementById("Q1a" + (i + 1)).value = val[i];
	          }
		   }
	       else   // *****  we do this to show the second security questions
	       {
	          txt = new Array(7);
		      val = new Array(7);
			  for (i = 0; i < 7; i++)
		      { 
		              txt[i] = document.getElementById("Q1a" + (i + 1)).text;
		              val[i] = document.getElementById("Q1a" + (i + 1)).value;
		      }
		           var sel = document.getElementById("Q1").value;  // *****  exclude the first question selected
		           document.getElementById("Q2Q").style.display='table-row';
		           document.getElementById("Q2A").style.display='table-row';
		           document.getElementById("SASQ2").text = "<-- Select Another Security Question -->";
		           for (i = 0; i < 7; i++)
		           {
		                if (sel != val[i]) {
		                   document.getElementById("Q2a" + (i + 1)).text  = txt[i];
		                   document.getElementById("Q2a" + (i + 1)).value = val[i];
		           }
		       }
		   }
		}
		
	function registerFinal07(){
		  var kfn                = "ZecureIT.uky";
//	      var emailRaw           = localStorage.getItem("email");
//	      var phone              = localStorage.getItem("phone");
	      var emailRaw           = ppp.getAKTLocal("email");
	      var phone              = ppp.getAKTLocal("phone");
	      var email              = emailRaw.toLowerCase();
	      var username           = document.getElementById("username").value;
	      var pass               = document.getElementById("pass1").value;
	      var cm                 = AKTCM;

	      var k5                 = cm.makeK5(username, pass);
	      var u5                 = cm.makeU5(username);
	      var u5B64              = AKTBase64.encode(u5);
	      var k5B64              = AKTBase64.encode(k5); 
//	      var globalserver			 = document.getElementById("globalserver07").value;
//	      var globalsocket			 = document.getElementById("globalsocket07").value;
//	      var localserver			 = document.getElementById("localserver07").value;
//	      var localsocket			 = document.getElementById("localsocket07").value;
	      
	//
	// *****  here we have a problem if we are replicating
//	      
	      if(document.getElementById("replicate").value == "true"){
	    	  var pb = ppp.getAKTLocal("pb");
	      }else {
	    	  var pbraw  = getRandomKey(32);
	    	  var hexnorm 	= AKT.HEXFormat(pbraw);
	    	  var pb 		= AKTSha256.fromHex(hexnorm);	
	      }
	      var qn1 = document.getElementById("Q1").value;  // *****  exclude the first question selected
	      var an1 = document.getElementById("Q1Answer").value;  // *****  exclude the first question selected
	      var qn2 = document.getElementById("Q2").value;  // *****  exclude the first question selected
	      var an2 = document.getElementById("Q2Answer").value;  // *****  exclude the first question selected
	      var sec = document.getElementById("security").value;
	      var ks     = makeKS(pb, an1, an2);  // *****  ks is text encrypted
	      console.log("1035 ks=" + ks );
	      if(document.getElementById("qact").value =="1"){
	    	  updateKS(ks, qn1, an1, qn2, an2, "local");
	      } else {
	    	  var pbrev 	= reverse(pb);
	    	  var pbB64     = AKTBase64.encode(pb); 
	    	  var hexu5 	= AKT.HEXFormat(u5);
	    	  var hexk5 	= AKT.HEXFormat(k5);
	    	  var hexnorm 	= AKT.HEXFormat(pb);
	    	  var hexrev 	= AKT.HEXFormat(pbrev);
	    	  sha256     	= AKTSha256;
	    	  var pbu5   	= AKTSha1.GetHash(pb);		// *****  pbu5 is sha1 to be consistent with u5
	    	  var pbu5B64 	= AKTBase64.encode(pbu5);
//	      var pb5kHex   = sha256.hasher(hexrev); // *****  pb5kHex is in hex format
//	      var pb5k = AKTSha256.fromHex(pb5kHex);

	      var revWord = "";
	      revWord += pbrev;
	      var bitArray   = sjcl.hash.sha256.hash(revWord);
	      var pb5kHex    = sjcl.codec.hex.fromBits(bitArray); 
		  var pb5k		 = AKTSha256.fromHex(pb5kHex);
	      var pb5kB64 = AKTBase64.encode(pb5k);
	      var hexpb5k 	= AKT.HEXFormat(pb5k);
//	      console.log("457 pb5k=" + pb5kHex );
	      var ka     = makeKA(pb, username, pass);
	      var upkeyword = "";
	      var error = false;
	      var upkey  = getRandomKey(32);
	      upkeyword += upkey;
		  var bitArray   = sjcl.hash.sha256.hash(upkeyword); // ***** bitData is an object
		  var hashHex = sjcl.codec.hex.fromBits(bitArray);
		  var upkeyhash = AKTSha256.fromHex(hashHex);
	      var psk    = getRandomKey(32);
	      ppp.setAKTLocal("username",username); 
	      ppp.setAKTLocal("email",email); 
	      ppp.setAKTLocal("password",pass);
	      ppp.setAKTLocal("u5",u5B64); 
	      ppp.setAKTLocal("k5",k5B64);
	      
	      var Uppp               = ppp.pingUserData(username);
	      var EMAILppp           = ppp.pingUserData(email);
	      var phoneppp           = ppp.pingUserData(phone);
	      var Pppp               = ppp.pingUserData(pass);
	      var U5ppp              = ppp.pingUserData(u5);
	      var K5ppp              = ppp.pingUserData(k5);
	      var pbU5ppp            = ppp.pingUserData(pbu5);
	      var pb5Kppp            = ppp.pingUserData(pb5k);
	      var upKeyppp           = ppp.pingUserData(upkey);
	      var upKeyHashppp       = ppp.pingUserData(upkeyhash);
	      var KAppp              = ppp.pingUserData(ka);
	      var KSppp              = ppp.pingUserData(ks);
	      var KFNppp             = ppp.pingUserData(kfn);
	      var QN1ppp             = ppp.pingUserData(qn1);
	      var QN2ppp             = ppp.pingUserData(qn2);
	      var secppp             = ppp.pingUserData(sec);
	      var an1ppp             = ppp.pingUserData(an1);
	      var an2ppp             = ppp.pingUserData(an2);
	      var pppPsk             = ppp.pingUserData(psk);
	      var kppp               = document.getElementById("kppp").value;
	      document.getElementById("pbu507").value   = pbU5ppp;           
	      document.getElementById("pb5k07").value   = pb5Kppp;           
	      document.getElementById("email07").value  = EMAILppp;           
	      document.getElementById("phone07").value  = phoneppp;           
	      document.getElementById("q107").value     = QN1ppp;           
	      document.getElementById("q207").value     = QN2ppp;           
	      document.getElementById("upkey07").value  = upKeyppp;           
	      document.getElementById("upkeyhash07").value = upKeyHashppp;           
	      document.getElementById("u507").value     = U5ppp;           
	      document.getElementById("k507").value     = K5ppp;           
	      document.getElementById("ka07").value     = KAppp;           
	      document.getElementById("ks07").value     = KSppp;           
	      document.getElementById("kfn07").value    = KFNppp;           
	      document.getElementById("u07").value      = Uppp;           
	      document.getElementById("p07").value      = Pppp;           
	      document.getElementById("an107").value    = an1ppp;           
	      document.getElementById("an207").value    = an2ppp;           
	      document.getElementById("security").value = secppp;           
	      document.getElementById("psk07").value    = pppPsk;           
//	      document.getElementById("first07").value = kppp;           
//	      document.getElementById("last07").value = kppp;   
	//
	// ***** we must register local first
//			 then if we are doing dual signup, we register with the global server
//	      
	      document.getElementById("server07").value = ppp.getAKTLocal("local");           
	      document.getElementById("socket07").value = ppp.getAKTLocal("localsocket");           
	      document.getElementById("kppp07").value = ppp.getAKTLocal("localkppp");           
			$.ajax({
				type : "POST",
				url : "/AKTServer/signup",
				dataType : "json",
				data : $('#frmreg01').serialize(),
	//
	// *****  we are going to get back the action, PONG (or ERROR), KPPP (if not error)
//				
				success : function(response) {
					var pong = response.pong;
					console.log("864 pong=" + pong);
					if( pong == "NAK")
					{
	//
	// ***** if we are doing dual signup, then we register with the global server here
	//
						if(document.getElementById("dualreg").value != "true"){  		// *****  if dual registration
							if(document.getElementById("replicate").value == "true"){	// *****  if replicate
					       	     updateKS(ks, qn1, an1, qn2, an2, "global");
				                 document.getElementById("valueRet").innerHTML = "User replicated successfully";
							}
						} else {
					        document.getElementById("server07").value 	= ppp.getAKTLocal("global");           
					        document.getElementById("socket07").value 	= ppp.getAKTLocal("globalsocket");           
					        document.getElementById("kppp07").value 	= ppp.getAKTLocal("globalkppp");           
							$.ajax({
								type : "POST",
								url : "/AKTServer/signup",
								dataType : "json",
								data : $('#frmreg01').serialize(),
								success : function(response) {
									var pong = response.pong;
									console.log("881 pong=" + pong);
									if( pong == "NAK")
									{
						
									} else {
										error = true;
									}
									
								}
							});
						}
					}  // *****  end of successful path
					else
					{
					   var error = response.error;
					   var msg   = response.kppp;
					   error = true;
					   if(msg.length > 5){
						   document.getElementById("valueRet").innerHTML = "Error: 476 msg= " + msg;
						   var decrypted = ppp.decryptUserData(msg);
						   document.getElementById("valueRet").innerHTML = "Error: 476 error= " + decrypted;
		                   document.getElementById("pong").value = decrypted;
					   }
	                   document.getElementById("kppp").value = error;
					   // *****  here, we need to process the error code that came back
					   if(error == "53870942")
		                   document.getElementById("valueRet").innerHTML = "email already used";
					   else if(error == "53870940")
	                       document.getElementById("valueRet").innerHTML = "input error";
	                       
					}
					if(!error){
						var KPPP = response.kppp;
		                document.getElementById("pong").value = pong;
		                document.getElementById("kppp").value = KPPP;
						if(document.getElementById("replicate").value != "true"){	// *****  if replicate
		                   document.getElementById("valueRet").innerHTML = "Registration Complete";
				           document.getElementById("Credentials").style.display='none';
				           document.getElementById("CredentialPart").style.display='none';
				           document.getElementById("QuestionPart").style.display='none';
				           document.getElementById("Q2Q").style.display='none';
				           document.getElementById("Q2A").style.display='none';
				           document.getElementById("Complete").style.display='table-row';
						}
					}
				}
			});
	      }
	  
	}
	function makeKA(pb, username, password) {
		var uniU = getUnicodeString(username);
		var uniP = getUnicodeString(password);
	    var cm                   = AKTCM;
	    var k5                   = cm.makeK5(uniU, uniP);
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
	    aesAKT.initialize(k5);
	    var KA                  = aesAKT.encryptText(pb);
	    return KA;
	}

	function getPBfromKA(KA, username, password) {
		var uniU = getUnicodeString(username);
		var uniP = getUnicodeString(password);
	    var cm                   = AKTCM;
	    var k5                   = cm.makeK5(uniU, uniP);
	    var hexK5		 = AKT.HEXFormat(k5);
		  console.log("1057 K5=" + hexK5 );
		  console.log("1058 KA=" + KA );
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
	    aesAKT.initialize(k5);
	    var pb                  = aesAKT.decryptText(KA);
	    var hexpb		 = AKT.HEXFormat(pb);
		  console.log("1064 pb=" + hexpb );
		ppp.setAKTLocal("pb", pb);  
	    return pb;
	}

	function makePBu5AndPB5k(pb){
	    var pbu5    = AKTSha1.GetHash(pb);
	    var pbu5B64 = AKTBase64.encode(pbu5);
	    var revWord = "";
		var pbrev = reverse(pb);
	    revWord += pbrev;
		var bitArray   = sjcl.hash.sha256.hash(revWord); // ***** bitData is an object
	    var pb5khex = sjcl.codec.hex.fromBits(bitArray);
	    var pb5k  	= AKTSha256.fromHex(pb5khex);
	    var pb5kB64	= AKTBase64.encode(pb5k);
	    var retVar 	= [];
	    retVar[0] 	= pbu5B64;
	    retVar[1] 	= pb5kB64;
		return retVar;
	}    

	function makeKS(pb, ans1In, ans2In) {
	    var ans1 = ans1In.toLowerCase().trim();
	    var ans2 = ans2In.toLowerCase().trim();
		  console.log("1238 ans1=" + ans1 + " ans2=" + ans2 );
		var buffer = "";
	    var buf = "";
		for (i = 0; i < 32; i++)
			if(i < ans1.length)
	  		   buf += String.fromCharCode(0xca ^ ans1.charCodeAt(i));
			else
		  	   buf += String.fromCharCode(0xca);
		
		var bufrev = "";	// *****  protocol says to reverse the string	
		var l = ans2.length; var m = 0;
		for (i = 0; i < 32; i++)
//			if(i < ans2.length)
//	  		   bufrev += String.fromCharCode(buf.charCodeAt(31-i) ^ ans2.charCodeAt(i));
			if(i > (31-ans2.length)){
	  	  		   bufrev += String.fromCharCode(buf.charCodeAt(i) ^ ans2.charCodeAt(l-m-1));
			   m++;
			}
			else
		  	   bufrev += String.fromCharCode(buf.charCodeAt(i));
//		   bufrev += String.fromCharCode(buf.charCodeAt(31-i));
			var prtrev = AKT.HEXFormat(bufrev);
		  console.log("1260 bufrev=" + prtrev );
	    var bitArray   = sjcl.hash.sha256.hash(bufrev); // ***** bitData is an object
	    var hash = sjcl.codec.hex.fromBits(bitArray);
		  console.log("1263 hash=" + hash );
//	    var key  = AKTSha256.fromHex(hash);
//	    var key  = AKTSha256.fromHex(bufrev);
//	    var keyprt = AKT.HEXFormat(key);
//		  console.log("746 key=" + keyprt );

//		    sha256     = AKTSha256;
//		    var serverHex   	= sha256.hasher(bufrev);
//			  console.log("750 serverHex=" + serverHex );
	    var serverHash		= AKT.fromHex(hash);
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
//	    aesAKT.initialize(key);
//	    aesAKT.initialize(hash);
	    aesAKT.initialize(serverHash);
	    var ks           = aesAKT.encryptText(pb);
		  console.log("1279 ks=" + ks );
		return (ks);
		}

	function contacts() {
	    var bpu5 = ppp.getAKTLocal("pbu5"); 
	    document.getElementById('request').value = "GETCONTACTS";
	    document.getElementById('pbu5c').value 	 = ppp.getAKTLocal("pbu5");
	    document.getElementById('serverc').value = ppp.getAKTLocal("server");
	    document.getElementById('socketc').value = ppp.getAKTLocal("socket");
	    var togo = 0;
		$.ajax({
			type : "POST",
			url : "/AKTServer/signup",
			dataType : "json",
			data : $('#frmcontact').serialize(),
		  	success : function(response) {
		  		var pong = response.pong;
		  		var KPPP = response.kppp;
		  		var error = response.error;
		  		console.log("622  pong=" + pong);
				if( pong == "NAK")
				{
			  		console.log("625  kppp=" + KPPP);
			  		if(KPPP != "NCF"){
				  		var pb = ppp.getAKTLocal("pb");
				  		var pbhex = AKT.HEXFormat(pb);
				  		console.log("629  pb=" + pbhex);
				  		var json = AKTZip.AKTdecryptAndUnzip(KPPP, pb);
				        var clear    = AKTBase64.decode(json);
				  		console.log("632  clear=" + clear);
					    sha256     = AKTSha256;
					    var serverHex   	= sha256.hasher(clear);
					    var serverHash		= AKT.fromHex(serverHex);
				        var hashB64    		= AKTBase64.encode(serverHash);
				        var localHash 		= ppp.getAKTLocal("contacthash");
				        console.log("637 contacthash=" + localHash + "\n serverhash=" + hashB64);
				  		var obj = JSON.parse(clear);
				  		var l = obj.contacts.length;
				  		if(l > 0){
				  			var email 	= new Array(l);
				  			var name 	= new Array(l);
				  			var phone 	= new Array(l);
				  		}
				  		var m = obj.groups.length;
				  		var n = 0;
				  		if(obj.hasOwnProperty("unknown"))
				  			n = obj.unknown.length;
				  		console.log("630  contacts=" + l + " groups=" + m + " unknown=" + n);
	//
	// *****  assemble the contacts table to display
//				  		
//				  		var contactTable= '<form id="frmcontact" name="contact"><br>"Contacts"';
//				  		contactTable += '<input type="hidden" id="num"' +' value="' +l + '"><br>';
//						var c = null; var d = null;
				  		for(var i=0; i<l; i++){
//							c =  '<input type="text" size="50" id="email' + i + '" name="email' + i + '" value="' + obj.contacts[i].email + '">';
//							d =  '<input type="text" size="50" id="name' + i + '" name="name' + i + '" value="' + obj.contacts[i].name + '"><br>';
//							contactTable += c + d;
							email[i] 	= obj.contacts[i].email;
							name[i]		= obj.contacts[i].name;
							phone[i]	= obj.contacts[i].phoneNo;
				  		}
				  		var emailStr = email.join("|");
				  		var nameStr  = name.join("|");
				  		var phoneStr = phone.join("|");
				        if(serverHash != localHash){
				        	ppp.setAKTLocal("contacthash", hashB64);
				        	ppp.setAKTLocal("contactjson", clear);
				        }
				  		console.log("718 email=" + emailStr + "\nname=" + nameStr + "\nphone=" + phoneStr);
//				 		var e = '<input type="button" value="Save Contacts" onclick="savecontacts()">';
//				 		e += '<input type="button" value="Clear" onclick="clearcontacts()"><br><br>';
//						contactTable += e + "</form>";
				  		var contactTable = getContactForm(clear);
			  			document.getElementById('contacts').innerHTML = contactTable;
//				  		console.log("724  html=" + contactTable);
					} else {
						
					}
				} else {
			  		console.log("683 error=" + error + " pong=" + pong);
			  		document.getElementById("pongValue").value = pong;
			  		document.getElementById("kpppValue").value = KPPP;
				}
		  	}
		});
		
	}
		function clearcontacts(){
			var id = document.getElementById("numcontacts").value;
			console.log("815 id=" + id);
			var node = document.getElementById("contacts");
			while(node.hasChildNodes()){
				node.removeChild(node.lastChild);
			}
			var formData = getNoLoginForm();
			document.getElementById('contacts').innerHTML = formData;
		}
		function savecontacts(){
			var json = {};
			json["contacts"] 	= [];
			json["groups"]		= [];
			json["unknown"]		= [];
			var c =document.getElementById('numcontacts').value;
			for(i=0; i<c; i++){
				var cid 	= "email" + i;
				var nid 	= "name" + i;
				var pid 	= "phone" + i;
				var zid 	= "zingme" + i;
				var email 	= document.getElementById(cid).value;
				var name 	= document.getElementById(nid).value;
				var phone 	= document.getElementById(pid).value;
				var zingme 	= document.getElementById(zid).value;
				var item	={};
				item["email"] = email;
				item["name"] = name;
				item["phone"] = phone;
				item["zingmeKey"] = zingme;
				json.contacts.push(item);
				console.log("832 i=" + i + " " + email + " ," + name + " ," + phone + " ," + zingme);
			}
			var g = document.getElementById("numgroups").value;
			for(i=0; i<g; i++){
				var outer = [];
				var gid 	= "group" + i;
				var group 	= document.getElementById(gid).value;
				var nid		= group + i;
				var gl 	= document.getElementById(nid).value;
				console.log("848 i=" + i + " " + group + " gl=" + gl) ;
				outer[group] = [];
				for(j=0; j<gl; j++){
					var item = {};
					var gid = "gemail" + i + "_" + j;
					var gmail 	= document.getElementById(gid).value;
					item["email"] = gmail;
					console.log("852 j=" + gmail) ;
					outer.push(item);
				}
				var a ={};
//				a[group] = JSON.stringify(outer);
				a[group] = outer;
				json.groups.push(a);
			}
//			json.groups.push(outer);
			var u = document.getElementById("numunknown").value;
			console.log("831 json=" + JSON.stringify(json));
			if(u > 0){
				for(i =0; i<u; i++){
					var uid = "uemail" + i ;
					var umail 	= document.getElementById(uid).value;
					item["email"] = umail;
					console.log("886 j=" + umail) ;
					json.unknown.push(item);
				}
			}
		}
		
		function login() {
	    var user               = document.getElementById("username").value;
	    var pass               = document.getElementById("password").value;
	    var zingpass           = document.getElementById("zingpassin").value;
	    var cm                 = AKTCM;
	    var k5                 = cm.makeK5(user, pass);
	    var u5                 = cm.makeU5(user);
	    var u5B64              = AKTBase64.encode(u5);
	    var k5B64              = AKTBase64.encode(k5); 
	    console.log("802 u5=" + u5B64);
	    var cValue             = cm.makeC_R();
//	    document.getElementById("u5").value    = u5B64;
//	    document.getElementById("k5").value    = k5B64;
	    document.getElementById("cvalue").value = cValue;
	    document.getElementById("serverl").value = ppp.getAKTLocal("server"); ;
	    document.getElementById("socketl").value = ppp.getAKTLocal("socket");
	    document.getElementById("zingpass").value = zingpass;
	    ppp.setAKTLocal("username",user); 
	    ppp.setAKTLocal("password",pass); 
	    ppp.setAKTLocal("u5",u5B64); 
	    ppp.setAKTLocal("k5",k5B64); 
	    ppp.setAKTLocal("pbu5",""); 
	    ppp.setAKTLocal("pb5k",""); 
	//
	// *****  start with a ping unless KA is still here
	//    
	    var KA = ppp.getAKTLocal("KA");
	    if(KA.length < 5){
	//
	// *****  Should do an authentication here to be able to use ZingPass
//	    	
	        var pingTo      = ppp.pingData();
	        var secure      = document.forms.frmping;
	        document.getElementById('ping01').value = pingTo;
	        var server = ppp.getAKTLocal("server");
	        var socket = ppp.getAKTLocal("socket");
	        document.getElementById('server').value = ppp.getAKTLocal("server");
	        document.getElementById('socket').value = ppp.getAKTLocal("socket");
	        console.log("828 ping server=" + server + " socket=" + socket+ " pingTo=" + pingTo );
	        var togo = 0;
	    		$.ajax({
	    			type : "POST",
	    			url : "/AKTServer/signup",
	    			dataType : "json",
	    			data : $('#frmping01').serialize(),
	    //
	    //*****  we are going to get back the action, PONG (or ERROR), KPPP (if not error)
//	    			
	    		  	success : function(response) {
	    		  		var pong = response.pong;
	    		  		var KPPP = response.kppp;
	    		  		var error = response.error;
	    		  		console.log("842 error=" + error + " pong=" + pong);
	    		  		document.getElementById("pongValue").value = pong;
	    		  		document.getElementById("kpppValue").value = KPPP;
	    				var KA = pongSub(u5);  // *****  this should complete the ppp
	    		  	}
	    		});

	    } else{ // *****  we have KA, so, we can extract the pb
	            var u = ppp.getAKTLocal("username");
	            var p = ppp.getAKTLocal("password");
	    	    var pb               = getPBfromKA(KA, u, p);
	    	    var pbHex            = AKT.HEXFormat(pb);
	    	    console.log("854 KA found: pb=" + pbHex);
	            ppp.setAKTLocal("username", "");
	            ppp.setAKTLocal("password", "");
	            ppp.setAKTLocal("u5", "");
	            ppp.setAKTLocal("k5", "");
	    	    if(pb.length == 32){
	    		    var retVar = makePBu5AndPB5k(pb);
	    	        ppp.setAKTLocal("pbu5", retVar[0]);
	    	        ppp.setAKTLocal("pb5k", retVar[1]);
	    	        ppp.setAKTLocal("pb", pb);
	    	  		document.getElementById("status").value = "success";
	    			var formData = getNoLoginForm();
	    			document.getElementById('contacts').innerHTML = formData;
	    	    }
	    	    else{
	    	  		document.getElementById("status").value = "login failed";
	    			var formData = getLoginForm();
	    			document.getElementById('contacts').innerHTML = formData;
	    	    }
	    	}
		}
		
		function verifyUser(KPPP) {
	      var cm                 = AKTCM;
	      var k5B64 = ppp.getAKTLocal("k5");
	      
	      var k5    = AKTBase64.decode(k5B64);
	      cm.initializeCM(k5);
	      var kppp               = KPPP;
	      var checkUser          = cm.decryptTextCM(kppp);
	      var sessHex            = AKT.HEXFormat(checkUser);
	      //console.log("499 session=" + sessHex);
	      document.getElementById("valueRet").innerHTML = "Error: 499 session= " + sessHex;
	      if(checkUser != null)
	    	  {
	             var checkB64           = AKTBase64.encode(checkUser); 
	             localStorage.setItem("session", checkB64);
	    	  }
	      return checkB64;
		}
		function transact() {
//		    var aegis              = top.hidden.document.aegisApplet;
		    var cm                 = AKTCM;
		    var k5B64              = localStorage.getItem("k5");
		    var k5                 = AKTBase64.decode(k5B64);
		    var u5B64              = localStorage.getItem("u5");
		    var sessionB64         = localStorage.getItem("session");
			var session            = AKTBase64.decode(sessionB64);
		    var u5                 = AKTBase64.decode(u5B64);
		         //alert("443 u5B64=" + u5B64 + "\nk5B64=" + k5B64);
		           document.getElementById("valueRet").innerHTML = "Error: 443 u5B64= " + u5B64 + "\nk5B64=" + k5B64;
		    var key                = cm.makeK5SessionKey(k5, session);
		    //alert("522 key=" + AKT.HEXFormat(key) + "\nk5=" + AKT.HEXFormat(k5) + "\nSession=" + AKT.HEXFormat(session));
		           document.getElementById("valueRet").innerHTML = "Error: 552 key= "  + AKT.HEXFormat(key) + "\nk5=" + AKT.HEXFormat(k5) + "\nSession=" + AKT.HEXFormat(session);
		    var aesAKT               = new AKTaes();
		    aesAKT.setEDC(true);
		    aesAKT.initialize(key);
		    var cData             = document.getElementById("dataV").value;
		    var encData           = aesAKT.encryptText(cData);
		    document.getElementById("u5d").value    = u5B64;
		    document.getElementById("datas").value = encData;
//		    alert("417 cvalue=" + document.getElementById("cvalue").value);
				$.ajax({
					type : "POST",
					url : "/AKTServer/signup",
					dataType : "json",
					data : $('#frmsenddata').serialize(),
					success : function(response) {
					var pong = response.pong;
					if( pong == "NAK")
					{
						   var KPPP = response.kppp;
		//
		// *****  need to verify user here
		//
		               var kppp = verifyUser(KPPP);
		               if(kppp != null)
		               {
					      document.getElementById("pong").value = pong;
		                  document.getElementById("kppp").value = KPPP;
	                     valueRet.innerHTML = valueRet.getAttribute("Success");	                  
		                //  document.getElementById("display").value = "Success";
						   // *****  here, we need to launch another page
		               } else {
		                  document.getElementById("valueRet").innerHTML = "Not Valid User";
		               }
					} else {
					   document.getElementById("pong").value = pong;
					   var error = response.error;
					   var kppp = response.kppp;
		               document.getElementById("kppp").value =kppp;
					   if(error == "53870923")
			               document.getElementById("valueRet").innerHTML = "User Not Found";
					   else if(error == "53870925")
		                   document.getElementById("valueRet").innerHTML = "Not Valid User";
					   else
		                   document.getElementById("valueRet").innerHTML = "Not Processed";

					}
					}
				});

			}
			
	function validateForm(email) {
	    var x = email;
	    var x=x.trim();
	    var atpos = x.indexOf("@");
	    var dotpos = x.lastIndexOf(".");
	    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
	        //alert("Not a valid e-mail address");
	        return false;
	    }
	    return true;
	}
		
	function pongSub(u5) {
	   var pongFrom               	= document.getElementById("pongValue").value;   
	   console.log("976 pong=" + pongFrom + " time=" + Date.now());
	   console.log("977 u5=" + u5);
	   var pingTo             	= ppp.secondPing(pongFrom);  // *****  compute the final ping
	   console.log("979 pingTo=" + pingTo);
	   document.getElementById('server03').value = ppp.getAKTLocal("server");
	   document.getElementById('socket03').value = ppp.getAKTLocal("socket");
	   var pppdec             	= document.getElementById("pppcheck03").value;
	   var pppu5           		= ppp.pingUserData(u5);
	   var pppfn           		= ppp.pingUserData("ZecureiT.uky");
	   var pppCheck           	= ppp.pingUserData(pppdec);
	   console.log("986 pppu5=" + pppu5);
	   document.getElementById("ping03").value      = pingTo;
	   document.getElementById("u503").value      	= pppu5;  
	   document.getElementById("fn03").value      	= pppfn;  
	   document.getElementById("pppcheck03").value  = pppCheck;
	   var pong					= null;
			$.ajax({
				type : "POST",
				url : "/AKTServer/signup",
				dataType : "json",
				data : $('#frmping03').serialize(), // ***** GETKC call

	//
	// *****  we are going to get back the action, PONG (or ERROR), KPPP (if not error)
//				
				success : function(response) {
				    document.getElementById("pppcheck03").value  = "pppDecrypt"; // *****  reset
					var error = response.error;
					console.log("1004 error=" + error);
	//
	// *****  if we find an error, we need to process it
	//
					if(error != null)
					{
						var error = response.error;
						var msg   = response.kppp;
						if(msg.length > 5){
							var decrypted = ppp.decryptUserData(msg);
//	 	                    ping(2);  // *****  this should reset the ppp protocol
							console.log("1015 error=" + error + "=" + decrypted);
							document.getElementById("status").value = "login failure";
							document.getElementById("pong").value = decrypted;
//							document.getElementById("u5").value = "";
//							document.getElementById("k5").value = "";
						}
						document.getElementById("kppp").value = error;
						processError(error);
					} else { // *****  we should have KA in the returned values
						pong = response.pong;
						var kppp = response.kppp;
	                    document.getElementById("pong").value       = pong;
	        	        document.getElementById("kppp").value       = kppp;
	        	        var decrypted          = ppp.decryptUserData(pong);
	        	        document.getElementById("decrypted").value  = decrypted;
	        	        console.log("910 length=" + decrypted.length + " KA=" + decrypted)
	        	        var u = ppp.getAKTLocal("username");
	        	        var p = ppp.getAKTLocal("password");
	    			    var pb               = getPBfromKA(decrypted, u, p);
	    			    var pbHex            = AKT.HEXFormat(pb);
	    			    console.log("884 pb=" + pbHex);
	        	        ppp.setAKTLocal("username", "");
	        	        ppp.setAKTLocal("password", "");
	        	        ppp.setAKTLocal("u5", "");
	        	        ppp.setAKTLocal("k5", "");
	    			    if(pb.length == 32){ // *****  pb MUST be 32 bytes or error
	    				    var retVar = makePBu5AndPB5k(pb);
	            	        ppp.setAKTLocal("pbu5", retVar[0]);
	            	        ppp.setAKTLocal("pb5k", retVar[1]);
	        			    console.log("897 pbu5=" + retVar[0] );
	            	        ppp.setAKTLocal("pb", pb);
	            	        ppp.setAKTLocal("KA", decrypted);
					  		document.getElementById("status").value = "success";
	//
	// *****  we will have to authenticate here because we need the pbu5 from the KA
	//
	            	        var pbu5b64 = ppp.getAKTLocal("pbu5");
	            	        document.getElementById('request').value = "AKTLOGIN";
	            	        document.getElementById('pbu5c').value 	 = pbu5b64;
	            	        document.getElementById('serverc').value = ppp.getAKTLocal("server");
	            	        document.getElementById('socketc').value = ppp.getAKTLocal("socket");
						    var aesAKT               = new AKTaes();
						    aesAKT.setEDC(true);
						    var pb5kb64 = ppp.getAKTLocal("pb5k");
						   	var key = AKTBase64.decode(pb5kb64);
						    aesAKT.initialize(key);
						    var z = document.getElementById('zingpass').value;
						    console.log("1073 zingpass=" + z + " pb5k=" + pb5kb64);
						    if(z.length == 6)
						    	var zingpass = aesAKT.encryptText(z);
						    else
						    	zingpass = z;
						    document.getElementById('zingpass').value = zingpass;
					  			$.ajax({
					  				type : "POST",
					  				url : "/AKTServer/signup",
					  				dataType : "json",
					  				data : $('#frmcontact').serialize(),

					  	//
					  	// *****  we are going to get back the action, PONG (or ERROR), KPPP (if not error)
//					  				
					  				success : function(response) {
					  					var error = response.error;
									    var aesAKT               = new AKTaes();
									    aesAKT.setEDC(true);
									    var pb5kb64 = ppp.getAKTLocal("pb5k");
		 						   	    var key = AKTBase64.decode(pb5kb64);
									    aesAKT.initialize(key);
					  					if(error != null)
					  					{
					  						var error = response.error;
					  						var msg   = response.kppp;
					  						if(msg.length > 5){
					  							var decrypted = aesAKT.decryptText(msg);
					  							console.log("1101 error=" + error + "=" + decrypted);
					  							document.getElementById("status").value = "login failure";
					  							document.getElementById("pong").value = decrypted;
					  						}
					  						document.getElementById("kppp").value = error;
					  						processError(error);
					  						document.getElementById("pppcheck03").value  = "pppDecrypt";
					  	    			  	var formData = getLoginForm();
					  	    			  	document.getElementById('contacts').innerHTML = formData;
					  					}else{
											pong = response.pong;
											var kppp = response.kppp;
		 						    	    var email        = aesAKT.decryptText(kppp);
		 						    	    var hash         = aesAKT.decryptText(pong);
		 						    	    var hashb64		 = AKTBase64.encode(hash);
		 						    	    console.log("1129 error=" + error + " email=" + email);
										    var local = ppp.getAKTLocal("localHash");
		 						    	    console.log("1131 local=" + local + " pong=" + hashb64 );
										    if(local != hashb64)
										    	contacts();
							    			var formData = getNoLoginForm();
							    			document.getElementById('contacts').innerHTML = formData;
					  					}
					  				}
					  			});
	    			    }
	    			    else
					  		document.getElementById("status").value = "login failed";
					}
				}
			});
			return(pong);
	/*
	     }
		else {
	   	alert("Please enter a valid email address");
			return false;
		}
	 */	
	}

	function sleep() {
		  console.log('time= done' + Date.now() );
		/*
		var ret = new Promise(
				function(resolve){
					var setTime = setTimeout(resolve, ms);
					resolve(setTime);
				}
				);
//		  return new Promise(resolve => setTimeout(resolve, ms));
//		};
	*/
	}
	function goToSleep(time,func, param) {
		  console.log('time=' + Date.now() + " param=" + param);
//		setTimeout(sleep,time);	
//		var KA = setTimeout(func(param),time);	
		var KA = setTimeout(func,time);	
		/*
		  console.log('Taking a break...');
		  sleep(time);
		  console.log('time=' + time);
		  */
		return(KA);
		}
	function getPB5k(){
		var pb5kB64 	= ppp.getAKTLocal("pb5k");
		var pb5k		= AKTBase64.decode(pb5kB64);
	    return pb5k;
	}

	function initializeCM(aesAKT, key, edc)
	{
	   aesAKT.setEDC(edc);
	   aesAKT.initialize(key);
	}

	function encryptTextCM(textIn)
	{
	   var aesAKT          = new AKTaes();
	   var pb5k 			= getPB5k();
	   initializeCM(aesAKT, pb5k, true);
	   var textEnc        = aesAKT.encryptText(textIn);
	   return (textEnc);
	}

	function decryptTextCM(textIn)
	{
	   var aesAKT          = new AKTaes();
	   var pb5k 			= getPB5k();
	   initializeCM(aesAKT, pb5k, true);
	   var clearText        = aesAKT.decryptText(textIn);
	   return (clearText);
	}

	function encryptRawCM( raw)
	{
	   var aesAKT          = new AKTaes();
	   var pb5k 			= getPB5k();
	   initializeCM(aesAKT, pb5k, true);
	   var byteArray  = aesAKT.encryptRaw(raw, raw.length);
	   var encText = toHexFromASCIIArray(byteArray); 
	   return (encText);
	}

	function decryptRawCM( encText)
	{
	   var aesAKT          = new AKTaes();
	   var pb5k 			= getPB5k();
	   initializeCM(aesAKT, pb5k, true);
	   var encRaw = AKTSha256.fromHex(encText);
	   var byteArray  = aesAKT.decryptRaw(encRaw, encRaw.length);
	   var rawHex = toHexFromASCIIArray(byteArray); 
	   var raw   = AKTSha256.fromHex(rawHex);
	   return (raw);
	}

	function encryptFileCM( fn)   // *****  new file will be created as .zrx
	{
	   var aesAKT          = new AKTaes();
	   var pb5k 			= getPB5k();
	   initializeCM(aesAKT, pb5k, true);
	   var newFile = aesAKT.encryptFile(fn);
	   return newFile;  // ***** note this is b64'ed
	}

	function decryptFileCM( fn)   // *****  new file will be created
	{
	   var aesAKT          = new AKTaes();
	   var pb5k 			= getPB5k();
	   initializeCM(aesAKT, pb5k, true);
	   var aesAKT          = new AKTaes();
	   var pb5k 			= getPB5k();
	   var newFile = aesAKT.decryptFile(fn);
	   return (newFile);
	}
	function base64EncodeCM( b64)   // *****  new file will be created
	{
	  var encoded = AKTBase64.encode(b64);
	//  ppp.setAKTLocal("test","cookie test", 2); 
	  return(encoded);
	}

	function base64DecodeCM( b64)   // *****  new file will be created
	{
	  var decoded = AKTBase64.decode(b64);
	//  ppp.deleteAKTLocal("test"); 
	  return(decoded);
	}

	function logoutCM()   // *****  remove all entries from the AKTLocal Storage except KA
	{
		var cookies = document.cookie.split(';');
		for(var i=1; i <= cookies.length; i++){
			var j = cookies[i-1].indexOf("server=");
			var k = cookies[i-1].indexOf("socket=");
			var l = cookies[i-1].indexOf("p=");
			var m = cookies[i-1].indexOf("e1=");
			var n = cookies[i-1].indexOf("d1=");
			console.log("1280  j=" + j + " k=" + k 
					+ " l=" + l + " m=" + m + " n=" + n + " cookie=" + cookies[i-1]);
//			if((j < 0) && (k < 0) && (l < 0) && (m < 0) && (n < 0)   ){
			if(j < 0) 
				if(k < 0) 
					if (l < 0) 
						if (m < 0) 
							if (n < 0)   {
								console.log("1282 delete=" + cookies[i-1] );
								ppp.deleteAKTLocal(cookies[i-1]);
								}
		}
		var formData = getLoginForm();
		document.getElementById('contacts').innerHTML = formData;
	/*	
	    ppp.setAKTLocal("username", "");
	    ppp.setAKTLocal("password", "");
	    ppp.setAKTLocal("u5", "");
	    ppp.setAKTLocal("k5", "");
	    ppp.setAKTLocal("pbu5", "");
	    ppp.setAKTLocal("pb5k", "");
	    ppp.setAKTLocal("KA", "");
	    ppp.setAKTLocal("pb", "");
	    ppp.setAKTLocal("serverHash", "");
	    ppp.setAKTLocal("localHash", "");
	 */    
	    return(true);
	}
	function testNull() {
	    var maybe = ppp.getAKTLocal("isanull", "");
	    if(maybe == null)
	    	console.log("1055 maybe is null");
	    else
	    	console.log("1057 maybe is NOT null");
	    if(typeof(OKmaybe) == 'undefined')
	    	console.log("1059 VarType OKmaybe is undefined");
	    else
	    	console.log("1061 VarType OKmaybe is NOT undefined");
	    if(maybe == 'undefined')
	    	console.log("1063 maybe is undefined");
	    else
	    	console.log("1065 maybe is NOT undefined");
	    	


	}
	function showSubmit() {
		//document.frmregister.style.visibility=hidden;
		//document.getElementById("frmregister").style.display='none';
		//alert("In showSubmit()");
			document.getElementById("submitIt").style.display='table-row';
		}

		function DoOnload(action) {
			var date = Date.now();
			  console.log("39 Action1=" + action + " index=" + document.cookie.indexOf('logintime') );
			  console.log("40 logintime=" + ppp.ifExistsAKTLocal('logintime'));
			  if (document.cookie.indexOf('logintime') < 0 ) {
				  var dateStr = date.toString();
				  ppp.setAKTLocal("logintime", dateStr);
				  console.log("41 Action2=" + action + " date=" + dateStr );
					var formData = getLoginForm();
					document.getElementById('contacts').innerHTML = formData;
				}	   
			else{
				var oldDateStr = ppp.getAKTLocal("logintime");
				var oldDate = parseInt(oldDateStr);
				var delta = date - oldDate;
				var timeToLog = 2*60*1000;
				var isKA		= document.cookie.indexOf('KA');
				console.log("47 Action3=" + action + " date=" + date + " old=" + oldDate
						+ " delta=" + delta + " logtime=" + timeToLog + " isKA=" + isKA);
				if(delta > timeToLog || isKA < 0){ // *****  login timer to be set larger
					ppp.setAKTLocal("logintime", date.toString());
					var formData = getLoginForm();
					document.getElementById('contacts').innerHTML = formData;
				} else {
					console.log("57 delta=" + delta );
					var formData = getNoLoginForm();
					document.getElementById('contacts').innerHTML = formData;
				}
			}
		    if(action != 1){
		        ppp.setAKTLocal("server","207.81.189.121");  // ***** Dev server
		        action =1;
		    }
		    else
		    	ppp.setAKTLocal("server","67.212.168.34"); // ***** Chicago
		   ppp.setAKTLocal("socket","12312"); 
		   console.log("69 server=" + ppp.getAKTLocal("server"));
		   console.log("70 cookie=" + document.cookie); // *****  retrieves the cookie list
		//
		// *****  if we were doing this correctly, this would trigger the pingfct function to do the 
//		        first ping in the background.
		//   
		//   var formData = getLoginForm();
//			document.getElementById('contacts').innerHTML = formData;
		}

		   function getLoginForm() {
		    var formData = '';
		    formData += '<h3>Please Authenticate Yourself</h3>';
		    formData += '<form id="frmlogin" name="secure">';
		    formData += 'UserName  <input type="text" id="username" name="username" value="mugwump"> <br> ';
		    formData += 'Password  <input type="password" id="password"  name="password" value="12345678"><br>';
		    formData += 'ZingPass  <input type="text" id = "zingpassin" name="zingpassin"   value="1"> (optional)<br>';
		    formData += '<input type="hidden" name="AKTRequestID" value="AKTLogin">';
		    formData += '<input type="hidden" id = "serverl" name="serverl"   value="">';
			formData += '<input type="hidden" id = "socketl" name="socketl"   value="">';
			formData += '<input type="hidden" id = "cvalue" name="cvalue"   value="">';
			formData += '<input type="button" value="Authenticate " onclick="login()"><br><br>';
			formData += '<input type="button" value="Secure Logout " onclick="logout()"><br><br>';
			formData += '<input type="button" value="Show Contacts " onclick="contacts()"><br><br>';
		    formData += '</form>';
		    return formData;
		}    

		   function getNoLoginForm() {
			    var formData = '';
			    formData += '<h3>Functions Here</h3>'
			    formData += '<form id="frmnologin" name="nologin">'
				formData += '<input type="button" value="Secure Logout " onclick="logout()"><br><br>'
				formData += '<input type="button" value="Show Contacts " onclick="contacts()"><br><br>';
			    formData += '</form>';
			    return formData;
			}    

		   function getContactForm(json) {
			    var formData = '';
		  		var obj = JSON.parse(json);
		  		var l = obj.contacts.length;
				var contactTable= '<form id="frmcontact" name="contact"><br>';
				contactTable += '<input type="button" value="Secure Logout " onclick="logout()"><br><br>';
				contactTable += '<table><tr><th>Contacts</th></tr>';
				contactTable +=	'<tr><th>email</th><th>name</th><th>phone</th></tr>';
				var c = null; var d = null; var e = null; var f = null;
		  		for(var i=0; i<l; i++){
					var email 	= obj.contacts[i].email;
					var name	= obj.contacts[i].name;
					var phone = "";
					if(obj.contacts[i].hasOwnProperty('phone'))
						phone	= obj.contacts[i].phoneNo;
					var zingme ="";
					if(obj.contacts[i].hasOwnProperty('zingmeKey'))
						zingme	= obj.contacts[i].zingmeKey;
					c =  '<tr><td><input type="text" size="40" id="email' + i + '" name="email' + i + '" value="' + email + '"></td>';
					d =  '<td><input type="text" size="20" id="name' + i + '" name="name' + i + '" value="' + name + '"></td>';
					e =  '<td><input type="text" size="12" id="phone' + i + '" name="phone' + i + '" value="' + phone + '"></td>';
					f =  '<td><input type="hidden" id="zingme' + i + '" name="zingme' + i + '" value="' + zingme + '"></td></tr>';
					contactTable += c + d+ e + f;
		  		}
		//
		// *****  now, add the groups
		//
//		  		var m = obj.groups.length;
		  		var keys 	= Object.keys(obj.groups);
		  		var g 	 	= keys.length;
		  		var k		= 0;
		  		console.log("135 keys=" + g + " type=" + typeof Object.keys);
		  		var group;
		  		var emails = [];
		  		if(g > 0){
		  			contactTable += '<table><tr><th>Groups</th></tr>';
		  	  		for(var i=0; i < g; i++){
		  	    		group = Object.keys(obj.groups[i]);  // *****  this gives group name
		  	    		console.log("141 group=" + group);  
//		  	  			contactTable +=	'<tr><th>' + group + '</th></tr>';
			    			contactTable +=  '<tr><td><input type="text" size="40" id="group' + k + '" name="group' + k++ + '" value="' + group + '"></td></tr>';
		  	    		emails= obj.groups[i][group];
		  	    		var el = emails.length;
		  	    		for(j=0; j<el; j++){
		  	    			email = emails[j].email
		  	    			contactTable +=  '<tr><td><input type="text" size="40" id="gemail' + i + "_" + j + '" name="gemail' + i + "_" + j + '" value="' + email + '"></td></tr>';
		  	    			console.log("153 email=" + emails[j].email);
		  	    		}
		  	    		contactTable += '<tr><input type="hidden" id=' + group + i + ' value="' + el + '"></tr>';
		  	  		}
		  		} else {
		  			
					contactTable += '<table><tr><th>no groups</th></tr>';
		  			console.log("160 no groups present");
		 		}
		  		var u = 0;
		  		if(obj.hasOwnProperty('unknown'))
		  	  		var u = obj.unknown.length;
		  	  	if(u > 0){
		 			console.log("166 has unknowns");
					contactTable += '<table><tr><th>unknown</th></tr>';
		  	  		for(i=0; i<u; i++){
		  				var uemail 	= obj.unknown[i].email;
			    			contactTable +=  '<tr><td><input type="text" size="40" id="uemail' + i  + '" name="uemail' + i + '" value="' + uemail + '"></td></tr>';
		  	  		}
		  		} else {
					contactTable += '<table><tr><th>no unknowns</th></tr>';
		  			console.log("174 no unknowns present");
		  		}  		
		  		contactTable += '<tr><td><input type="hidden" id="numcontacts"' +' value="' + l + '"></td>';
		  		contactTable += '<td><input type="hidden" id="numgroups"' +' value="' + g + '"></td>';
		  		contactTable += '<td><input type="hidden" id="numunknown"' +' value="' + u + '"></td></tr>';
		 		f  = '</table><input type="button" value="Save Contacts" onclick="savecontacts()">';
		 		f += '<input type="button" value="Clear" onclick="clearcontacts()"><br><br>';
				contactTable += f + "</form>";
//					document.getElementById('contacts').innerHTML = contactTable;
//		  		console.log("678  html=" + contactTable);
		//
		// *****  need to add groups and unknowns
//				
		  		return contactTable;
		   }
		   
		function toHexFromASCIIArray(byteArray) {
			  return Array.from(byteArray, function(byte) {
			    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
			  }).join('')
			}

		function getUnicodeString(chx)
		{
		    j = 0;
			var sb="";
			var aNull = 0x7d;
			for (var i = 0; i < chx.length; i++ ){
		    b1 = (chx.charAt(i));
		    sb +=b1;
		    sb += String.fromCharCode(0x00);
			}
			return(sb);
		}

		function reverse (s) {
			var j = s.length-1;
//			var o = [s[j--]];
			var o = '';
			for (var i = s.length - 1 ; i >= 0; o += s[i--]) { }
//			for (var i = 0 ; i < s.length - 2; i++){ o.push( s[j--])  };
		    var hexrev = AKT.HEXFormat(o);
		    var srev = AKT.HEXFormat(s);
//			alert("61 rev 4=" + hexrev + " s=" + srev);
			return o;
			}

		    function getRandomKey(n){
		    	var d = Date.now();
		    	var dstr = d.toString();
		        prng = AKTPRNG;
		    	prng.Zeroize();
		    	var seed                  = prng.FIPS186_2_RNG_SetSeed(dstr, dstr.length);
		        var rnd1                  = prng.GetRandomString();
		        var rnd2                  = prng.GetRandomString();
		        var longKey = rnd1 + rnd2;
		    	var hexkey = AKT.HEXFormat(longKey);
		        var key = longKey.substring(0,n);
		        return key; 		
		    }

		    function getPBfromKS(ks, ans1In, ans2In) {
//		    	function makeKS(pb, ans1In, ans2In) {
		    	    var ans1 = ans1In.toLowerCase().trim();
		    	    var ans2 = ans2In.toLowerCase().trim();
		    		  console.log("1689 ans1=" + ans1 + " ans2=" + ans2 );
		    		var buffer = "";
		    	    var buf = "";
		    		for (i = 0; i < 32; i++)
		    			if(i < ans1.length)
		    	  		   buf += String.fromCharCode(0xca ^ ans1.charCodeAt(i));
		    			else
		    		  	   buf += String.fromCharCode(0xca);
		    		
		    		var bufrev = "";	// *****  protocol says to reverse the string	
		    		var l = ans2.length;
		    		var m = 0;
//		    		for (i=0; i<32; i++){
//		    	  		   buf[31-i]= String.fromCharCode(buf.charCodeAt(31-i) ^ ans2.charCodeAt(i));
//		    		}
		    		
		    		for (i = 0; i < 32; i++)
		    			if(i > (31-ans2.length)){
//		    	  		   bufrev += String.fromCharCode(buf.charCodeAt(31 + m -l) ^ ans2.charCodeAt(l-m));
		    	  		   bufrev += String.fromCharCode(buf.charCodeAt(i) ^ ans2.charCodeAt(l-m-1));
		    	  		   m++;
		    			}
		    			else
		    		  	   bufrev += String.fromCharCode(buf.charCodeAt(i));
		    			var prtrev = AKT.HEXFormat(bufrev);
	 
	    			var prtrev = AKT.HEXFormat(bufrev);
		    		  console.log("1789 l=" + l + " buf=" + prtrev );
		    	    var bitArray   = sjcl.hash.sha256.hash(bufrev); // ***** bitData is an object
		    	    var hash = sjcl.codec.hex.fromBits(bitArray);
		    		  console.log("1708 hash=" + hash );
		    	    var serverHash		= AKT.fromHex(hash);
		    	    var aesAKT               = new AKTaes();
		    	    aesAKT.setEDC(true);
		    	    aesAKT.initialize(serverHash);
		    	    var pb           = aesAKT.decryptText(ks);
		    	    var hexpb		 = AKT.HEXFormat(pb);
		    		  console.log("1728 pb=" + hexpb );
			    	    aesAKT.setEDC(true);
		    		var checkKS = aesAKT.encryptText(ppp.getAKTLocal("pb"))
		    		  console.log("1802 checkKS=" + checkKS );
		    		  console.log("1803      KS=" + ks );
		    		var check2KS = makeKS(ks,ans1In, ans2In );
		    		  console.log("1803   makeKS=" + check2KS );
		    		
		    		return (pb);
		    		}

		    function getReturnVars(akt) {
			var l = akt.length;
			console.log("2046 AKTRequestID=" + akt[0]);
			for(j=0; j<l; j++){
				if(akt[j] !=null){
					var i     = akt[j].indexOf("=");
					var left  = akt[j].substring(0, i);
					var right = akt[j].substring(i+1);
					console.log("2052 left=" + left + " right=" + right);
				}
			}
	    }   

		function getQuestionNumbers(q1Value, q2Value){
			var q = [];
	  	  	if(windows)
					fileName = "c:\\apache-tomcat-8.5.41\\webapps\\Questions.dat";
				else
					fileName = "/usr/local/tomcat/webapps/Questions.dat";
	  	  	var questions = read(fileName).split("\n");
	  	  	var j = 0;
	  	  	for(var i=0; i<questions.length; i++){
	  	  		if(q1Value.compareTo(questions[i] == 0)){
	  	  			g[0] = i + 1;
	  	  			j++;
	  	  			console.log("2240 q1=" + i+1)
	  	  		}
	  	  		if(q2Value.compareTo(questions[i] == 0)){
	  	  			g[1] = i + 1;
	  	  			j++;
	  	  			console.log("2245 q2=" + i+1)
	  	  		}
	  	  		if( j > 1) 
	  	  			break;
	  	  	}
			return g;
		}
		    
	 
