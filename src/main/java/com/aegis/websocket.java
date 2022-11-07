package com.aegis;
 
import java.io.OutputStreamWriter;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Map;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import AKT.CryptoModule.Util.AKTLogger;
	
	
	@ServerEndpoint("/endpoint")
	public class websocket {
		public static AKTLogger logger = new AKTLogger(websocket.class.getName());
	    public static String server="";
//	    private static PushTimeService pst;
	    @OnOpen
	    public void onOpen(Session session) {
	    	String msg;
	        logger.log("info", "34 onOpen::" + session.getId());
			if (session.isOpen()) {
	        	msg = "|AKTRequestID=ONOPEN|SESSION=" + session.getId();
				StringBuffer sb = new StringBuffer("0#");
				sb.append(msg.length() + "#" + msg);
				try { session.getBasicRemote().sendText(sb.toString()); }
				catch (IOException e) { e.printStackTrace(); }
			}
	    }
	    @OnClose
	    public void onClose(Session session) {
	        System.out.println("28 onClose::" +  session.getId());
	        logger.log("info", "28 onClose::" +  session.getId());
	    }
	    
	    @OnMessage
	    public void onMessage(String message, Session session) {
	        logger.log("info", "58 onMessage::From=" + session.getId() + " Message=" + message);
	        try {
		        String retVar = goToAKTServer( message);   
	            session.getBasicRemote().sendText(retVar);
	        } catch (IOException e) {
	            e.printStackTrace();
		        logger.log("info", "68 error=" + e.toString());
	        }
	    }
	    
	    @OnError
	    public void onError(Throwable t) {
	        System.out.println("onError::" + t.getMessage());
	        logger.log("info", "onError::" + t.getMessage());
	    }
	    
		@SuppressWarnings("deprecation")
		public static String goToAKTServer( String action) {
		       int kount;

		        StringBuffer sb = new StringBuffer();
//		        String hostName     = "192.168.2.12";
//		        String hostName     = "184.70.245.35";
//		        String hostName     = "50.78.200.2";
//			        String hostName     = Server;
//			    int portNumber        		= Integer.parseInt(Socket);
		        int portNumber      = 12312;
//		    	String hostName 	= "207.81.189.121"; // *****  use this for dev
	        	String hostName = "67.212.168.34"; // ***** Chicago
		        logger.log("info", "96 hostName=" + hostName + " port=" + portNumber);
		        Socket smtpSocket   = null;  
		        DataOutputStream os = null;
		        PrintWriter outp    = null;
		        DataInputStream is  = null;
		        StringBuffer sbIn   = new StringBuffer();
		        sbIn = null;
	            BufferedReader d = null;
		        try {
		            smtpSocket = new Socket(hostName, portNumber);
	                outp 	= new PrintWriter(new BufferedWriter(
	                				new OutputStreamWriter(smtpSocket.getOutputStream())), true);  
		            os      = new DataOutputStream(smtpSocket.getOutputStream());
		            is      = new DataInputStream(smtpSocket.getInputStream());
					d       = new BufferedReader(
									new InputStreamReader(smtpSocket.getInputStream()));
		        } catch (UnknownHostException e) {
		        	logger.log("info", "113 Don't know about host " + hostName
		        		+ " error=" + e.toString());
		        	System.exit(1);
		        } catch (IOException e) {
		        	logger.log("info", "117 Couldn't get I/O for the connection to " +
		        				hostName +  " error=" + e.toString());
		        	System.exit(1);
		    }        
	        if (smtpSocket != null && os != null && is != null) {
		     try{
		    	outp.println(action);
	            logger.log("info", "124 bytes written= " + action.length());
		    	String responseLine;
		        sbIn = new StringBuffer();
		        while ((responseLine = d.readLine()) != null) {
		            logger.log("info", "128 respose=" + responseLine);
		            sbIn.append(responseLine);
		        }
		        smtpSocket.close();
		    } catch (IOException e) {
		        logger.log("info", "133 Error processing socket " 
		          + hostName + "error=" + e.toString());
		        System.exit(1);
		    }        
		        logger.log("info", "137: " + sbIn.toString() + "<--");
	//
	// *****  here we need to process the return from the server
	//
	        }
	        
	    return sbIn.toString();
		}
	}