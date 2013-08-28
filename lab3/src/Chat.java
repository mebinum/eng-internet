
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
    
/**
 * Servlet implementation class Chat
 */
@WebServlet("/Chat")
public class Chat extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Map<String,List<ChatMessage>> chatMessages;
	private Gson gson;
	
	/**
     * Default constructor. 
     */
    public Chat() {
        chatMessages = new HashMap<String,List<ChatMessage>>();
        gson = new Gson();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    //String messageJson = gson.toJson(chatMessages);
	    List<JsonObject> jsResponse = jsonObjectsFromChatMessage(chatMessages);
        sendResponse(response, gson.toJson(jsResponse));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    //read the content of the post message
	    BufferedReader reader = request.getReader();
	    StringBuilder sb = new StringBuilder();
        try {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append('\n');
            }
        } finally {
            reader.close();
        }
        String jsonStr = sb.toString();
        
	    //Get the user name and chat message from the JSON string
        JsonObject element = gson.fromJson (jsonStr, JsonObject.class);
	    String key = element.get("username").getAsString();
	    ChatMessage chatMessage = gson.fromJson(sb.toString(), ChatMessage.class);
	    System.out.println(chatMessage);
	    //add chat message
	    addChatMessage(key, chatMessage);
	    
	    System.out.println(gson.toJson(chatMessages));
	    //send back the timestamp of the last message
		JsonObject jsonResponse = new JsonObject();
		jsonResponse.addProperty("timestamp", chatMessage.getTimestamp().toString());
        sendResponse(response, gson.toJson(jsonResponse));
	}
	
	
	/**
	 * Send a response string back to the client
	 * @param response
	 * @param responseString
	 * @throws IOException
	 */
	private void sendResponse( HttpServletResponse response, String responseString) throws IOException {
	    response.setContentType("text/json");
        PrintWriter out = response.getWriter();
        out.println(responseString);
	}
	
	/**
	 * Converts a Map of ChatMessages to a List of Json Objects
	 * @param messages
	 * @return
	 */
	private List<JsonObject> jsonObjectsFromChatMessage(Map<String,List<ChatMessage>> messages) {
	    List<JsonObject> jsResponse = new ArrayList<JsonObject>();
        for ( Entry<String, List<ChatMessage>> chat : messages.entrySet()) {
            String username = chat.getKey();
            List<ChatMessage> msgs = chat.getValue();
            //gson.
            for (ChatMessage chatMsg : msgs) {
                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("username", username );
                jsonResponse.addProperty("message", chatMsg.getMessage());
                jsonResponse.addProperty("timestamp", chatMsg.getTimestamp().toString());
                jsResponse.add(jsonResponse);
            }
            
        }
        return jsResponse;
	}
	
	private synchronized void addChatMessage(String username, ChatMessage message) {
	    //if username is already present add message to array list
        //else create a new array list
	    ArrayList<ChatMessage> userMsgs;
        userMsgs = (ArrayList<ChatMessage>) chatMessages.get(username);
        if(userMsgs == null) {
            userMsgs = new ArrayList<ChatMessage>();  
        } 
        userMsgs.add(message);
        chatMessages.put(username, userMsgs);
	}

}
