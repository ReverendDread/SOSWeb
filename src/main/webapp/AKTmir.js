//
//       using AES 256 bit code
//       incorporates the IceBerg technology with up to 3072 bit modulus
//
//       Copyright 2001-2003 Ultra Information Systems (Canada) Inc.
//       Author:  Dr. L. D. Spraggs  (lspraggs@uiscan.com)
//
//       Proprietary code with the ownership of the Intellectual Property
//       vesting in Ultra Information Systems.

'use strict';
var ppp = {
   toFixIE    	: true,
   testingPPP 	: 0,
   MOD_1024 	: 1024,
   MOD_2048 	: 2048,
   MOD_3072 	: 3072,

   EBITS_1024  : 768,
   EBITS_2048  : 1009,
   EBITS_3072  : 1857,
   m_modulus   : 1024,
   m_eBits     : 768,
   m_kppp      : [],

   m_nLastError : 0,
   m_p     : BigInteger.ZERO,
   m_e1    : BigInteger.ZERO,
   m_d1    : BigInteger.ZERO,
   m_key   : BigInteger.ZERO,
   aesPPP  : new AKTaes(),
   aesInit : false,
   isE1D1  : false,
   
setUpIE : function() 
{
    this.toFixIE = true ;
},

   
setAKTLocal : function(cname, cvalue, exHrs) 
{
    var clearText = AKTBase64.encode(cvalue);
    var hex     = AKT.HEXFormat(cvalue);
	 if(exHrs != null){
    	var d = new Date();
    	d.setTime(d.getTime() + (exHrs*60*60*1000));
    	var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + hex + ";" + expires + ";path=/";
    } else
    	document.cookie = cname  + "=" +  hex + ";path=/";
},

getAKTLocal : function(cname) 
{    
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        	   var hex = c.substring(name.length, c.length);
	         var cvalue = this.fromHex(hex);
            var clearText = AKTBase64.encode(cvalue);
            return cvalue;
        }
    }
    return "";
},

deleteAKTLocal : function (cname) 
{
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
},

 
ifExistsAKTLocal : function (cname) 
{
//	var cookies = document.cookie.split(';');
	return  ((document.cookie.indexOf(cname.trim() + "=")) >= 0);
},

deleteAllAKTLocal : function () { 
	  var decodedCookie = decodeURIComponent(document.cookie);
	  console.log("639 cookie=" + decodedCookie);
	  var ca = decodedCookie.split(';');
//	  var i  = 0;
//	  for(var c of ca){
     for (var i = 0; i < ca.length; i ++){
    		var c = ca[i];
	  	   var parts = c.split("=");
	  	   console.log("95 " + i++ + ": " + parts[0] + "=" + parts[1]);
	  	   this.deleteAKTLocal(parts[0].trim());
	  }
},

fromHex : function(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
},

initializeAES : function(K5)
{
//	this.aesCM = AKTaesX;
	this.aesPPP.initialize(K5);
    this.aesInit = true;
},	

setTestingPPP :  function(i) 
{
	this.testingPPP = i;
},

//   public BigInteger getBigP()
getBigP : function()
   {
      var px = BigInteger.ZERO; //*****  will return zero on default

      if (this.m_modulus == 1024)                  //*****  common mudulus safe prime
      {
         px      = new BigInteger(this.p1024, 10);
         this.m_eBits = this.EBITS_1024;
      }
      else if (this.m_modulus == 2048)
      {
         px      = new BigInteger(this.p2048, 10);     //*****  computed safe prime
         this.m_eBits = this.EBITS_2048;
      }
      else if (this.m_modulus == 3072)
      {
         px      = new BigInteger(this.p3072, 10);     //*****  computed safe prime
         this.m_eBits = this.EBITS_3072;
      }
      this.m_p = px;   
      return(px);
   },
   
//   public BigInteger[] getBigE1D1()
getBigE1D1 : function()
   {
      // The following code allows us to generate a very large
      // odd number which has a probability of being prime
//          localStorage.name='PPP';
      var d1;
      var retBig =[] ;
      this.m_p = this.getBigP();
      if(this.testingPPP == 0)
      {
      	var prng = AKTPRNG;
      	prng.initialize();
         var rn3 = prng.GetRandomString() 
                 + prng.GetRandomString() 
                 + prng.GetRandomString() ;
         var eBig = new BigInteger(rn3, 256);
         var remain = eBig.remainder(BigInteger.SIX);
         remain = remain.subtract(BigInteger.ONE);
         var BigOddNumber = eBig.subtract(remain);
         remain = BigOddNumber.remainder(BigInteger.FIVE);
         if (remain.compareTo(BigInteger.ZERO) == 0)
         {
            BigOddNumber = BigOddNumber.add(BigInteger.FOUR);
         }

         this.m_e1 = BigOddNumber; // in this package
         var x  = this.m_p.subtract(BigInteger.ONE);
         this.m_d1 = this.m_e1.modInverse(x);
      }
      else
      {
         this.m_e1 = new BigInteger(this.e1_1024, 10);
         this.m_d1 = new BigInteger(this.d1_1024, 10);
      }
      retBig[0] = this.m_d1;
      retBig[1] = this.m_e1;
      retBig[2] = this.m_p;
      this.isE1D1 = true;
      var d1 = this.cotstr(this.m_d1)
      var e1 = this.cotstr(this.m_e1)
       var p = this.cotstr(this.m_p)
//       console.log("AKTMir 159 e1=" + e1 + "\nd1=" + d1 + "\np=" + p);
       if(this.toFixIE){
          this.setAKTLocal("d1", d1, 8);
          this.setAKTLocal("e1", e1, 8);
          this.setAKTLocal("p", p, 8);
     } else {
          localStorage.setItem("d1", d1);
          localStorage.setItem("e1", e1);
          localStorage.setItem("p",  p);
     	}
      return(retBig);
   },
   
/*
   //   public static BigInteger getBigE1()
getBigE1 : function()
{
      this.m_p = this.getBigP();
      if(this.testingPPP == 0)
      {
      	var prng = AKTPRNG;
      	prng.initialize();
         var rn3 = prng.GetRandomString() 
                 + prng.GetRandomString() 
                 + prng.GetRandomString() ;
         var eBig = new BigInteger(rn3, 256);
         var remain = eBig.remainder(BigInteger.SIX);
         remain = remain.subtract(BigInteger.ONE);
         var BigOddNumber = eBig.subtract(remain);
         remain = BigOddNumber.remainder(BigInteger.FIVE);
         if (remain.compareTo(BigInteger.ZERO) == 0)
         {
            BigOddNumber = BigOddNumber.add(BigInteger.FOUR);
         }
         this.m_e1 = BigOddNumber; // in this package

      }
      else
      {
      	this.m_e1  = new BigInteger(this.e1_1024, 10); 
      	this.m_d1  = new BigInteger(this.d1_1024, 10); 
      }
      return(this.m_e1);
},
 
getBigD1 : function(p, e1)
{
         var x  = p.subtract(BigInteger.ONE);
         var d1 = e1.modInverse(x);
         return(d1);
},
*/
   
getPingKey : function()
{
	return(this.m_kppp);          // *****  return the ping key as bytes radix 256
},
//   private String getpingData()
pingData : function()
   {
//	this.isE1D1 = false;
      if(!this.isE1D1)
         this.getBigE1D1();
//  	console.log("AKTmir 221 isE1D1=" + this.isE1D1 + "\ne1=" + this.m_e1 + "\np=" + this.m_p + "\nd1=" + this.m_d1);
      var pingto = "ping error";
//    console.log("AKTMir 235 testingPPP=" + this.testingPPP)
      if(this.testingPPP == 0)
      {
         this.m_kppp  = this.getRandomBytes(32); //*****  get the ping key as random garbage
         var hex     = AKT.HEXFormat(this.m_kppp);
         var t        = new BigInteger(hex,16);
      }
      else
      {
         var testkey = "abcdefghijklmnopqrstuvwxyz123456";
         var testb   = AKT.getBytesFromString(testkey);
         var hex     = AKT.HEXFormat(testb);
         var t       = new BigInteger(hex,16);
         this.m_kppp = AKT.getBytesFromString(testkey);
      }
//      console.log("AKTMir 236 m_p=" + this.m_p)
      if (this.m_p.compareTo(BigInteger.ZERO) != 0)
      {
//         try
//         {
//            var m = new BigInteger(this.m_kppp, 256);
            var m_key = t;
            var c = t.modPow(this.m_e1, this.m_p);
            pingto = this.cotstrWithB64(c);
//
// *****  initialize the Crypto Module
//           
            var kpppS = AKT.getStringFromBytes(this.m_kppp);
//            console.log("AKTmir 263 kpppS=" + kpppS);
            if(this.toFixIE)
               this.setAKTLocal("kppp", kpppS, 8);
            else
               localStorage.setItem("kppp",  kpppS);     // *****  store the ppp key as a string
            this.aesPPP.initialize(this.m_kppp);
            this.aesInit = true;
//         }
//         catch (Exception e)
//         {
//            return(" error 3: " + e.toString());
//         }
      }
      else
      {
         return(" error 4: ");
      }
      return(pingto);
//      return(c);
   },

//   public String pongData(String pongto, BigInteger px, BigInteger dx)
putPongData : function(pongto, px,  dx)
   {
      this.m_p  = px;
      this.m_d1 = dx;
      var pingto = this.pongData(pongto);
      return(pingto);
   },

//   public String getpongData(String pongto)
secondPing : function(pongto)
   {
// receive the pong from the server and perform the second ping
    this.m_p = this.getBigP();

      if(this.toFixIE)
         var d1S = this.getAKTLocal("d1");
      else
         var d1S = localStorage.getItem("d1");
      var d1  = this.cinstr(d1S);
      var c = this.cinstrWithB64(pongto);
      var d = c.modPow(d1, this.m_p);
      var  pingto = this.cotstrWithB64(d);  // *****  do this to pass data between servers
     return(pingto);
   },

//   public String cotstr(BigInteger cc)
cotstr : function(cc)
   {
      var clearText = "";
      var spx = "";
      var cbyte = cc.toByteArray();
      var cString = AKT.getStringFromBytes(cbyte);
      var iStart = (cbyte[0] == 0x00) ? 1: 0;  //*****  strip off leading 0x00
      this.m_nLastError = CONST.UIS_STATUS_OK;
      try
      {
         for (var iLoop = iStart; iLoop < cbyte.length; iLoop++)
         {
            spx += String.fromCharCode(cbyte[iLoop]);
         }   
       }
      catch (e)
      {
         m_nLastError = CONST.UIS_PING_ERROR;
         this.m_nLastError = 2345678;
         spx += ("248 cotstr(1): " + this.m_nLastError);
      }
      return(spx);
   },
   
// public String cotstrWithB64(BigInteger cc)
cotstrWithB64 : function(cc)
   {
   	var spx = this.cotstr(cc);
      var clearText = AKTBase64.encode(spx);
      return(clearText);
   },

//   public BigInteger cinstr(String sInString)
cinstr : function(sInString)
   {
      var iIndex;
      var zero;
      var clearText = "";
      var cbyte = [];
      var pxbyte = [];
      var m = BigInteger.ZERO;
      //*****  need to add 00 to front of string for Java if > 0F
//      zero = ((sInString.charAt(0) >>> 4) & 0x000F);
      try
      {
         var clearBytes = AKT.getBytesFromString(sInString);
         var hex = AKT.HEXFormat(clearBytes);              // **** returns string from bytes
         m = new BigInteger(hex,16);
      }
      catch ( e)
      {
         alert("287 ppp cinstr(1): error " );
      }
      return(m);
   },

// public BigInteger cinstrWithB64(String sInString)
cinstrWithB64 : function(sInString)
   {
         var clearText = AKTBase64.decode(sInString);
         var m = this.cinstr(clearText);
         return(m);
   },

//   public String pingUserData(String valueIn)
pingUserData : function(clearText)
   {
      var encText = "";
      if(!this.aesInit)           // *****  if aes is not initialized, we must do that now
      {
            if(this.toFixIE)
               var kpppS = this.getAKTLocal("kppp");
            else
               var kpppS    = localStorage.getItem("kppp" );   // *****  get the ppp key as a string
//            var kpppB    = AKT.getBytesFromString(this.m_kppp);
            var kpppB    = AKT.getBytesFromString(kpppS);
            this.kppp = kpppS;
//            console.log("403 kppp=" + AKT.HEXFormat(kpppS));
            this.aesPPP.initialize(kpppB);
            this.aesInit = true;
      }
      encText = this.aesPPP.encryptText(clearText);
      return(encText);
   },

 //  public String decryptUserData(String valueIn)
decryptUserData : function(encrypted)
   {
      var decText = "";
      if(!this.aesInit)
      {
            if(this.toFixIE)
               var kpppS = this.getAKTLocal("kppp");
            else
               var kpppS    = localStorage.getItem("kppp" );  // *****  get the ppp key as a string
            var kpppB    = AKT.getBytesFromString(this.m_kppp);
            this.aesPPP.initialize(kpppB);
            this.aesInit = true;
      }

      decText = this.aesPPP.decryptText(encrypted);
      return(decText);
   },


getRandomBytes : function(num) 
{
	var prng = AKTPRNG;
	var rndm = [];
	prng.initialize();
	var rn1 = prng.GetRandomString();
	var rnb = AKT.getBytesFromString(rn1);
	var len   = rn1.length;
	var j = 0;
	for(var i=0; i<num; i++)
	{
		rndm[i] = rnb[j++]
		if(j >= len)
		{
	      rn1 = prng.GetRandomString();
	      rnb = AKT.getBytesFromString(rn1);
	      len   = rn1.length;
	      j = 0;
		}
	}
	return(rndm);
},
KATTest : function() 
{
    this.m_p  = new BigInteger(this.p1024, 10);
    this.m_e1 = new BigInteger(this.e1_1024, 10);
    this.m_d1 = new BigInteger(this.d1_1024, 10);
    this.m_e2 = new BigInteger(this.e2_1024, 10);
    this.m_d2 = new BigInteger(this.d2_1024, 10);
    var testkey = "abcdefghijklmnopqrstuvwxyz123456";
    var testb   = AKT.getBytesFromString(testkey);
    var hex     = AKT.HEXFormat(testb);
    var t       = new BigInteger(hex,16);
    this.m_kppp = AKT.getBytesFromString(testkey);
    var m 		= this.m_kppp;
    var c 		= t.modPow(this.m_e1, this.m_p);  // ***** first ping
    var pingto 	= this.cotstrWithB64(c);
    var d 		= this.cinstrWithB64(pingto);
    c 			= d.modPow(this.m_e2, this.m_p);  // ***** first pong
    var pingto 	= this.cotstrWithB64(c);
    d 			= this.cinstrWithB64(pingto);
    c 			= d.modPow(this.m_d1, this.m_p);  // ***** second ping
    var pingto 	= this.cotstrWithB64(c);
    d 			= this.cinstrWithB64(pingto);
    c 			= d.modPow(this.m_d2, this.m_p);  // ***** final pong
    var kppp	= this.cotstr(c);
//    console.log("AKTMir 460 kppp=" + kppp);
  
  
},
   p1024   : "155315526351482395991155996351231807220169644828378937433223838972232518351958838087073321845624756550146945246003790108045940383194773439496051917019892370102341378990113959561895891019716873290512815434724157588460613638202017020672756091067223336194394910765309830876066246480156617492164140095427773547319",
   e1_1024 : "9775946708954075513105450550018683278099002657566007032591109087139915126019509814779461256980775392304629751276791567952192046464423375586795491105751843",
   d1_1024 : "50964855539960795901098958607004994025117615179372442973433536261416681314198551964402895305772357403748460032129176867663643586072061211882772054838536476598450232003253410400372227625010273806272462551734434888237388313469925208461646171086915766921109875451538270711018680655277456326315213259015672816949",
   e2_1024 : "10791891129319971733953056281544734802527471586747541920964680532653270523062823576471064451673340198030579513138055970307096922493274235862298344937118609",
   d2_1024 : "21857510911359936405092881914244586916180196785144274645628546426239131735990997695430389889092634293867050235519790225164909159859393067566472307522892957594571495408522147558433644489235490879027422450068153732952353456817508181474462749560235544716609735740370781326039925713150008177184898578682979422789",
   p2048   : "23305194876708628772942683712029936077909669703685601536444639373642192961312057628536252556993613535085814978074159499472186948366786511073521042149496833091653927921051971991878417514244523141840390929407035897870051133798325148487490127609979590754317732309227672185636344887595480613978815978023799438712228855016292399124518070073985663909563703587906667969897977595160213407719977739503277175679754624803077227852082230001597232751102744845455251210318774263448932578893084926219730828456570578353097506847447616887558397334732907988224984263418791672177125610795030874376815488104459799035590942083438936294203",
   e1_2048 : "2068803999537363722763553113005774392037079122332193918308796683374115564933874076580183244063229360932000846604385951436743418378851284798584409213415787944972823543217504278113985058726634443467815296237868394604763531990740870456448885343488240222266459267923335367064695643817165863141318404717282701",
   d1_2048 : "8277302820475628513033755379641891224700953563397657445809285086615517234277870753371130687810802745145653715954765402914496317834427791430600533609980941508363981369753647692063949399943250346264643283667957692727589295895765769720952426312693218070613245654510255820846347398682930775383524846146964400152449387921880838638743676531808259737937945043250014841340391674550858431435613926179549015058737939999299449201025494475266854768101072005749236382668983295591312557676992804548611423154351763813915502565554927371567250677604385060925734537773007449900509188725759728984388249098774537795920943370973435855213",
   e2_2048 : "1886727579898902930194916844802252814630376512322588048401335885061366022493409711124929792710293274491227952955914130081555193088554166696492869028320723725425786061289611446070781942007902337258048274017052469574570982728024598346750973601920568018558717993897642458561961014774368615521194087270732489",
   d2_2048 : "5819257645986753252088341614647851832164206709337300859652421615410672065888495461105583982011325888512104146409390841588915586234091695400191808739097179793576507921474155588942771575855557984674892424753971239989815390907349062118105951562483609361621514308550035056493619830204117193646663350721903027269376081364352439092238639545160376604635246745679248507456793625236082303149418340668799803917318004133624550489442724582689540687651706127681394770012544404033535232983612665658728172446190241956189451939073794478108495987342103626149772769816980909457112868009505900662411248150854401766631334016595728328557",

   p3072   : "3331826350523954630311241967640951239858294736445361608086460265235096225983933203968500061419285926981287171155562181811253311132720944069446752355550722072540646541099242367017695428891868144180426342560303673050047649325575536678356628163268853184301619108551489143799507230749751313284539962710451153012503469991732518919004376111560492715132988352979816403246299836154209306136382046119628637054794112808035581653351864682935672170538730939963307751519414959213140044324492527775639241487923054459219166863271398472665208668730894374266515826156351847767160333379109315703307795489630821937186650430805236414320111877443611461276760182135837058775318162183952960557414502646346523814650817308641653094213272224663864175066958788046576178422969598329655544232966314206325330912385257831278348375483446261763187682794158803356489788013774805195010271059727551198993486030318095007967113710812986240362715215376495780841639",

    xp3072 : "3331826350523954630311241967640951239858294736445361608086460265235096225983933203968500061419285926981287171155562181811253311132720944069446752355550722072540646541099242367017695428891868144180426342560303673050047649325575536678356628163268853184301619108551489143799507230749751313284539962710451153012503469991732518919004376111560492715132988352979816403246299836154209306136382046119628637054794112808035581653351864682935672170538730939963307751519414959213140044324492527775639241487923054459219166863271398472665208668730894374266515826156351847767160333379109315703307795489630821937186650430805236414320111877443611461276760182135837058775318162183952960557414502646346523814650817308641653094213272224663864175066958788046576178422969598329655544232966314206325330912385257831278348375483446261763187682794158803356489788013774805195010271059727551198993486030318095007967113710812986240362715215376495765967083"

};


// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
function BigInteger(a,b,c) {
  if(a != null)
    if("number" == typeof a) this.fromNumber(a,b,c);
    else if(b == null && "string" != typeof a) this.fromString(a,256);
    else this.fromString(a,b);
}

// return new, unset BigInteger
function nbi() { return new BigInteger(null); }

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i,x,w,j,c,n) {
  while(--n >= 0) {
    var v = x*this[i++]+w[j]+c;
    c = Math.floor(v/0x4000000);
    w[j++] = v&0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i,x,w,j,c,n) {
  var xl = x&0x7fff, xh = x>>15;
  while(--n >= 0) {
    var l = this[i]&0x7fff;
    var h = this[i++]>>15;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
    w[j++] = l&0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i,x,w,j,c,n) {
  var xl = x&0x3fff, xh = x>>14;
  while(--n >= 0) {
    var l = this[i]&0x3fff;
    var h = this[i++]>>14;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
    c = (l>>28)+(m>>14)+xh*h;
    w[j++] = l&0xfffffff;
  }
  return c;
}
if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
  BigInteger.prototype.am = am2;
  dbits = 30;
}
else if(j_lm && (navigator.appName != "Netscape")) {
  BigInteger.prototype.am = am1;
  dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1<<dbits)-1);
BigInteger.prototype.DV = (1<<dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2,BI_FP);
BigInteger.prototype.F1 = BI_FP-dbits;
BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr,vv;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n) { return BI_RM.charAt(n); }
function intAt(s,i) {
  var c = BI_RC[s.charCodeAt(i)];
  return (c==null)?-1:c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
  r.t = this.t;
  r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
  this.t = 1;
  this.s = (x<0)?-1:0;
  if(x > 0) this[0] = x;
  else if(x < -1) this[0] = x+this.DV;
  else this.t = 0;
}

// return bigint initialized to value
function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

// (protected) set from string and radix
function bnpFromString(s,b) {
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 256) k = 8; // byte array
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else { this.fromRadix(s,b); return; }
  this.t = 0;
  this.s = 0;
  var i = s.length, mi = false, sh = 0;
  while(--i >= 0) {
    var x = (k==8)?s[i]&0xff:intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-") mi = true;
      continue;
    }
    mi = false;
    if(sh == 0)
      this[this.t++] = x;
    else if(sh+k > this.DB) {
      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
      this[this.t++] = (x>>(this.DB-sh));
    }
    else
      this[this.t-1] |= x<<sh;
    sh += k;
    if(sh >= this.DB) sh -= this.DB;
  }
  if(k == 8 && (s[0]&0x80) != 0) {
    this.s = -1;
    if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
  }
  this.clamp();
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) clamp off excess high words
function bnpClamp() {
  var c = this.s&this.DM;
  while(this.t > 0 && this[this.t-1] == c) --this.t;
}

// (public) return string representation in given radix
function bnToString(b) {
  if(this.s < 0) return "-"+this.negate().toString(b);
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else return this.toRadix(b);
  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
  var p = this.DB-(i*this.DB)%k;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
    while(i >= 0) {
      if(p < k) {
        d = (this[i]&((1<<p)-1))<<(k-p);
        d |= this[--i]>>(p+=this.DB-k);
      }
      else {
        d = (this[i]>>(p-=k))&km;
        if(p <= 0) { p += this.DB; --i; }
      }
      if(d > 0) m = true;
      if(m) r += int2char(d);
    }
  }
  return m?r:"0";
}

// (public) -this
function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

// (public) |this|
function bnAbs() { return (this.s<0)?this.negate():this; }

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
  var r = this.s-a.s;
  if(r != 0) return r;
  var i = this.t;
  r = i-a.t;
  if(r != 0) return (this.s<0)?-r:r;
  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
  return 0;
}

// returns bit length of the integer x
function nbits(x) {
  var r = 1, t;
  if((t=x>>>16) != 0) { x = t; r += 16; }
  if((t=x>>8) != 0) { x = t; r += 8; }
  if((t=x>>4) != 0) { x = t; r += 4; }
  if((t=x>>2) != 0) { x = t; r += 2; }
  if((t=x>>1) != 0) { x = t; r += 1; }
  return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
  if(this.t <= 0) return 0;
  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n,r) {
  var i;
  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
  for(i = n-1; i >= 0; --i) r[i] = 0;
  r.t = this.t+n;
  r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n,r) {
  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
  r.t = Math.max(this.t-n,0);
  r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n,r) {
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<cbs)-1;
  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
  for(i = this.t-1; i >= 0; --i) {
    r[i+ds+1] = (this[i]>>cbs)|c;
    c = (this[i]&bm)<<bs;
  }
  for(i = ds-1; i >= 0; --i) r[i] = 0;
  r[ds] = c;
  r.t = this.t+ds+1;
  r.s = this.s;
  r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n,r) {
  r.s = this.s;
  var ds = Math.floor(n/this.DB);
  if(ds >= this.t) { r.t = 0; return; }
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<bs)-1;
  r[0] = this[ds]>>bs;
  for(var i = ds+1; i < this.t; ++i) {
    r[i-ds-1] |= (this[i]&bm)<<cbs;
    r[i-ds] = this[i]>>bs;
  }
  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
  r.t = this.t-ds;
  r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]-a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c -= a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c -= a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = (c<0)?-1:0;
  if(c < -1) r[i++] = this.DV+c;
  else if(c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a,r) {
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i+y.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
  r.s = 0;
  r.clamp();
  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2*x.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < x.t-1; ++i) {
    var c = x.am(i,x[i],r,2*i,0,1);
    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
      r[i+x.t] -= x.DV;
      r[i+x.t+1] = 1;
    }
  }
  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
  r.s = 0;
  r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m,q,r) {
  var pm = m.abs();
  if(pm.t <= 0) return;
  var pt = this.abs();
  if(pt.t < pm.t) {
    if(q != null) q.fromInt(0);
    if(r != null) this.copyTo(r);
    return;
  }
  if(r == null) r = nbi();
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
  else { pm.copyTo(y); pt.copyTo(r); }
  var ys = y.t;
  var y0 = y[ys-1];
  if(y0 == 0) return;
  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
  y.dlShiftTo(j,t);
  if(r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t,r);
  }
  BigInteger.ONE.dlShiftTo(ys,t);
  t.subTo(y,y);	// "negative" y so we can replace sub with am later
  while(y.t < ys) y[y.t++] = 0;
  while(--j >= 0) {
    // Estimate quotient digit
    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
      y.dlShiftTo(j,t);
      r.subTo(t,r);
      while(r[i] < --qd) r.subTo(t,r);
    }
  }
  if(q != null) {
    r.drShiftTo(ys,q);
    if(ts != ms) BigInteger.ZERO.subTo(q,q);
  }
  r.t = ys;
  r.clamp();
  if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
  if(ts < 0) BigInteger.ZERO.subTo(r,r);
}

// (public) this mod a
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a,null,r);
  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
  return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) { this.m = m; }
function cConvert(x) {
  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
  else return x;
}
function cRevert(x) { return x; }
function cReduce(x) { x.divRemTo(this.m,null,x); }
function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
  if(this.t < 1) return 0;
  var x = this[0];
  if((x&1) == 0) return 0;
  var y = x&3;		// y == 1/x mod 2^2
  y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
  y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y>0)?this.DV-y:-y;
}

// Montgomery reduction
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp&0x7fff;
  this.mph = this.mp>>15;
  this.um = (1<<(m.DB-15))-1;
  this.mt2 = 2*m.t;
}

// xR mod m
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t,r);
  r.divRemTo(this.m,null,r);
  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
  return r;
}

// x/R mod m
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
  while(x.t <= this.mt2)	// pad x so am has enough room later
    x[x.t++] = 0;
  for(var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i]&0x7fff;
    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i+this.m.t;
    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
    // propagate carry
    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
  }
  x.clamp();
  x.drShiftTo(this.m.t,x);
  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = "xy/R mod m"; x,y != r
function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e,z) {
  if(e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
  g.copyTo(r);
  while(--i >= 0) {
    z.sqrTo(r,r2);
    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
    else { var t = r; r = r2; r2 = t; }
  }
  return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e,m) {
  var z;
  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
  return this.exp(e,z);
}

// Copyright (c) 2005-2009  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Extended JavaScript BN functions, required for RSA private ops.

// Version 1.1: new BigInteger("0", 10) returns "proper" zero
// Version 1.2: square() API, isProbablePrime fix

// (public)
function bnClone() { var r = nbi(); this.copyTo(r); return r; }

// (public) return value as integer
function bnIntValue() {
  if(this.s < 0) {
    if(this.t == 1) return this[0]-this.DV;
    else if(this.t == 0) return -1;
  }
  else if(this.t == 1) return this[0];
  else if(this.t == 0) return 0;
  // assumes 16 < DB < 32
  return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
}

// (public) return value as byte
function bnByteValue() { return (this.t==0)?this.s:(this[0]<<24)>>24; }

// (public) return value as short (assumes DB>=16)
function bnShortValue() { return (this.t==0)?this.s:(this[0]<<16)>>16; }

// (protected) return x s.t. r^x < DV
function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

// (public) 0 if this == 0, 1 if this > 0
function bnSigNum() {
  if(this.s < 0) return -1;
  else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
  else return 1;
}

// (protected) convert to radix string
function bnpToRadix(b) {
  if(b == null) b = 10;
  if(this.signum() == 0 || b < 2 || b > 36) return "0";
  var cs = this.chunkSize(b);
  var a = Math.pow(b,cs);
  var d = nbv(a), y = nbi(), z = nbi(), r = "";
  this.divRemTo(d,y,z);
  while(y.signum() > 0) {
    r = (a+z.intValue()).toString(b).substr(1) + r;
    y.divRemTo(d,y,z);
  }
  return z.intValue().toString(b) + r;
}

// (protected) convert from radix string
function bnpFromRadix(s,b) {
  this.fromInt(0);
  if(b == null) b = 10;
  var cs = this.chunkSize(b);
  var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
  for(var i = 0; i < s.length; ++i) {
    var x = intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
      continue;
    }
    w = b*w+x;
    if(++j >= cs) {
      this.dMultiply(d);
      this.dAddOffset(w,0);
      j = 0;
      w = 0;
    }
  }
  if(j > 0) {
    this.dMultiply(Math.pow(b,j));
    this.dAddOffset(w,0);
  }
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) alternate constructor
function bnpFromNumber(a,b,c) {
  if("number" == typeof b) {
    // new BigInteger(int,int,RNG)
    if(a < 2) this.fromInt(1);
    else {
      this.fromNumber(a,c);
      if(!this.testBit(a-1))	// force MSB set
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
      if(this.isEven()) this.dAddOffset(1,0); // force odd
      while(!this.isProbablePrime(b)) {
        this.dAddOffset(2,0);
        if(this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a-1),this);
      }
    }
  }
  else {
    // new BigInteger(int,RNG)
    var x = new Array(), t = a&7;
    x.length = (a>>3)+1;
    b.nextBytes(x);
    if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
    this.fromString(x,256);
  }
}

// (public) convert to bigendian byte array
function bnToByteArray() {
  var i = this.t, r = new Array();
  r[0] = this.s;
  var p = this.DB-(i*this.DB)%8, d, k = 0;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) != (this.s&this.DM)>>p)
      r[k++] = d|(this.s<<(this.DB-p));
    while(i >= 0) {
      if(p < 8) {
        d = (this[i]&((1<<p)-1))<<(8-p);
        d |= this[--i]>>(p+=this.DB-8);
      }
      else {
        d = (this[i]>>(p-=8))&0xff;
        if(p <= 0) { p += this.DB; --i; }
      }
      if((d&0x80) != 0) d |= -256;
      if(k == 0 && (this.s&0x80) != (d&0x80)) ++k;
      if(k > 0 || d != this.s) r[k++] = d;
    }
  }
  return r;
}

function bnEquals(a) { return(this.compareTo(a)==0); }
function bnMin(a) { return(this.compareTo(a)<0)?this:a; }
function bnMax(a) { return(this.compareTo(a)>0)?this:a; }

// (protected) r = this op a (bitwise)
function bnpBitwiseTo(a,op,r) {
  var i, f, m = Math.min(a.t,this.t);
  for(i = 0; i < m; ++i) r[i] = op(this[i],a[i]);
  if(a.t < this.t) {
    f = a.s&this.DM;
    for(i = m; i < this.t; ++i) r[i] = op(this[i],f);
    r.t = this.t;
  }
  else {
    f = this.s&this.DM;
    for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);
    r.t = a.t;
  }
  r.s = op(this.s,a.s);
  r.clamp();
}

// (public) this & a
function op_and(x,y) { return x&y; }
function bnAnd(a) { var r = nbi(); this.bitwiseTo(a,op_and,r); return r; }

// (public) this | a
function op_or(x,y) { return x|y; }
function bnOr(a) { var r = nbi(); this.bitwiseTo(a,op_or,r); return r; }

// (public) this ^ a
function op_xor(x,y) { return x^y; }
function bnXor(a) { var r = nbi(); this.bitwiseTo(a,op_xor,r); return r; }

// (public) this & ~a
function op_andnot(x,y) { return x&~y; }
function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a,op_andnot,r); return r; }

// (public) ~this
function bnNot() {
  var r = nbi();
  for(var i = 0; i < this.t; ++i) r[i] = this.DM&~this[i];
  r.t = this.t;
  r.s = ~this.s;
  return r;
}

// (public) this << n
function bnShiftLeft(n) {
  var r = nbi();
  if(n < 0) this.rShiftTo(-n,r); else this.lShiftTo(n,r);
  return r;
}

// (public) this >> n
function bnShiftRight(n) {
  var r = nbi();
  if(n < 0) this.lShiftTo(-n,r); else this.rShiftTo(n,r);
  return r;
}

// return index of lowest 1-bit in x, x < 2^31
function lbit(x) {
  if(x == 0) return -1;
  var r = 0;
  if((x&0xffff) == 0) { x >>= 16; r += 16; }
  if((x&0xff) == 0) { x >>= 8; r += 8; }
  if((x&0xf) == 0) { x >>= 4; r += 4; }
  if((x&3) == 0) { x >>= 2; r += 2; }
  if((x&1) == 0) ++r;
  return r;
}

// (public) returns index of lowest 1-bit (or -1 if none)
function bnGetLowestSetBit() {
  for(var i = 0; i < this.t; ++i)
    if(this[i] != 0) return i*this.DB+lbit(this[i]);
  if(this.s < 0) return this.t*this.DB;
  return -1;
}

// return number of 1 bits in x
function cbit(x) {
  var r = 0;
  while(x != 0) { x &= x-1; ++r; }
  return r;
}

// (public) return number of set bits
function bnBitCount() {
  var r = 0, x = this.s&this.DM;
  for(var i = 0; i < this.t; ++i) r += cbit(this[i]^x);
  return r;
}

// (public) true iff nth bit is set
function bnTestBit(n) {
  var j = Math.floor(n/this.DB);
  if(j >= this.t) return(this.s!=0);
  return((this[j]&(1<<(n%this.DB)))!=0);
}

// (protected) this op (1<<n)
function bnpChangeBit(n,op) {
  var r = BigInteger.ONE.shiftLeft(n);
  this.bitwiseTo(r,op,r);
  return r;
}

// (public) this | (1<<n)
function bnSetBit(n) { return this.changeBit(n,op_or); }

// (public) this & ~(1<<n)
function bnClearBit(n) { return this.changeBit(n,op_andnot); }

// (public) this ^ (1<<n)
function bnFlipBit(n) { return this.changeBit(n,op_xor); }

// (protected) r = this + a
function bnpAddTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]+a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c += a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c += a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += a.s;
  }
  r.s = (c<0)?-1:0;
  if(c > 0) r[i++] = c;
  else if(c < -1) r[i++] = this.DV+c;
  r.t = i;
  r.clamp();
}

// (public) this + a
function bnAdd(a) { var r = nbi(); this.addTo(a,r); return r; }

// (public) this - a
function bnSubtract(a) { var r = nbi(); this.subTo(a,r); return r; }

// (public) this * a
function bnMultiply(a) { var r = nbi(); this.multiplyTo(a,r); return r; }

// (public) this^2
function bnSquare() { var r = nbi(); this.squareTo(r); return r; }

// (public) this / a
function bnDivide(a) { var r = nbi(); this.divRemTo(a,r,null); return r; }

// (public) this % a
function bnRemainder(a) { var r = nbi(); this.divRemTo(a,null,r); return r; }

// (public) [this/a,this%a]
function bnDivideAndRemainder(a) {
  var q = nbi(), r = nbi();
  this.divRemTo(a,q,r);
  return new Array(q,r);
}

// (protected) this *= n, this >= 0, 1 < n < DV
function bnpDMultiply(n) {
  this[this.t] = this.am(0,n-1,this,0,0,this.t);
  ++this.t;
  this.clamp();
}

// (protected) this += n << w words, this >= 0
function bnpDAddOffset(n,w) {
  if(n == 0) return;
  while(this.t <= w) this[this.t++] = 0;
  this[w] += n;
  while(this[w] >= this.DV) {
    this[w] -= this.DV;
    if(++w >= this.t) this[this.t++] = 0;
    ++this[w];
  }
}

// A "null" reducer
function NullExp() {}
function nNop(x) { return x; }
function nMulTo(x,y,r) { x.multiplyTo(y,r); }
function nSqrTo(x,r) { x.squareTo(r); }

NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;

// (public) this^e
function bnPow(e) { return this.exp(e,new NullExp()); }

// (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
function bnpMultiplyLowerTo(a,n,r) {
  var i = Math.min(this.t+a.t,n);
  r.s = 0; // assumes a,this >= 0
  r.t = i;
  while(i > 0) r[--i] = 0;
  var j;
  for(j = r.t-this.t; i < j; ++i) r[i+this.t] = this.am(0,a[i],r,i,0,this.t);
  for(j = Math.min(a.t,n); i < j; ++i) this.am(0,a[i],r,i,0,n-i);
  r.clamp();
}

// (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
function bnpMultiplyUpperTo(a,n,r) {
  --n;
  var i = r.t = this.t+a.t-n;
  r.s = 0; // assumes a,this >= 0
  while(--i >= 0) r[i] = 0;
  for(i = Math.max(n-this.t,0); i < a.t; ++i)
    r[this.t+i-n] = this.am(n-i,a[i],r,0,0,this.t+i-n);
  r.clamp();
  r.drShiftTo(1,r);
}

// Barrett modular reduction
function Barrett(m) {
  // setup Barrett
  this.r2 = nbi();
  this.q3 = nbi();
  BigInteger.ONE.dlShiftTo(2*m.t,this.r2);
  this.mu = this.r2.divide(m);
  this.m = m;
}

function barrettConvert(x) {
  if(x.s < 0 || x.t > 2*this.m.t) return x.mod(this.m);
  else if(x.compareTo(this.m) < 0) return x;
  else { var r = nbi(); x.copyTo(r); this.reduce(r); return r; }
}

function barrettRevert(x) { return x; }

// x = x mod m (HAC 14.42)
function barrettReduce(x) {
  x.drShiftTo(this.m.t-1,this.r2);
  if(x.t > this.m.t+1) { x.t = this.m.t+1; x.clamp(); }
  this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);
  this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);
  while(x.compareTo(this.r2) < 0) x.dAddOffset(1,this.m.t+1);
  x.subTo(this.r2,x);
  while(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = x^2 mod m; x != r
function barrettSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = x*y mod m; x,y != r
function barrettMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;

// (public) this^e % m (HAC 14.85)
function bnModPow(e,m) {
  var i = e.bitLength(), k, r = nbv(1), z;
  if(i <= 0) return r;
  else if(i < 18) k = 1;
  else if(i < 48) k = 3;
  else if(i < 144) k = 4;
  else if(i < 768) k = 5;
  else k = 6;
  if(i < 8)
    z = new Classic(m);
  else if(m.isEven())
    z = new Barrett(m);
  else
    z = new Montgomery(m);

  // precomputation
  var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
  g[1] = z.convert(this);
  if(k > 1) {
    var g2 = nbi();
    z.sqrTo(g[1],g2);
    while(n <= km) {
      g[n] = nbi();
      z.mulTo(g2,g[n-2],g[n]);
      n += 2;
    }
  }

  var j = e.t-1, w, is1 = true, r2 = nbi(), t;
  i = nbits(e[j])-1;
  while(j >= 0) {
    if(i >= k1) w = (e[j]>>(i-k1))&km;
    else {
      w = (e[j]&((1<<(i+1))-1))<<(k1-i);
      if(j > 0) w |= e[j-1]>>(this.DB+i-k1);
    }

    n = k;
    while((w&1) == 0) { w >>= 1; --n; }
    if((i -= n) < 0) { i += this.DB; --j; }
    if(is1) {	// ret == 1, don't bother squaring or multiplying it
      g[w].copyTo(r);
      is1 = false;
    }
    else {
      while(n > 1) { z.sqrTo(r,r2); z.sqrTo(r2,r); n -= 2; }
      if(n > 0) z.sqrTo(r,r2); else { t = r; r = r2; r2 = t; }
      z.mulTo(r2,g[w],r);
    }

    while(j >= 0 && (e[j]&(1<<i)) == 0) {
      z.sqrTo(r,r2); t = r; r = r2; r2 = t;
      if(--i < 0) { i = this.DB-1; --j; }
    }
  }
  return z.revert(r);
}

// (public) gcd(this,a) (HAC 14.54)
function bnGCD(a) {
  var x = (this.s<0)?this.negate():this.clone();
  var y = (a.s<0)?a.negate():a.clone();
  if(x.compareTo(y) < 0) { var t = x; x = y; y = t; }
  var i = x.getLowestSetBit(), g = y.getLowestSetBit();
  if(g < 0) return x;
  if(i < g) g = i;
  if(g > 0) {
    x.rShiftTo(g,x);
    y.rShiftTo(g,y);
  }
  while(x.signum() > 0) {
    if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i,x);
    if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i,y);
    if(x.compareTo(y) >= 0) {
      x.subTo(y,x);
      x.rShiftTo(1,x);
    }
    else {
      y.subTo(x,y);
      y.rShiftTo(1,y);
    }
  }
  if(g > 0) y.lShiftTo(g,y);
  return y;
}

// (protected) this % n, n < 2^26
function bnpModInt(n) {
  if(n <= 0) return 0;
  var d = this.DV%n, r = (this.s<0)?n-1:0;
  if(this.t > 0)
    if(d == 0) r = this[0]%n;
    else for(var i = this.t-1; i >= 0; --i) r = (d*r+this[i])%n;
  return r;
}

// (public) 1/this % m (HAC 14.61)
function bnModInverse(m) {
  var ac = m.isEven();
  if((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
  var u = m.clone(), v = this.clone();
  var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
  while(u.signum() != 0) {
    while(u.isEven()) {
      u.rShiftTo(1,u);
      if(ac) {
        if(!a.isEven() || !b.isEven()) { a.addTo(this,a); b.subTo(m,b); }
        a.rShiftTo(1,a);
      }
      else if(!b.isEven()) b.subTo(m,b);
      b.rShiftTo(1,b);
    }
    while(v.isEven()) {
      v.rShiftTo(1,v);
      if(ac) {
        if(!c.isEven() || !d.isEven()) { c.addTo(this,c); d.subTo(m,d); }
        c.rShiftTo(1,c);
      }
      else if(!d.isEven()) d.subTo(m,d);
      d.rShiftTo(1,d);
    }
    if(u.compareTo(v) >= 0) {
      u.subTo(v,u);
      if(ac) a.subTo(c,a);
      b.subTo(d,b);
    }
    else {
      v.subTo(u,v);
      if(ac) c.subTo(a,c);
      d.subTo(b,d);
    }
  }
  if(v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
  if(d.compareTo(m) >= 0) return d.subtract(m);
  if(d.signum() < 0) d.addTo(m,d); else return d;
  if(d.signum() < 0) return d.add(m); else return d;
}

var lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];
var lplim = (1<<26)/lowprimes[lowprimes.length-1];

// (public) test primality with certainty >= 1-.5^t
function bnIsProbablePrime(t) {
  var i, x = this.abs();
  if(x.t == 1 && x[0] <= lowprimes[lowprimes.length-1]) {
    for(i = 0; i < lowprimes.length; ++i)
      if(x[0] == lowprimes[i]) return true;
    return false;
  }
  if(x.isEven()) return false;
  i = 1;
  while(i < lowprimes.length) {
    var m = lowprimes[i], j = i+1;
    while(j < lowprimes.length && m < lplim) m *= lowprimes[j++];
    m = x.modInt(m);
    while(i < j) if(m%lowprimes[i++] == 0) return false;
  }
  return x.millerRabin(t);
}

// (protected) true if probably prime (HAC 4.24, Miller-Rabin)
function bnpMillerRabin(t) {
  var n1 = this.subtract(BigInteger.ONE);
  var k = n1.getLowestSetBit();
  if(k <= 0) return false;
  var r = n1.shiftRight(k);
  t = (t+1)>>1;
  if(t > lowprimes.length) t = lowprimes.length;
  var a = nbi();
  for(var i = 0; i < t; ++i) {
    //Pick bases at random, instead of starting at 2
    a.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);
    var y = a.modPow(r,this);
    if(y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
      var j = 1;
      while(j++ < k && y.compareTo(n1) != 0) {
        y = y.modPowInt(2,this);
        if(y.compareTo(BigInteger.ONE) == 0) return false;
      }
      if(y.compareTo(n1) != 0) return false;
    }
  }
  return true;
}

// protected
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;

// public
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

// JSBN-specific extension
BigInteger.prototype.square = bnSquare;

// BigInteger interfaces not implemented in jsbn:

// BigInteger(int signum, byte[] magnitude)
// double doubleValue()
// float floatValue()
// int hashCode()
// long longValue()
// static BigInteger valueOf(long val)

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp      = bnpClamp;
BigInteger.prototype.dlShiftTo  = bnpDLShiftTo;
BigInteger.prototype.drShiftTo  = bnpDRShiftTo;
BigInteger.prototype.lShiftTo   = bnpLShiftTo;
BigInteger.prototype.rShiftTo   = bnpRShiftTo;
BigInteger.prototype.subTo      = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo   = bnpSquareTo;
BigInteger.prototype.divRemTo   = bnpDivRemTo;
BigInteger.prototype.invDigit   = bnpInvDigit;
BigInteger.prototype.isEven     = bnpIsEven;
BigInteger.prototype.exp        = bnpExp;

// public
BigInteger.prototype.toString   = bnToString;
BigInteger.prototype.negate     = bnNegate;
BigInteger.prototype.abs        = bnAbs;
BigInteger.prototype.compareTo  = bnCompareTo;
BigInteger.prototype.bitLength  = bnBitLength;
BigInteger.prototype.mod        = bnMod;
BigInteger.prototype.modPowInt  = bnModPowInt;

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE  = nbv(1);
BigInteger.TWO  = nbv(2);
BigInteger.FOUR = nbv(4);
BigInteger.FIVE = nbv(5);
BigInteger.SIX  = nbv(6);
