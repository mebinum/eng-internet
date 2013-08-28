# SWEN90002 - Engineering for Internet Applications
### Lab Week 3
### Group 5
### Oyemike Ebinum - 526250
### Venkatesh Yeluri - 655009

1. In order to offer concurrency, the Chat servelet used a synchronized method and lock to update the ChatMessages Map object which contains all the chat messages.


2. Since javascript is single threaded the browser handles most of the concurrency execution and queuing of tasks. In order handle the polling and posting of chat messages, the script uses events and event handlers i.e. publisher/subscriber model to update the HTML i.e the view. The web client has a polling service that continously makes an ajax http request every 30 seconds to the server for new chat messages, and fires an event called 'poll-updated' when it returns from the sever. The controller function subscribes to this event and updated the html when it is triggered.
When a user posts a chat, a request is sent to the server and the server returns a timestamp for the message if it was successfully saved. The message is then marked as sent, and an array of messages is updated and an event is fired to tell controller to update the view. Since Javascript is single threaded the browser takes care of an

3. What is the difference between using a Servlet and an Applet? Give a reason why you might prefer to use an Applet over a Servlet. Give a reason why you might prefer a Servlet over an Applet.
An applet runs on the client side where as servlet runs on the server side.
An applet can be be thought of as a that frame runs on the client side JVM and a servlet, which can produce HTML to be viewed on a web page contents browser running. Servlets must be hosted on a server like Apache Tomcat.
 I will use an applet in case of a browser plugin or to view some  animated graphics and interactive content in the browser, as applet can be downloaded to the client machine.
In terms of servlet, I might use it for controllers. Controllers are java classes which is faster in execution and page rendering. Servlets also produces HTML and JavaScript to  display dynamic content.