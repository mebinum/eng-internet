import java.sql.Timestamp;
import java.util.Date;


/**
 * @author mebinum
 * ChatMessage Pojo for chats
 */
public class ChatMessage {
    private String message;
    private Timestamp timestamp;
    
    public ChatMessage() {
        super();
        Date date = new java.util.Date();
        this.timestamp = new Timestamp(date.getTime());
    }

    /**
     * @return the message
     */
    public synchronized String getMessage() {
        return message;
    }
    /**
     * @param message the message to set
     */
    public synchronized void setMessage(String message) {
        this.message = message;
    }
    /**
     * @return the timestamp
     */
    public synchronized Timestamp getTimestamp() {
        return timestamp;
    }
    
    /**
     * @param timestamp the timestamp to set
     */
    public synchronized void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
    
    public String toString() {
        return message + " " + timestamp;
    }
}