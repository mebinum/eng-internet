package lab1;

import java.io.Console;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @author Mike Ebinum
 * @studentId 526250
 *
 */
public class Hostname 
{
    /**
     * @param args
     */
    public static void main(String[] args) {

        InetAddress inetAddress = null;
        if (args.length == 0) {
            printErrorAndExit("You didn't enter an address\nusage Hostname {address}");
        }
        
        String hostname = args[0];
        Boolean reachable = false;
        try {
            inetAddress = InetAddress.getByName(hostname);
            reachable = inetAddress.isReachable(1000);
        } catch (UnknownHostException e) {
            printErrorAndExit("Address " + hostname + "is not a valid address");
        } catch (IOException e) {
            
            //e.printStackTrace();
        }

        System.out.println("Found: " + inetAddress.getHostName() + "=" 
                + inetAddress.getHostAddress() + " and is " +
                (reachable ? "" : "not ") + "reachable");
        
    }

    static void printErrorAndExit(String msg) {
        System.out.println(msg);
        System.exit(1);
    }

}
