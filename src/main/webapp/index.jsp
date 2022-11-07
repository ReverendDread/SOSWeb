<html>
    <style> 
        .tab { 
            display: inline-block; 
            margin-left: 40px; 
        } 
    </style> 
<script>
	var keys;
	var l = 0;
	var count = 0;
	var whichTable="";
	var cons = [];
	var groups = {};
	var unknown = {};
	
	function parseJSON(){
		var obj = JSON.parse(contacts);
		printJSON(obj);
		keys = Object.keys(obj);
		l = keys.length;
		console.log("9 keys=" + keys + " l=" + l);
		for(var i=0; i<l; i++){
			console.log("19 key=" + keys[i]);
            document.write(keys[i] +" <br>");
			switch(keys[i]){
			case "contacts":
				whichTable = "contacts";
				var val = Object.values(obj[keys[i]]);
				getJSON(val);
				
				break;
			case "groups":
				whichTable = "groups";
				var val = obj[keys[i]];
				var grKeys = Object.keys(val);
//	            document.write("30 " + grKeys +" <br>");  // ***** should be numberic
	            var m = grKeys.length;
	            for(var j =0; j<m; j++){
	            	var grVal = val[grKeys[j]];
					var vKeys = Object.keys(grVal);
	            	document.write("33 " + vKeys +" <br>");
	            	var value = grVal[vKeys[0]];
//	            	document.write("35 " + value +" <br>");
	            	getJSON(value);
	            }
				break;
			case "unknown":
				whichTable = "unknown";
				var val = Object.values(obj[keys[i]]);
				getJSON(val);
				
				break;
			}
			
/*			
			console.log("11 key=" + keys[i]);
            document.write(keys[i] +" <br>");
            count = 0;
			console.log("12 key=" + Object.values(obj[keys[i]]));
			getJSON(Object.values(obj[keys[i]]));
*/
		}
		console.log("55 contacts=" +Object.values(cons));
		
	}

	function getJSON(obj) {
	    for(var k in obj) {
	        if(obj[k] instanceof Object) {
	        	getJSON(obj[k]);
	        } else {
//	            document.write(obj[k] + '<p><span class="tab"</span></p>');
	            document.write(obj[k] +" &nbsp|&nbsp");
	    		console.log("29 " + k + "=" + obj[k]);
	    		switch(whichTable){
	    		case "contacts":
//	    			cons[k] = obj[k];
	    			cons.push({k: = obj[k]});
	    			break;
	    		}
	        };
	    }
        document.write( "<br>");
	    
	};
	
	
	function printJSON(obj) {
	    for(var k in obj) {
	        if(obj[k] instanceof Object) {
				var pkeys = Object.keys(obj[k]);
        		console.log("57 pkey=" +  pkeys);
 				printJSON(obj[k]);
	        } 
		};
	
	}
	
	var contacts=`{"contacts":[
	   {"email":"jmartin@akcode.com","name":"jmartin","phoneNo":""},
	   {"email":"1927olds@gmail.com","name":"1927olds","phoneNo":"","zingmeKey":"WIgRRhLckQjjRfrvCR1I80RX6SRw4nUz625UW7bOSCc]"},
	   {"email":"rspraggs@aegissystems.com","name":"Robert","phoneNo":""},
	   {"email":"blandreth@akcode.com","name":"Bill","phoneNo":""},
	   {"email":"squeakytree@gmail.com","name":"tree","zingmeKey":"7b5gX5P5StCSar45AvPxkyKleJY.A4vV5rw54Vdbl3M]"},
	   {"email":"steve@whoknowsmedia.com","name":"Steve Durham"},
	   {"email":"petergspitzer@gmail.com","name":"Peter"},
	   {"email":"lspraggs@anonomouskey.com","name":"LDS AKT"}
	   ],
	   "groups":[
	   	{"AegisTest":[
	   		{"email":"1927olds@gmail.com"},
	   		{"email":"squeakytree@gmail.com"}
	   		]
	   	},
	   	{"AKTinc":[
	   		{"email":"1927olds@gmail.com"},
	   		{"email":"squeakytree@gmail.com"}
	   		]
	   	}
	   ],
	   "unknown":[
		   {"email":"jmartin@akcode.com","name":"jmartin","phoneNo":""},
		   {"email":"rspraggs@aegissystems.com","name":"Robert","phoneNo":""},
		   {"email":"blandreth@akcode.com","name":"Bill","phoneNo":""}
	   ]}`;
	   </script>
<h2>Hello World!</h2>
<body onLoad= "parseJSON()" >
</body>
</html>
