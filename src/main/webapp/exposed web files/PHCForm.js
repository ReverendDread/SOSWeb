var targetServer 	= '69.175.62.83';
var targetPort		= '12312';

function buildWelcomeForm(){
		document.getElementById("question").innerHTML = "Welcome to Precision Health Corp";
		  var workDiv 	= document.getElementById("answers");
		var htmlText = `	
			<form id = "imhheader">
			<table class="gridtable">
	        	<td> <input type="hidden" width="200px" id="id" name="id" value=444></td></tr> 
	        	<td> <input type="hidden" width="200px" id="jsonrpc" name="jsonrpc" value="2.0"></td></tr> 
	        	<td> <input type="hidden" width="200px" id="method" name="method" value="beginIMHInterview"></td></tr> 
			</table>
			</form>
			<form id = "frmlogin">
			<p>Precision Health Corp</p>
				<table class="gridtable">
				<tr><td width="120">Email</td>
	        		<td> <input type="text" width="200px" id="email" name="email"></td></tr> 
				<tr><td>First Name</td>
	        		<td> <input type="text" width="200px" id="Firstname" name="Firstname"></td></tr> 
				<tr><td>Last Name</td>
	        		<td> <input type="text" width="200px" id="Lastname" name="Lastname"></td></tr> 
				<tr><td>Birth Date</td>
        		<td> <input type="text" width="200px" id="DOB" name="DOB" value="MM/DD/YYYY"></td></tr>
				<tr><td>UID</td>
	        		<td> <input type="text" width="200px" id="uid" name="uid" value="1"></td></tr> 
	        	<tr><td>What is your Gender?</td>  
	        	<tr> <td><input type="checkbox" id="Male"   name="Gender" value="Male">Male<br></td></tr>   
	        	<tr><td><input type="checkbox" id="Female" name="Gender" value="Female">Female<br> </td> </tr>   
				<tr><td ><input id="FormBTN"  type="button" value="Begin" onclick="getIMHForm()"></td></tr>
			</table>
		</form>	`;  
		  workDiv.innerHTML = htmlText;
	}
	
function buildClinicianForm(){		// ****  this is called by Clinician.html to register and request
//		document.getElementById("question").innerHTML = "Welcome to Precision Health Corp";
		var portalDiv 	= document.getElementById("portalForm");
		var headerPart	=`<main role="main" class="container">
			<div id="frmReturn">
			<p id="valueRet" name="valueRet"></p>
			</div> 
			<div class="jumbotron">
<!--
			<p id="question">This is where the questions would go</p>
			<p id="status"></p>
-->	    
			<div class="d-block my-3" id="answers">
			<!--  dynamically generated forms will go here -->
		</div>	`;
		
		var footerPart	=`    	<div class="col-md-12 btn-toolbar" id="btns" >
	         <input class="btn btn-secondary mr-1" type="button" value="Submit" onclick="goNext()">
	         <input class="btn btn-secondary mr-1" type="button" value="Previous Question" onclick="goBack()">
	         <input class="btn btn-secondary mr-1" type="button" value="Skip Question" onclick="goSkip()">
	         <input class="btn btn-secondary mr-1" type="button" value="Quit Survey" onclick="goCancel()">
	         <input type="hidden" id="forJon" value="">
	    </div>
	</div>
<!-- This shows what is happening on registration -->
 <div id = "displayArea">
        <form id="frmdisplay">
        <table "displaytable">
            <textarea id="regstatus" value="waiting" style="width:600px;height:30px;"></textarea>
        </table>
        </form>
    	<input type="hidden" id="server" name="server"   value="">
    	<input type="hidden" id="socket" name="socket"   value="">
</div>	
</main> `;
		
//		  var workDiv 	= document.getElementById("answers");
		  setupRegisterServer(targetServer, targetPort);
		  var htmlText = `	
		  <div id = "Authenticate">
			<form id = "imhheader">
			<table class="gridtable">
	        	<td> <input type="hidden" width="200px" id="id" name="id" value=200></td></tr> 
	        	<td> <input type="hidden" width="200px" id="jsonrpc" name="jsonrpc" value="2.0"></td></tr> 
	        	<td> <input type="hidden" width="200px" id="method" name="method" value="submitPatient"></td></tr> 
			</table>
			</form>
			<form id = "frmlogin">
<!--
			<table class="gridtable">
				<tr><td>Clinician Id Number</td>
	        	<td> <input type="text" width="200px" id="cuid" name="cuid" placeholder="100"><br></td></tr> 
			</table> 
-->	        		
<input type="hidden" id="cuid" name="cuid">
				<table class="gridtable">
	        		<br><tr><h3> Patient Information</h3></tr>
				<tr><td width="120">Patient ID</td>
	        		<td> <input type="text" width="200px" id="uid" name="uid" value=""></td></tr> 
					<tr><td>Patient SSN</td>
		        		<td> <input type="text" width="200px" id="ssn" name="ssn" placeholder="123-55-9876"></td></tr> 
				<tr><td>Email</td>
	        		<td> <input type="text" width="200px" id="email" name="email" ></td></tr> 
				<tr><td>First Name</td>
	        		<td> <input type="text" width="200px" id="Firstname" name="Firstname"></td></tr> 
				<tr><td>Last Name</td>
	        		<td> <input type="text" width="200px" id="Lastname" name="Lastname"></td></tr> 
				<tr><td>Birth Date</td>
        		<td> <input type="text" width="200px" id="DOB" name="DOB" placeholder="MM/DD/YYYY"></td>
        		</tr> 
			  <tr><td> <input type="hidden" id="email03" name="email03" value="a@b.com"></td></tr> 
			  <tr><TD> <input type="hidden" id="cell" name="cell" value=""></td></tr> 
			  <TR><TD> <input type="hidden" id="username" value="testuser"></td></tr>
			  <TR><TD> <input type="hidden" id="pass1" value="testpass"></td></tr>
			  <TR><TD> <input type="hidden" id="Q1"></td></tr>
			  <TR><TD> <input type="hidden" id="Q2"></td></tr>
			  <TR><TD> <input type="hidden" id="Q1Answer"></td></tr>
			  <TR><TD> <input type="hidden" id="Q2Answer"></td></tr>
			  <TR><TD> <input type="hidden" id="pppcheck" name="pppcheck"   value="pppDecrypt"></td></tr>
			  <TR><TD> <input type="hidden" id = "SecLevel" name="SecLevel" value="1"></td></tr>
			  <TR><TD> <input type="hidden" id="action" value="patient"></td></tr>
			  <TR><TD> <input type="hidden" id="server" name="server"   value=""></td></tr>
			  <TR><TD> <input type="hidden" id="socket" name="socket"   value=""></td></tr>
	      		<tr><div class="form-group row col-sm-10" id="quest"></div></tr>
	     		</table>
	 		<table class="gridtable">
				<tr><td>What is patient's Gender?</td>  
	        	<tr> <td><input type="checkbox" id="Male"   name="Gender" value="Male">Male<br></td></tr>   
	        	<tr><td><input type="checkbox" id="Female" name="Gender" value="Female">Female<br> </td> </tr>   
				<tr><td ><input id="FormBTN"  type="button" value="Submit" onclick="PHCStart()"></td></tr>
				<tr><td ><input id="nextBTN"  type="button" value="Next" onclick="buildClinicianForm()"></td></tr>
<!--				<tr><td ><input id="nextBTN"  type="button" value="Next" onclick="processNext()"></td></tr>-->
			    <tr><td ><input id="cancelBTN"  type="button" value="Cancel" onclick="cancel('patient')"></td></tr>
			</table>
		</form> </div>
	<!--	
		 <div id="startHere">
		 <form name="frmregister" id="frmregister">
			  <Table name="RegTable">
			  </table>
			  <div id="afterUID" name="afterUID">
			  	<p> UID&nbsp;&nbsp;<input type="text" id="guid" name="guid" value=""></p> 
	      </form>
	      </div> -->
	      
		  <input type="hidden" id="server" name="server"   value="">
		  <input type="hidden" id="socket" name="socket"   value="">

	      `;  
		  portalDiv.innerHTML = headerPart +htmlText + footerPart;
		  nextBTN.style.display = 'none';
		  document.getElementById("cuid").value = 	document.getElementById('clinicianid').value ;
//		  workDiv.innerHTML = htmlText;
//		  getQuestionnaireList();
	}

function registerPatient(){
//	setupRegisterServer('69.175.62.83','12312');
	setupRegisterServer(targetServer, targetPort);
	registerPHCFinal08();
}

function buildPatientForm(){ // *****  patient.html to get questionnaire prescribed by clinician
	document.getElementById("question").innerHTML = "Welcome to Precision Health Corp";
	  var workDiv 	= document.getElementById("answers");
	var htmlText = `	
		<form id = "imhheader">
		<table class="gridtable">
      	<td> <input type="hidden" width="200px" id="id" name="id" value=100></td></tr> 
      	<td> <input type="hidden" width="200px" id="jsonrpc" name="jsonrpc" value="2.0"></td></tr> 
      	<td> <input type="hidden" width="200px" id="method" name="method" value="beginIMHInterview"></td></tr> 
		</table>
		</form>
		<form id = "frmlogin">
			<table class="gridtable">
			<tr><td>UID</td>
      		<td> <input type="text" width="200px" id="uid" name="uid" value="1"></td></tr> 
			<tr><td ><input id="FormBTN"  type="button" value="Begin" onclick="getQuestions();"></td></tr>
		</table>
	</form>
`;  
	  workDiv.innerHTML = htmlText;
	
}

function buildRegisterPatientForm(){
	document.getElementById("question").innerHTML = "Welcome to Precision Health Corp";
	  var workDiv 	= document.getElementById("answers");
	  
	var htmlText = `	
		<form id = "imhheader">
		<table class="gridtable">
      	<td> <input type="hidden" width="200px" id="id" name="id" value=222></td></tr> 
      	<td> <input type="hidden" width="200px" id="jsonrpc" name="jsonrpc" value="2.0"></td></tr> 
      	<td> <input type="hidden" width="200px" id="method" name="method" value="registerPatient"></td></tr> 
		</table>
		</form>
		<form id = "frmlogin">
		<p>Precision Health Corp</p>
<!--		</table> -->
      		
			<table class="gridtable">
			<tr><td>Email</td>
      		<td> <input type="text" width="200px" id="email" name="email"></td></tr> 
			<tr><td>First Name</td>
      		<td> <input type="text" width="200px" id="Firstname" name="Firstname"></td></tr> 
			<tr><td>Last Name</td>
      		<td> <input type="text" width="200px" id="Lastname" name="Lastname"></td></tr> 
        		<td> <input type="text" width="200px" id="DOB" name="DOB" value="MM/DD/YYYY"></td>
        		
			<tr><td>UID</td>
      		<td> <input type="text" width="200px" id="uid" name="uid" value="1"></td></tr> 
      	<tr><td>What is your Gender?</td>  
      	<tr> <td><input type="checkbox" id="Male"   name="Gender" value="Male">Male<br></td></tr>   
      	<tr><td><input type="checkbox" id="Female" name="Gender" value="Female">Female<br> </td> </tr>   
			<tr><td ><input id="FormBTN"  type="button" value="Begin" onclick="registerPatient();"></td></tr><br>
			<tr><td ><input id="FormBTN"  type="button" value="Cancel" onclick="cancel('patient')"></td></tr>
		</table>
	</form>
<!-- This shows what is happening on registration -->
<!--
 <div id = "displayArea">
        <form id="frmdisplay">
        <table "displaytable">
            <textarea id="regstatus" value="waiting" style="width:600px;height:30px;"></textarea>
        </table>
        </form>
</div>	
 -->    	

`;  
	  workDiv.innerHTML = htmlText;
}

function buildScheduleForm(){ 		// *****  This is called by Schedule.html to request patient Questionnaire
//	document.getElementById("question").innerHTML = "Welcome to Precision Health Corp";
//	  var workDiv 	= document.getElementById("answers");
	  var portalDiv 	= document.getElementById("portalForm");
	  var headerPart = `<main role="main" class="container">
		  <div class="jumbotron">
<!--
		  <p id="question">This is where the questions would go</p>
-->
		  <p id="status"></p>
		  <div class="d-block my-3" id="answers">
		  <!--  dynamically generated forms will go here -->
		  </div>`;
	  
	var htmlText = `
		<div id="Authenticate"> 	
		<form id = "imhheader">
		<table class="gridtable">
      	<td> <input type="hidden" width="200px" id="id" name="id" value=300></td></tr> 
      	<td> <input type="hidden" width="200px" id="jsonrpc" name="jsonrpc" value="2.0"></td></tr> 
      	<td> <input type="hidden" width="200px" id="method" name="method" value="submitSchedule"></td></tr> 
		</table>
		</form>
		<form id = "frmlogin">
      	<input type="hidden" id="cuid" name="cuid"> 
		<table class="gridtable">
      		<tr><td><h3> Patient Information</h3></td></tr>
			<tr><td>Patient ID</td>
      			<td> <input type="text" width="200px" id="uid" name="uid" value="10"></td></tr><br> 
		</table> 
 			<table class="gridtable"> 
      		<tr><div class="form-group row col-sm-10" id="quest"></div></tr>
			<tr><td ><input id="FormBTN"  type="button" value="Submit" onclick="sendScheduleRequest()"></td></tr><br>
			<tr><td ><input id="FormBTN"  type="button" value="Cancel" onclick="cancel('schedule')"></td></tr>
		</table>
	</form> </dive
<!-- This shows what is happening on registration -->
 <div id = "displayArea">
        <form id="frmdisplay">
        <table "displaytable">
            <textarea id="regstatus" value="waiting" style="width:600px;height:30px;"></textarea>
        </table>
        </form>
    	<input type="hidden" id="server" name="server"   value="">
    	<input type="hidden" id="socket" name="socket"   value="">
</div>	
	
	`;  
//	  workDiv.innerHTML = htmlText;
	  portalDiv.innerHTML = headerPart + htmlText;
	  getQuestionnaireList();
	  console.log("276 uid=" + ppp.getAKTLocal("UID"));
	  document.getElementById("cuid").value = 	document.getElementById('clinicianid').value ;
	
}

function buildRegisterClinicianForm(){
	var portalDiv 	= document.getElementById("Authenticate");
	var htmlText = `   
	<div id="frmReturn">
		<p id="valueRet" name="valueRet"></p>
	</div> 
    <div id="startHere">
 	<form name="frmregister" id="frmregister">
     <div id="Credentials">
      <p id="title">Please fill in the form to register</p>
      <Table name="RegTable">
       <tr><tdwidth="120">Email Address</td><td> <input type="text" id="email" name="email" placeholder="a@b.com"></td></tr> 
       <tr><td>Phone</td><td> <input type="text" id="cell" name="cell" value=""></td></tr> 
       <TR><TD class="alt"><label for="Username" style="label">Username:</label></TD><TD><input type="text" id="username" placeholder="testuser"></td></tr>
       <TR><TD class="alt"><label for="pass1" style="label">Password:</label></TD><TD><input type="password" id="pass1" placeholder="testpass"></td></tr>
       <TR><TD><input type="hidden" id="Q1"></td></tr>
       <TR><TD><input type="hidden" id="Q2"></td></tr>
       <TR><TD><input type="hidden" id="Q1Answer"></td></tr>
       <TR><TD><input type="hidden" id="Q2Answer"></td></tr>
       <TR><TD><input type="hidden" id="Firstname" value = "first"></td></tr>
       <TR><TD><input type="hidden" id="Lastname" value = "last"></td></tr>
	   <TR><TD> <input type="hidden" id="action" value="clinician"></td></tr>
	   <tr><td><input type="button" id = "regFinal" value="Finalize Registration Here" onclick="PHCS()"></td></tr><br>
			<tr><td ><input id="FormBTN"  type="button" value="Cancel" onclick="cancel('clinician')"></td></tr>

   	   <input type="hidden" id="pppcheck" name="pppcheck"   value="pppDecrypt">
       <input type="hidden" id = "SecLevel" name="SecLevel" value="3">

      </table>
      
	<div id="afterUID" name="afterUID">
     <br> <p> UID&nbsp;&nbsp;<input type="text" id="uid" name="uid"></p> 
<!--	  <button id="buttonUID" onclick="next();">This is the after button</button> -->
	</div>

    </div> 		<!-- credentials -->
     </form>	<!-- frmregister -->
   </div> 		<!-- startHere   -->

<!-- This shows what is happening on registration -->
<!--
		<div id = "displayArea">
        <form id="frmdisplay">
        <table "displaytable">
            <textarea id="regstatus" value="waiting" style="width:600px;height:30px;"></textarea>
        </table>
        </form>
    	<input type="hidden" id="server" name="server"   value="">
    	<input type="hidden" id="socket" name="socket"   value="">
		</div>-->	
		`;
	  portalDiv.innerHTML = htmlText;
//	  setupRegisterServer('69.175.62.83','12312');
	  setupRegisterServer(targetServer, targetPort);
} 

function buildLoginForm(){
	var workDiv 	= document.getElementById("portalForm");
	var htmlText =`<main role="main" class="container">
		<!-- This shows what is happening on registration -->
		<div id = "displayArea">
        	<form id="frmdisplay">
        		<table "displaytable">
            		<textarea id="regstatus" value="waiting" style="width:600px;height:30px;"></textarea>
				</table>
    			<input type="hidden" id="server" name="server"   value="">
    			<input type="hidden" id="socket" name="socket"   value="">
			</form>
		</div>	
		<div id="Authenticate">
			<form id="frmlogin" name="secure">
				<table width="700">
				<tr><td width="120">UserName</td><td>  	<input type="text" id="username" name="username" value=""> </td></tr> 
				<tr><td>Password  </td><td>	<input type="password" id="password"  name="password" value=""></td></tr>
							<tr><td><input type="button" value="Authenticate " onclick="login()"></td></tr>
							<tr><td><input type="button" value="Register " onclick="registerClinician()"></td></tr>
            </table>				
							<input type="hidden" width="50px" id="code3" name="code3" value="Aegis">
				
			</form>
		</div>	
	
		</main>`;
	  workDiv.innerHTML = htmlText;
}

function makeSuccessLoginForm(){
	  var workDiv 	= document.getElementById("Authenticate");
	  document.getElementById("iframebtns").style.display='none';
	  document.getElementById("iframehere").style.display='none';
/*	  
	  var iframe = document.getElementById('IMH_iframe');
	    iframe.height		= "0";
	    iframe.scrolling 	= "yes";
	    iframe.width		= "0";    
	    iframe.srcdoc 		= "";	
	    iframe.src			= "";
 */	    
//	  var workDiv 	= document.getElementById("portalForm");
		var htmlText = `	
			<form id = "imhheader">
			<table class="gridtable">
	        <tr><td> <input type="hidden" width="200px" id="id" name="id" value=150></td></tr> 
	        <tr><td> <input type="hidden" width="200px" id="jsonrpc" name="jsonrpc" value="2.0"></td></tr> 
<!--
	        <tr><td> <input type="hidden" width="200px" id="method" name="method" value="submitPatient"></td></tr> 
			<tr><td ><input id="FormBTN"  type="button" value="Onboard Patient" onclick="onboardPatient()"></td></tr><br>
			<tr><td ><input id="btnSched" type="button" value="Schedule Patient" onclick="schedulePatient()"></td></tr>
			<tr><td ><input id="getSched" type="button" value="Get Scheduled List" onclick="buildGetScheduledListForm()"></td></tr>
			<tr><td ><input id="getComplete" type="button" value="Get Completed List" onclick="buildGetCompletedForm()"></td></tr><br>
			<tr></tr><tr></tr>
			<tr><td ><input id="patientBTN"  type="button" value="Act for Patient" onclick="buildActAsPatientForm()"></td></tr><br>
-->

			PHC Clinician Portal
			</table>
			</form>
			`;
			  workDiv.innerHTML = htmlText;
			  makeVisible();
}


function buildGetScheduledListForm(){ // *****  patient.html to get questionnaire prescribed by clinician
//	document.getElementById("question").innerHTML = "Welcome to Precision Health Corp";
	  var workDiv 	= document.getElementById("portalForm");
	  var headerPart = `<main role="main" class="container">
		  <div class="jumbotron">
		  <p id="question"><h3>Retrieve a List of Scheduled Questionnaires</h3> </p>
		  <p id="status"></p>
		  <div class="d-block my-3" id="answers">
		  <!--  dynamically generated forms will go here -->
		  </div>
		<div id="Authenticate">
		</div>`;
	  
	var htmlText = `	
	<div id = "loginhere">
		<form id = "imhheader">
		<table class="gridtable">
      	<td> <input type="hidden" width="200px" id="id" name="id" value=400></td></tr> 
      	<td> <input type="hidden" width="200px" id="jsonrpc" name="jsonrpc" value="2.0"></td></tr> 
      	<td> <input type="hidden" width="200px" id="method" name="method" value="getScheduledIMHInterviews"></td></tr> 
		</table>
		</form>
		<form id = "frmlogin">
			<table class="gridtable">
      		<tr><div class="form-group row col-sm-10" id="quest"></div></tr><br>
      		
			<tr><td>Patient ID</td>
      		<td> <input type="text" width="200px" id="uid" name="uid" value="1"></td></tr> 
      		<div id="beginButton">
 			<tr><td ><input id="FormBTN"  type="button" value="Begin" onclick="getScheduledIMHList()"></td></tr><br>
     		</div>
			<tr><td ><input id="cancelBTN"  type="button" value="Cancel" onclick="goCancelScheduled()"></td></tr><br>
		</table>
		</form>
	</div>
		<div id = "displayArea">
        <form id="frmdisplay">
        <table "displaytable">
            <textarea id="regstatus" value="waiting" style="width:600px;height:30px;"></textarea>
        </table>
        </form>
		</div>	
	
`;  
	  workDiv.innerHTML = headerPart + htmlText;
	
}

function buildGetCompletedForm(){ // *****  patient.html to get questionnaire prescribed by clinician
//	document.getElementById("question").innerHTML = "Welcome to Precision Health Corp";
	  var workDiv 	= document.getElementById("portalForm");
	  var headerPart = `<main role="main" class="container">
		  <div class="jumbotron">
		  <p id="question"><h3>Retrieve a List of Completed Questionnaires </h3> </p>
		  <p id="status"></p>
		  <div class="d-block my-3" id="answers">
		  <!--  dynamically generated forms will go here -->
		  </div>
		<div id="Authenticate">
		</div>`;
	  
	var htmlText = `	
	<div id = "loginhere">
		<form id = "imhheader">
		<table class="gridtable">
    	<td> <input type="hidden" width="200px" id="id" name="id" value=600></td></tr> 
    	<td> <input type="hidden" width="200px" id="jsonrpc" name="jsonrpc" value="2.0"></td></tr> 
    	<td> <input type="hidden" width="200px" id="method" name="method" value="getCompletedIMHInterviews"></td></tr> 
		</table>
		</form>
		<form id = "frmlogin">
			<table class="gridtable">
    		<tr><div class="form-group row col-sm-10" id="quest"></div></tr><br>
    		
			<tr><td>Patient ID</td>
    		<td> <input type="text" width="200px" id="uid" name="uid" value="161"></td></tr> 
			<tr><td ><input id="FormBTN"  type="button" value="Begin" onclick="getCompletedIMHList()"></td></tr><br>
			<tr><td ><input id="cancelBTN"  type="button" value="Cancel" onclick="goCancelCompleted()"></td></tr><br>
<!--
			<tr><td ><input id="patientBTN"  type="button" value="Act For Patient" onclick="buildActAsPatientForm()"></td></tr><br>
-->
		</table>
		</form>
	</div>
		<div id = "displayArea">
      <form id="frmdisplay">
      <table "displaytable">
          <textarea id="regstatus" value="waiting" style="width:600px;height:30px;"></textarea>
      </table>
      </form>
		</div>	
	
`;  
	  workDiv.innerHTML = headerPart + htmlText;
	
	
}

function buildQuestionnaireReportForm(htmlIn){ // *****  patient.html to get questionnaire prescribed by clinician
	  var workDiv 	= document.getElementById("portalForm");
	  workDiv.innerHTML =`<main role="main" class="container">`;

	  workDiv.innerHTML +=  `		<div id="Authenticate">	</div></main>`;
 
	  document.getElementById("iframebtns").style.display='table-row';
	  document.getElementById("iframehere").style.display='table-row';
	  var iframe = document.getElementById('IMH_iframe');
	    iframe.height="800";
	    iframe.scrolling = "yes";
	    iframe.width=screen.width-100;    
	    iframe.srcdoc = htmlIn;	
}
function buildEndOfQuestionnaireForm(){
	console.log("475 PHCForms end found");
	var htmlText = `	
		<form id = "imhheader">
		<table class="gridtable">
      	<td> <input type="hidden" width="200px" id="id" name="id" value=100></td></tr> 
      	<td> <input type="hidden" width="200px" id="jsonrpc" name="jsonrpc" value="2.0"></td></tr> 
      	<td> <input type="hidden" width="200px" id="method" name="method" value="beginIMHInterview"></td></tr> 
		</table>
		</form>
		<form id = "frmlogin">
			<table class="gridtable">
			<tr><td>UID</td>
      		<td> <input type="text" width="200px" id="uid" name="uid" value="1"></td></tr> 
			<tr><td ><input id="FormBTN"  type="button" value="Begin" onclick="getQuestions();"></td></tr>
		</table>
	</form>
		`;  
	  var workDiv 	= document.getElementById("answers");
	  workDiv.innerHTML =  htmlText;
//	buildPatientForm();	
}

function buildActAsPatientForm(){
	  var workDiv 	= document.getElementById("portalForm");
	  workDiv.innerHTML =`<main role="main" class="container">`;

	  workDiv.innerHTML +=  `		<div id="Authenticate">	</div></main>`;
 
	  document.getElementById("iframebtns").style.display='table-row';
	  document.getElementById("iframehere").style.display='table-row';
	  if(!document.getElementById("IMH_iframe"))
	  {
		  var idiv =  document.getElementById("iframehere");
		  var iframe = document.createElement("iframe");
		  iframe.setAttribute('id', 'IMH_iframe'); // assign an id
		    iframe.height="800";
		    iframe.left="10";
		    iframe.scrolling = "yes";
		    iframe.width=screen.width-100;    
		    iframe.src = "https://www.phcdata.com/Patient.html";	
		    idiv.parentNode.insertBefore(iframe,idiv);
//		    idiv.appendChild(iframe);
		  console.log("553 appending iframe");
	  }
	  else
	  {
		  var iframe = document.getElementById('IMH_iframe');
	    iframe.height="800";
	    iframe.scrolling = "yes";
	    iframe.width=screen.width-100;    
	    iframe.src = "https://www.phcdata.com/Patient.html";	
	  }
}
